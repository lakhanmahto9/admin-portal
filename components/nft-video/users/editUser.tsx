import React, { useState } from "react";
import { useEditUserMutation } from "../../../redux/api/adminApiSlice";
import { useSelector } from "react-redux";
// import { selectDarkMode } from "@/redux/slice/darkModeSlice";

interface Address {
  aboutMe: string;
  city: string;
  address: string;
  country: string;
  postalCode: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  address: Address | null;
  isBlocked: boolean;
}
interface EditUserProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editUser] = useEditUserMutation();
//   const darkModeEnabled = useSelector(selectDarkMode);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, name, email };
      await editUser(updatedUser).unwrap();
      onSave(updatedUser);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div
        className={` p-6 rounded-lg shadow-lg `}
      >
        <h2
          className={`text-xl font-semibold mb-4 `}
        >
          Edit User
        </h2>
        <div className="mb-4">
          <label
            className={`block text-sm font-bold mb-2 `}
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded `}
          />
        </div>
        <div className="mb-4">
          <label
            className={`block text-sm font-bold mb-2 `}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded `}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
