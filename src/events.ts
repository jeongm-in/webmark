/* global chrome */

export default class EventsModule {
    constructor() {
        this.observe();
    }

    observe() {
        chrome.tabs.onUpdated.addListener(
            (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => this.handleEvent(tab)
        );
    }

    handleEvent(tab: chrome.tabs.Tab) {
        chrome.runtime.sendMessage(tab.url);
    }
}
