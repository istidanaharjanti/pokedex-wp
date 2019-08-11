import { shallow } from 'enzyme'
import React from 'react'

import App from '../../pages/index.js'

describe('Pokedex page', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <App />,
    );
  });

  test('container exist', () => {
    expect(component.length).toBe(1);
  });
})