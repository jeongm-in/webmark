// import mockTranslations from '../../public/_locales/en/messages.json';
import { assert } from 'chai';
import { loadInNewTab } from '../utils';
import chrome from 'sinon-chrome';
// import SinonChrome from 'sinon-chrome';
// var chrome = ((window.chrome as any) as typeof SinonChrome);

// taken from https://github.com/acvetkov/sinon-chrome/blob/master/examples/navigate.js, modified for TypeScript and our functions
describe('utils.ts', function () {
    const url = 'https://example.com/';

    // beforeAll(function () {
    //     chrome.registerPlugin(new chrome.plugins.I18nPlugin());
    //     (global as any).chrome = chrome;
    //     jest.mock('chrome.i18n.getMessage', () => jest.fn(() => { }));
    // });

    it('should open a new tab with the given url', function () {
        assert.ok(chrome.tabs.create.notCalled,
            'tabs.create should not be called'
        );
        loadInNewTab(url);
        assert.ok(chrome.tabs.create.calledOnce,
            'tabs.create should be called'
        );
        assert.ok(
            chrome.tabs.create.withArgs({ url }).calledOnce,
            'tabs.create should be called with specified args'
        );
    });

    afterAll(function () {
        chrome.flush();
        delete (global as any).chrome;
    });
});
