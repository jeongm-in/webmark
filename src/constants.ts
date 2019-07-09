/* global chrome */
/** Constant string literals in alphabetical order */
// IDs and keys (user-invisible strings)
export const FOLDER_ID_KEY: string = 'webmarkFolderId';
export const LOAD_HERE_KEY: string = 'loadHere';

// user-visible strings
export const FOLDER_EMPTY: string = chrome.i18n.getMessage('folderEmpty');
export const FOLDER_NAME: string = chrome.i18n.getMessage('folderName');
export const LOAD_BUTTON_TEXT: string = chrome.i18n.getMessage('loadButton');
export const PAGE_ALREADY_EXISTS: string = chrome.i18n.getMessage('pageAlreadyExists');
export const SAVE_BUTTON_TEXT: string = chrome.i18n.getMessage('saveButton');
export const SAVE_SUCCESSFUL: string = chrome.i18n.getMessage('saveSuccessful');

// user-visible strings options page
export const OPTIONS_GENERAL_CARD_TITLE: string = chrome.i18n.getMessage('optionsGeneralCardTitle');
export const OPTIONS_IS_LOAD_IN_NEW_TAB: string = chrome.i18n.getMessage('optionsIsLoadInNewTab');
