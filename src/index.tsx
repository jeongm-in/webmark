import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
// import './index.css';
// import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

ReactDOM.render(
    <Popup />,
    document.getElementById('root') as HTMLElement
);

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
var showNotice = (message: string): void => {
    console.log('Showed message ("' + message + '") to user.');
}
