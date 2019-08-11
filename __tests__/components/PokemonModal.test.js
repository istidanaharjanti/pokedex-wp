import { shallow } from 'enzyme';
import React from 'react';
import { Modal } from "react-bootstrap";

import PokemonModal from '../../components/PokemonModal.js';

describe('PokemonModal component', () => {
  let component;
  const _spies = {};

  beforeEach(() => {
    const props = {
      isShow: true,
      closeModal: _spies.onHide = jest.fn(),
      detail: {
        id: 2,
        name: 'fighting',
        types: [
          {
            slot: 2,
            type: {
              name: 'fighting',
              url: 'https://yelah.com'
            }
          },
          {
            slot: 1,
            type: {
              name: 'grass',
              url: 'https://hih.com'
            }
          }
        ],
        stats: [
          {
            base_stat: 80,
            effort: 0,
            stat: {
              name: 'speed',
              url: 'https://lalala.test'
            }
          },
          {
            base_stat: 100,
            effort: 1,
            stat: {
              name: 'special-defense',
              url: 'https://lilili.test'
            }
          }
        ],
        height: 20,
        weight: 1000,
        base_experience: 236,
        abilities: [
          {
            is_hidden: true,
            slot: 3,
            ability: {
              name: 'chlorophyll',
              url: 'https://pokeapi.co/api/v2/ability/34/'
            }
          }
        ],
        moves: [
          {
            move: {
              name: 'swords-dance',
              url: 'https://pokeapi.co/api/v2/move/14/'
            },
            version_group_details: {}
          },
          {
            move: {
              name: 'cut',
              url: 'https://pokeapi.co/api/v2/move/1/'
            },
            version_group_details: {}
          }
        ]
      }
    };
    component = shallow(
      <PokemonModal {...props} />,
    );
  });

  test('Component exist', () => {
    expect(component.length).toBe(1);
  });

  // test('onClose', () => {
  //   component.find(Modal).simulate('click');
  //   expect(_spies.onHide).toBeCalled();
  // });
})