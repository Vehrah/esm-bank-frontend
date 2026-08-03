import { useEffect, useState } from "react";
import {
  requestVirtualCard,
  getVirtualCard,
} from "../services/authService";
import toast from "react-hot-toast";
import { FaCreditCard } from "react-icons/fa";

function Cards() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

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

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-10">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold dark:text-white">
          Virtual Cards
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your virtual debit card.
        </p>

        {!card ? (
          <div className="mt-10 rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-xl text-center">

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
              className="mt-8 rounded-xl bg-yellow-500 px-8 py-4 font-semibold hover:bg-yellow-400"
            >
              {creating
                ? "Creating..."
                : "Request Virtual Card"}
            </button>

          </div>
        ) : (
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 text-white shadow-2xl">

            <p className="text-yellow-400 font-semibold">
              ESM BANK
            </p>

            <h2 className="mt-2 text-xl">
              Virtual Debit Card
            </h2>

            <p className="mt-10 text-2xl font-mono tracking-wide">
              {card.cardNumber}
            </p>

            <div className="mt-10 flex justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Expires
                </p>

                <h3>{card.expiry}</h3>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  CVV
                </p>

                <h3>{card.cvv}</h3>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cards;