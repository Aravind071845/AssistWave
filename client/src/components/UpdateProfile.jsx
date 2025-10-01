import { useState } from "react";
import axios from "axios";

export default function UpdateProfile({ userData, setUserData }) {
  const [profile, setProfile] = useState({
    phone_number: userData.phone_num,
    relative_number: userData.relative_num,
  });

  // Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle form submission
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.patch('http://localhost:8081/auth/profile',profile);
      if(res.data.Status === "Success"){
        alert("Profile Updated Successfully");
       
        setUserData( (prevUser) => ({
           ...prevUser,
           phone_num: profile.phone_number,
           relative_num: profile.relative_number
        }));
      }
      else{
        alert("Error updating profile: " + res.data.error);
      }
    }
    catch(err){
      alert("Failed to update profile.Try again later.");
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Update Emergency Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name (Read-Only) */}
        <div>
          <label className="block font-semibold text-green-600">Name</label>
          <input
            type="text"
            value={userData.name}
            readOnly
            className="w-full p-2 border rounded bg-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Email (Read-Only) */}
        <div>
          <label className="block font-semibold text-green-600">Email</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Device ID (Read-Only) */}
        <div>
          <label className="block font-semibold text-green-600">Device ID</label>
          <input
            type="text"
            value={userData.device_id}
            readOnly
            className="w-full p-2 border rounded bg-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Phone Number (Editable) */}
        <div>
          <label className="block font-semibold text-green-600">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Relative's Number (Editable) */}
        <div>
          <label className="block font-semibold text-green-600">Relative's Number</label>
          <input
            type="text"
            name="relative_number"
            value={profile.relative_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
