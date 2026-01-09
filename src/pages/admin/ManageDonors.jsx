import AdminNavbar from "../../components/AdminNavbar";

const donors = [
  { name: "Amit Kumar", blood: "A+", city: "Delhi", donations: 3 },
  { name: "Sneha Patel", blood: "O+", city: "Ahmedabad", donations: 5 },
  { name: "Ravi Verma", blood: "B-", city: "Lucknow", donations: 2 },
];

function ManageDonors() {
  return (
    <>
      <AdminNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Registered Donors</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donors.map((d, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:-translate-y-1 transition"
            >
              <h2 className="text-xl font-bold">{d.name}</h2>
              <p className="text-gray-600">Blood Group: {d.blood}</p>
              <p className="text-gray-600">City: {d.city}</p>
              <p className="mt-2 font-semibold text-green-600">
                Donations: {d.donations}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageDonors;
