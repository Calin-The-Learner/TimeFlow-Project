export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <h2 className="text-xl font-semibold text-white mb-4">
          {title}
        </h2>

        <p className="text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
