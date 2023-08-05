"use client";

import { useMemo } from "react";
import AccountTiles from "../components/AccountTiles";
import {
  AiOutlineIdcard,
  AiOutlineSafety,
  AiOutlineCreditCard,
  AiOutlineNotification,
  AiOutlineEye,
} from "react-icons/ai";

import { TfiStatsUp } from "react-icons/tfi";

import { HiOutlineGiftTop } from "react-icons/hi2";

import { SafeUser } from "../types";

export const account = [
  {
    title: "Personal info",
    subtitle: "Provide personal details and how we can reach you",
    icon: AiOutlineIdcard,
  },
  {
    title: "Login & security",
    subtitle: "Update your password and secure your account",
    icon: AiOutlineSafety,
  },
  {
    title: "Payment & payouts",
    subtitle: "Review payments, payouts, coupons, and gift cards",
    icon: AiOutlineCreditCard,
  },
  {
    title: "Notifications",
    subtitle: "Chose notification preferences and how you want to be contacted",
    icon: AiOutlineNotification,
  },
  {
    title: "Privacy & sharing",
    subtitle:
      "Manage your personal data, connected services, and data sharing settings",
    icon: AiOutlineEye,
  },
  {
    title: "Professional hosting tools",
    subtitle:
      "Get professional tools if you manage several properties on Airbnb",
    icon: TfiStatsUp,
  },
  {
    title: "Referral credit & coupon",
    subtitle: "You have $0 referral credits and coupon. Learn more",
    icon: HiOutlineGiftTop,
  },
];

interface AccountClientProps {
  currentUser?: SafeUser | null;
}

const AccountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
  const userName = useMemo(() => {
    if (currentUser) {
      return currentUser.name;
    }
  }, [currentUser]);

  const userEmail = useMemo(() => {
    if (currentUser) {
      return currentUser.email;
    }
  }, [currentUser]);

  return (
    <div className="mx-60 mt-8 items-center justify-center">
      <div className="text-3xl font-semibold">
        <h1>Account</h1>
      </div>
      <div className="flex text-lg pt-1 pb-8">
        <div className="font-semibold">{userName}</div>
        {`, ${userEmail}`}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {account.map((item) => (
          <AccountTiles
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountClient;
