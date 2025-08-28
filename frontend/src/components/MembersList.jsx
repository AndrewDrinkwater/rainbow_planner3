import { useEffect, useState } from "react";

export default function MembersList() {
  const [members, setMembers] = useState([]);
  const [exitReasons, setExitReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/members").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      }),
      fetch("/api/choices/exit_reason").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exit reasons");
        return res.json();
      }),
    ])
      .then(([membersData, exitReasonsData]) => {
        setMembers(membersData);
        setExitReasons(exitReasonsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const exitMember = async (id, reasonId) => {
    try {
      const res = await fetch(`/api/members/${id}/exit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exit_reason_id: reasonId }),
      });
      if (!res.ok) throw new Error("Exit failed");

      setMembers((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, exit_date: new Date().toISOString(), exit_reason_id: reasonId }
            : m
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading members...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-8 mb-4">Members</h2>
      {members.length === 0 ? (
        <p>No members yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Enquiry ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Join Date</th>
                <th className="p-2 border">Exit Date</th>
                <th className="p-2 border">Exit Reason ID</th>
                <th className="p-2 border">Exit Reason</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Updated</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="text-center">
                  <td className="p-2 border">{m.id}</td>
                  <td className="p-2 border">{m.enquiry_id ?? "-"}</td>
                  <td className="p-2 border">{m.name}</td>
                  <td className="p-2 border">
                    {new Date(m.dob).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(m.join_date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {m.exit_date
                      ? new Date(m.exit_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 border">{m.exit_reason_id || "-"}</td>
                  <td className="p-2 border">{m.exit_reason_label || "-"}</td>
                  <td className="p-2 border">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(m.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {!m.exit_date && (
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            e.target.value = "";
                            exitMember(m.id, val);
                          }
                        }}
                        defaultValue=""
                        className="border rounded px-2 py-1"
                      >
                        <option value="" disabled>
                          Exit...
                        </option>
                        {exitReasons.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.label}
                          </option>
                        ))}
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

