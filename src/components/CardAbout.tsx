import * as React from "react";
import Card from "./Card";
import OptionEntry from "./OptionEntry";
import LinkItem from "./LinkItem";
import TextItem from "./TextItem";
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
            <Card title={OPTIONS_ABOUT_CARD_TITLE}>
                <OptionEntry>
                    <TextItem textTitle={OPTIONS_ABOUT_VERSION_TITLE} ></TextItem>
                    <TextItem textTitle={chrome.runtime.getManifest().version} ></TextItem>
                </OptionEntry>
                <OptionEntry>
                    <TextItem textTitle={OPTIONS_ABOUT_TEAM_TITLE} ></TextItem>
                    <LinkItem redirectUrl={OPTIONS_ABOUT_TEAM_LINK_GOOGLE_GROUP} >
                        <TextItem textTitle={OPTIONS_ABOUT_TEAM_NAME} ></TextItem>
                    </LinkItem>
                </OptionEntry>
                <OptionEntry>
                    <TextItem textTitle={OPTIONS_ABOUT_HOMEPAGE_TITLE} ></TextItem>
                    <LinkItem redirectUrl={OPTIONS_ABOUT_TEAM_LINK_GITHUB} >
                        <GithubIcon />
                    </LinkItem>
                </OptionEntry>
            </Card>
        );
    }
}

export default CardAbout;
