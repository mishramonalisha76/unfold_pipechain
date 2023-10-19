import { WorkflowDataContext } from "@/context";
import { StatusColor, StatusKeys } from "@/lib/constants";
import { useContext } from "react";

export const JobSection = () => {
  const { selectedUserWorkflowJobs,setSelectedUserWorkflowJob } = useContext(WorkflowDataContext);
  const getStatusBgColor = (status: string) => {
    console.log(status)
   if(status == 'Running')
   return 'bg-yellow-500';
   if(status == 'Pending')
   return 'bg-slate-600';
   if(status == "Success")
   return 'bg-lime-600';
   if(status == 'Failed')
   return 'bg-red-500';
  };
  return (
    <div
      className="flex absolute  overflow-y-auto 
     mt-2 rounded-tl-lg py-10 
     top-0 h-full bg-indigo-300 z-30 w-[20%] right-0 
      flex-col gap-2 items-start "
    >
      {/* <span className="text-xl font-bold text-center ">Workflow Jobs</span> */}
      {selectedUserWorkflowJobs.map((job, i) => (
        <div key={i+ job.id} onClick={()=>setSelectedUserWorkflowJob(job)}
         className=" flex gap-4 items-center bg-indigo-200  w-full p-4 px-10 hover:bg-indigo-900 cursor-pointer hover:text-white ">
          <span className=" cursor-pointer text-base font-semibold  whitespace-nowrap">
            Job {i + 1}
          </span>
          <span
            className={`px-2 py-1 w-[4rem] text-center  ${getStatusBgColor(
              job?.status
            )} rounded-3xl text-xs text-white`}
          >
            {job?.status}
          </span>
        </div>
      ))}
    </div>
  );
};
