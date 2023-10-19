import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Dropdown } from "../reusables";
import Image from "next/image";

function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  return (
    <div className="flex justify-between items-center w-screen px-16 py-4 bg-white border-b-4  border-b-indigo-300">
      <div className="flex gap-1 items-center">
     <Image src="/logo.png" alt={"logo"} width='40' height='40'/>
     <span className="text-sm font-extrabold tracking-wider text-indigo-900">PIPECHAIN</span>
     </div>
      <div className="flex gap-8 text-lg font-medium text-neutral-600">
        <span className="cursor-pointer ">About</span>
        <Link href={"/home"}>
          <span className="cursor-pointer">Home</span>
        </Link>
        <span className="cursor-pointer">Contact</span>
        <div className="flex gap-3">
          <WalletMultiButton
            style={{
              height: "36px",
              padding: "10px",
              borderRadius: "12px",
              fontSize: "0.875rem",
              background: "rgb(129 140 248)",
            }}
          />
           
          {/* <WalletDisconnectButton
            style={{
              height: "36px",
              padding: "10px",
              borderRadius: "12px",
              fontSize: "0.875rem",
              background: "rgb(129 140 248)",
            }}
          /> */}
          <Link href={"/home"}>
            <button className=" text-white text-sm font-bold p-2 px-4 rounded-lg bg-indigo-400 cursor-pointer">
              Launch App
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
