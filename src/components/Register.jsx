import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message || "Registration failed");
      setLoading(false);
      return;
    }

    toast.success("Registered successfully! Please log in.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg mb-3"
        >
          {loading ? "Registering…" : "Register"}
        </button>

        <button
          type="button"
          className="w-full border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg"
          onClick={onSwitchToLogin}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
