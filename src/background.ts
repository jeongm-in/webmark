import * as constants from './constants'
import { createWebmarkFolder } from './index'

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
