import { Dropdown, ValueType } from "@/components/reusables";
import Action from "@/public/types/Action";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface ActionsFormProps {
  actions: Action[];
  onActionClick: (action: Action,installedAppId:string) => void;
  onClose: () => void;
}

const ActionsForm: React.FC<ActionsFormProps> = ({
  actions,
  onActionClick,
  onClose,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedInstalledApp,setSelectedInstalledApp] = useState<{ id: string, name: string }>({ id: '', name: '' });
  // const values: ValueType[] = [
  //   { label: "mishrmonalisha", value: "mishrmonalisha", function:()=>setSelectedId("mishrmonalisha") },
  //   { label: "mishrmonalisha76", value: "mishrmonalisha76",function:()=>setSelectedId("mishrmonalisha76") },
  // ];
  const values: ValueType[] = (() => {
    if (actions.length)
      return actions[0].installedApp.map((a) => {
        return {
          label: a?.name,
          value: a?.name,
          function: () => setSelectedInstalledApp({id:a.id,name:a?.name})
        }
      })
    else
      return [];
  })()
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[2px] bg-white/30 `}
    >
      <div className=" flex flex-col gap-6 bg-indigo-900 p-8  px-16 w-[25%]  rounded-xl border-[1px] border-indigo-200 shadow-xl  relative">
        <span className="text-center font-bold text-3xl tracking-wide text-white whitespace-nowrap ">
          Select an Action
        </span>
        <span
          className="text-white  font-bold absolute right-4 top-4 cursor-pointer"
          onClick={() => onClose()}
        >
          X
        </span>

        <div className="flex gap-4 flex-col ">
          <div
            className=" relative p-4 bg-blue-200/40 rounded-md text-center  text-black font-semibold  text-lg tracking-wide cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-center "> {selectedInstalledApp.walletAddress || 'Select User Account Data'}</span>
            <MdOutlineKeyboardArrowDown
              size={24}
              className="absolute right-2 top-5"
            />
            {showDropdown && (
              <div className="flex self-center  flex-col absolute top-2 right-0 z-10 bg-indigo-100 rounded-md w-full  p-4">
                <Dropdown values={values} />
              </div>
            )}
          </div>
          {actions.map((action, i) => (
            <div
              key={i}
              className=" p-4 bg-blue-200/40 rounded-md text-center  text-black font-semibold  text-lg tracking-wide cursor-pointer"
              onClick={() => onActionClick(action,selectedInstalledApp.id)}
            >
              {action.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionsForm;
