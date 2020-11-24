import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withActiveState} from "./with-active-state";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveState(MockComponent);

it(`Should isActive eq false`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  expect(wrapper.state().isActive).toEqual(false);
});
