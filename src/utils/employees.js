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
export const getEmployees = async () => {
  return await fetchEmployees();
}