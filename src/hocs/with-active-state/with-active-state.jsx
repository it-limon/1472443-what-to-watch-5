import React, {PureComponent} from "react";

export const withActiveState = (Component) => {
  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this._handleActiveStateChange = this._handleActiveStateChange.bind(this);
    }

    _handleActiveStateChange(state) {
      this.setState({isActive: state});
    }

    render() {
      return (
        <Component
          {...this.props}
          isActive={this.state.isActive}
          onChangeActiveState={this._handleActiveStateChange}
        />
      );
    }
  }

  return WithActiveState;
};
