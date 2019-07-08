import * as constants from './constants'

let createWebmarkFolder = (): void => {
    chrome.bookmarks.create(
        {
            'title': constants.FOLDER_NAME,
        },
        (newFolder) => {
            chrome.storage.sync.set(
                {
                    [constants.FOLDER_ID_KEY]: newFolder.id,
                },
                () => {
                    console.log('set webmarkFolderId to ' + newFolder.id);
                }
            );
        },
    )
};

chrome.runtime.onInstalled.addListener(
    () => {
        chrome.storage.sync.get(
            [constants.FOLDER_ID_KEY],
            (result) => {
                if (Object.keys(result).length === 0) {
                    console.log('webmarkFolderId not found.');
                    createWebmarkFolder();
                }
                else {
                    console.log('webmarkFolderId found.');
                    let webmarkFolderId: string = result[constants.FOLDER_ID_KEY];
                    chrome.bookmarks.get(
                        webmarkFolderId,
                        () => {
                            if (chrome.runtime.lastError) {
                                console.log('webmark folder not found.');
                                createWebmarkFolder();
                                chrome.storage.sync.remove(constants.FOLDER_ID_KEY);
                                return;
                            }
                            console.log('webmark folder found.');
                        }
                    );
                };
            }
        );
    }
)
