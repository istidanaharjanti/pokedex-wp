import { shallow } from 'enzyme';
import React from 'react';

import PokemonFilter from '../../components/PokemonFilter.js'

describe('PokemonFilter component', () => {
  let component;
  const _spies = {};

  beforeEach(() => {
    const props = {
      filterType: _spies.onChange = jest.fn(),
      types: [],
      handleSearch: _spies.onChange = jest.fn(),
      onSearch: _spies.onClick = jest.fn(),
      search: ''
    };
    component = shallow(
      <PokemonFilter {...props} />,
    );
  });

  test('component exist', () => {
    expect(component.length).toBe(1);
  });
})