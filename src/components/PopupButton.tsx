import * as React from "react";
import Button from 'react-bootstrap/Button';

export interface Props {
    id: string;
    text: string;
}

class PopupButton extends React.Component<Props> {
    id: string;
    text: string;
    constructor(props: Props) {
        super(props);
        this.id = props.id;
        this.text = props.text;
    }
    style = {
        'white-space': 'nowrap'
    } as React.CSSProperties;
    render() {
        return <Button id={this.id} variant="light" style={this.style}
            block>{this.text}</Button>;
    }
}

export default PopupButton;
