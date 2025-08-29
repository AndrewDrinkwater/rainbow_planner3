import { useEffect, useState } from "react";
import AddEnquiryModal from "../components/AddEnquiryModal";
import DetailsModal from "../components/DetailsModal";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const loadEnquiries = () => {
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const promote = async (id) => {
    await fetch(`/api/enquiries/${id}/promote`, { method: "POST" });
    loadEnquiries();
  };

  if (loading) return <p>Loading enquiries...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Enquiries</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Enquiry
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Enquiry Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((e) => (
            <tr key={e.id}>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() => setSelectedEnquiry(e)}
              >
                {e.name}
              </td>
              <td className="p-2 border">
                {new Date(e.dob).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                {new Date(e.enquiry_date).toLocaleDateString()}
              </td>
              <td className="p-2 border">{e.status_label}</td>
              <td className="p-2 border">
                {e.status_label !== "Promoted" && (
                  <button
                    onClick={() => promote(e.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Promote
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddEnquiryModal
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false);
            loadEnquiries();
          }}
        />
      )}

      {selectedEnquiry && (
        <DetailsModal
          title="Enquiry Details"
          details={{
            ID: selectedEnquiry.id,
            Name: selectedEnquiry.name,
            "Date of Birth": new Date(selectedEnquiry.dob).toLocaleDateString(),
            "Enquiry Date": new Date(selectedEnquiry.enquiry_date).toLocaleDateString(),
            Status: selectedEnquiry.status_label,
            "Created At": new Date(selectedEnquiry.created_at).toLocaleString(),
            "Updated At": new Date(selectedEnquiry.updated_at).toLocaleString(),
          }}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}
    </div>
  );
}
