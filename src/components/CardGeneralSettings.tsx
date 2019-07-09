import * as React from "react";
import Card from "./Card";
import OptionToggle from "./OptionToggle";
import { OPTIONS_GENERAL_CARD_TITLE, LOAD_HERE_KEY, OPTIONS_IS_LOAD_IN_NEW_TAB } from "../constants"

class CardGeneralSettings extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <Card title={OPTIONS_GENERAL_CARD_TITLE}>
                <OptionToggle toggleFor={LOAD_HERE_KEY} optionLabel={OPTIONS_IS_LOAD_IN_NEW_TAB}></OptionToggle>
            </Card>
        );
    }
}

export default CardGeneralSettings;
