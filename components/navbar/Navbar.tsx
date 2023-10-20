import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@suiet/wallet-kit";
import { Dropdown } from "../reusables";
import Image from "next/image";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { OktoConnector } from "@okto_wallet/okto-connect-sdk";
import { useAccount, useConnect, useDisconnect, mainnet } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { address, isConnected } = useAccount();
  const oktoConnector = new OktoConnector({
    chains: [mainnet],
    options: {
      projectId: "c63e42ee270545b423495ea9f1a230e6",
    },
  });
  const { connect } = useConnect({ connector: oktoConnector });

  const { disconnect } = useDisconnect();
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(address);
  if (!mounted) return <></>;
  return (
    <div className="flex justify-between items-center w-screen px-16 py-4 bg-white border-b-4  border-b-indigo-300">
      <div className="flex gap-1 items-center">
        <Image src="/logo.png" alt={"logo"} width="40" height="40" />
        <span className="text-sm font-extrabold tracking-wider text-indigo-900">
          PIPECHAIN
        </span>
      </div>
      <div className="flex gap-8 text-lg font-medium text-neutral-600">
        <span className="cursor-pointer ">About</span>
        <Link href={"/home"}>
          <span className="cursor-pointer">Home</span>
        </Link>
        <span className="cursor-pointer">Contact</span>
        <div className="flex gap-3">
          <ConnectButton
          label='Connect with Sui'
            style={{
              // height: "36px",
              height: "36px",
              padding: "8px 12px 10px 12px ",
              borderRadius: "10px",
              fontSize: "0.875rem",
              background: "rgb(129 140 248)",
              //  color:'darkblue',
              //  textAlign:'start',
              width: "fit-content",
              //  padding: " 0.5rem 9px",
              //  borderRadius: "10px",
              //  fontSize: "0.875rem",
              //  background: "transparent",
            }}
          />
          <button
            onClick={() => connect()}
            className=" text-white text-sm font-bold p-2 px-4 rounded-lg bg-indigo-400 cursor-pointer"
          >
            Connect with okto
          </button>
          {/* <div
            className=" relative  bg-indigo-400 rounded-lg w-[10rem]   text-white  text-sm font-bold p-2 px-4 tracking-wide cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-center "> Connect Wallet</span>
            <MdOutlineKeyboardArrowDown
              size={24}
              className="absolute right-1 top-2"
            />
            {showDropdown && (
              <div className="flex self-center shadow-lg flex-col whitespace-nowrap absolute top-10 -right-2 z-10 bg-indigo-100 rounded-md w-fit pr-4  pl-4 py-2">
                <ConnectButton
               
                  style={{
                    // height: "36px",
                    color:'darkblue',
                    textAlign:'start',
                    width: "fit-content",
                    padding: " 0.5rem 9px",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    background: "transparent",
                  }}
                />
                
              </div>
            )}
          </div> */}
          {/* <ConnectButton
            style={{
              height: "36px",
              width:'fit-content',
              padding: "8px  15px 12px 15px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              background: "rgb(129 140 248)",
            }}
          />
           <button
           onClick={() => connect()}
            className=" text-white text-sm font-bold p-2 px-4 rounded-lg bg-indigo-400 cursor-pointer">
              Connect with okto
            </button> */}

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
