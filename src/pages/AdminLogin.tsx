import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_AUTH_KEY = "adminAuth";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username.trim() === ADMIN_USERNAME && password.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      navigate("/admin/orders");
      return;
    }

    setError(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-1.5 bg-gray-900" />
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6">
        <span className="text-xl font-bold text-gray-900">Admin Panel</span>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Admin Login
          </h1>

          <div className="mb-4">
            <label
              htmlFor="admin-username"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
            />
          </div>

          {error && (
            <p className="mb-4 text-sm font-medium text-red-500">
              Invalid username or password
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 px-6 py-2.5 font-medium text-white transition-colors hover:bg-gray-700"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 transition-colors hover:text-gray-800"
            >
              ← Back to Menu
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
