import * as React from "react";
import OptionToggle from "./OptionToggle";

export interface Props {
    type: string
}

class Card extends React.Component<Props> {
    type: string;
    constructor(props: Props) {
        super(props);
        this.type = props.type;
    }
    style = {
        'white-space': 'nowrap'
    } as React.CSSProperties;
    render() {
        return (
            <div>
                <OptionToggle id="loadOnNewTab" optionLabel="Load Page on New Tab"></OptionToggle>
            </div>
        );



    }
}

export default Card;
