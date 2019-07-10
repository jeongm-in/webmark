import * as React from "react";
import Toggle from 'react-toggle';
import "react-toggle/style.css";

export interface OptionToggleProps {
    optionLabel: string,
    toggleFor: string
}
interface OptionToggleState {
    setting: boolean,
}
interface ChromeSettingObject {
    [key: string]: any
}

class OptionToggle extends React.Component<OptionToggleProps, OptionToggleState> {
    toggleFor: string;
    optionLabel: string;
    constructor(props: OptionToggleProps) {
        super(props);
        this.state = {
            setting: true
        }
        this.optionLabel = props.optionLabel;
        this.toggleFor = props.toggleFor;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (): void => {
        let updatedState: boolean = !this.state.setting;
        let updatedSettingPair: ChromeSettingObject = {};
        updatedSettingPair[this.props.toggleFor] = updatedState;

        chrome.storage.sync.set(updatedSettingPair, (): void => {
            this.setState(
                { setting: updatedState }
            );
        }
        );
    }

    componentDidMount(): void {
        chrome.storage.sync.get(
            [this.props.toggleFor],
            (result): void => {
                let status: boolean = Object.keys(result).length !== 0 && result![this.props.toggleFor];
                this.setState(
                    { setting: status }
                );
            }
        );
    }

    className = "d-flex flex-row justify-content-between";

    render() {
        return (
            <label className={this.className}>
                <span>{this.optionLabel}</span>
                <Toggle
                    checked={this.state.setting}
                    icons={false}
                    onChange={this.handleChange} />
            </label>
        );
    }
}

export default OptionToggle;
