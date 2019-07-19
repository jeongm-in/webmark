import chrome from 'sinon-chrome';
import { assert } from 'chai';
import { loadInCurrentTab, loadInNewTab, } from '../utils';

// taken from https://github.com/acvetkov/sinon-chrome/blob/master/examples/navigate.js, modified for TypeScript and our functions

describe('loadInCurrentTab', function () {
    const url = 'https://example.com/';

    it('should open a new tab with the given url', function () {
        assert.ok(chrome.tabs.update.notCalled,
            'tabs.update should not be called'
        );
        loadInCurrentTab(url);
        assert.ok(chrome.tabs.update.calledOnce,
            'tabs.update should be called once'
        );
        assert.ok(
            chrome.tabs.update.withArgs({ url }).calledOnce,
            'tabs.update should be called once with specified args'
        );
    });

    afterAll(function () {
        chrome.flush();
    });
});

describe('loadInNewTab', function () {
    const url = 'https://example.com/';

    it('should open a new tab with the given url', function () {
        assert.ok(chrome.tabs.create.notCalled,
            'tabs.create should not be called'
        );
        loadInNewTab(url);
        assert.ok(chrome.tabs.create.calledOnce,
            'tabs.create should be called once'
        );
        assert.ok(
            chrome.tabs.create.withArgs({ url }).calledOnce,
            'tabs.create should be called once with specified args'
        );
    });

    afterAll(function () {
        chrome.flush();
    });
});
