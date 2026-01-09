import { useParams, Link } from "react-router-dom";
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
    description:
      "A large-scale blood donation camp aimed at helping hospitals maintain adequate blood supply.",
    donorsExpected: 300,
    timing: "9:00 AM – 5:00 PM",
  },
  {
    id: 1,
    title: "Community Blood Drive",
    date: "28 Feb 2026",
    location: "Town Hall",
    city: "Pune",
    organizer: "City Blood Bank",
    description:
      "Community-led initiative encouraging voluntary blood donation.",

    timing: "10:00 AM – 4:00 PM",
  },
  {
    id: 2,
    title: "Youth Blood Donation Drive",
    date: "05 Mar 2026",
    location: "University Campus",
    city: "Bangalore",
    organizer: "NSS & Volunteers",
    description:
      "A youth-driven donation drive promoting awareness and participation among students.",
    donorsExpected: 200,
    timing: "8:00 AM – 2:00 PM",
  },
];

function PublicEventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <p className="p-8">Event not found</p>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          <Link to="/events" className="text-red-600 hover:underline">
            ← Back to Events
          </Link>

          <h1 className="text-4xl font-bold mt-4 mb-2">
            {event.title}
          </h1>

          <p className="text-gray-600 mb-6">
            📍 {event.location}, {event.city} • 📅 {event.date}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard label="Organizer" value={event.organizer} />
            <InfoCard label="Timing" value={event.timing} />
            <InfoCard label="Expected Donors" value={event.donorsExpected} />
          </div>

          {/* DESCRIPTION */}
          <h2 className="text-xl font-semibold mb-2">
            About This Event
          </h2>
          <p className="text-gray-700 mb-8">
            {event.description}
          </p>

          {/* CTA */}
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
            I Want to Participate
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-red-50 rounded-xl p-6 text-center">
      <p className="text-gray-600">{label}</p>
      <p className="text-lg font-bold text-red-600 mt-2">
        {value}
      </p>
    </div>
  );
}

export default PublicEventDetails;
