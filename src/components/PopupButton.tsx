import * as React from "react";
import Button from 'react-bootstrap/Button';

export interface Props {
    id: string;
    text: string;
    onClick: () => void;
}

class PopupButton extends React.Component<Props> {
    id: string;
    text: string;
    onClick: () => void;

    constructor(props: Props) {
        super(props);
        this.id = props.id;
        this.text = props.text;
        this.onClick = props.onClick;
    }

    style = {
        'white-space': 'nowrap'
    } as React.CSSProperties;

    render() {
        return (
            <Button
                id={this.id}
                variant="light"
                style={this.style}
                onClick={this.onClick}
                block>
                {this.text}
            </Button>
        );
    }
}

export default PopupButton;
