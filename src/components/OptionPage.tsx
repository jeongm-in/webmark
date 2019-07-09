import * as React from "react";
import Logo from "./Logo";
import CardGeneralSettings from "./CardGeneralSettings";
import CardAbout from "./CardAbout";

class OptionPage extends React.Component {
    constructor() {
        super(React.Component);
    }

    backgroundStyle = {
        backgroundColor: '#DDDDDD',
    } as React.CSSProperties;

    render() {
        return (
            <div style={this.backgroundStyle} className="d-flex flex-column align-items-center justify-content-center">
                <Logo image="./images/promo.png"></Logo>
                <CardGeneralSettings />
                <CardAbout />
            </div>
        );
    }
}

export default OptionPage;
