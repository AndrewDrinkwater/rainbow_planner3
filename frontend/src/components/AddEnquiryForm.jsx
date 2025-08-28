import { useState, useEffect } from "react";

export default function AddEnquiryModal({ onClose, onAdded }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [statusId, setStatusId] = useState("");

  useEffect(() => {
    fetch("/api/choices/enquiry_status")
      .then((res) => res.json())
      .then((data) => {
        setStatusOptions(data);
        const defaultStatus = data.find((s) => s.value === "new");
        if (defaultStatus) setStatusId(defaultStatus.id);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob, status_id: statusId }),
    });
    if (res.ok) {
      onAdded();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Add Enquiry</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <select
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {statusOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
