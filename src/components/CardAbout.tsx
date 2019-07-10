import * as React from "react";
import Card from "./Card";
import OptionEntry from "./OptionEntry";
import LinkItem from "./LinkItem";
import GithubIcon from "./GithubIcon";
import {
    OPTIONS_ABOUT_CARD_TITLE, OPTIONS_ABOUT_VERSION_TITLE,
    OPTIONS_ABOUT_TEAM_TITLE, OPTIONS_ABOUT_TEAM_NAME, OPTIONS_ABOUT_HOMEPAGE_TITLE,
    OPTIONS_ABOUT_TEAM_LINK_GITHUB, OPTIONS_ABOUT_TEAM_LINK_GOOGLE_GROUP
} from "../constants"

class CardAbout extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <Card textTitle={OPTIONS_ABOUT_CARD_TITLE}>
                <OptionEntry>
                    <p>{OPTIONS_ABOUT_VERSION_TITLE}</p>
                    <p>{chrome.runtime.getManifest().version}</p>
                </OptionEntry>
                <OptionEntry>
                    <p>{OPTIONS_ABOUT_TEAM_TITLE}</p>
                    <LinkItem redirectUrl={OPTIONS_ABOUT_TEAM_LINK_GOOGLE_GROUP}>
                        <p>{OPTIONS_ABOUT_TEAM_NAME}</p>
                    </LinkItem>
                </OptionEntry>
                <OptionEntry>
                    <p>{OPTIONS_ABOUT_HOMEPAGE_TITLE}</p>
                    <LinkItem redirectUrl={OPTIONS_ABOUT_TEAM_LINK_GITHUB} >
                        <GithubIcon />
                    </LinkItem>
                </OptionEntry>
            </Card>
        );
    }
}

export default CardAbout;
