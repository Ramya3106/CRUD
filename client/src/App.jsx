import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [Users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/Users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      setFilterUsers(res.data);
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  //Serach Function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = Users.filter(
      (User) =>
        User.name.toLowerCase().includes(searchText) ||
        User.city.toLowerCase().includes(searchText)
    );
    setFilterUsers(filteredUsers);
  };

  //Delete User Function
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/Users/$Users/${id}`)
      .then((res) => {
        setUsers(res.data);
        setFilterUsers(res.data);
      });
  };
  return (
    <>
      <div className="container">
        <h3>CURD Application with React.js Frontend and Node.js Backend</h3>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search Text Here"
            onChange={handleSearchChange}
          />
          <button className="btn green">Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers &&
              filterUsers.map((User, index) => {
                return (
                  <tr key={User.id}>
                    <td>{index + 1}</td>
                    <td>{User.name}</td>
                    <td>{User.age}</td>
                    <td>{User.city}</td>
                    <td>
                      <button className="btn green">Edit</button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete()}
                        className="btn red"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
