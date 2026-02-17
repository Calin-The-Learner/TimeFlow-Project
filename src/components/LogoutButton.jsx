import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.reload(); // ensures UI refreshes
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-3 py-1 rounded-lg"
    >
      Logout
    </button>
  );
}
