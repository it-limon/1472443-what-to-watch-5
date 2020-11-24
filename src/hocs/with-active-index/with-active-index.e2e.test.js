import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withActiveIndex} from "./with-active-index";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveIndex(MockComponent);

it(`Should activeIndex eq 0`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  expect(wrapper.state().activeIndex).toEqual(0);
});
