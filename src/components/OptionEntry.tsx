import * as React from "react";

class OptionEntry extends React.Component {
    constructor() {
        super(React.Component);
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-between">
                {this.props.children}
            </div>
        );
    }
}

export default OptionEntry;
