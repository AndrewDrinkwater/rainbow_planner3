import PropTypes from "prop-types";

export default function DetailsModal({ title, details, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="space-y-1">
          {Object.entries(details).map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="font-medium">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-3 py-1 rounded border">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

DetailsModal.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
