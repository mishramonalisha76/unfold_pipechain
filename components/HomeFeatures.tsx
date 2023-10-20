import Image from "next/image";
import { useEffect, useState } from "react";
import 'animate.css';
import Link from "next/link";

const featuresData = [
  {
    title: "Create WorkFlow",
    imageSrc: "/create.png",
    description: "",
    link: "/createWorkflow",
    width: 150,
    height: 200,
    backgroundColor: "bg-indigo-900",
  },
  {
    title: "Get WorkFlow",
    imageSrc: "/hero.png",
    description: "",
    link: "/getWorkflow",
    width: 200,
    height: 200,
    backgroundColor: "bg-indigo-300",
  },
  {
    title: "Configure App",
    imageSrc: "/hero.png",
    description: "",
    link: "/installedApps",
    width: 200,
    height: 200,
    backgroundColor: "bg-yellow-400",

  },
  {
    title: "Create Action",
    imageSrc: "/hero.png",
    description: "",
    link: "/create-workflow",
    width: 200,
    height: 200,
    backgroundColor: "bg-orange-500",
    status:'Coming soon'
  },
];

function HomeFeatures() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Delay the animation for each feature
    const delay = 200; // Delay in milliseconds

    featuresData.forEach((_, index) => {
      setTimeout(() => {
        setAnimate(true);
      }, index * delay);
    });
  }, []);

  return (
    <div className="flex flex-wrap mx-20 mt-10 items-center justify-center text-white">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={`p-6 
           animate__animated ${((index%2===0)?"animate__backInLeft":"animate__backInRight")}`}
          style={{ flexBasis: "50%" }} 
        >
          <div
            className={`py-10 
            h-[18rem]
            rounded-xl border-[1px] border-indigo-200 shadow-xl 
            bg-cover  bg-center flex flex-col gap-4 ${feature.backgroundColor} items-center justify-center`}
            style={{ minHeight: "200px", minWidth: "200px" }} 
          >
            <Image
              src={feature.imageSrc}
              alt={feature.description}
              width={feature.width}
              height={feature.height}
            />
            <Link href={feature.link}>
            <div  className=" flex flex-col gap-2 cursor-pointer font-bold text-3xl tracking-wide  transition-transform hover:scale-110  mt-2 text-center">
            {feature.title}
            <span className=" text-base text-red-900">{feature.status}</span>
          </div>
       
          </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeFeatures;
