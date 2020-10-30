import React, {PureComponent} from "react";

export const withActiveIndex = (Component) => {
  class WithActiveIndex extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeIndex: 0
      };

      this._handleActiveIndexChange = this._handleActiveIndexChange.bind(this);
    }

    _handleActiveIndexChange(index) {
      this.setState({activeIndex: index});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeIndex={this.state.activeIndex}
          onChangeActiveIndex={this._handleActiveIndexChange}
        />
      );
    }
  }

  return WithActiveIndex;
};
