import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/authService";

function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);

        setSuccess(true);
        setMessage(res.data.message);
      } catch (err) {
        setSuccess(false);
        setMessage(
          err.response?.data?.message ||
            "Verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Verifying your email...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-8 rounded-2xl w-[420px] text-center">

        <h1 className="text-3xl font-bold text-white mb-6">
          {success ? "✅ Email Verified" : "❌ Verification Failed"}
        </h1>

        <p className="text-slate-300 mb-8">
          {message}
        </p>

        <Link
          to="/login"
          className="bg-yellow-500 px-6 py-3 rounded-xl font-semibold"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}

export default VerifyEmail;