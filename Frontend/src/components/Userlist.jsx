import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

function Userlist() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation(); // 🔥 added

  const getUsers = async () => {
    try {
      let res = await fetch(
         "https://week8-gpmu.onrender.com/user-api/users",
        { cache: "no-store" }
      );

      let data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [state]); // 🔥 changed

  const gotoUser = (userObj) => {
    navigate("/user", { state: { user: userObj } });
  };

  return (
    <div>
      <h1 className="text-4xl mb-10">List of Users</h1>

      <div className="grid grid-cols-3 gap-6">
        {users.map((userObj) => (
          <div
            key={userObj._id}
            className="p-5 shadow-lg cursor-pointer"
            onClick={() => gotoUser(userObj)}
          >
            <p className="text-xl">{userObj.name}</p>
            <p>{userObj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userlist;