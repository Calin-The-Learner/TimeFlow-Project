export default function EmployeeTable({
  employees,
  onEdit,
  onSuspend,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="text-gray-400 p-6 text-center">
        Loading employees...
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="text-gray-400 p-6 text-center">
        No employees found.
      </div>
    );
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "suspended":
        return "bg-rose-500/20 text-rose-400 border border-rose-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700/60 text-gray-300 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-t border-gray-700 hover:bg-gray-700/40 transition duration-200"
              >
                {/* Name */}
                <td className="px-6 py-4 font-medium text-white">
                  {emp.full_name}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-gray-300">
                  {emp.phone_number || "-"}
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-gray-300 capitalize">
                  {emp.role}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyles(
                      emp.status
                    )}`}
                  >
                    {emp.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(emp)}
                      className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-150 shadow-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onSuspend(emp)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium active:scale-95 transition-all duration-150 shadow-md ${
                        emp.status === "active"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {emp.status === "active"
                        ? "Suspend"
                        : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
