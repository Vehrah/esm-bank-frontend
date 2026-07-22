import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutButton({ children, className = "" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`w-full sm:w-auto rounded-2xl bg-red-600 py-4 px-4 font-semibold text-white transition hover:bg-red-700 ${className}`}
    >
      {children || "Logout"}
    </button>
  );
}

export default LogoutButton;