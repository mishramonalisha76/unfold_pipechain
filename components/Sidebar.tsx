import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const TRIGGERS = [
    "Connect slack",
    "Moniter Chain",
    "Mint Nft",
   
  ];
  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8">
      <Link href="/">
        <img src="https://designbygio.it/images/logo.png" alt="logo" />
      </Link>
      <nav>
        <section className="">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 left-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div className="flex flex-col gap-4 px-8 mt-24">
            <p className="text-center text-2xl mb-10 font-extrabold">Select the Tigger</p>
              {TRIGGERS.map((trigger,i) => (
                <span key={i} className="bg-neutral-900 text-white p-4 cursor-pointer">{trigger}</span>
              ))}
            </div>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        background:whitesmoke;
        display: block;
        position: absolute;
        width: 40%;
        height: 100vh;
        top: 0;
        right: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        // justify-content: space-evenly;
        align-items: stretch;
      }
    `}</style>
    </div>
  );
}
