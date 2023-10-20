import React, { useContext, useEffect, useRef, useState } from "react";
//import {Form} from '@ginkgo-bioworks/react-json-schema-form-builder';
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { withTheme } from "@rjsf/core";
import { CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { AiOutlineCopy } from "react-icons/ai";
import { Theme as ChakraUITheme } from "@rjsf/chakra-ui";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { WorkflowDataContext } from "@/context";
import { RiDraggable } from "react-icons/ri";
import Draggable from "react-draggable";
import { useClickAway } from "@/hooks/useClickAway";
const Form = withTheme(ChakraUITheme);

interface TriggerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void; // Define the form submission handler
}

const TriggerForm: React.FC<TriggerFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { selectedAction, setSelectedAction, workflowActions } =
    useContext(WorkflowDataContext);
  const [selectedActionId, setSelectedActionId] = useState<string>("");

  console.log("trigger form", workflowActions);
  const [formData, setFormData] = React.useState(null);
  const schema: RJSFSchema = selectedAction?.inputSchema?.schema;
  const dropdownRef = useRef(null);
  const uiSchema: UiSchema = selectedAction?.inputSchema?.uiSchema;

  useClickAway(dropdownRef, () => {
    setSelectedActionId("");
  });
  const handleCancel = () => {
    onClose(); // Call the onClose function to close the form
  };
  const handleSubmit = (formData: any) => {
    onSubmit(formData);
    onClose();
  };
  useEffect(() => {
    if (!Object.keys(selectedAction?.inputSchema?.schema || {}).length) {
      handleSubmit(formData);
    }
  }, [selectedAction]);
  console.log("FORM DATA", formData);
  return (
   !Object.keys(selectedAction?.inputSchema?.schema || {}).length? <></>
   :
   <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[2px] bg-white/30  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className=" flex flex-col gap-2 relative w-[80%] h-[75%] mt-20 rounded-lg p-6 shadow-xl bg-indigo-300 items-start">
        {workflowActions?.map((action, index) => (
          <div
            key={index}
            className="flex gap-3 items-center 
          rounded-xl shadow-lg
          relative
           justify-start pl-2 bg-indigo-900 p-2"
            onClick={() =>
              setSelectedActionId(selectedActionId ? "" : action?.actionId!)
            }
          >
            <Image
              src={action?.app?.meta?.src}
              alt="logo"
              width={27}
              height={27}
              className="rounded-full"
              objectFit="contain"
            />
            <span className=" text-xl font-bold tracking-wide text-white  cursor-pointer ">
              {action?.app?.name}
            </span>
            <MdOutlineKeyboardArrowDown size={30} color="#fff" className="" />
            {selectedActionId === action?.actionId && (
              <div className="flex self-center gap-1 shadow-xl flex-col overflow-y-auto h-[25rem] max-h-[25rem] absolute top-[3.2rem] left-0  z-10 bg-indigo-100 rounded-md w-fit pr-4  pl-4 py-2">
                <div className=" font-bold flex items-center">
                  <strong className="text-indigo-900 text-lg whitespace-nowrap">
                    Action Id:
                  </strong>{" "}
                  {action?.actionId}
                  <AiOutlineCopy
                    onClick={() => {
                      navigator.clipboard.writeText(action?.actionId || "");
                    }}
                    className="ml-2 cursor-pointer "
                  />
                </div>
                {!!Object.keys(action?.formData || {}).length
                  ? Object.keys(action?.formData || {}).map((key) => (
                      <div
                        key={key}
                        className=" font-bold text-lg flex  items-center"
                      >
                        <strong className="text-indigo-900">{key}:</strong>{" "}
                        {action?.formData[key]}
                        <AiOutlineCopy
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `{{ $json["${action?.formData[key]}"] }}` || ""
                            );
                          }}
                          className="ml-2 cursor-pointer"
                        />
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
        ))}
        <Draggable axis="x" bounds="parent">
          <div
            className="bg-indigo-900   w-[30%] p-12 h-[43rem] mt-20 overflow-y-auto 
            flex flex-col rounded-xl border-[1px] border-indigo-200 shadow-xl  
             text-white absolute -bottom-6 left-1/3 "
          >
            <span
              className="text-white  font-bold absolute right-4 top-4 cursor-pointer"
              onClick={() => onClose()}
            >
              X
            </span>

            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              onSubmit={(submissionData: any) => {
                handleSubmit(submissionData.formData);
              }}
            />
          </div>
        </Draggable>
      </div>
    </div>
            
  );
};

export default TriggerForm;
