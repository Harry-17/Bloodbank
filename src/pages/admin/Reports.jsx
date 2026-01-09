import AdminNavbar from "../../components/AdminNavbar";
import { jsPDF } from "jspdf";

function Reports() {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("BloodBond – Admin System Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    doc.line(20, 35, 190, 35);

    let y = 45;

    doc.text(" System Overview", 20, y);
    y += 10;

    doc.text("Total Users: 128", 20, y);
    y += 8;

    doc.text("Total Donors: 76", 20, y);
    y += 8;

    doc.text("Total Blood Requests: 54", 20, y);
    y += 8;

    doc.text("Fulfilled Requests: 41", 20, y);
    y += 8;

    doc.text("Total Blood Units Available: 320", 20, y);
    y += 12;

    doc.line(20, y, 190, y);
    y += 10;

    doc.text(" Blood Bank Summary", 20, y);
    y += 10;

    doc.text("A+ : 60 units", 20, y);
    y += 8;
    doc.text("B+ : 45 units", 20, y);
    y += 8;
    doc.text("O+ : 120 units", 20, y);
    y += 8;
    doc.text("AB+ : 30 units", 20, y);

    y += 12;
    doc.line(20, y, 190, y);
    y += 10;

    doc.text(" Beneficiaries Summary", 20, y);
    y += 10;
    doc.text("Total Beneficiaries Served: 41", 20, y);

    y += 20;
    doc.setFontSize(10);
    doc.text(
      "This is a system-generated report from BloodBond Admin Dashboard.",
      20,
      y
    );

    doc.save("BloodBond_Admin_Report.pdf");
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">System Reports</h1>

          <button
            onClick={generatePDF}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Download PDF Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ReportCard title="Total Users" value="128" />
          <ReportCard title="Total Donors" value="76" />
          <ReportCard title="Blood Requests" value="54" />
          <ReportCard title="Blood Units" value="320" />
        </div>
      </div>
    </>
  );
}

function ReportCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:-translate-y-1 transition">
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-3xl font-bold text-red-600 mt-2">{value}</p>
    </div>
  );
}

export default Reports;
