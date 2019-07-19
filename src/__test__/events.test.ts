import chrome from 'sinon-chrome';
import { assert } from 'chai';
import EventsModule from '../events';

// taken from https://github.com/acvetkov/sinon-chrome, modified for TypeScript

describe('events.ts', function () {
    beforeAll(function () {
        new EventsModule();
    });

    beforeEach(function () {
        chrome.runtime.sendMessage.flush();
    });

    it('should subscribe on chrome.tabs.onUpdated', function () {
        assert.isTrue(chrome.tabs.onUpdated.addListener.calledOnce);
    });

    it('should send correct url on tabs updated event', function () {
        assert.isTrue(chrome.runtime.sendMessage.notCalled);
        chrome.tabs.onUpdated.dispatch({ url: 'my-url' });
        assert.isTrue(chrome.runtime.sendMessage.calledOnce);
        assert.isTrue(chrome.runtime.sendMessage.withArgs('my-url').calledOnce);
    });

    afterAll(function () {
        chrome.flush();
    });
});
