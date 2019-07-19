import chrome from 'sinon-chrome';
import { assert } from 'chai';
import { loadInNewTab } from '../utils';

// taken from https://github.com/acvetkov/sinon-chrome/blob/master/examples/navigate.js, modified for TypeScript and our functions

describe('utils.ts', function () {
    const url = 'https://example.com/';

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
    });
});
