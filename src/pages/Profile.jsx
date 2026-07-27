import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(
    user?.profilePicture || ""
  );
  const [uploading, setUploading] = useState(false);

  
  const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setPhoto(file);
  setPreview(URL.createObjectURL(file));
};

  const uploadPhoto = async () => {
    if (!photo) {
      return toast.error("Please choose an image.");
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("photo", photo);

      const res = await API.put(
        "/account/profile/photo",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setUser({
        ...user,
        profilePicture:
          res.data.profilePicture,
      });

      setPreview(res.data.profilePicture);

      toast.success(
        "Profile picture updated."
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white py-10 px-4">

      <div className="mx-auto max-w-4xl rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-8">

        <div className="flex flex-col items-center">

        <label
          htmlFor="profile-upload"
          className="cursor-pointer group"
        >
          <img
            src={
              preview ||
              `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`
            }
            alt="Profile"
            className="h-40 w-40 rounded-full border-4 border-yellow-500 object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
          />
        </label>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <label
          htmlFor="profile-upload"
          className="mt-5 cursor-pointer rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          Change Photo
        </label>

        <button
          type="button"
          onClick={uploadPhoto}
          disabled={uploading}
          className="mt-4 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Save Photo"}
        </button>

        <h1 className="mt-8 text-3xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>

        <p className="text-slate-500 dark:text-slate-400">
          {user?.email}
        </p>

  </div>

        </div>

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
                ? `${user.bvn.slice(
                    0,
                    3
                  )}******${user.bvn.slice(-2)}`
                : "-"
            }
          />

        </div>

      </div>
    </div>
  );
}

function ProfileItem({
  title,
  value,
}) {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-slate-800 p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value || "-"}
      </p>
    </div>
  );
}

export default Profile;