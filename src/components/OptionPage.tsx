import * as React from "react";
import ImageItem from "./ImageItem";
import CardGeneralSettings from "./CardGeneralSettings";
import CardAbout from "./CardAbout";

class OptionPage extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center">
                <ImageItem image="./images/promo.png"></ImageItem>
                <CardGeneralSettings />
                <CardAbout />
            </div>
        );
    }
}

export default OptionPage;
