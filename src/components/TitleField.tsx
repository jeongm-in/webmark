import * as React from "react";

export interface TextProps {
    textTitle: string,
    textContent: string,
}

class TextField extends React.Component<TextProps> {
    textTitle: string;
    textContent: string;
    constructor(props: TextProps) {
        super(props);
        this.textTitle = props.textTitle;
        this.textContent = props.textContent;
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-between">
                <label>{this.textTitle}</label>
                <label>{this.textContent}</label>
            </div>
        );
    }
}

export default TextField;
