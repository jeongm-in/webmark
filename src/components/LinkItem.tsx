import * as React from "react";


export interface TextProps {
    redirectUrl: string,
}

class LinkItem extends React.Component<TextProps> {
    redirectUrl: string;

    constructor(props: TextProps) {
        super(props);
        this.redirectUrl = props.redirectUrl;
    }

    render() {
        return (
            <a href={this.redirectUrl} >
                {this.props.children}
            </a>
        );
    }
}

export default LinkItem;
