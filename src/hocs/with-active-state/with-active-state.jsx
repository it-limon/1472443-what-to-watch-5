import React, {PureComponent} from "react";

const MOUSE_ENTER_DELAY = 1000;

export const withActiveState = (Component) => {
  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this.timer = null;
      this._handleActiveStateChange = this._handleActiveStateChange.bind(this);
    }

    _handleActiveStateChange(state) {
      if (state) {
        this.timer = setTimeout(() => this.setState({isActive: state}), MOUSE_ENTER_DELAY);
      } else {
        clearTimeout(this.timer);
        this.setState({isActive: state});
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
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
