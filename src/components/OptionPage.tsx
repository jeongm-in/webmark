import * as React from "react";
import Image from 'react-bootstrap/Image';
import CardGeneralSettings from "./CardGeneralSettings";
import CardAbout from "./CardAbout";
// import * as promo from "../images/promo.png";

class OptionPage extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        let promo: string = './images/promo.png';
        let optionPageClass: string = "d-flex flex-column align-items-center justify-content-center";

        return (
            <div className={optionPageClass}>
                <Image src={promo}></Image>
                <CardGeneralSettings />
                <CardAbout />
            </div >
        );
    }
}

export default OptionPage;
