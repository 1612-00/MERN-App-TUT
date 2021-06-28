/* eslint-disable react/style-prop-object */
import { Modal, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // Post Context
  const { showAddPostModal, setShowAddPostModal } = useContext(PostContext);

  const closeDialog = () => {
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog} >
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
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
                aria-describedby="title-help"
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
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group>
              <Form.Control type="text" placeholder="Tutorial URL" name="url" />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          LearnIt!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPostModal;
