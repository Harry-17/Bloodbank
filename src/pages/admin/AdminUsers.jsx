import AdminNavbar from "../../components/AdminNavbar";

const mockUsers = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
  { name: "City Blood Bank", email: "bank@gmail.com", role: "Blood Bank" },
  { name: "Admin", email: "admin@gmail.com", role: "Admin" },
];

function AdminUsers() {
  return (
    <>
      <AdminNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Users</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3">{u.name}</td>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3 font-semibold">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
