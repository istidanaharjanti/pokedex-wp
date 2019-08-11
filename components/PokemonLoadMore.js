import { Button, Spinner } from "react-bootstrap";

const PokemonLoadMore = props => (
  <Button onClick={() => props.getData(18)} disabled={props.loadMore}>
    {props.loadMore ? (
      <div>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          style={{ marginRight: "5px" }}
        />
        Loading
      </div>
    ) : (
      "Load More"
    )}
  </Button>
);

export default PokemonLoadMore;
