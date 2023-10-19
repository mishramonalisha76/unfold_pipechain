import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Features() {
  return (
    <div className="mt-24">
    <div className="flex m-16 mx-40 my-40 gap-10 items-center justify-center text-white">
      <div
        className="flex flex-col items-center gap-4 bg-indigo-900 p-8  transform 
                                transition duration-500 hover:scale-110"
      >
        <Image src="/hero.png" alt={"hero"} width="200" height="200" />
        <div className="flex flex-col items-center gap-1">
          <span className="whitespace-nowrap text-lg font-semibold">Easy Automation</span>
          <span className="text-md font-medium text-center">
            Easy usage and ux
          </span>
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-4 bg-indigo-300 p-8 transform 
                                transition duration-500 hover:scale-110"
      >
        <Image src="/hero.png" alt={"hero"} width="200" height="200" />
        <div className="flex flex-col items-center justify-center gap-1">
          <span className=" whitespace-nowrap text-xl font-semibold">Custom Workflow</span>
          <span className="text-md font-medium text-center">
            Automate the busy work
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-yellow-400 p-8 transform 
                                transition duration-500 hover:scale-110">
        <Image src="/hero.png" alt={"hero"} width="200" height="200" />
        <div className="flex flex-col items-center gap-1">
          <span className=" whitespace-nowrap text-lg font-semibold">Connect apps</span>
          <span className="text-md font-medium text-center">
            Support of a wide range of apps
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-orange-500 p-8 transform 
                                transition duration-500 hover:scale-110">
        <Image src="/hero.png" alt={"hero"} width="200" height="200" />
        <div className="flex flex-col items-center gap-1">
          <span className="whitespace-nowrap text-lg font-semibold">Transparent and Safe</span>
          <span className="text-md font-medium text-center">
            On- chain trust and safety
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Features;
