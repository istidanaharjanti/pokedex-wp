import { Col, Card } from "react-bootstrap";

const PokemonCard = props => (
  <Col xs={6} md={2}>
    <Card onClick={() => props.showModal(props.name)}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Text>{props.name}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default PokemonCard;
