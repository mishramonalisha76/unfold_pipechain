import Link from "next/link";
import Image from "next/image";
import { WorkflowDataContext } from "@/context";
import { Spinner } from "../reusables";
import { FcAddRow } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import ConfigureForm from "./ConfigureForm";
import { client } from "@/lib/gql-client";
import { findAllApplicationQuery } from "@/lib/gql-queries";

const InstalledApps = () => {
  const { userWorkflows, setSelectedUserWorkflow, setUserWorkflows } =
    useContext(WorkflowDataContext);
  const [loading, setLoading] = useState(false);
  const [isConfigureFormOpen, setIsConfigureFormOpen] = useState(false);

  useEffect(()=>{
    const getAllApplicationInstalledApp = async () => {
      try {
        const response:any = await client.request(findAllApplicationQuery);
        console.log('RESPONSE FROM GRAPHQL-REQUEST API CALL', response.appFindAll);
        // Update state with the response data as needed
        // For example, setApplications(response.appFindAll)
      } catch (err) {
        console.log('ERROR FROM GRAPHQL-REQUEST API CALL', err);
      }
    };

    // Call the API function
    getAllApplicationInstalledApp();
  },[])

  
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
          <div className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 pl-2 pr-5">
            <div className="flex gap-2 items-center pl-2">
              <Link href={"/createWorkflow"}>
                <span className=" text-md font-semibold tracking-wide cursor-pointer hover:underline hover:underline-offset-2">
                  Slack
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-6 items-center max-h-[5rem] overflow-y-auto pr-3">
            

              <span className="flex  gap-2 items-center  text-md font-semibold tracking-wide ">
           
                <FcAddRow
                  size={30}
                  className="cursor-pointer"
                  onClick={() =>  setIsConfigureFormOpen(true)}
                />
              </span>
            </div>
          </div>
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
        {isConfigureFormOpen  && (
            <ConfigureForm
       
              onClose={() => setIsConfigureFormOpen(false)}
            />
          )}
    </div>
  );
};

export default InstalledApps;
