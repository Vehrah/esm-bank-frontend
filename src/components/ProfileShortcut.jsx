import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProfileShortcut() {
  const { user } = useAuth();

  return (
    <div className="flex justify-end">
      <Link
        to="/profile"
        className="flex items-center gap-3 rounded-full bg-white dark:bg-slate-900 px-4 py-2 shadow-lg transition hover:bg-gray-100 dark:hover:bg-slate-800"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-slate-900">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </div>

        <div className="hidden md:block">
          <p className="font-semibold text-slate-900 dark:text-white">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            View Profile
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProfileShortcut;