import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";

export default function AllUsers() {
  const { getAllUsers, deleteUser } = useContext(MyContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      setUsers(users.filter(user => user.userid !== userId));
    }
  };

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Users</h1>

      {users.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">No users found.</p>
      ) : (
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user.userid}
              className="bg-[#f8e7e7cb] border border-[#a8b2a1] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-[#2e2e2e8c]"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-[#2e2e2e]">
                  <em>{user.firstname} {user.lastname}</em>
                </h2>
                <span className="text-sm text-[#a8b2a1]">{user.email}</span>
              </div>

              <p className="text-sm mb-4"><strong>Company:</strong> {user.companyname || "N/A"}</p>

              <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm ml-auto"
                  onClick={() => handleDelete(user.userid)}>
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}