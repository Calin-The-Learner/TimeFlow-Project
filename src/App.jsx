import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Employees from "./components/admin/Employees";

export default function App() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header stays horizontal */}
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-xl font-semibold">Logged in as {user.email}</h1>
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Log out
        </button>
      </header>

      {/* Main vertical content */}
      <main className="flex flex-col items-center justify-start flex-1 w-full p-6 gap-6">
        {/* Example: Clock placeholder */}
        <div className="text-6xl font-bold text-indigo-600">12:45</div>
        <div className="text-xl text-gray-700">February 16, 2026</div>

        {/* Keep Employees component exactly as is */}
        <Employees />
      </main>
    </div>
  );
}
