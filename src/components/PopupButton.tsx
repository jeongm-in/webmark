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
    render() {
        return (
            <div className="popupButton">
                <Button id={this.id} variant="light" block>{this.text}</Button>
            </div>
        );
    }
}

export default PopupButton;
