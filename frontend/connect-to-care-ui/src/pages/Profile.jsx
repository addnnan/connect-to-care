import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-transparent dark:bg-slate-900 dark:border-slate-800">

        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-4xl font-bold dark:bg-emerald-600">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {user?.name}
          </h2>

          <p className="text-gray-500 dark:text-slate-400">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition dark:bg-red-600 dark:hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}