import * as React from "react";
import Image from 'react-bootstrap/Image';
import CardGeneralSettings from "./CardGeneralSettings";
import CardAbout from "./CardAbout";

class OptionPage extends React.Component {
    constructor() {
        super(React.Component);
    }

    className = "d-flex flex-column align-items-center justify-content-center";
    promoImage: string = './images/promo.png';

    render() {
        return (
            <div className={this.className}>
                <Image src={this.promoImage}></Image>
                <CardGeneralSettings />
                <CardAbout />
            </div >
        );
    }
}

export default OptionPage;
