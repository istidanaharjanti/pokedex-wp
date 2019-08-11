import React from "react";
import {
  Modal,
  Row,
  Col,
  Image,
  Badge,
  ProgressBar,
  Container,
  ListGroup
} from "react-bootstrap";

class PokemonModal extends React.Component {
  renderType(types) {
    return types.map(data => {
      const type = data.type.name;

      return (
        <Badge key={type} variant={type}>
          {type}
        </Badge>
      );
    });
  }

  renderStats(stats) {
    return stats.reverse().map(data => {
      return (
        <Row key={data.stat.name} style={{ marginRight: "10px" }}>
          <Col xs={6} md={5} style={{ textTransform: "capitalize" }}>
            {data.stat.name}
          </Col>
          <Col xs={6} md={7}>
            <ProgressBar now={data.base_stat} label={data.base_stat} />
          </Col>
        </Row>
      );
    });
  }

  renderMoves(moves) {
    return moves.map(data => {
      return (
        <ListGroup.Item
          key={data.move.name}
          variant="primary"
          style={{ textTransform: "capitalize" }}
        >
          {data.move.name}
        </ListGroup.Item>
      );
    });
  }

  render() {
    const { isShow, closeModal, detail } = this.props;
    const {
      id,
      name,
      types = [],
      stats = [],
      height,
      weight,
      base_experience,
      abilities = [],
      moves = []
    } = detail;
    const listAbilities = abilities.reduce((result, current) => {
      result.push(current.ability.name);
      return result;
    }, []);

    return (
      <Modal
        show={isShow}
        size="lg"
        onHide={() => closeModal()}
        centered
        dialogClassName="modal-size"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`#${id} ${name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={4} style={{ textAlign: "center" }}>
              <Image
                fluid
                src={`${process.env.BASE_IMAGE}/${id}.png`}
                rounded
              />
            </Col>
            <Col xs={12} md={8}>
              <div style={{ marginBottom: "20px" }}>
                {this.renderType(types)}
              </div>
              {this.renderStats(stats)}
            </Col>
          </Row>

          <Container>
            <h5>Profile</h5>
            <Row>
              <Col xs={6} md={4}>
                <label className="profile">Height:</label>
              </Col>
              <Col xs={6} md={8}>{`${height} m`}</Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <label className="profile">Base Experience:</label>
              </Col>
              <Col xs={6} md={8}>
                {base_experience}
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <label className="profile">Weight:</label>
              </Col>
              <Col xs={6} md={8}>{`${weight} Kg`}</Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <label className="profile">Abilities:</label>
              </Col>
              <Col xs={6} md={8} style={{ textTransform: "capitalize" }}>
                {listAbilities.join(", ")}
              </Col>
            </Row>
          </Container>

          <Container>
            <h5>Moves</h5>
            <ListGroup>{this.renderMoves(moves)}</ListGroup>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PokemonModal;
