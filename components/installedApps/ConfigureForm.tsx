import { Dropdown, ValueType } from "@/components/reusables";
import Action from "@/public/types/Action";
import React, { useState } from "react";
import { FcAddRow } from "react-icons/fc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface ConfigureFormProps {
  onClose: () => void;
}

const ConfigureForm: React.FC<ConfigureFormProps> = ({ onClose }) => {
  // const values: ValueType[] = [
  //   { label: "mishrmonalisha", value: "mishrmonalisha", function:()=>setSelectedId("mishrmonalisha") },
  //   { label: "mishrmonalisha76", value: "mishrmonalisha76",function:()=>setSelectedId("mishrmonalisha76") },
  // ];
  const [inputKeyFields, setInputKeyFields] = useState<Array<string>>([]);
  const [inputValueFields, setInputValueFields] = useState<Array<string>>([]);

  const addInputField = () => {
    //setInputValueFields([...inputValueFields, ""]);
    setInputKeyFields([...inputKeyFields, ""]);
    setInputValueFields([...inputValueFields, ""]);
  };
  const removeInputFields = (index: number) => {
    // const rows = [...inputValueFields];
    // rows.splice(index, 1);
    const rows2 = [...inputKeyFields];
    rows2.splice(index, 1);
    // setInputValueFields(rows);
    setInputKeyFields(rows2);
    setInputKeyFields(rows2);
  };
  const handleKeyChange = (index: number, key: string) => {
    let temp = inputKeyFields;
    temp[index] = key;
    setInputKeyFields([...temp]);
  };
  const handleValueChange = (index: number, key: string) => {
    let temp = inputValueFields;
    temp[index] = key;
    setInputValueFields([...temp]);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex items-center justify-center backdrop-blur-[2px] bg-white/30  h-full self-center `}
    >
      <div className=" flex flex-col gap-6 h-fit bg-indigo-900 p-8  px-16 w-[25%] rounded-xl border-[1px] border-indigo-200 shadow-xl  relative max-h-[80%] overflow-y-auto">
        <span className="text-center font-bold text-3xl tracking-wide text-white whitespace-nowrap ">
          Add Details
        </span>
        <span
          className="text-white  font-bold absolute right-4 top-4 cursor-pointer"
          onClick={() => onClose()}
        >
          X
        </span>

        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2 text-white">
            <p className="text-[1.1rem] font-medium tracking-wide">Name</p>
            <input
              className="w-full rounded-md text-black bg-slate-200 p-2"
              placeholder="Enter name"
            />
          </div>
          <div className="flex flex-col gap-2 text-white">
            <p className="text-[1.1rem] font-medium tracking-wide">
              Description
            </p>
            <input
              className="w-full rounded-md text-black bg-slate-200 p-2"
              placeholder="Enter description"
            />
          </div>
          <div className="flex flex-col gap-2 text-white">
            <p className="text-[1.1rem]  items-center  font-medium tracking-wide">
              Key value pair
            </p>
            <div className="flex flex-col gap-4">
              {inputKeyFields.map((data, i) => (
                <div className="flex gap-2 " key={`key${i}`}>
                  <input
                    className="w-full rounded-md text-black bg-slate-200 p-2"
                    placeholder="key"
                    type="text"
                    value={inputKeyFields[i]}
                    onChange={(e) => handleKeyChange(i, e.target.value)}
                    name={`key${i}`}
                  />
                  <input
                    className="w-full rounded-md text-black bg-slate-200 p-2"
                    placeholder="value"
                    type="text"
                    value={inputValueFields[i]}
                    name={`value${i}`}
                    onChange={(e) => {
                      console.log(inputValueFields[i]);
                      handleValueChange(i, e.target.value);
                    }}
                  />

                  {inputKeyFields.length ? (
                    <button
                      className="rounded-lg border-2 border-indigo-300 px-2 py-1 text-sm font-bold text-indigo-300 hover:bg-indigo-300 hover:text-white"
                      onClick={() => removeInputFields(i)}
                    >
                      remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <FcAddRow
              size={30}
              className="cursor-pointer "
              onClick={() => addInputField()}
            />
          </div>
        </div>
        <button   onClick={() => onClose()} className=" text-white text-sm font-bold py-3 px-4 rounded-lg bg-indigo-300 cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ConfigureForm;
