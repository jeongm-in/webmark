import { FOLDER_NAME } from '../constants';
// import SinonChrome from 'sinon-chrome';
// var chrome = ((window.chrome as any) as typeof SinonChrome);

describe('constants.ts', function () {
    // beforeAll(function () {
    //     chrome.registerPlugin(new chrome.plugins.I18nPlugin());
    //     // chrome.i18n.getMessage.returns('someString');
    // });
    it('should do nothing', function () {
        expect(1).toBe(1);
    });
    it('should call chrome.i18n.getMessage', function () {
        expect(FOLDER_NAME).toBe('someFolderName');
    });
    // it('chrome.i18n.getMessage should not be called', function () {
    //     expect(chrome.i18n.getMessage.callCount).toBe(12);
    // });
    // it('chrome.i18n.getMessage should not be called', function () {
    //     expect(chrome.i18n.getMessage.callCount).toBe(12);
    // });
});

