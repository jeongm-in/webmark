import * as React from "react";

class OptionEntry extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        let optionEntryClass = "d-flex flex-row justify-content-between";

        return (
            <div className={optionEntryClass}>
                {this.props.children}
            </div>
        );
    }
}

export default OptionEntry;
