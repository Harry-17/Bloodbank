import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const events = [
  {
    id: 0,
    title: "Blood Donation Camp",
    date: "12 Oct 2024",
    location: "Delhi",
    donors: 120,
    units: 340,
    summary:
      "A successful blood donation camp organized in collaboration with local hospitals and volunteers.",
  },
  {
    id: 1,
    title: "Red Cross Drive",
    date: "25 Oct 2024",
    location: "Mumbai",
    donors: 85,
    units: 210,
    summary:
      "Community-driven initiative to encourage voluntary blood donation across the city.",
  },
];

function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <p className="p-8">Event not found</p>;
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-2">
            {event.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {event.location} • {event.date}
          </p>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <HighlightCard label="Total Donors" value={event.donors} />
            <HighlightCard label="Blood Units Collected" value={event.units} />
          </div>

          {/* SUMMARY */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Event Summary
            </h2>
            <p className="text-gray-700">
              {event.summary}
            </p>
          </div>

          {/* PLACEHOLDER FOR PHOTOS */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              Event Highlights
            </h2>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              Photos & media coming soon
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function HighlightCard({ label, value }) {
  return (
    <div className="bg-red-50 rounded-xl p-6 text-center">
      <p className="text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-red-600 mt-2">
        {value}
      </p>
    </div>
  );
}

export default EventDetails;
