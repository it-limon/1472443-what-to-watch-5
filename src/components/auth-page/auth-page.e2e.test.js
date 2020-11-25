import React, {createRef} from "react";
import AuthPage from "./auth-page";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

const ref = createRef();

it(`AuthPage sent`, () => {
  const onSubmit = jest.fn();

  const wrapper = shallow(
      <AuthPage
        loginRef={ref}
        passwordRef={ref}
        isInvalidLogin={false}
        isInvalidPassword={false}
        onSubmit={onSubmit}
      />
  );

  const btnSubmit = wrapper.find(`button.sign-in__btn`);
  btnSubmit.simulate(`click`);

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
