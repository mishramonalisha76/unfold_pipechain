import { ReactNode } from "react";

export type ValueType = { value: string; label: string,function:()=>void };

export const Dropdown = ({ values }: { values: ValueType[] }) => {
  return values.map((value: ValueType,i) => <span key={i} className=" p-1 px-2 rounded-md text-left hover:bg-indigo-400/25" onClick={()=>value.function()}>{value.label}</span>);
};
