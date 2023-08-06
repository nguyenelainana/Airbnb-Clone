"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal(); //hooks

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const openRegister = useCallback(() => {
    registerModal.onOpen();
    setIsOpen(false);
  }, [registerModal]);

  const openLogin = useCallback(() => {
    loginModal.onOpen();
    setIsOpen(false);
  }, [loginModal]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen(); //open rent modal once signed in
  }, [currentUser, rentModal, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
          hidden
          md:block 
          txt-sm 
          font-semibold 
          py=3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full 
            cursor-pointer
            hover: shadow-md
            transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white 
          overflow-hidden
          right-0 
          top-12
          text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/");
                    setIsOpen(false);
                  }}
                  label="Explore"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    setIsOpen(false);
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    setIsOpen(false);
                  }}
                  label="My favorites "
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    setIsOpen(false);
                  }}
                  label="My reservations "
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                    setIsOpen(false);
                  }}
                  label="My properties "
                />
                <hr />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home " />
                <MenuItem
                  onClick={() => {
                    router.push("/account");
                    setIsOpen(false);
                  }}
                  label="Account"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={openLogin} label="Login" />
                <MenuItem onClick={openRegister} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
