import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";

function Hero() {
  return (
    <div className="flex m-16 mt-20 mx-24 gap-8">
      <div className="flex flex-col flex-1 gap-6 pt-16">
        <p className="w-[35rem] text-[3.2rem] font-extrabold leading-normal text-indigo-900">
          Automation tooling for Web3 with Pipechain!
        </p>
        <p className=" w-[90%] text-xl font-medium leading-relaxed text-neutral-600 tracking-wide">
          Integrate your cruicial work apps into workflows, reclaim your time,
          and focus on impactful work.
        </p>
        <Link href={"/home"}>
          <button
            className="text-white my-4 flex items-center text-xl font-bold py-4 rounded-3xl px-28 bg-indigo-400 transform 
                                transition duration-500 hover:scale-110 cursor-pointer"
          >
            Launch App
            <Image width={30} height={30}
         
             className="ml-4 rotate-[23deg] animate-waving-hand " src={"/finger.png"} alt={"launch app"} />
          </button>
        </Link>
      </div>
      <div className="flex ">
        <Image src="/hero.png" alt={"hero"} width="700" height="500" />
      </div>
    </div>
  );
}

export default Hero;
