import { useEffect, useState } from "react";
import { FaCheck, FaLock, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getProfile,
  upgradeAccountTier,
} from "../services/authService";

function UpgradeAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to load account."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier, price) => {
    if (!user) return;

    if (Number(user.balance) < price) {
      toast.error(
        `You need $${price} to upgrade to ${tier}.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Upgrade to ${tier} for $${price}?\n\n` +
        `Available balance: $${Number(
          user.balance
        ).toLocaleString()}\n` +
        `Balance after upgrade: $${Number(
          user.balance - price
        ).toLocaleString()}`
    );

    if (!confirmed) return;

    try {
      setUpgrading(true);

      const res = await upgradeAccountTier({
        tier,
      });

      setUser((prev) => ({
        ...prev,
        accountTier: res.data.accountTier,
        balance: res.data.balance,
      }));

      toast.success(
        `Account upgraded to ${tier} successfully.`
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to upgrade account."
      );
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading account...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const currentTier = user.accountTier || "Basic";
  const balance = Number(user.balance || 0);

  const tiers = [
    {
      name: "Basic",
      price: 0,
      description:
        "Your starting ESM Bank account tier.",
      features: [
        "Standard account access",
        "Transfers",
        "Virtual card",
      ],
    },
    {
      name: "Gold",
      price: 10,
      description:
        "More benefits for your everyday banking.",
      features: [
        "Everything in Basic",
        "Higher account privileges",
        "Enhanced banking experience",
      ],
    },
    {
      name: "Platinum",
      price: 25,
      description:
        "Our highest account tier.",
      features: [
        "Everything in Gold",
        "Premium account privileges",
        "Highest account tier",
      ],
    },
  ];

  const tierLevel = {
    Basic: 1,
    Gold: 2,
    Platinum: 3,
  };

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Account Upgrade
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Upgrade your ESM Bank account using your available balance.
        </p>
      </div>

      {/* Current Account */}
      <div className="mt-8 rounded-3xl bg-slate-900 p-6 text-white shadow-xl">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-slate-400">
              Current account tier
            </p>

            <h2 className="mt-1 text-2xl font-bold text-yellow-400">
              {currentTier}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Available balance
            </p>

            <p className="mt-1 text-2xl font-bold">
              ${balance.toLocaleString()}
            </p>
          </div>

        </div>
      </div>

      {/* Tier Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        {tiers.map((tier) => {
          const isCurrent =
            tier.name === currentTier;

          const isAvailable =
            tierLevel[tier.name] ===
            tierLevel[currentTier] + 1;

          const isLocked =
            tierLevel[tier.name] >
            tierLevel[currentTier] + 1;

          return (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-6 shadow-xl transition ${
                isCurrent
                  ? "border-2 border-yellow-500 bg-yellow-50 dark:bg-slate-900"
                  : "bg-white dark:bg-slate-900"
              }`}
            >

              {/* Tier name */}
              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {tier.name}
                </h2>

                {isCurrent && (
                  <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-slate-900">
                    CURRENT
                  </span>
                )}

              </div>

              {/* Price */}
              <div className="mt-6">

                {tier.price === 0 ? (
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    Free
                  </p>
                ) : (
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${tier.price}
                  </p>
                )}

                {tier.price > 0 && (
                  <p className="mt-1 text-sm text-slate-500">
                    upgrade fee
                  </p>
                )}

              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {tier.description}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3">

                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <FaCheck className="text-xs" />
                    </span>

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              {/* Button */}
              <div className="mt-8">

                {isCurrent && (
                  <button
                    disabled
                    className="w-full rounded-xl bg-slate-200 py-3 font-semibold text-slate-500 dark:bg-slate-800"
                  >
                    Current Tier
                  </button>
                )}

                {isAvailable && (
                  <button
                    onClick={() =>
                      handleUpgrade(
                        tier.name,
                        tier.price
                      )
                    }
                    disabled={upgrading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-slate-900 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {upgrading
                      ? "Upgrading..."
                      : `Upgrade to ${tier.name}`}

                    {!upgrading && (
                      <FaArrowRight className="text-sm" />
                    )}
                  </button>
                )}

                {isLocked && (
                  <button
                    disabled
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-semibold text-slate-400 dark:bg-slate-800"
                  >
                    <FaLock className="text-xs" />
                    Locked
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {/* Notice */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            Upgrade policy:
          </span>{" "}
          You can only upgrade one tier at a time. Your upgrade fee
          is deducted directly from your available account balance.
        </p>

      </div>

    </div>
  );
}

export default UpgradeAccount;