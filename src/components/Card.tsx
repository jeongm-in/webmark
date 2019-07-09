import * as React from "react";
import OptionToggle from "./OptionToggle";
import * as constants from "../constants"

export interface Props {
    title: string
}

class Card extends React.Component<Props> {
    title: string;
    constructor(props: Props) {
        super(props);
        this.title = props.title;
    }

    style = {
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0px 1px 4px 0px rgba(85, 98, 112, 0.5)',
        height: 'auto',
        margin: '4em 0',
        padding: '3em',
        width: '40vw',
    } as React.CSSProperties;

    textStyle = {
        fontWeight: "bold",
    } as React.CSSProperties;

    render() {
        return (
            <div style={this.style}>
                <div style={this.textStyle}>{this.title}</div>
                <hr></hr>
                <OptionToggle toggleFor={constants.LOAD_HERE_KEY} optionLabel={constants.OPTIONS_IS_LOAD_IN_NEW_TAB}></OptionToggle>
            </div>
        );
    }
}

export default Card;
