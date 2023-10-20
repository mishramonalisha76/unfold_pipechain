import React, { useContext, useRef, useState } from "react";
import Draggable from "react-draggable";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Action from "../../public/types/Action";
import DragAndDropCanvasProps from "../../public/types/DragAndDropCanvas";
import { WorkflowDataContext } from "@/context";
import selectedAction from "@/public/types/selectedAction";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ContextMenu from "./ContextMenu";
import { InfoContainer } from "../reusables/InfoContainer";
import { useClickAway } from "@/hooks/useClickAway";
import { ImCross, ImOpt } from "react-icons/im";
import { Connection } from "@/public/types/Workflow";
import { AiOutlineCopy } from "react-icons/ai";
import { StatusColor, StatusKeys } from "@/lib/constants";
import ReactTyped from "react-typed";

const ICON_SIZE = 50;
const ICON_GAP = 50;

type ActionTooltipProps = {
  action: selectedAction;
};

function ActionTooltip({ action }: ActionTooltipProps) {
  return (
    <div className="flex flex-col  p-4 bg-indigo-900 gap-2 text-white  
   
    border-[2px] border-indigo-200
     rounded-lg shadow-xl">
      <div className="whitespace-nowrap">
        <strong className="text-blue-400  ">App Name:</strong>{" "}
        {action?.app?.name}
      </div>
      <div className="whitespace-nowrap">
        <strong className="text-blue-400">Function Name:</strong> {action.name}
      </div>
      <div className="whitespace-nowrap">
        <strong className="text-blue-400">Type:</strong> {action.type}
      </div>
      <div className="whitespace-nowrap flex items-center">
        <strong className="text-blue-400">Action Id:</strong> {action.actionId}
        <AiOutlineCopy
          onClick={() => {
            navigator.clipboard.writeText(action.actionId || "");
          }}
          className="ml-2"
        />
      </div>
    </div>
  );
}

