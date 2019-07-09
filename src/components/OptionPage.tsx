import * as React from "react";
import Card from "./Card";
import Logo from "./Logo";
import * as constants from "../constants"

class OptionPage extends React.Component {
    constructor() {
        super(React.Component);
    }

    backgroundStyle = {
        backgroundColor: '#55efc4',
    } as React.CSSProperties;

    render() {
        return (
            <div style={this.backgroundStyle} className="d-flex flex-column align-items-center justify-content-center">
                <Logo image="./images/promo.png"></Logo>
                <Card title={constants.OPTIONS_GENERAL_CARD_TITLE}></Card>
            </div>
        );
    }
}

export default OptionPage;
