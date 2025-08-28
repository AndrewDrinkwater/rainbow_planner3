import { useEffect, useState } from "react";
import AddEnquiryForm from "./AddEnquiryForm";

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <AddEnquiryForm
        onAdded={(newEnquiry) =>
          setEnquiries((prev) => [newEnquiry, ...prev])
        }
      />

      <h2 className="text-xl font-bold mb-4">Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <ul className="space-y-2">
          {enquiries.map((e) => (
            <li
              key={e.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{e.name}</p>
                <p className="text-sm text-gray-600">
                  Status: {e.status_label || "Unknown"} | DOB:{" "}
                  {new Date(e.dob).toLocaleDateString()}
                </p>
              </div>
              {e.status_label !== "Promoted" && (
                <button
                  onClick={() => promote(e.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Promote
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
