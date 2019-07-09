import * as React from "react";
import Toggle from 'react-toggle';

export interface OptionToggleProps {
    optionLabel: string,
    id: string
}

// chrome.function.load something set value
// https://github.com/aaronshaf/react-toggle
interface OptionToggleState {
    id: string,
    loadNewTab: boolean,
    optionLabel: string
}

class OptionToggle extends React.Component<OptionToggleProps, OptionToggleState> {

    constructor(props: OptionToggleProps) {
        super(props);
        this.state = {
            loadNewTab: false,
            optionLabel: props.optionLabel,
            id: props.id
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleChange = () => {

    }


    style = {
        'white-space': 'nowrap'
    } as React.CSSProperties;

    render() {
        return (
            <div>
                <Toggle
                    id={this.state.id}
                    defaultChecked={this.state.loadNewTab}
                    onChange={this.handleChange.bind(this)} />
                <label htmlFor='cheese-status'>{this.state.optionLabel}</label>
            </div>
        );


    }
}

export default OptionToggle;
