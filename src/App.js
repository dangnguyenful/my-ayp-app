import './App.css';
import { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'

function App() {
  const [employees, setEmployees] = useState([]);
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

  useEffect(() => {
    getEmployees().then((res) => {
      if (res && res.employees) {
        setEmployees(...[], res.employees);
      }
    })
  }, []);

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
      Header: props => <span>Friend Age</span>
    }
  ];

  return (
    <div className="App">
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
