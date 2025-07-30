import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [Users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UserData, setUserData] = useState({ name: "", age: "", city: "" });

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/Users").then((res) => {
      console.log(res.data);
      setUsers(res.data.map((user) => ({ ...user, id: user.id || user._id })));
      setFilterUsers(
        res.data.map((user) => ({ ...user, id: user.id || user._id }))
      );
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      await axios.delete(`http://localhost:8000/Users/${id}`).then((res) => {
        setUsers(res.data);
        setFilterUsers(res.data);
      });
    }
  };

  //Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    getAllUsers();
  };

  //Add User Details
  const handleAddRecord = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModalOpen(true);
  };
  const handleData = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (UserData.id) {
      await axios
        .patch(`http://localhost:8000/Users/${UserData.id}`, UserData)
        .then((res) => {
          console.log(res);
        });
    } else {
      await axios.post("http://localhost:8000/Users", UserData).then((res) => {
        console.log(res);
      });
    }
    closeModal();
    setUserData({ name: "", age: "", city: "" });
  };

  //Update User Function
  const handleUpdateRecord = (User) => {
    setUserData(User);
    setIsModalOpen(true);
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
          <button className="btn green" onClick={handleAddRecord}>
            Add Record
          </button>
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
                      <button
                        className="btn green"
                        onClick={() => handleUpdateRecord(User)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(User.id)}
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
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{UserData.id ? "Update Record" : "Add Record"}</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  value={UserData.name}
                  name="name"
                  id="name"
                  onChange={handleData}
                />
              </div>
              <div className="input-group">
                <label htmlFor="number">Age</label>
                <input
                  type="text"
                  value={UserData.age}
                  name="age"
                  id="age"
                  onChange={handleData}
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  value={UserData.city}
                  name="city"
                  id="city"
                  onChange={handleData}
                />
              </div>
              <button className="btn green" onClick={handleSubmit}>
                {UserData.id ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
