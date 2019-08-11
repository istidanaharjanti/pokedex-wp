import React from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button
} from "react-bootstrap";

class PokemonFilter extends React.Component {
  render() {
    const { filterType, types, handleSearch, onSearch, search } = this.props;

    return (
      <Row>
        <Col xs={12} md={4}>
          <Form.Group as={Row}>
            <Form.Label column sm="6">
              Filter By Type
            </Form.Label>
            <Col sm="6">
              <Form.Control as="select" onChange={filterType}>
                <option value="all">All</option>
                {types.map((type, index) => {
                  return (
                    <option key={type.name} value={type.name}>
                      {type.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Col>
        <Col xs={12} md={8}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search Pokemon"
              value={search}
              onChange={handleSearch}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={onSearch}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

export default PokemonFilter;
