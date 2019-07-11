import { FOLDER_ID_KEY } from './constants'
import { createWebmarkFolder, saveClicked, loadClicked } from './utils'

chrome.runtime.onInstalled.addListener(
    () => {
        chrome.storage.sync.get(
            [FOLDER_ID_KEY],
            (result) => {
                if (Object.keys(result).length === 0) {
                    console.log('webmarkFolderId not found.');
                    createWebmarkFolder();
                }
                else {
                    console.log('webmarkFolderId found.');
                    let webmarkFolderId: string = result[FOLDER_ID_KEY];
                    chrome.bookmarks.get(
                        webmarkFolderId,
                        () => {
                            if (chrome.runtime.lastError) {
                                console.log('webmark folder not found.');
                                createWebmarkFolder();
                                chrome.storage.sync.remove(FOLDER_ID_KEY);
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

chrome.commands.onCommand.addListener(
    (command: string) => {
        if (command === 'save') {
            saveClicked();
        }
        else if (command === 'load') {
            loadClicked();
        }
    }
);
