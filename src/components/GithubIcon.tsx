import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
        return (
            <FontAwesomeIcon icon={faGithub} style={this.iconStyle} />
        );
    }
}

export default GithubIcon;
