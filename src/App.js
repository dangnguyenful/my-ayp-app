import './App.css';
import { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function App() {
  const [employees, setEmployees] = useState([]);
  const [modalShow, setModalShow] = useState(false);
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
    setModalShow(true);
    console.log(props.original)
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
