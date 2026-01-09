import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import indiaStates from "../data/indiaStates";
import mockBloodBanks from "../data/mockBloodBanks";

function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const districts = state ? indiaStates[state] : [];

  const searchHandler = () => {
    const filtered = mockBloodBanks.filter(
      (b) =>
        b.state === state &&
        b.district === district &&
        b.bloodGroup === bloodGroup
    );

    setResults(filtered);
    setSearched(true);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-center mb-6">
            Find Blood Availability
          </h1>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg}>{bg}</option>
              ))}
            </select>

            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict("");
              }}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="">Select State</option>
              {Object.keys(indiaStates).map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!state}
              className="border px-4 py-2 rounded-lg disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={searchHandler}
            disabled={!state || !district}
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            Search Blood Banks
          </button>
        </div>

        {/* RESULTS */}
        {searched && (
          <div className="max-w-4xl mx-auto mt-10">
            {results.length === 0 ? (
              <p className="text-center text-gray-600">
                No blood availability found for the selected criteria.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((b, i) => (
                  <BloodBankCard key={i} bank={b} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

function BloodBankCard({ bank }) {
  const status =
    bank.units > 5 ? "Available" : bank.units > 2 ? "Low" : "Critical";

  const statusColor =
    status === "Available"
      ? "bg-green-100 text-green-700"
      : status === "Low"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{bank.name}</h2>
      <p className="text-gray-600 mt-1">
        {bank.district}, {bank.state}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">
          Units: {bank.units}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
          {status}
        </span>
      </div>

      <button className="w-full mt-4 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 transition">
        Request Blood
      </button>
    </div>
  );
}

export default FindBlood;
