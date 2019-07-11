import React from 'react';
import ReactDOM from 'react-dom';
import OptionPage from './components/OptionPage';
/*global chrome*/

document.title = chrome.i18n.getMessage('optionsPage');
document.body.style.backgroundColor = "#DDD";

ReactDOM.render(
    <OptionPage />,
    document.getElementById('root') as HTMLElement
);
