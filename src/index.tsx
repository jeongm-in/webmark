import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
// import './index.css';
// import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
/*global chrome*/
// chrome.storage.sync.clear();
// chrome.storage.sync.set({'loadHere':true});

enum NotificationId {
    FolderCreated = 'Folder Created',
    PageAlreadyExists = 'Page Already Exists',
    FolderNotFound = 'Folder Not Found',
};

ReactDOM.render(
    <Popup />,
    document.getElementById('root') as HTMLElement
);

var saveClicked = (): void => {
    chrome.storage.sync.get(
        ['webmarkFolderId'],
        function (result) {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                createWebmarkFolder();
            }
            else {
                console.log('webmarkFolderId found.');
                getCurrentUrlAndSave();
            };
        }
    );
}

var loadClicked = (): void => {
    chrome.storage.sync.get(
        ['webmarkFolderId'],
        function (result) {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                createWebmarkFolder();
                return;
            }
            console.log('webmarkFolderId found.');
            let webmarkFolderId: string = result!['webmarkFolderId'];
            chrome.bookmarks.get(
                webmarkFolderId,
                function () {
                    if (chrome.runtime.lastError) {
                        console.log('webmark folder not found.');
                        createWebmarkFolder();
                        chrome.storage.sync.remove('webmarkFolderId');
                        return;
                    }
                    console.log('webmark folder found.');
                    loadRandomUrlFromFolder();
                }
            );
        }
    );
}

let saveButton = document.getElementById('save') as HTMLElement;
let loadButton = document.getElementById('load') as HTMLElement;
saveButton.addEventListener('click', saveClicked);
loadButton.addEventListener('click', loadClicked);

// helper functions
var createWebmarkFolder = (): void => {
    chrome.bookmarks.create(
        {
            'title': 'WebMark',
        },
        function (newFolder) {
            chrome.storage.sync.set(
                {
                    'webmarkFolderId': newFolder.id,
                }
            );
            console.log('set webmarkFolderId to ' + newFolder.id);
            showNotice(
                NotificationId.FolderCreated,
                'No WebMark folder found, so we just created one. :)'
                ,
            );
        },
    )
};

let getCurrentUrlAndSave = () => {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        ([currentTab]) => {
            const thisTabUrl: string | undefined = currentTab.url;
            const thisTabTitle: string | undefined = currentTab.title;
            saveToWebmarkFolder(thisTabUrl, thisTabTitle);
        }
    );
}

var saveToWebmarkFolder = (url: string | undefined, title: string | undefined): void => {
    //TODO: find better way to sanitize input 
    if (url == undefined) {
        url = "https://example.com/error";
    }
    if (title == undefined) {
        title = "read later";
    }

    chrome.storage.sync.get(
        ['webmarkFolderId'],
        function (result?) {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                createWebmarkFolder();
                return;
            }
            console.log('webmarkFolderId found.');
            let webmarkFolderId: string = result!['webmarkFolderId'];
            chrome.bookmarks.get(
                webmarkFolderId,
                function () {
                    if (chrome.runtime.lastError) {
                        console.log('webmark folder not found.');
                        createWebmarkFolder();
                        chrome.storage.sync.remove('webmarkFolderId');
                        return;
                    }
                    chrome.bookmarks.search(
                        { 'url': url },
                        function (results) {
                            if (results == undefined || results.length == 0) {
                                console.log('Same page not found in the folder.');
                                chrome.bookmarks.create(
                                    {
                                        'parentId': webmarkFolderId,
                                        'url': url,
                                        'title': title,
                                    }
                                );
                                console.log(url + ' saved to folder.');
                                return;
                            }
                            showNotice(
                                NotificationId.PageAlreadyExists,
                                'The page is already in the folder.'
                            );
                        }
                    )

                }
            );
        }
    );
}

let loadRandomUrlFromFolder = (): void => {
    chrome.storage.sync.get(
        ['webmarkFolderId'],
        (result?) => {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                return;
            }
            let webmarkFolderId: string = result!['webmarkFolderId'];
            chrome.bookmarks.get(
                webmarkFolderId,
                () => {
                    if (chrome.runtime.lastError) {
                        console.log('webmark folder not found.');
                        showNotice(
                            NotificationId.FolderNotFound,
                            "Invalid Access"
                        );
                        return;
                    }
                    let webmarkFolderId: string = result!['webmarkFolderId'];
                    chrome.bookmarks.getSubTree(
                        webmarkFolderId,
                        (bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]) => {
                            let urlList: Array<string> = [];
                            for (let node of bookmarkTreeNodes) {
                                recursiveUrlCollection(node, urlList);
                            }
                            let randomIndex: number = Math.floor(Math.random() * urlList.length);
                            let randomUrl: string = urlList[randomIndex];
                            chrome.storage.sync.get(
                                ['loadHere'],
                                (result) => {
                                    if (Object.keys(result).length !== 0 && result!['loadHere']) {
                                        loadInCurrentTab(randomUrl);
                                    }
                                    else {
                                        loadInNewTab(randomUrl);
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

let recursiveUrlCollection = (bookmark: chrome.bookmarks.BookmarkTreeNode, urlList: Array<string>) => {
    if (bookmark.children) {
        for (let child of bookmark.children) {
            recursiveUrlCollection(child, urlList);
        }
    }
    if (bookmark.url) {
        urlList.push(bookmark.url);
    }
}

var showNotice = (notificationId: NotificationId, title: string, message: string = ''): void => {
    chrome.notifications.create(
        notificationId, // prevents duplicate notifcations (only keeps the most recent one)
        {
            'type': 'basic', // required
            'iconUrl': 'images/default.png', // required
            'title': title, // required
            'message': message, // required
            'eventTime': Date.now(),
        },
        function (notificationId: string) {
            console.log(notificationId + ' notification sent.');
        }
    );
    console.log('Showed message ("' + message + '") to user.');
}

var loadInCurrentTab = (url: string): void => {
    chrome.tabs.update(
        {
            'url': url,
        }
    );
    console.log('Opened ' + url + ' in the current tab.');
}

var loadInNewTab = (url: string): void => {
    chrome.tabs.create(
        {
            'url': url,
        }
    );
    console.log('Opened ' + url + ' in a new tab.');
}
