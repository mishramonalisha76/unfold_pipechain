import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Contact() {
  return (
    <div className="flex m-16 mt-20  mx-32  justify-center items-center">
      <div className="flex flex-col border-4 gap-4 border-indigo-900  px-16  py-28 flex-[2] items-start">
        {/* <div className="flex flex-1 flex-col items-start justify-center gap-6  text-black"> */}
        <p className="text-5xl font-extrabold  text-indigo-900 leading-tight tracking-wide">
          Ready to go? Lets chat!
        </p>
        <p className="text-[1.5rem] text-stone-500 tracking-wider font-thin  w-2/3">
          Contact us for any queries and get started on this journey.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 px-20 py-3 text-lg font-normal  text-white text-transparent "
        >
          Learn more
        </Link>
        {/* </div> */}
      </div>
      <div
        className="flex flex-col  bg-indigo-300  gap-4  p-14 flex-1 -ml-[10%] transform 
                                transition duration-500 hover:scale-110"
      >
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 px-4 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter your email address"
          className="p-2 px-4 rounded-lg"
        />
        <textarea
          rows={3}
          placeholder="Enter your message"
          className="p-2 px-4 rounded-lg"
        />
        <button className="rounded-2xl bg-gradient-to-r from-indigo-800 to-indigo-500 px-6 py-2 text-lg font-bold  text-white text-transparent ">
          Submit
        </button>
      </div>
      {/* <div className="ml-8 flex items-center justify-around gap-6  " >
        <div className="flex flex-1 overflow-hidden scale-75">
          <Image
            src='/contact.png'
            alt="contact img"
            width='100'
            height='100'
          ></Image>
        </div>
       
      </div>
      <div className="flex justify-around mx-16  px-28 pb-16 gap-0  ">
        <Link className=" text-lg text-slate-800 tracking-wider" href="/">
          {" "}
          Home
        </Link>
        <Link className=" text-lg text-slate-800 tracking-wider" href="/">
          {" "}
          About
        </Link>
        <Link className="text-lg text-slate-800 tracking-wider" href="/">
          {" "}
          Team
        </Link>
        <Link className="text-lg text-slate-800 tracking-wider" href="/">
          {" "}
          Gallery
        </Link>
        <Link className="text-lg text-slate-800 tracking-wider" href="/">
          {" "}
          Contact
        </Link>
      </div> */}
    </div>
  );
}

export default Contact;
