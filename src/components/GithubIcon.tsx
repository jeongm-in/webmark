import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    IconLookup,
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core'

library.add(faGithub);

class GithubIcon extends React.Component {

    constructor() {
        super(React.Component);
    }

    iconStyle = {
        width: '18px',
        height: '18px',
        color: '#000'
    } as React.CSSProperties;

    render() {
        const githubLookup: IconLookup = { prefix: 'fab', iconName: 'github' }
        const githubIconDefinition: IconDefinition = findIconDefinition(githubLookup)
        return (
            <FontAwesomeIcon icon={githubIconDefinition} style={this.iconStyle} />
        );
    }
}

export default GithubIcon;
