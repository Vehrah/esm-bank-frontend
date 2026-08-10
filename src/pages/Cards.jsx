import { useEffect, useState } from "react";
import {
  requestVirtualCard,
  getVirtualCard,
  toggleFreezeCard,
} from "../services/authService";
import toast from "react-hot-toast";
import { FaCreditCard, FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

function Cards() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [freezing, setFreezing] = useState(false);

  useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    try {
      const res = await getVirtualCard();
      setCard(res.data);
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error("Unable to load card.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCard = async () => {
    try {
      setCreating(true);

      await requestVirtualCard();

      toast.success("Virtual card created!");

      loadCard();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to create card."
      );
    } finally {
      setCreating(false);
    }
  };

  // ================= COPY =================

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);

      toast.success(`${label} copied!`);
    } catch (err) {
      toast.error("Unable to copy.");
    }
  };

  // ================= FREEZE / UNFREEZE =================

  const handleFreezeToggle = async () => {
    try {
      setFreezing(true);

      const res = await toggleFreezeCard(card._id);

      setCard(res.data.card);

      toast.success(res.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update card status."
      );
    } finally {
      setFreezing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">

      {/* PAGE HEADER */}

      <h1 className="text-3xl font-bold dark:text-white">
        Virtual Cards
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your virtual debit card.
      </p>

      {/* NO CARD */}

      {!card ? (
        <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-slate-900">

          <FaCreditCard className="mx-auto text-6xl text-yellow-500" />

          <h2 className="mt-6 text-2xl font-bold dark:text-white">
            No Virtual Card Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Request a virtual debit card to start shopping online.
          </p>

          <button
            onClick={handleRequestCard}
            disabled={creating}
            className="mt-8 rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-slate-900 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating
              ? "Creating..."
              : "Request Virtual Card"}
          </button>

        </div>
      ) : (

        /* CARD */

        <div className="mt-10">

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 text-white shadow-2xl">

            {/* CARD TOP */}

            <div className="flex items-start justify-between">

              <div>
                <p className="font-semibold text-yellow-400">
                  ESM BANK
                </p>

                <h2 className="mt-2 text-xl">
                  Virtual Debit Card
                </h2>
              </div>

              {/* SHOW / HIDE */}

              <button
                type="button"
                onClick={() =>
                  setShowDetails((prev) => !prev)
                }
                className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                title={
                  showDetails
                    ? "Hide card details"
                    : "Show card details"
                }
              >
                {showDetails ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* CARD NUMBER */}

            <div className="mt-10 flex items-center gap-3">

              <p className="text-2xl font-mono tracking-widest">
                {showDetails
                  ? card.cardNumber
                  : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
              </p>

              {showDetails && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      card.cardNumber,
                      "Card number"
                    )
                  }
                  className="rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                  title="Copy card number"
                >
                  <FaCopy />
                </button>
              )}

            </div>

            {/* EXPIRY + CVV */}

            <div className="mt-10 flex justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Expires
                </p>

                <div className="mt-1 flex items-center gap-2">

                  <h3 className="font-medium">
                    {showDetails
                      ? card.expiry
                      : "••/••"}
                  </h3>

                  {showDetails && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          card.expiry,
                          "Expiry"
                        )
                      }
                      className="rounded p-1 text-slate-400 hover:text-white"
                      title="Copy expiry"
                    >
                      <FaCopy />
                    </button>
                  )}

                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  CVV
                </p>

                <div className="mt-1 flex items-center gap-2">

                  <h3>
                    {showDetails
                      ? card.cvv
                      : "•••"}
                  </h3>

                  {showDetails && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          card.cvv,
                          "CVV"
                        )
                      }
                      className="rounded p-1 text-slate-400 hover:text-white"
                      title="Copy CVV"
                    >
                      <FaCopy />
                    </button>
                  )}

                </div>
              </div>

            </div>

          </div>

          {/* CARD STATUS + CONTROLS */}

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* STATUS */}

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Card Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span
                    className={`h-3 w-3 rounded-full ${
                      card.isFrozen
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  />

                  <span
                    className={`font-semibold ${
                      card.isFrozen
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {card.isFrozen
                      ? "Frozen"
                      : "Active"}
                  </span>

                </div>
              </div>

              {/* FREEZE BUTTON */}

              <button
                type="button"
                onClick={handleFreezeToggle}
                disabled={freezing}
                className={`rounded-xl px-6 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  card.isFrozen
                    ? "bg-green-500 text-white hover:bg-green-400"
                    : "bg-red-500 text-white hover:bg-red-400"
                }`}
              >
                {freezing
                  ? "Updating..."
                  : card.isFrozen
                  ? "Unfreeze Card"
                  : "Freeze Card"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cards;