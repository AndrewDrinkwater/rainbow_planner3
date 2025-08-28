import { useEffect, useState } from "react";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{new Date(m.dob).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(m.join_date).toLocaleDateString()}</td>
              <td className="p-2 border">
                {m.exit_date
                  ? `Exited (${m.exit_reason_label || "Unknown"})`
                  : "Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
