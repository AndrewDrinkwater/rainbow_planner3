import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Link
        to="/enquiries"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        Enquiries
      </Link>
      <Link
        to="/members"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
      >
        Members
      </Link>
    </div>
  );
}
