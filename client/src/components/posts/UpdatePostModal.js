/* eslint-disable react/style-prop-object */
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  // Post Context
  const {
    postsState: { choosedPost },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(choosedPost);

  useEffect(() => setUpdatedPost(choosedPost), [choosedPost])

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (e) =>
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });

  const closeDialog = () => {
    setShowUpdatePostModal(false);
    setUpdatedPost(choosedPost);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    closeDialog();
    setShowToast({
      show: true,
      type: success ? "success" : "danger",
      message: message,
    });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>Making progress?</Modal.Title>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={closeDialog}
        ></button>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
                value={title}
                onChange={onChangeUpdatedPostForm}
              />
              <Form.Text id="title-help" muted>
                Required
              </Form.Text>
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: "100px" }}
                name="description"
                value={description}
                onChange={onChangeUpdatedPostForm}
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tutorial URL"
                name="url"
                value={url}
                onChange={onChangeUpdatedPostForm}
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group>
              <Form.Control
                as="select"
                value={status}
                name='status'
                onChange={onChangeUpdatedPostForm}
              >
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
