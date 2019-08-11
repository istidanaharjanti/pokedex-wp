import { shallow } from 'enzyme';
import React from 'react';

import PokemonContainer from '../../components/PokemonContainer'

describe('PokemonContainer component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PokemonContainer />,
    );
  });

  test('Component exist', () => {
    expect(component.length).toBe(1);
  });
})