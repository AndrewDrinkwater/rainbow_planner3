import { useEffect, useState } from "react";
import AddEnquiryModal from "./AddEnquiryModal";

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadEnquiries = () => {
    fetch("/api/enquiries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch enquiries");
        return res.json();
      })
      .then((data) => {
        setEnquiries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const promote = async (id) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/promote`, { method: "POST" });
      if (!res.ok) throw new Error("Promotion failed");
      const member = await res.json();

      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      alert(`${member.name} promoted to member!`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading enquiries...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Enquiry
      </button>

      {showModal && (
        <AddEnquiryModal
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false);
            loadEnquiries();
          }}
        />
      )}

      <h2 className="text-xl font-bold mb-4">Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Enquiry Date</th>
                <th className="p-2 border">Status ID</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Updated</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="text-center">
                  <td className="p-2 border">{e.id}</td>
                  <td className="p-2 border">{e.name}</td>
                  <td className="p-2 border">
                    {new Date(e.dob).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(e.enquiry_date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{e.status_id}</td>
                  <td className="p-2 border">{e.status_label || "Unknown"}</td>
                  <td className="p-2 border">
                    {new Date(e.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(e.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {e.status_label !== "Promoted" && (
                      <select
                        defaultValue=""
                        onChange={(ev) => {
                          if (ev.target.value === "promote") {
                            ev.target.value = "";
                            if (window.confirm("Promote this enquiry?")) {
                              promote(e.id);
                            }
                          }
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="" disabled>
                          Actions
                        </option>
                        <option value="promote">Promote</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

