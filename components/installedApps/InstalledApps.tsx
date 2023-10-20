import Link from "next/link";
import Image from "next/image";
import { WorkflowDataContext } from "@/context";
import { Spinner } from "../reusables";
import { FcAddRow } from "react-icons/fc";
import { AiOutlineCopy } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import ConfigureForm from "./ConfigureForm";
import { client } from "@/lib/gql-client";
import { findAllApplicationQuery } from "@/lib/gql-queries";
import { InfoContainer } from "../reusables/InfoContainer";

function Tooltip({ installedApp }: any) {
  return (
    <div className="flex flex-col  p-4 bg-indigo-900 gap-2 text-white   rounded">
      <div className="whitespace-nowrap flex items-center">
        <strong className="text-blue-400  ">Id:</strong> {installedApp?.id}
        <AiOutlineCopy
          onClick={() => {
            navigator.clipboard.writeText(installedApp?.id || "");
          }}
          className="ml-2 cursor-pointer"
        />
      </div>
      <div className="whitespace-nowrap">
        <strong className="text-blue-400">Name:</strong> {installedApp?.name}
      </div>
      {/* <div className="whitespace-nowrap">
        <strong className="text-blue-400">Input Values:</strong>{" "}
        {installedApp?.inputValues}
      </div> */}
      {/* <div className="whitespace-nowrap flex items-center">
          <strong className="text-blue-400">Action Id:</strong> {action.actionId}
          <AiOutlineCopy
            onClick={() => {
              navigator.clipboard.writeText(action.actionId || "");
            }}
            className="ml-2"
          />
        </div> */}
    </div>
  );
}

const InstalledApps = () => {
  const [installedApps, setInstalledApps] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isConfigureFormOpen, setIsConfigureFormOpen] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const getAllApplicationInstalledApp = async () => {
      try {
        const response: any = await client.request(findAllApplicationQuery);
        console.log(
          "RESPONSE FROM GRAPHQL-REQUEST API CALL",
          response.appFindAll
        );
        setInstalledApps(response.appFindAll);
        // Update state with the response data as needed
        // For example, setApplications(response.appFindAll)
      } catch (err) {
        console.log("ERROR FROM GRAPHQL-REQUEST API CALL", err);
      }
    };

    // Call the API function
    getAllApplicationInstalledApp();
  }, []);
  console.log(hover);

  return (
    <div className=" flex flex-col">
      <div className="flex gap-4 items-center  w-screen px-8 py-4  bg-white border-b-4  border-b-indigo-300">
        <Link href={"/home"}>
          <div className="flex gap-1 items-center">
            <Image src="/logo.png" alt={"logo"} width="40" height="40" />
            <span className="text-sm font-extrabold tracking-wider text-indigo-900">
              PIPECHAIN
            </span>
          </div>
        </Link>
        <span className=" text-xl font-semibold tracking-wide">
          Installed Apps Configuration
        </span>
      </div>
      {!loading && (
        <div className="flex w-1/2 self-center  overflow-y-auto flex-col gap-4 bg-indigo-300/70 h-[80vh] my-10 mx-20 p-6 shadow-xl rounded-md">
          <div className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 px-4">
            <span className=" text-xs text-zinc-500 font-bold tracking-wide">
              APP NAME
            </span>
            <div className="flex gap-10">
              <span className=" text-xs text-zinc-500 font-bold tracking-wide">
                INSTALLED APPS
              </span>
              {/* <span className=" text-xs text-zinc-500 font-bold tracking-wide">
            FILE SIZE
          </span> */}
            </div>
          </div>
          {installedApps?.map((installedApp: any, index: number) => (
            <div
              key={`installedApps${index}`}
              className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 pl-2 pr-5"
            >
              <div className="flex gap-3 items-center pl-2">
                <Image
                  src={installedApp?.meta?.src}
                  alt="logo"
                  width={35}
                  height={35}
                  className=" rounded-full"
                  objectFit="contain"
                />
                <span className=" text-md font-semibold tracking-wide ">
                  {installedApp.name!}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-end max-h-[5rem] overflow-y-auto pr-3">
                <div className="flex flex-col gap-2 relative">
                  {installedApp.InstalledApp?.map((app: any) => (
                    <>
                      <span
                        key={`app${index}`}
                        // onMouseEnter={() => setHover(true)}
                        // onMouseLeave={() => setHover(false)}
                        className="relative text-sm font-semibold tracking-wide cursor-pointer"
                      >
                        {app.name}
                        {/* {!hover && (
                        <div className="absolute  z-10 top-0 hidden gro-hover:block">
                          <Tooltip installedApp={app} />
                        </div>
                      )} */}
                      </span>
                     
                    </>
                  ))}
                </div>
                <span className="flex  gap-2 items-center  text-md font-semibold tracking-wide ">
                  <FcAddRow
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setIsConfigureFormOpen(true)}
                  />
                </span>
              </div>
            </div>
          ))}
          {/* {userWorkflows.map((workflow: any, index: number) => 
      (
        
        <div key={index} className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 pl-2 pr-5">
          <div className="flex gap-2 items-center">
          
            <Link href={'/createWorkflow'}>
            <span onClick={()=>setSelectedUserWorkflow(workflow)} className=" text-sm font-semibold tracking-wide cursor-pointer hover:underline hover:underline-offset-2">
              {workflow.name}
            </span>
            </Link>
          </div>
          <div className="flex gap-10">
            <span className=" text-sm font-semibold tracking-wide pr-4">
              last month
            </span>
            <span className=" text-sm  font-semibold tracking-wide">
              2 MB
            </span>
          </div>
        </div>
      ))} 
      */}
        </div>
      )}
      {loading && (
        <div className="mt-[70%]">
          <Spinner />
        </div>
      )}
      {isConfigureFormOpen && (
        <ConfigureForm onClose={() => setIsConfigureFormOpen(false)} />
      )}
    </div>
  );
};

export default InstalledApps;
