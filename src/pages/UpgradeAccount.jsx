import { useEffect, useState } from "react";
import {
  FaCheck,
  FaLock,
  FaArrowRight,
  FaCrown,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  upgradeAccountTier,
} from "../services/authService";

function UpgradeAccount() {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      // Keep global user information updated
      setUser(res.data);
    } catch (err) {
      console.error("Load profile error:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to load account."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier, price) => {
    if (!user || upgrading) return;

    const balance = Number(user.balance || 0);

    // Frontend check for better UX.
    // Backend must also check this.
    if (balance < price) {
      toast.error(
        `You need $${price.toLocaleString()} to upgrade to ${tier}.`
      );
      return;
    }

    const remainingBalance = balance - price;

    const confirmed = window.confirm(
      `Upgrade to ${tier} for $${price.toLocaleString()}?\n\n` +
        `Available balance: $${balance.toLocaleString()}\n` +
        `Balance after upgrade: $${remainingBalance.toLocaleString()}`
    );

    if (!confirmed) return;

    try {
      setUpgrading(true);

      const res = await upgradeAccountTier({
        tier,
      });

      /*
       * Update the global user immediately.
       *
       * This means components such as:
       * - WelcomeCard
       * - Dashboard
       * - Profile
       * - Account information
       *
       * can immediately see the new tier and balance.
       */
      setUser((prev) => ({
        ...prev,
        accountTier: res.data.accountTier,
        balance: res.data.balance,
      }));

      toast.success(
        `Account upgraded to ${tier} successfully.`
      );
    } catch (err) {
      console.error("Upgrade error:", err);

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
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
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

  /*
   * Only THREE tiers.
   *
   * Basic → Gold → Platinum
   *
   * The user can only move one level at a time.
   */
  const tiers = [
    {
      name: "Basic",
      price: 0,
      description:
        "Your starting ESM Bank account tier.",
      features: [
        "Standard account access",
        "Transfers",
        "Deposits",
        "Withdrawals",
        "Virtual card",
      ],
    },

    {
      name: "Gold",
      price: 10,
      description:
        "More flexibility and higher banking limits.",
      features: [
        "Everything in Basic",
        "Higher transfer limits",
        "Higher withdrawal limits",
        "Higher deposit limits",
        "Higher maximum balance",
      ],
    },

    {
      name: "Platinum",
      price: 25,
      description:
        "Our highest ESM Bank account tier.",
      features: [
        "Everything in Gold",
        "Highest transfer limits",
        "Highest withdrawal limits",
        "Highest deposit limits",
        "Highest maximum balance",
      ],
    },
  ];

  const tierLevel = {
    Basic: 1,
    Gold: 2,
    Platinum: 3,
  };

  const currentLevel =
    tierLevel[currentTier] || 1;

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
            <FaCrown />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Account Upgrade
          </h1>
        </div>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Upgrade your ESM Bank account using your
          available balance.
        </p>
      </div>

      {/* Current account summary */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current account tier
            </p>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentTier}
              </h2>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                TIER {currentLevel}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Available balance
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              ${balance.toLocaleString()}
            </p>
          </div>

        </div>
      </div>

      {/* Tier cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        {tiers.map((tier) => {

          const tierLevelNumber =
            tierLevel[tier.name];

          const isCurrent =
            tier.name === currentTier;

          /*
           * Only the NEXT tier can be upgraded to.
           *
           * Basic → Gold
           * Gold → Platinum
           */
          const isAvailable =
            tierLevelNumber === currentLevel + 1;

          /*
           * Anything more than one level ahead
           * remains locked.
           */
          const isLocked =
            tierLevelNumber > currentLevel + 1;

          return (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-6 shadow-lg transition ${
                isCurrent
                  ? "border-yellow-500 bg-yellow-50 dark:bg-slate-900"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              }`}
            >

              {/* Current badge */}
              {isCurrent && (
                <span className="absolute right-5 top-5 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-slate-900">
                  CURRENT
                </span>
              )}

              {/* Tier name */}
              <div className="pr-20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {tier.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Tier {tierLevelNumber}
                </p>
              </div>

              {/* Price */}
              <div className="mt-6">

                {tier.price === 0 ? (
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    Free
                  </p>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      ${tier.price}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      one-time upgrade fee
                    </p>
                  </>
                )}

              </div>

              {/* Description */}
              <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                {tier.description}
              </p>

              {/* Features */}
              <div className="mt-6 flex-1 space-y-3">

                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                      <FaCheck className="text-xs" />
                    </span>

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              {/* Action */}
              <div className="mt-8">

                {isCurrent && (
                  <button
                    disabled
                    className="w-full rounded-xl bg-slate-100 py-3 font-semibold text-slate-400 dark:bg-slate-800"
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

      {/* Policy */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            Upgrade policy:
          </span>{" "}
          You can upgrade one tier at a time. Your upgrade
          fee is deducted directly from your available account
          balance.
        </p>

      </div>

    </div>
  );
}

export default UpgradeAccount;