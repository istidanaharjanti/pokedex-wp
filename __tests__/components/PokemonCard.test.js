import { shallow } from 'enzyme';
import React from 'react';
import { Card } from "react-bootstrap";

import PokemonCard from '../../components/PokemonCard.js'

describe('PokemonCard component', () => {
  let component;
  const _spies = {};

  beforeEach(() => {
    const props = {
      name: 'pikachu',
      image: 'https://test.com',
      showModal: _spies.onClick = jest.fn()
    };
    component = shallow(
      <PokemonCard {...props} />,
    );
  });

  test('component exist', () => {
    expect(component.length).toBe(1);
  });

  test('component can be clicked to show modal', () => {
    component.find(Card).simulate('click');
    expect(_spies.onClick).toBeCalled();
  });

  test('component should render props image', () => {
    expect(component.props().children.props.children[0].props.src).toEqual('https://test.com');
  });

  test('component should render props name', () => {
    expect(component.props().children.props.children[1].props.children.props.children).toEqual('pikachu');
  });
})