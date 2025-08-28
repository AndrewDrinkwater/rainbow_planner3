import { useEffect, useState } from "react";

export default function MembersList() {
  const [members, setMembers] = useState([]);
  const [exitReasons, setExitReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load members + exit reasons on mount
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

      // Update list locally
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
        <ul className="space-y-2">
          {members.map((m) => (
            <li
              key={m.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-gray-600">
                  DOB: {new Date(m.dob).toLocaleDateString()} <br />
                  Joined: {new Date(m.join_date).toLocaleDateString()} <br />
                  {m.exit_date ? (
                    <>
                      Exited: {new Date(m.exit_date).toLocaleDateString()} <br />
                      Reason: {m.exit_reason_label || "Unknown"}
                    </>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </p>
              </div>

              {!m.exit_date && (
                <select
                  onChange={(e) => exitMember(m.id, e.target.value)}
                  defaultValue=""
                  className="ml-4 border rounded px-2 py-1"
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
