import * as React from "react";
import Card from "./Card";
import TextField from "./TitleField";
import LinkField from "./LinkField";

import {
    OPTIONS_ABOUT_CARD_TITLE, OPTIONS_ABOUT_VERSION_TITLE,
    OPTIONS_ABOUT_TEAM_TITLE, OPTIONS_ABOUT_TEAM_CONTENT,
    OPTIONS_ABOUT_TEAM_LINK_TITLE, OPTIONS_ABOUT_TEAM_LINK_CONTENT
} from "../constants"

class CardAbout extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <Card title={OPTIONS_ABOUT_CARD_TITLE}>
                <TextField textTitle={OPTIONS_ABOUT_VERSION_TITLE} textContent={chrome.runtime.getManifest().version}></TextField>
                <TextField textTitle={OPTIONS_ABOUT_TEAM_TITLE} textContent={OPTIONS_ABOUT_TEAM_CONTENT}></TextField>
                <LinkField textTitle={OPTIONS_ABOUT_TEAM_LINK_TITLE} buttonLink={OPTIONS_ABOUT_TEAM_LINK_CONTENT} buttonImageUrl="./images/GitHub-Mark-64px.png"></LinkField>
            </Card>
        );
    }
}

export default CardAbout;
