import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
// import './index.css';
// import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
/*global chrome*/ ;
chrome.storage.sync.clear();
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
                let currentUrl: string = getCurrentUrl();
                saveToWebmarkFolder(currentUrl);
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

var getCurrentUrl = (): string => {
    return 'https://current.url.com';
};

var saveToWebmarkFolder = (url: string): void => {
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
    return true;
}

var getRandomUrlFromFolder = (): string => {
    return 'https://random.url.com/';
}

var showNotice = (message: string): void => {
    console.log('Showed message ("' + message + '") to user.');
}
var loadInCurrentTab = (url: string): void => {
    console.log('Opened ' + url + ' in the current tab.');
}

var loadInNewTab = (url: string): void => {
    console.log('Opened ' + url + ' in a new tab.');
}
