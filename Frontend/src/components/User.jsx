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
      const payload = {
        ...formData,
        mobileNumber: formData.mobileNumber ? Number(formData.mobileNumber) : undefined
      };

      await axios.put(
        `https://week8-gpmu.onrender.com/user-api/users/${user._id}`,
        payload
      );

      alert("User updated successfully");
      navigate("/userlist", { state: { refresh: true } });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // DELETE
  const deleteUser = async () => {
    try {
      await axios.patch(
        `https://week8-gpmu.onrender.com/user-api/users/${user._id}`
      );

      alert("User deleted");
      window.location.href = "/userlist";
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">User Details</h2>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="date"
            name="dateofBirth"
            value={formData.dateofBirth}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="border p-2"
          />

          <button
            onClick={updateUser}
            className="bg-green-500 text-white p-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>DOB: {user?.dateofBirth?.split("T")[0]}</p>
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