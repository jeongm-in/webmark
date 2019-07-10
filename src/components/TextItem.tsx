import * as React from "react";

export interface TextProps {
    textTitle: string,
}

class TextItem extends React.Component<TextProps> {
    textTitle: string;
    constructor(props: TextProps) {
        super(props);
        this.textTitle = props.textTitle;
    }

    render() {
        return (
            <label>{this.textTitle}</label>
        );
    }
}

export default TextItem;
