import * as React from "react";

class OptionEntry extends React.Component {
    constructor() {
        super(React.Component);
    }

    className = "d-flex flex-row justify-content-between";

    render() {
        return (
            <div className={this.className}>
                {this.props.children}
            </div>
        );
    }
}

export default OptionEntry;
