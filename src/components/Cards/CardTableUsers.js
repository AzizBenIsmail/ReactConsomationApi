import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllUsers,
  deleteUser,
  addNewUser,
  updateUser,
  addNewUserWithImg,
} from "../../services/apiUser";

export default function CardTable({ color }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    password: "",
    user_image: "null",
  });
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "email") {
    //   console.log("Email changed:", value);
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   setErrorMessage({
    //     ...errorMessage,
    //     email: emailRegex.test(value) ? "" : "Invalid email format",
    //   });
    // }

    setNewUser({
      ...newUser,
      [name]: value,
    });
    console.log(newUser);
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      fetchUsers();
    }, 5000); // Fetch users every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.email.includes("@")) {
        setErrorMessage({
          ...errorMessage,
          email: "Invalid email format",
        });
      }
      // Implement user addition logic here
      await addNewUser(newUser);
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      console.log("updating user:", newUser);
      // Implement user addition logic here
      await updateUser(newUser._id, newUser);
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleChangeFile = (e) => {
    setImage(e.target.files[0]);
  };
  const formData = new FormData();

  const handleAddUserWithImg = async () => {
    try {
      // Implement user addition logic here

      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("email", newUser.email);
      formData.append("age", newUser.age);
      formData.append("password", newUser.password);
      formData.append("user_image", image);

      await addNewUserWithImg(formData);
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List des utilisateur
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  First Name Last Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Age
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  roles
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Action
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5000/images/Users/${user.user_image}`}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {user.firstName} {user.lastName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.age}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">{user.roles}</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setNewUser(user);
                          console.log(user);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => handleDelete(user._id)}
                        type="button"
                      >
                        Delete
                      </button>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => handleDelete(user._id)}
                        type="button"
                      >
                        updatePassword
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          class="px-3 py-3 ml-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          value={newUser.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          class="px-3 py-3 ml-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          value={newUser.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          class="px-3 py-3 ml-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          value={newUser.email}
          onChange={handleChange}
        />
        {errorMessage.email && (
          <div class="text-red-500 text-xs italic mt-1 ml-3">
            {errorMessage.email}
          </div>
        )}
        <input
          type="number"
          name="age"
          placeholder="Age"
          class="px-3 py-3 ml-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          value={newUser.age}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          class="px-3 py-3 ml-3 mt-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          // value={newUser.password}
          onChange={handleChange}
        />
        <input
          type="file"
          name="firstName"
          placeholder="First Name"
          class="px-3 py-3 ml-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-20"
          onChange={handleChangeFile}
        />
        <button
          onClick={() => {
            handleAddUser();
          }}
          class="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-2"
          type="button"
        >
          Add User
        </button>
        <button
          onClick={() => {
            handleAddUserWithImg();
          }}
          class="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-2"
          type="button"
        >
          Add User With Img
        </button>
        <button
          onClick={() => {
            handleUpdateUser();
          }}
          class="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-2"
          type="button"
        >
          Update User
        </button>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
