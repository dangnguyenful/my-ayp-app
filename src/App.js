import './App.css';
import { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
function App() {
  const [employees, setEmployees] = useState([]);
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [informationPopup, setInformationPopup] = useState({});
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update employee information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group as={Row} className="mb-3" controlId="nameElement">
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
              <Form.Group as={Row} className="mb-3" controlId="emailElement">
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} variant="light">Close</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  const fetchEmployees = () => {
    return new Promise(resolve => {
      fetch('employees.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }).then(function(resp) {
        return resp.json();
      })
      .then(function(employees) {
        resolve(employees);
      });
    });
  }

  const getEmployees = async () => {
    return await fetchEmployees();
  }

  const updateEmployee = (e, props) => {
    e.preventDefault();
    setInformationPopup(props.original);
    setModalShow(true);
  }

  const columns = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Status',
      accessor: 'isActive',
      Cell: props => <span>{props.value ? 'ACTIVE' : 'DEACTIVATED'}</span>
    },
    {
      Header: props => <span>Action</span>,
      Cell: props => <span>
        [
          {props.original.isActive ? 
            <a href='javascript(0);' onClick={e=>updateEmployee(e, props)}>Update</a> : <span>Disabled</span>
          }
        ]
      </span>
    }
  ];

  useEffect(() => {
    getEmployees().then((res) => {
      if (res && res.employees) {
        setEmployees(...[], res.employees);
      }
    })
  }, []);

  return (
    <div className="App">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ReactTable
        data={employees}
        columns={columns}
        pageSizeOptions={[1, 10, 100, 1000]}
        defaultPageSize={1000}
      />
    </div>
  );
}

export default App;
