import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import EmployeeTable from "./EmployeeTable";
import ConfirmationModal from "./ConfirmationModal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("employees")
      .select("*");

    if (error) {
      console.error("Error fetching employees:", error);
    } else {
      setEmployees(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSuspendClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const confirmSuspend = async () => {
    if (!selectedEmployee) return;

    const newStatus =
      selectedEmployee.status === "active"
        ? "suspended"
        : "active";

    const { error } = await supabase
      .from("employees")
      .update({ status: newStatus })
      .eq("id", selectedEmployee.id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      fetchEmployees();
    }

    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEdit = (employee) => {
    console.log("Edit clicked:", employee);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => emp.status === "active"
  ).length;
  const suspendedEmployees = employees.filter(
    (emp) => emp.status === "suspended"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Employee Dashboard
      </h1>

      {/* Dashboard Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Employees</h3>
          <p style={numberStyle}>{totalEmployees}</p>
        </div>

        <div
          style={{
            ...cardStyle,
            backgroundColor: "#e6f7ff",
          }}
        >
          <h3>Active Employees</h3>
          <p style={numberStyle}>{activeEmployees}</p>
        </div>

        <div
          style={{
            ...cardStyle,
            backgroundColor: "#ffe6e6",
          }}
        >
          <h3>Suspended Employees</h3>
          <p style={numberStyle}>{suspendedEmployees}</p>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ marginTop: "20px" }}>
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onSuspend={handleSuspendClick}
          isLoading={loading}
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title={
          selectedEmployee?.status === "active"
            ? "Suspend Employee"
            : "Activate Employee"
        }
        message={
          selectedEmployee
            ? `Are you sure you want to ${
                selectedEmployee.status === "active"
                  ? "suspend"
                  : "activate"
              } ${selectedEmployee.full_name}?`
            : ""
        }
        onConfirm={confirmSuspend}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
      />
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px",
  width: "260px",
  textAlign: "center",
  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
};
