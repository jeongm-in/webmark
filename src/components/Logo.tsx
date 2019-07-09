import * as React from "react";

export interface Props {
    image: string
}

class Logo extends React.Component<Props> {
    image: string;
    constructor(props: Props) {
        super(props);
        this.image = props.image;
    }
    style = {
        'white-space': 'nowrap'
    } as React.CSSProperties;
    
    render() {
        return (
            <img src={this.image}></img>
        );



    }
}

export default Logo;
