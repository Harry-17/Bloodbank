import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

function BloodbankDashboard() {
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [units, setUnits] = useState("");

  const [stocks, setStocks] = useState([]);
  const [requests, setRequests] = useState([]);

  const fetchStock = async () => {
    const res = await api.get("/bloodbank/stock");
    setStocks(res.data);
  };

  const fetchRequests = async () => {
    const res = await api.get("/bloodbank/requests");
    setRequests(res.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/bloodbank/stock", { bloodGroup, units });
    setUnits("");
    fetchStock();
  };

  const fulfillRequest = async (id) => {
    await api.post(`/bloodbank/fulfill/${id}`);
    fetchStock();
    fetchRequests();
  };

  useEffect(() => {
    fetchStock();
    fetchRequests();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-8">
            Blood Bank Dashboard
          </h1>

          {/* UPDATE STOCK CARD */}
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Update Blood Stock
            </h2>

            <form
              onSubmit={submitHandler}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Units Available"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
                className="border rounded-lg px-4 py-2"
              />

              <button className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700 transition">
                Update Stock
              </button>
            </form>
          </div>

          {/* CURRENT STOCK */}
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Current Blood Stock
            </h2>

            <table className="w-full text-left">
              <thead className="text-gray-600 border-b">
                <tr>
                  <th className="py-2">Blood Group</th>
                  <th className="py-2">Units</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {stocks.map((s) => {
                  const status =
                    s.units > 5
                      ? "Available"
                      : s.units > 2
                      ? "Low"
                      : "Critical";

                  const statusColor =
                    status === "Available"
                      ? "bg-green-100 text-green-700"
                      : status === "Low"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700";

                  return (
                    <tr key={s._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{s.bloodGroup}</td>
                      <td className="py-3 font-semibold">{s.units}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${statusColor}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* APPROVED REQUESTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Approved Blood Requests
            </h2>

            {requests.length === 0 ? (
              <p className="text-gray-500">
                No approved requests at the moment.
              </p>
            ) : (
              <table className="w-full text-left">
                <thead className="text-gray-600 border-b">
                  <tr>
                    <th className="py-2">Blood Group</th>
                    <th className="py-2">Units</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((r) => (
                    <tr key={r._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{r.bloodGroup}</td>
                      <td className="py-3 font-semibold">{r.units}</td>
                      <td className="py-3">
                        <button
                          onClick={() => fulfillRequest(r._id)}
                          className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition"
                        >
                          Fulfill
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

export default BloodbankDashboard;
