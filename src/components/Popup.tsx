import * as React from "react";
import PopupButton from "./PopupButton";
import { SAVE_BUTTON_TEXT, LOAD_BUTTON_TEXT } from "../constants"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { loadClicked, saveClicked } from '../utils'

class Popup extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <ButtonGroup id="buttons" vertical>
                <PopupButton
                    id="save"
                    text={SAVE_BUTTON_TEXT}
                    onClick={saveClicked} />
                <PopupButton
                    id="load"
                    text={LOAD_BUTTON_TEXT}
                    onClick={loadClicked} />
            </ButtonGroup >
        );
    }
}

export default Popup;
