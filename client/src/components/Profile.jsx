import { User } from "lucide-react";

export default function Profile({userData}) {

  if(!userData){
    return <div>Loading.....</div> // if no data there
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Profile</h1>
      <div className="flex items-center space-x-4">
        <User size={60} className="text-gray-500" />
        <div>
          <h2 className="text-lg font-semibold text-gray-600">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">{userData.device_id}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-600">Details</h3>
        <p className="text-gray-600"><strong>Phone:</strong> {userData.phone_num}</p>
        <p className="text-gray-600"><strong>Relation Number:</strong> {userData.relative_num}</p>
       
      </div>
    </div>
  );
}
