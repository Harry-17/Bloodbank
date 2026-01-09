import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const events = [
  {
    id: 0,
    title: "Mega Blood Donation Camp",
    date: "20 Feb 2026",
    location: "AIIMS Delhi",
    city: "Delhi",
    organizer: "Red Cross Society",
  },
  {
    id: 1,
    title: "Community Blood Drive",
    date: "28 Feb 2026",
    location: "Town Hall",
    city: "Pune",
    organizer: "City Blood Bank",
  },
  {
    id: 2,
    title: "Youth Blood Donation Drive",
    date: "05 Mar 2026",
    location: "University Campus",
    city: "Bangalore",
    organizer: "NSS & Volunteers",
  },
];

function PublicEvents() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">
              Upcoming Blood Donation Drives
            </h1>
            <p className="text-gray-600">
              Participate, donate blood, and save lives
            </p>
          </div>

          {/* EVENTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow p-6 hover:-translate-y-1 transition"
              >
                <h2 className="text-xl font-bold mb-2">
                  {e.title}
                </h2>

                <p className="text-gray-600 mb-1">
                  📍 {e.location}, {e.city}
                </p>

                <p className="text-gray-600 mb-1">
                  📅 {e.date}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                  Organized by {e.organizer}
                </p>

                <Link
                  to={`/events/${e.id}`}
                  className="block text-center border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default PublicEvents;
