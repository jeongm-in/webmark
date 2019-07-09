import React from 'react';
import ReactDOM from 'react-dom';
import OptionPage from './components/OptionPage';
// import { saveClicked, loadClicked } from './utils'
// import './index.css';
// import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// chrome.storage.sync.clear();
// chrome.storage.sync.set({ [constants.LOAD_HERE_KEY]: true });

ReactDOM.render(
    <OptionPage />,
    document.getElementById('root') as HTMLElement
);

// let saveButton = document.getElementById('save') as HTMLElement;
// let loadButton = document.getElementById('load') as HTMLElement;
// saveButton.addEventListener('click', saveClicked);
// loadButton.addEventListener('click', loadClicked);
