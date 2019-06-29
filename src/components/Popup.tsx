import * as React from "react";
import PopupButton from "./PopupButton";

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
                <PopupButton id="save" text="Save this web page" />
                <PopupButton id="load" text="Load a random web page" />
            </div>
        );
    }
}

export default Popup;
