import * as React from "react";
import PopupButton from "./PopupButton";
import * as constants from "../constants"
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Popup extends React.Component {
    constructor() {
        super(React.Component);
    }
    render() {
        return (
            <ButtonGroup id="buttons" vertical>
                <PopupButton id="save" text={constants.SAVE_BUTTON_TEXT} />
                <PopupButton id="load" text={constants.LOAD_BUTTON_TEXT} />
            </ButtonGroup >
        );
    }
}

export default Popup;
