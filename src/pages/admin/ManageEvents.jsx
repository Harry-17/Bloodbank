import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const events = [
  {
    id: 0,
    title: "Blood Donation Camp",
    date: "12 Oct 2024",
    location: "Delhi",
  },
  {
    id: 1,
    title: "Red Cross Drive",
    date: "25 Oct 2024",
    location: "Mumbai",
  },
];

function ManageEvents() {
  return (
    <>
      <AdminNavbar />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Community Events</h1>

        <div className="space-y-4">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{e.title}</h2>
                <p className="text-gray-600">
                  {e.location} • {e.date}
                </p>
              </div>

              <Link
                to={`/admin/events/${e.id}`}
                className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageEvents;
