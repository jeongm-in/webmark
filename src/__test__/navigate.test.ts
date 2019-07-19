import chrome from 'sinon-chrome';
import { assert } from 'chai';
import { navigate, navigationTarget } from '../navigate';

describe('navigate.ts', function () {
    const url = 'http://my-domain.com';

    it('should navigate to new window', function () {
        assert.ok(chrome.windows.create.notCalled,
            'windows.create should not be called'
        );
        navigate(url, navigationTarget.NEW_WINDOW);
        assert.ok(chrome.windows.create.calledOnce,
            'windows.create should be called'
        );
        assert.ok(
            chrome.windows.create.withArgs(
                { url, focused: true, type: 'normal' }
            ).calledOnce,
            'windows.create should be called with specified args'
        );
    });

    afterAll(function () {
        chrome.flush();
    });
});
