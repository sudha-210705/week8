import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

function User() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    dateofBirth: user?.dateofBirth?.split("T")[0] || "",
    mobileNumber: user?.mobileNumber || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE
  const updateUser = async () => {
    try {
      await axios.put(
        // `https://week-8-userapp.onrender.com/user-api/users/${user._id}`,
        formData
      );

      alert("User updated successfully");

      navigate("/userlist", { state: { refresh: true } }); // 🔥 FIX
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // DELETE
 const deleteUser = async () => {
  try {
    await axios.patch(
       `http://localhost:4000/user-api/users/${user._id}`
    );

    alert("User deleted");

    window.location.href = "/userlist"; // 🔥 HARD REFRESH
  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">User Details</h2>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input
            type="date"
            name="dateofBirth"
            value={formData.dateofBirth}
            onChange={handleChange}
          />
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          <button
            onClick={updateUser}
            className="bg-green-500 text-white p-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>DOB: {user?.dateofBirth}</p>
          <p>Mobile: {user?.mobileNumber}</p>
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-yellow-500 text-white p-2"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>

        <button
          onClick={deleteUser}
          className="bg-red-500 text-white p-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;