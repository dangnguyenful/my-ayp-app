import './App.css';
import { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import MyVerticallyCenteredModal from './components/modal';
function App() {
  const [employees, setEmployees] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [informationPopup, setInformationPopup] = useState({});
  const changeEmployees = (id, information) => {
    const employeeId = parseInt(id);
    if (employees) {
      const newArrayEmployee = employees.filter(item => item.id !== employeeId);
      newArrayEmployee.push({...{id:employeeId}, ...information});
      newArrayEmployee.sort((a, b) => (a.id > b.id) ? 1 : -1)
      setEmployees(newArrayEmployee)
      setModalShow(false);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const allElement = e.target.elements;
    const id = allElement.employeeId.value;
    const name = allElement.name.value;
    const email = allElement.email.value;
    const status = allElement.status.checked;
    changeEmployees(id, {name:name, email:email, isActive:status})
  };
  
  const fetchEmployees = () => {
    return new Promise(resolve => {
      fetch('dummy-data/employees.json',{
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
            <a href='javascript(0);' onClick={e => updateEmployee(e, props)}>Update</a> : <span>Disabled</span>
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
        informationPopup = {informationPopup}
        handleSubmit = {handleSubmit}
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
