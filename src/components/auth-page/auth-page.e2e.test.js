import React from "react";
import {AuthPage} from "./auth-page";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

it(`AuthPage sent`, () => {
  const onUserLogin = jest.fn();
  const formSendPrevention = jest.fn();

  const wrapper = shallow(
      <AuthPage
        authorized={false}
        onUserLogin={onUserLogin}
      />
  );

  const btnSubmit = wrapper.find(`button.sign-in__btn`);
  btnSubmit.simulate(`click`, {
    preventDefault: formSendPrevention
  });

  expect(onUserLogin).toHaveBeenCalledTimes(0);
});
