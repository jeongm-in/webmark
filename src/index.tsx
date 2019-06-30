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
            } else {
                console.log('webmarkFolderId found.');
                let loadFunction: (url: string) => void;
                loadFunction = loadHere() ? loadInCurrentTab : loadInNewTab;
                let url: string = getRandomUrlFromFolder();
                loadFunction(url);
            }
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
            showNotice('No WebMark folder found, so we just created one. :)');
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
            } else {
                console.log('webmarkFolderId found.');
                let webmarkFolderId: string = result!['webmarkFolderId'];
                chrome.bookmarks.search(
                    { 'url': url },
                    function (results) {
                        if (results === undefined || results.length == 0) {
                            console.log('Same page not found in the folder.');
                            chrome.bookmarks.create(
                                {
                                    'parentId': webmarkFolderId,
                                    'url': url,
                                    'title': title,
                                }
                            );
                            console.log(url + ' saved to folder.');
                        }
                        else {
                            showNotice('The page is already in the folder.');
                        }
                    }
                )
            }
        }
    );
}

var loadHere = (): boolean => {
    //TODO: implement loadHere
    return true;
}

var getRandomUrlFromFolder = (): string => {
    //TODO: implement getRandomUrlFromFolder
    return 'https://example.com/random';
}

var showNotice = (message: string): void => {
    //TODO: implement showNotice
    console.log('Showed message ("' + message + '") to user.');
}
var loadInCurrentTab = (url: string): void => {
    //TODO: implement loadInCurrentTab
    console.log('Opened ' + url + ' in the current tab.');
}

var loadInNewTab = (url: string): void => {
    //TODO: implement loadInNewTab
    console.log('Opened ' + url + ' in a new tab.');
}
