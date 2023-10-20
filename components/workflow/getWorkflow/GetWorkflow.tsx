import { Spinner } from "@/components/reusables";
import { WorkflowDataContext } from "@/context";
import { client } from "@/lib/gql-client";
import { getWorkflowQuery } from "@/lib/gql-queries";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FcWorkflow } from "react-icons/fc";

export const GetWorkflow = () => {
  const { userWorkflows,setSelectedUserWorkflow,setUserWorkflows } = useContext(WorkflowDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response:any = await client.request(getWorkflowQuery);
        const workflowData = response.getAllWorkflow;
        console.log(workflowData);
        setUserWorkflows(workflowData);
        setLoading(false);
        
      } catch (err) {
        console.log('ERROR FROM GRAPHQL-REQUEST API CALL', err);
        setLoading(false);
      }
      finally{
         setLoading(false);
      }
    })();
  }, []);

 
  console.log("USER WORKFLOW",userWorkflows);
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
          User Workflows
        </span>
      </div>
     {!loading && <div className="flex  overflow-y-auto flex-col gap-4 bg-indigo-300/70 h-[80vh] my-10 mx-20 p-6 shadow-xl rounded-md">
        <div className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 px-4">
          <span className=" text-xs text-zinc-500 font-bold tracking-wide">
            NAME
          </span>
          <div className="flex gap-10">
            <span className=" text-xs text-zinc-500 font-bold tracking-wide">
              UPDATED
            </span>
            <span className=" text-xs text-zinc-500 font-bold tracking-wide">
              FILE SIZE
            </span>
          </div>
        </div>
        {userWorkflows.map((workflow: any, index: number) => (
          <div key={index} className="flex justify-between border-b-[1px] border-b-gray-700 pb-2 pl-2 pr-5">
            <div className="flex gap-2 items-center">
              <FcWorkflow size={24} />
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
      </div>}
      {loading && 
      <div className="mt-[70%]">
      <Spinner />
      </div>
      }
    </div>
  );
};
