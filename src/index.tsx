import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import * as constants from './constants';
// import './index.css';
// import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
/*global chrome*/
// chrome.storage.sync.clear();
// chrome.storage.sync.set({ [constants.LOAD_HERE_KEY]: true });

ReactDOM.render(
    <Popup />,
    document.getElementById('root') as HTMLElement
);

var saveClicked = (): void => {
    chrome.storage.sync.get(
        [constants.FOLDER_ID_KEY],
        function (result) {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                createWebmarkFolder(saveClicked);
            }
            else {
                console.log('webmarkFolderId found.');
                let webmarkFolderId: string = result![constants.FOLDER_ID_KEY];
                chrome.bookmarks.get(
                    webmarkFolderId,
                    function () {
                        if (chrome.runtime.lastError) {
                            console.log('webmark folder not found.');
                            createWebmarkFolder(saveClicked);
                            chrome.storage.sync.remove(constants.FOLDER_ID_KEY);
                            return;
                        }
                        console.log('webmark folder found.');
                        getCurrentUrlAndSave(webmarkFolderId);
                    }
                );
            };
        }
    );
}

var loadClicked = (): void => {
    chrome.storage.sync.get(
        [constants.FOLDER_ID_KEY],
        function (result) {
            if (Object.keys(result).length === 0) {
                console.log('webmarkFolderId not found.');
                createWebmarkFolder();
                showNotice(constants.FOLDER_EMPTY);
                return;
            }
            console.log('webmarkFolderId found.');
            let webmarkFolderId: string = result![constants.FOLDER_ID_KEY];
            chrome.bookmarks.get(
                webmarkFolderId,
                function () {
                    if (chrome.runtime.lastError) {
                        console.log('webmark folder not found.');
                        createWebmarkFolder();
                        showNotice(constants.FOLDER_EMPTY);
                        chrome.storage.sync.remove(constants.FOLDER_ID_KEY);
                        return;
                    }
                    console.log('webmark folder found.');
                    loadRandomUrlFromFolder(webmarkFolderId);
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
var createWebmarkFolder = (callback?: () => void): void => {
    chrome.bookmarks.create(
        {
            'title': constants.FOLDER_NAME,
        },
        function (newFolder) {
            chrome.storage.sync.set(
                {
                    [constants.FOLDER_ID_KEY]: newFolder.id,
                }, function () {
                    console.log('set webmarkFolderId to ' + newFolder.id);
                    if (callback !== undefined) {
                        callback();
                    }
                }
            );
        },
    )
};

let getCurrentUrlAndSave = (webmarkFolderId: string) => {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        ([currentTab]) => {
            // TODO: find better way to sanitize input 
            // Making parameters that has type string|undefined to be optional does not solve this issue here.
            // both currentTab.url and currentTab.title are string|undefined, so I cannot assign it to thisTabUrl and thisTabTitle.
            // Why would changing parameters to optional solve this problem?
            // Wrong 
            // const thisTabUrl: string = currentTab.url;
            // const thisTabTitle: string = currentTab.title;

            // Correct
            const thisTabUrl: string = (currentTab.url === undefined) ? "https://example.com/error" : currentTab.url;
            const thisTabTitle: string = (currentTab.title === undefined) ? "read later" : currentTab.title;

            saveIfNotAlreadyThere(webmarkFolderId, thisTabUrl, thisTabTitle);
        }
    );
}

let isInTree = (nodes: chrome.bookmarks.BookmarkTreeNode[], url?: string): boolean => {
    while (nodes.length > 0) {
        let node: chrome.bookmarks.BookmarkTreeNode = nodes.pop()!;
        if (node.url) { // bookmark
            if (node.url == url) {
                return true;
            }
        } else if (node.children) { // folder and has children
            for (let child of node.children) {
                nodes.push(child);
            }
        }
    }
    return false;
}

let saveIfNotAlreadyThere = (webmarkFolderId: string, url?: string, title?: string): void => {
    chrome.bookmarks.getSubTree(
        webmarkFolderId,
        (results: chrome.bookmarks.BookmarkTreeNode[]): void => {
            if (isInTree(results, url)) {
                showNotice(constants.PAGE_ALREADY_EXISTS);
            }
            else {
                console.log('Same page not found in the folder.');
                saveWithConfidence(webmarkFolderId, url, title);
            }
        }
    );
}

let saveWithConfidence = (webmarkFolderId: string, url?: string, title?: string): void => {
    chrome.bookmarks.create(
        {
            'parentId': webmarkFolderId,
            'url': url,
            'title': title,
        },
        () => {
            showNotice(constants.SAVE_SUCCESSFUL);
            console.log(url + ' saved to folder.');
        }
    );
}

let loadRandomUrlFromFolder = (webmarkFolderId: string): void => {
    chrome.bookmarks.getSubTree(
        webmarkFolderId,
        (bookmarkTreeNodes: chrome.bookmarks.BookmarkTreeNode[]) => {
            let urlList: Array<string> = [];
            for (let node of bookmarkTreeNodes) {
                recursiveUrlCollection(node, urlList);
            }
            if (urlList.length == 0) {
                showNotice(constants.FOLDER_EMPTY);
                return;
            }
            let randomIndex: number = Math.floor(Math.random() * urlList.length);
            let randomUrl: string = urlList[randomIndex];
            loadPage(randomUrl);
        }
    );
}

let loadPage = (url: string): void => {
    chrome.storage.sync.get(
        [constants.LOAD_HERE_KEY],
        (result) => {
            if (Object.keys(result).length !== 0 && result![constants.LOAD_HERE_KEY]) {
                loadInCurrentTab(url);
            }
            else {
                loadInNewTab(url);
            }
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

var showNotice = (title: string, message: string = ''): void => {
    chrome.notifications.create(
        // notificationId intentionally not sent
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
    console.log('Showed message ("' + title + '") to user.');
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
