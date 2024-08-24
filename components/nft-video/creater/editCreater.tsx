import React, { useState } from "react";
import { useEditCreatorMutation } from "../../../redux/api/adminApiSlice";
import { useSelector } from "react-redux";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface Address {
  aboutMe: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface Creator {
  _id: string;
  name: string;
  email: string;
  address: Address | null;
  isBlocked: boolean;
}

interface EditCreatorProps {
  creator: Creator;
  onSave: (creator: Creator) => void;
  onCancel: () => void;
}


const EditCreator: React.FC<EditCreatorProps> = ({
  creator,
  onSave,
  onCancel,
}) => {
  console.log(creator, "creator");
  const [name, setName] = useState(creator.name);
  const [email, setEmail] = useState(creator.email);
  const [editUser] = useEditCreatorMutation();
  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnabled);

  const handleSave = async () => {
    try {
      const updatedUser = { ...creator, name, email };
      await editUser(updatedUser).unwrap();
      onSave(updatedUser);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div
        className={` p-6 rounded-lg shadow-lg ${
          darkModeEnabled ? "bg-[#0E1A49]" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
          }`}
        >
          Edit User
        </h2>
        <div className="mb-4">
          <label
            className={`block text-sm font-bold mb-2 ${
              darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              darkModeEnabled
                ? "bg-[#0E1A49] text-[#D3D3D3] "
                : "bg-gray-50 text-gray-700"
            }`}
          />
        </div>
        <div className="mb-4">
          <label
            className={`block text-sm font-bold mb-2 ${
              darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              darkModeEnabled
                ? "bg-[#0E1A49] text-[#D3D3D3] "
                : "bg-gray-50 text-gray-700"
            }`}
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

export default EditCreator;
