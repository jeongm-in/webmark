import * as React from "react";
import Card from "./Card";
import Logo from "./Logo";
import * as constants from "../constants"

class Popup extends React.Component {
    constructor() {
        super(React.Component);
    }
    render() {
        return (
            <div>
                <Logo image="../public/images/default.png"></Logo>
                <Card type="toggle"></Card>
            </div>
        );
    }
}

export default Popup;