const DragAndDropCanvas: React.FC<DragAndDropCanvasProps> = ({
  onActionClick,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const updateXarrow = useXarrow();
  const {
    actions,
    connections,
    lastClickedActionId,
    setLastClickedActionId,
    selectedUserWorkflowJob,
    workflowActions,
    setConnections,
    setWorkflowActions,
  } = useContext(WorkflowDataContext);

  const [contextMenuAction, setContextMenuAction] =
    useState<selectedAction | null>(null);
  const contextMenuRef = useRef(null);

  console.log("ERROR MESSAGE", errorMessage);
  console.log("APP", workflowActions);

  useClickAway(contextMenuRef, () => {
    setContextMenuAction(null);
  });

  const handleContextMenu = (e: any, action: selectedAction) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    setContextMenuAction(action);
  };

  const handleContextMenuAction = (action: selectedAction) => {
    let checkConnection = false;
    connections.forEach((item) => {
      if (
        item.startIconId === action.actionId ||
        item.endIconId === action.actionId
      ) {
        checkConnection = true;
        alert("Please Remove the Connection of it first");
      }
    });
    // if (!checkConnection) return;
    const updatedWorkflow = workflowActions.filter(
      (item) => item.actionId != action.actionId
    );
    setLastClickedActionId(null);
    setWorkflowActions(updatedWorkflow);
    // setContextMenuVisible(false); // Hide the context menu after the action is performed
  };

  // Handler for canceling the context menu
  const handleContextMenuCancel = () => {
    setContextMenuAction(null); // Hide the context menu
  };

  const handleDropConnection = (i: number) => {
    // Get the last connection from the connections array

    // // Check if a reverse connection exists (end to start)
    // const reverseConnectionIndex = connections.findIndex(
    //   (connection) =>
    //     connection.startIconId === lastConnection.endIconId &&
    //     connection.endIconId === lastConnection.startIconId
    // );

    // if (reverseConnectionIndex !== -1) {
    //   // A reverse connection exists, remove it from connections
    //   const updatedConnections = [...connections];
    //   updatedConnections.splice(reverseConnectionIndex, 1);
    //   setConnections(updatedConnections);
    // }

    // Remove the last connection from the connections state
    console.log(i);
    console.log("CONNETIONS", connections);
    let updatedConnections = [...connections];
    if (updatedConnections.length === 1 && i == 0) updatedConnections = [];
    else if (updatedConnections.length > 1) updatedConnections.splice(i, 1);

    console.log("uPDATED CONNETIONS", updatedConnections);
    setConnections(updatedConnections);
    setLastClickedActionId(null);
    // Clear the error message (if any)
    setErrorMessage(null);
  };

  const getActionStatusBorder = (action: selectedAction) => {
    if (Object.keys(selectedUserWorkflowJob || {}).length) {
      const found = selectedUserWorkflowJob?.actions?.find(
        (ele: any) => ele.actionId === action.actionId
      );
      if (found) {
        if (found?.status == "Running") return "border-4 border-yellow-500";
        if (found?.status == "Pending") return "border-4 border-slate-600";
        if (found?.status == "Success") return "border-4 border-lime-600";
        if (found?.status == "Failed") return "border-4 border-red-500";
      }
    } else return "border-0";
  };
  console.log(getActionStatusBorder(workflowActions[1]));
  return (
    <div className="relative bg-white h-screen flex-1">
      <Xwrapper>
        {!workflowActions.length && (
          <div className="text-center my-auto mt-[20%] text-3xl font-extrabold text-indigo-900">
           <ReactTyped
          strings={["Start the workflow by clicking on the menu"]}
          typeSpeed={100}
          loop
          backSpeed={20}
          cursorChar=">"
          showCursor={true}
        />
          </div>
        )}
        {workflowActions?.map((action, index) => (
          <Draggable
            onDrag={updateXarrow}
            onStop={updateXarrow}
            key={action.actionId}
            // onStop={handleDrop(action)}
            defaultPosition={{
              x: index * (ICON_SIZE + ICON_GAP) + 500,
              y: 100,
            }}
          >
            <div
              id={action.actionId}
              ref={contextMenuRef}
              className={`cursor-pointer relative flex w-fit    ${getActionStatusBorder(
                action
              )} p-1 ${
                lastClickedActionId === action.actionId ? "selected-icon" : ""
              }`}
              onClick={() => {
                console.log("in parent click");
                onActionClick(action);
              }}
              onContextMenu={(e) => handleContextMenu(e, action)}
            >
              {!!Object.keys(contextMenuAction || {}).length &&
                contextMenuAction?.actionId === action.actionId && (
                  <ContextMenu
                    action={contextMenuAction}
                    onDrop={() => handleContextMenuAction(action)}
                    onCancel={handleContextMenuCancel}
                  />
                )}
              <img
                src={action.app?.meta?.src}
                alt="Icon"
                width={ICON_SIZE}
                height={ICON_SIZE}
                data-for="actionTooltip"
                data-tip="Details"
              />
              <div className={`absolute bottom-16 left-0  `}>
                <ActionTooltip action={action} />
              </div>
            </div>
          </Draggable>
        ))}
        {!!connections?.length &&
          connections?.map((connection, index) => (
            <Xarrow
              key={connection.startIconId + connection.endIconId}
              start={`${connection.startIconId}`}
              end={`${connection.endIconId}`}
              lineColor="brown"
              labels={
                <span
                  className="cursor-pointer  "
                  onClick={() => handleDropConnection(index)}
                >
                  <ImCross size={20} />
                </span>
              }
            />
          ))}
      </Xwrapper>

      <style>
        {`.selected-icon {
          border: 2px solid blue;
        }
        .error-popup {
            top: 20px;
            right: 20px;
            background-color: red;
            color: white;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 200px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          }

        `}
      </style>
    </div>
  );
};

export default DragAndDropCanvas;
