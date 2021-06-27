import { Card, Row, Col } from "react-bootstrap";
import ActionButton from "./ActionButton";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <div>
      <Card
        className="shadow"
        border={
          status === "LEARNED"
            ? "success"
            : status === "LEARNING"
            ? "warning"
            : "danger"
        }
      >
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>
                <p className="post-title">{title}</p>
                <span
                  className={`badge rounded-pill bg-${
                    status === "LEARNED"
                      ? "success"
                      : status === "LEARNING"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {status}
                </span>
              </Col>
              <Col className="text-right">
                <ActionButton url={url} _id={_id} />
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SinglePost;
