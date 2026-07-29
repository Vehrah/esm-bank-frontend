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
        <img
          src={
            user?.profilePicture ||
            `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`
          }
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover border-2 border-yellow-500"
        />

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