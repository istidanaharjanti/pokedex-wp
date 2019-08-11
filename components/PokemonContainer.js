import React from "react";
import {
  Container,
  Row
} from "react-bootstrap";

import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import PokemonLoadMore from "./PokemonLoadMore";
import { get } from "../utils/Axios";

class PokemonContainer extends React.Component {
  state = {
    pokemons: [],
    offset: 18,
    loadMore: false,
    modal: false,
    detail: {}
  };

  componentDidMount() {
    this.getPokemonData();
  }

  getPokemonData = async (offset = null) => {
    this.setState({ loadMore: true });
    const {
      data: { results }
    } = await get(`${process.env.BASE_URL}/pokemon`, {
      limit: 18,
      offset: offset ? this.state.offset : null
    });
    this.setState(state => {
      return {
        pokemons: state.pokemons.concat(results),
        offset: state.offset + offset,
        loadMore: false
      };
    });
  };


  renderPokemon = () => {
    const { pokemons } = this.state;
    return pokemons.map((pokemon, i) => {
      const { name, url } = pokemon;
      const parseUrl = url.split("/");
      const id = parseUrl[parseUrl.length - 2];
      const urlImage = `${process.env.BASE_IMAGE}/${id}.png`;
      return (
        <PokemonCard
          key={i}
          image={urlImage}
          name={name}
          showModal={this.handleShowModal}
        />
      );
    });
  };

  handleShowModal = async name => {
    const { data } = await get(`${process.env.BASE_URL}/pokemon/${name}`);
    this.setState({ detail: data, modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const {
      loadMore,
      modal,
      detail
    } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">{this.renderPokemon()}</Row>
        <PokemonLoadMore getData={this.getPokemonData} loadMore={loadMore} />

        <PokemonModal
          isShow={modal}
          closeModal={this.handleCloseModal}
          detail={detail}
        />
      </Container>
    );
  }
}

export default PokemonContainer;
