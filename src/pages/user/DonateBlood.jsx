import Navbar from "../../components/Navbar";

function DonateBlood() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-center mb-6">
            Donate Blood
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Fill in your details and become a registered blood donor.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Age"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <select className="w-full border px-4 py-2 rounded-lg">
              <option>Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg}>{bg}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="City"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Register as Donor
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DonateBlood;
