import * as React from "react";

export interface TextProps {
    textTitle: string,
    buttonLink: string,
    buttonImageUrl: string,
}

class LinkField extends React.Component<TextProps> {
    textTitle: string;
    buttonLink: string;
    buttonImageUrl: string;

    constructor(props: TextProps) {
        super(props);
        this.textTitle = props.textTitle;
        this.buttonLink = props.buttonLink;
        this.buttonImageUrl = props.buttonImageUrl;
    }

    iconStyle = {
        width: '18px',
        height: '18px'
    } as React.CSSProperties;

    render() {
        return (
            <div className="d-flex flex-row justify-content-between">
                <label>
                    {this.textTitle}
                </label>
                <a href={this.buttonLink}>
                    <img style={this.iconStyle} src={this.buttonImageUrl}></img>
                </a>
            </div>
        );
    }
}

export default LinkField;
