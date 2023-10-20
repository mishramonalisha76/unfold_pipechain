import React, { useContext, useEffect, useState } from "react";
//import {Form} from '@ginkgo-bioworks/react-json-schema-form-builder';
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { withTheme } from "@rjsf/core";
import { CloseIcon } from "@chakra-ui/icons";
import { Theme as ChakraUITheme } from "@rjsf/chakra-ui";
import { WorkflowDataContext } from "@/context";
import Draggable from "react-draggable";
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
  const { selectedAction, setSelectedAction } = useContext(WorkflowDataContext);
  const [formData, setFormData] = React.useState(null);
  const schema: RJSFSchema = selectedAction?.inputSchema?.schema;

  const uiSchema: UiSchema = selectedAction?.inputSchema?.uiSchema;

  const handleCancel = () => {
    onClose(); // Call the onClose function to close the form
  };
  const handleSubmit = (formData: any) => {
    onSubmit(formData);
    onClose();
  };
  console.log("FORM DATA", formData);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[2px] bg-white/30  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div  className=" flex relative w-[80%] h-[75%] mt-20 rounded-lg p-6 shadow-xl bg-indigo-300">
        details
        <Draggable axis="x" bounds='parent'>
          <div className="bg-indigo-900  w-[30%] p-12 h-[43rem] mt-20 overflow-y-auto flex flex-col rounded-xl border-[1px] border-indigo-200 shadow-xl   text-white absolute -bottom-6 left-1/3">
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
