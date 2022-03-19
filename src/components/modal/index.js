import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  const { informationPopup, handlesubmit } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={e => handlesubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update employee information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">Name</Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  defaultValue={informationPopup.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2">Email</Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="email"
                  placeholder="Name"
                  defaultValue={informationPopup.email}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="status">
              <Form.Label column sm="2">Status</Form.Label>
              <Col sm="10">
                <Form.Check 
                  type="switch"
                  id="status"
                  defaultChecked={true}
                />
              </Col>
            </Form.Group>
            <input type="hidden" id="employeeId" name="employeeId" value={informationPopup.id}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="light">Close</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    )
}

export default MyVerticallyCenteredModal;
