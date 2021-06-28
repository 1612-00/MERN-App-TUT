import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import {
  Spinner,
  Card,
  Col,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AuthContext } from "./../contexts/AuthContext";
import SinglePost from "./../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  // Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postsState: { posts, postsLoading },
    getPosts,
    setShowAddPostModal,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">LearnIt!</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open add post modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new think to lear </Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="addIcon" width="50" height="50" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
    </>
  );
};

export default Dashboard;
