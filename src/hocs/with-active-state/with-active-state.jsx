import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export const withActiveState = (Component) => {
  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: props.isActive,
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

  WithActiveState.defaultProps = {
    isActive: false
  };

  WithActiveState.propTypes = {
    isActive: PropTypes.bool.isRequired
  };

  return WithActiveState;
};
