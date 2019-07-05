import * as React from "react";
import PopupButton from "./PopupButton";
import * as constants from "../constants"

class Popup extends React.Component {
    constructor() {
        super(React.Component);
    }
    popupStyle = {
        width: "220px",
    };
    render() {
        return (
            <div className="popup" style={this.popupStyle}>
                <PopupButton id="save" text={constants.SAVE_BUTTON_TEXT} />
                <PopupButton id="load" text={constants.LOAD_BUTTON_TEXT} />
            </div>
        );
    }
}

export default Popup;
