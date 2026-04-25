import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddUser() {
  const { register, handleSubmit, reset } = useForm();

  const onUserCreate = async (data) => {
    try {
      const payload = {
        ...data,
        mobileNumber: data.mobileNumber ? Number(data.mobileNumber) : undefined
      };

      let res = await axios.post(
        "https://week8-gpmu.onrender.com/user-api/users",
        payload
      );

      console.log(res.data);
      alert("User created successfully");
      reset();

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="text-center p-10 m-5 border-2 w-96 mx-auto">
      <h4 className="text-3xl mb-4">FORM</h4>

      <form onSubmit={handleSubmit(onUserCreate)}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 m-2 w-full"
          {...register("name", { required: true })}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 m-2 w-full"
          {...register("email", { required: true })}
        />

        <input
          type="date"
          className="border p-2 m-2 w-full"
          {...register("dateofBirth", { required: true })}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          className="border p-2 m-2 w-full"
          {...register("mobileNumber")}
        />

        <button className="border p-2 m-2 bg-blue-500 text-white w-full">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;