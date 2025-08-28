import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-x-4">
      <Link
        to="/enquiries"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enquiries
      </Link>
      <Link
        to="/members"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Members
      </Link>
    </div>
  );
}
