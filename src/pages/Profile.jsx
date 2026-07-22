import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your account information.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <ProfileItem
            title="First Name"
            value={user?.firstName}
          />

          <ProfileItem
            title="Last Name"
            value={user?.lastName}
          />

          <ProfileItem
            title="Email"
            value={user?.email}
          />

          <ProfileItem
            title="Account Number"
            value={user?.accountNumber}
          />

          <ProfileItem
            title="Balance"
            value={`$${user?.balance?.toLocaleString()}`}
          />

          <ProfileItem
            title="Currency"
            value={user?.currency}
          />

          <ProfileItem
            title="BVN"
            value={
              user?.bvn
                ? `${user.bvn.slice(0,3)}******${user.bvn.slice(-2)}`
                : ""
            }
          />

        </div>
      </div>
    </div>
  );
}

function ProfileItem({ title, value }) {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-slate-800 p-5">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}

export default Profile;