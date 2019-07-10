import * as React from "react";

export interface Props {
    textTitle: string
}

class Card extends React.Component<Props> {
    textTitle: string;
    constructor(props: Props) {
        super(props);
        this.textTitle = props.textTitle;
    }

    style = {
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0px 1px 4px 0px rgba(85, 98, 112, 0.5)',
        height: 'auto',
        marginTop: '2em',
        padding: '3em',
        width: '40vw',
    } as React.CSSProperties;

    textStyle = {
        fontWeight: "bold",
    } as React.CSSProperties;

    render() {
        return (
            <div style={this.style}>
                <div style={this.textStyle}>{this.textTitle}</div>
                <hr></hr>
                {this.props.children}
            </div>
        );
    }
}

export default Card;
