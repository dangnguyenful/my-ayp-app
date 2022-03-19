import './App.css';
import { useEffect } from 'react';

function App() {
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
      console.log(res);
    })
  });

  return (
    <div className="App">
      Get data
    </div>
  );
}

export default App;
