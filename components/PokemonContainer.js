import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  FormControl,
  Button,
  Spinner
} from "react-bootstrap";

import PokemonFilter from "./PokemonFilter";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import PokemonLoadMore from "./PokemonLoadMore";
import { get } from "../utils/Axios";

class PokemonContainer extends React.Component {
  state = {
    pokemons: [],
    types: [],
    type: "all",
    search: "",
    searching: false,
    offset: 18,
    loadMore: false,
    modal: false,
    detail: {}
  };

  componentDidMount() {
    this.getPokemonData();
    this.getPokemonType();
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

  getPokemonType = async () => {
    const {
      data: { results }
    } = await get(`${process.env.BASE_URL}/type`);
    this.setState({ types: results });
  };

  setPokemonType = async evt => {
    const value = evt.target.value;
    this.setState({ type: value, search: "" });
    if (value !== "all") {
      const {
        data: { pokemon }
      } = await get(`${process.env.BASE_URL}/type/${value}`);
      const pokemons = pokemon.reduce((result, current) => {
        result.push(current.pokemon);
        return result;
      }, []);
      this.setState({ pokemons });
    } else {
      this.setState({ pokemons: [] });
      this.getPokemonData();
    }
  };

  setSearch = evt => {
    this.setState({ search: evt.target.value });
  };

  searchPokemon = async () => {
    const search = this.state.search;
    if (search !== "") {
      this.setState({ searching: true });
      get(`${process.env.BASE_URL}/pokemon/${search.toLowerCase()}`)
        .then(({ data }) => {
          this.setState({
            pokemons: [{ name: data.name, url: data.species.url }]
          });
        })
        .catch(err => {
          alert("Not Found");
        });
    } else {
      this.setState({ pokemons: [], searching: false });
      this.getPokemonData();
    }
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
      detail,
      types,
      type,
      search,
      searching
    } = this.state;

    return (
      <Container>
        <PokemonFilter
          filterType={this.setPokemonType}
          types={types}
          handleSearch={this.setSearch}
          onSearch={this.searchPokemon}
          search={search}
        />
        <Row className="justify-content-md-center">{this.renderPokemon()}</Row>
        {type === "all" && !searching ? (
          <PokemonLoadMore getData={this.getPokemonData} loadMore={loadMore} />
        ) : (
          ""
        )}

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
