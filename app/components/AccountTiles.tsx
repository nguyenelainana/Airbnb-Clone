"use client";
import { IconType } from "react-icons";

interface AccountTilesProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

const AccountTiles: React.FC<AccountTilesProps> = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div
      className="flex-col flex rounded-md box-border shadow-xl justify-left py-6 px-4 w-full
    "
    >
      <Icon className="justify-top-left" size={34} />
      <br />
      <div className=" text-left text-xl font-semibold">{title}</div>
      <div className="font-light text-neutral-500-mt-2">{subtitle}</div>
    </div>
  );
};

export default AccountTiles;
