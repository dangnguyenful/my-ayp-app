import './App.css';
import { useEffect, useState, useReducer } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyVerticallyCenteredModal from './components/modal';
import {getEmployees} from './utils/employees';

const employeesArrays = [];
const changeEmployees = (currentEmployeesArray, updateInformation) => {
  const employeeId = updateInformation.id;
  const newArrayEmployee = currentEmployeesArray.filter(item => item.id !== employeeId);
  newArrayEmployee.push(updateInformation);
  newArrayEmployee.sort((a, b) => (a.id > b.id) ? 1 : -1);
  return newArrayEmployee;
}
function changeEmployeesArray(employees, action) {
  switch (action.type) {
    case 'fetchFromServer':
      return [...[], ...action.newEmployee];
    case 'changeInformation':
      return changeEmployees(employees, action.updateInformation);
    default:
      throw new Error();
  }
}

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [informationPopup, setInformationPopup] = useState({});
  const [employees, dispatch] = useReducer(changeEmployeesArray, employeesArrays);

  const handlesubmit = (e) => {
    e.preventDefault();
    const allElement = e.target.elements;
    const id = allElement.employeeId.value;
    const name = allElement.name.value;
    const email = allElement.email.value;
    const status = allElement.status.checked;
    if (!id) return;
    setModalShow(false);
    dispatch({
      type: 'changeInformation', 
      updateInformation: { id: parseInt(id), name: name, email: email, isActive: status }
    });
  };

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
        dispatch({type: 'fetchFromServer', newEmployee: res.employees});
      }
    })
  }, []);

  return (
    <div className="App">
      <MyVerticallyCenteredModal
        show={modalShow}
        informationPopup = {informationPopup}
        handlesubmit = {handlesubmit}
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
