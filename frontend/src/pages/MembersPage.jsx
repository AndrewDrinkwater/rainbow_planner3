import { useEffect, useState } from "react";
import DetailsModal from "../components/DetailsModal";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  const loadMembers = () => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMembers();
  }, []);

  if (loading) return <p>Loading members...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Members</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Join Date</th>
            <th className="p-2 border">Exit</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() => setSelectedMember(m)}
              >
                {m.name}
              </td>
              <td className="p-2 border">{new Date(m.dob).toLocaleDateString()}</td>
              <td className="p-2 border">
                {new Date(m.join_date).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                {m.exit_date
                  ? `Exited (${m.exit_reason_label || "Unknown"})`
                  : "Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMember && (
        <DetailsModal
          title="Member Details"
          details={{
            ID: selectedMember.id,
            "Enquiry ID": selectedMember.enquiry_id,
            Name: selectedMember.name,
            "Date of Birth": new Date(selectedMember.dob).toLocaleDateString(),
            "Join Date": new Date(selectedMember.join_date).toLocaleDateString(),
            "Exit Date": selectedMember.exit_date
              ? new Date(selectedMember.exit_date).toLocaleDateString()
              : "N/A",
            "Exit Reason": selectedMember.exit_reason_label || "N/A",
            "Created At": new Date(selectedMember.created_at).toLocaleString(),
            "Updated At": new Date(selectedMember.updated_at).toLocaleString(),
          }}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
