import { shallow } from 'enzyme';
import React from 'react';
import { Button, Spinner } from "react-bootstrap";

import PokemonLoadMore from '../../components/PokemonLoadMore.js'

describe('PokemonLoadMore component', () => {
  let component;
  const _spies = {};

  beforeEach(() => {
    const props = {
      getData: _spies.onClick = jest.fn(),
      loadMore: false
    };
    component = shallow(
      <PokemonLoadMore {...props} />,
    );
  });

  test('Component exist', () => {
    expect(component.length).toBe(1);
  });

  test('Component should load more data', () => {
    component.find(Button).simulate('click');
    expect(_spies.onClick).toBeCalled();
  });

  test('Component should show spinner when loadmore props is true', () => {
    component.setProps({
      loadMore: true
    });

    const spinner = component.props().children.props.children[0];
    expect(spinner).not.toBeUndefined();
  });
})