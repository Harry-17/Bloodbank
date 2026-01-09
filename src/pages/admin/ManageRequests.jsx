import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminNavbar from "../../components/AdminNavbar";

function ManageRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/admin/requests");
    setRequests(res.data);
  };

  const approveRequest = async (id) => {
    await api.post(`/admin/approve/${id}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-8">
            Pending Blood Requests
          </h1>

          {/* CONTENT */}
          <div className="bg-white rounded-xl shadow p-6">
            {requests.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No pending blood requests at the moment.
              </p>
            ) : (
              <table className="w-full text-left">
                <thead className="border-b text-gray-600">
                  <tr>
                    <th className="py-3">Blood Group</th>
                    <th className="py-3">Units</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((r) => (
                    <tr
                      key={r._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-semibold">
                        {r.bloodGroup}
                      </td>

                      <td className="py-4">
                        {r.units}
                      </td>

                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      </td>

                      <td className="py-4">
                        <button
                          onClick={() => approveRequest(r._id)}
                          className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default ManageRequests;
