/*global chrome*/
import { FOLDER_ID_KEY, FOLDER_EMPTY, FOLDER_NAME, PAGE_ALREADY_EXISTS, SAVE_SUCCESSFUL, LOAD_HERE_KEY } from './constants'

export let saveClicked = (): void => {
    chrome.storage.sync.get(
        [FOLDER_ID_KEY],
        function (result: any) {
            if (Object.keys(result).length === 0) {
                createWebmarkFolder(saveClicked);
            }
            else {
                let webmarkFolderId: string = result![FOLDER_ID_KEY];
                chrome.bookmarks.get(
                    webmarkFolderId,
                    function () {
                        if (chrome.runtime.lastError) {
                            createWebmarkFolder(saveClicked);
                            chrome.storage.sync.remove(FOLDER_ID_KEY);
                            return;
                        }
                        getCurrentUrlAndSave(webmarkFolderId);
                    }
                );
            };
        }
    );
}

export let loadClicked = (): void => {
    chrome.storage.sync.get(
        [FOLDER_ID_KEY],
        function (result: any) {
            if (Object.keys(result).length === 0) {
                createWebmarkFolder();
                showNotice(FOLDER_EMPTY);
                return;
            }
            let webmarkFolderId: string = result![FOLDER_ID_KEY];
            chrome.bookmarks.get(
                webmarkFolderId,
                function () {
                    if (chrome.runtime.lastError) {
                        createWebmarkFolder();
                        showNotice(FOLDER_EMPTY);
                        chrome.storage.sync.remove(FOLDER_ID_KEY);
                        return;
                    }
                    loadRandomUrlFromFolder(webmarkFolderId);
                }
            );
        }
    );
}

export let createWebmarkFolder = (callback?: () => void): void => {
    chrome.bookmarks.create(
        {
            'title': FOLDER_NAME,
        },
        function (newFolder: any) {
            chrome.storage.sync.set(
                {
                    [FOLDER_ID_KEY]: newFolder.id,
                }, function () {
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
            const thisTabUrl: string = currentTab.url!;
            const thisTabTitle: string = currentTab.title!;
            saveIfNotAlreadyThere(webmarkFolderId, thisTabUrl, thisTabTitle);
        }
    );
}

let isInTree = (url: string, nodes: chrome.bookmarks.BookmarkTreeNode[]): boolean => {
    while (nodes.length > 0) {
        let node: chrome.bookmarks.BookmarkTreeNode = nodes.pop()!;
        if (node.url) { // bookmark
            if (node.url === url) {
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

let saveIfNotAlreadyThere = (webmarkFolderId: string, url: string, title: string): void => {
    chrome.bookmarks.getSubTree(
        webmarkFolderId,
        (results: chrome.bookmarks.BookmarkTreeNode[]): void => {
            if (isInTree(url, results)) {
                showNotice(PAGE_ALREADY_EXISTS);
            }
            else {
                saveWithConfidence(webmarkFolderId, url, title);
            }
        }
    );
}

let saveWithConfidence = (webmarkFolderId: string, url: string, title: string): void => {
    chrome.bookmarks.create(
        {
            'parentId': webmarkFolderId,
            'url': url,
            'title': title,
        },
        () => {
            showNotice(SAVE_SUCCESSFUL);
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
            if (urlList.length === 0) {
                showNotice(FOLDER_EMPTY);
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
        [LOAD_HERE_KEY],
        (result: any) => {
            if (Object.keys(result).length !== 0 && result![LOAD_HERE_KEY]) {
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

let showNotice = (title: string, message: string = ''): void => {
    chrome.notifications.create(
        // notificationId intentionally not sent
        {
            'type': 'basic', // required
            'iconUrl': 'images/128.png', // required
            'title': title, // required
            'message': message, // required
            'eventTime': Date.now(),
        }
    );
}

let loadInCurrentTab = (url: string): void => {
    chrome.tabs.update(
        {
            'url': url,
        }
    );
}

export let loadInNewTab = (url: string): void => {
    chrome.tabs.create(
        {
            'url': url,
        }
    );
}
