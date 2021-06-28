/* eslint-disable react/style-prop-object */
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // Post Context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const closeDialog = () => {
    setShowAddPostModal(false);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    closeDialog();
    setShowToast({show: true, type: success ? 'success' : 'danger', message: message})
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
                onChange={onChangeNewPostForm}
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
                onChange={onChangeNewPostForm}
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
                onChange={onChangeNewPostForm}
              />
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

export default AddPostModal;
