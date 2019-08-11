import React from "react";
import {
  Container,
  Row
} from "react-bootstrap";

import PokemonCard from "./PokemonCard";
import PokemonLoadMore from "./PokemonLoadMore";
import { get } from "../utils/Axios";

class PokemonContainer extends React.Component {
  state = {
    pokemons: [],
    offset: 18,
    loadMore: false
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
        />
      );
    });
  };

  render() {
    const {
      loadMore,
    } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">{this.renderPokemon()}</Row>
        <PokemonLoadMore getData={this.getPokemonData} loadMore={loadMore} />
      </Container>
    );
  }
}

export default PokemonContainer;
