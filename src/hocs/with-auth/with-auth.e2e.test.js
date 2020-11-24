import React from "react";
import {withAuth} from "./with-auth";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../const";

configure({adapter: new Adapter()});

let mockStore = null;
let store = null;

const api = createAPI(() => {}, () => {});
let middlewares = [thunk.withExtraArgument(api)];

mockStore = configureStore(middlewares);
store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }
});

const MockComponent = () => {
  return <div />;
};

const MockComponentWrapped = withAuth(MockComponent);

it(`User entered invalid username`, () => {
  
  const wrapper = shallow(
        <MockComponentWrapped
          store={store}
        />
    ).dive();

    console.log(wrapper.dive().props());
  //wrapper.props().loginRef.current.simulate(`change`, { target: { value: `asd` } });

  //const form = wrapper.find(`form`);
  //form.simulate(`submit`);


});
