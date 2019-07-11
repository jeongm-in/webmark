import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import { saveClicked, loadClicked } from './utils'

ReactDOM.render(
    <Popup />,
    document.getElementById('root') as HTMLElement
);

let saveButton = document.getElementById('save') as HTMLElement;
let loadButton = document.getElementById('load') as HTMLElement;
saveButton.addEventListener('click', saveClicked);
loadButton.addEventListener('click', loadClicked);
