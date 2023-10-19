import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import DragAndDropCanvas from "../DragAndDropCanvas";
import TriggerForm from "../TriggerForm";
import Action from "@/public/types/Action";
import { config } from "../../../config";
import { WorkflowDataContext } from "@/context";
import Application from "@/public/types/Application";
import ActionsForm from "./ActionsForm";
import { client } from "@/lib/gql-client";
import { ObjectId } from "bson";
import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  CreateWorkflowQuery,
  findfunctionsByApplicationId,
} from "@/lib/gql-queries";
import { Connection, CreateWorkflowInput } from "@/public/types/Workflow";
import { Spinner } from "@/components/reusables/Spinner";
import Link from "next/link";
import selectedAction from "@/public/types/selectedAction";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Toast, ToastType } from "@/components/reusables/Toast";
import { JobSection } from "./JobSection";

export default function CreateWorkflow() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [actionsLoader, setActionsLoader] = useState(false);
  const [isActionFormOpen, setIsActionFormOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [edit, setEdit] = useState(false);

  const {
    actions,
    selectedAction,
    isSidebarOpen,
    connections,
    lastClickedActionId,
    setActions,
    setWorkflowActions,
    workflowActions,
    setConnections,
    selectedUserWorkflowJob,
    setIsSidebarOpen,
    setLastClickedActionId,
    setSelectedAction,
    selectedApplication,
    selectedUserWorkflow,
    setSelectedUserWorkflow,
    setSelectedApplication,
    selectedUserWorkflowJobs,
    setSelectedUserWorkflowJobs,
    setSelectedUserWorkflowJob,
  } = useContext(WorkflowDataContext);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [toastData, setToastData] = useState<ToastType>({
    message: "",
    type: "error",
  });
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  useEffect(() => {
    console.log("use effetc", selectedUserWorkflow);
    if (Object.keys(selectedUserWorkflow || {}).length) {
      const selectedConnections: Connection[] =
        selectedUserWorkflow?.connections?.map((link: any) => {
          return {
            startIconId: link.startActionId,
            endIconId: link.endActionId,
          };
        });
      console.log("Selected Conn", selectedConnections);
      const actionObject: any = {};
      const workflowActionData: selectedAction[] =
        selectedUserWorkflow?.action.map((s: any) => {
          actionObject[s.id] = {
            installedApp: s.installedApp,
            actionId: s.id,
            ...s.actionTemplate,
          };
          return {
            installedApp: s.installedApp,
            actionId: s.id,
            ...s.actionTemplate,
          };
        });
      const workflowJobsData = selectedUserWorkflow?.workflowRunJobs?.map(
        (w: any) => {
          for (let i of w.ActionRun) {
            i = { i, ...actionObject[i.actionId] };
          }
          return {
            id: w.id,
            status: w.status,
            actions: w.ActionRun,
            connections: selectedConnections,
          };
        }
      );

      console.log("SELECTED_WORKFLOW", workflowJobsData);
      console.log("Workflow ACtion", workflowActionData);
      setWorkflowName(selectedUserWorkflow?.name);
      setSelectedUserWorkflowJobs(workflowJobsData);
      setConnections(selectedConnections);
      setWorkflowActions(workflowActionData);
      setEdit(true);
      setSelectedUserWorkflow(null);
    } else {
      setConnections([]);
      setWorkflowName("");

      setSelectedUserWorkflowJobs([]);
      setSelectedUserWorkflowJob(null);
      setEdit(false);
      setWorkflowActions([]);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedUserWorkflowJob || {}).length)
      setConnections(selectedUserWorkflowJob?.connections);
  }, [selectedUserWorkflowJob]);

  console.log("JOBS", selectedUserWorkflowJobs);
  console.log(connections);
  console.log("WORKFLOW_ACTIONS", workflowActions);
  console.log("SELECTED_USER_WORKFLOW", selectedUserWorkflow);
  const checkExistingConnection = (action1Id: string, action2Id: string) => {
    const newConnection: any = {
      startIconId: action1Id,
      endIconId: action2Id,
    };
    // Check for reverse connections
    const reverseConnection = connections.find(
      (connection) =>
        connection.startIconId === newConnection.endIconId &&
        connection.endIconId === newConnection.startIconId
    );

    // Check for loops (connections with the same start and end)
    const loopConnection = connections.find(
      (connection) =>
        connection.startIconId === newConnection.startIconId &&
        connection.endIconId === newConnection.endIconId
    );

    if (reverseConnection || loopConnection) {
      return false;
    } else {
      return true;
    }
  };
  const handleConnectIcons = (action1Id: string, action2Id: string) => {
    // Create a new connection object and add it to the connections state
    if (checkExistingConnection(action1Id, action2Id)) {
      const newConnection: any = {
        id: `${action1Id + action2Id}`, // You can generate a unique ID
        startIconId: action1Id,
        endIconId: action2Id,
      };

      setConnections((prevConnections) => [...prevConnections, newConnection]);
      setLastClickedActionId(null);
    } else {
      alert("Cannot make the connection!!");
    }
  };

  const dragActionClick = (action: Action) => {
    const actionId = action.actionId!;
    //iconIdCounter++;
    if (lastClickedActionId === actionId) {
      // Icon is already selected, deselect it
      setLastClickedActionId(null);
    } else {
      // Icon is not selected, select it
      if (lastClickedActionId) {
        // If a previous icon was selected, establish a connection
        handleConnectIcons(lastClickedActionId, actionId);
      }
      setLastClickedActionId(actionId);
    }
  };
  const handleActionClick = (action: Action, installedAppId: string | null) => {
    setSelectedAction({ ...action, installedAppId: installedAppId });
    setIsActionFormOpen(false);
    setIsFormOpen(true);
  };
  const handleApplicationClick = (application: Application) => {
    setSelectedApplication(application);
    const getFunctionOfApplication = async () => {
      setActionsLoader(true);
      try {
        const variables = { applicationId: application.id };
        const response: any = await client.request(
          findfunctionsByApplicationId,
          variables
        );
        setActions(response.findAllAction);
        console.log("RESPONSE FROM GRAPHQL-REQUEST API CALL", response);
        // Update state with the response data as needed
        // For example, setApplications(response.appFindAll)
      } catch (err) {
        console.log("ERROR FROM GRAPHQL-REQUEST API CALL", err);
      } finally {
        setActionsLoader(false);
      }
    };
    getFunctionOfApplication();
    setIsActionFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedAction(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = (formData: any) => {
    // Handle form submission data here
    console.log("76", {
      ...selectedAction,
      actionId: new ObjectId(),
      formData,
    });
    if (selectedAction && workflowActions)
      setWorkflowActions([
        ...workflowActions,
        { ...selectedAction, actionId: new ObjectId().toString(), formData },
      ]);

    // Close the form
    setLastClickedActionId(null);
    handleCloseForm();
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  const createWorkflow = () => {
    const workflowData = workflowActions.map((w) => {
      return {
        actionTemplateId: w.id,
        //actionId:w.actionId,
        installedAppId: w.installedAppId,
        id: w.actionId,
        //type: w.type,
        inputValues: JSON.stringify(w.formData),
      };
    });

    const formattedConnections = connections.map((c) => {
      return {
        startActionId: c.startIconId,
        endActionId: c.endIconId,
      };
    });
    const workflowObject: CreateWorkflowInput = {
      name: workflowName,
      Connections: formattedConnections,
      Action: workflowData,
      createdById: "652318b5a467e2315c31b725",
    };

    (async function createWorkflow() {
      try {
        console.log("WORKFLOW_OBJECT", workflowObject);
        const variables = { createWorkflowInput: workflowObject };
        const response = await client.request(CreateWorkflowQuery, variables);
        console.log("RESPONSE", response);
        //setApplications(response.appFindAll);
        console.log("RESPONSE FROM GRAPHQL-REQUEST API CALL", response);
        setToastData({
          message: "Workflow created successfully",
          type: "success",
        });

        // Update state with the response data as needed
        // For example, setApplications(response.appFindAll)
      } catch (err) {
        console.log("ERROR FROM GRAPHQL-REQUEST API CALL", err);
        setToastData({
          message: "Error creating workflow",
          type: "error",
        });
      } finally {
        setSelectedUserWorkflowJob(null);
        setTimeout(() => {
          setToastData({ ...toastData, message: "" });
        }, 3000);
      }
    })();
  };

  return (
    <>
      <div className="flex ">
        <Sidebar
          onApplicationClick={handleApplicationClick}
          isSidebarOpen={isSidebarOpen} // Pass sidebar visibility state
          toggleSidebar={toggleSidebar}
        />
        <div className={`sidebar-toggle ${isSidebarOpen ? "open" : ""} `}>
          <div className="flex justify-between items-center  w-screen px-8 py-4 bg-white border-b-4  border-b-indigo-300">
            <div className="flex gap-4">
            <Link href='/home'>
              <div className="flex gap-1 items-center">
               
                <Image src="/logo.png" alt={"logo"} width="40" height="40" />
                <span className="text-sm font-extrabold tracking-wider text-indigo-900">
                  PIPECHAIN
                </span>
               
              </div>
              </Link>
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Workflow name"
                className=" hover:border-b-[1px]  hover:border-b-slate-700 px-4 focus:outline-none text-lg font-semibold"
              ></input>
            </div>
            <div className="flex gap-4">
              {/* <WalletMultiButton
            style={{
              height: "36px",
              padding: "10px",
              borderRadius: "12px",
              fontSize: "0.875rem",
              background: "rgb(129 140 248)",
            }}
          /> */}
              {!!workflowActions?.length && (
                <button
                  className=" text-white text-sm font-bold p-2 rounded-lg bg-indigo-400 cursor-pointer"
                  onClick={createWorkflow}
                >
                  {edit ? "Edit " : "Create "} Workflow
                </button>
              )}
              <button onClick={toggleSidebar}>
                <div
                  className={`HAMBURGER-ICON ${
                    isSidebarOpen ? "open" : "closed"
                  } space-y-2  border-[1.5px] border-gray-500 p-[6px] rounded-lg `}
                >
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                </div>
              </button>
            </div>
          </div>
          <div className="relative">
            <DragAndDropCanvas onActionClick={dragActionClick} />
            {edit && <JobSection />}
          </div>

          {isFormOpen && (
            <TriggerForm
              isOpen={isFormOpen}
              onClose={handleCloseForm}
              onSubmit={handleFormSubmit}
            />
          )}
          {isActionFormOpen && !actionsLoader && (
            <ActionsForm
              actions={actions}
              onActionClick={handleActionClick}
              onClose={() => setIsActionFormOpen(false)}
            />
          )}
          {actionsLoader && <Spinner />}
        </div>
      </div>

      {toastData?.message && (
        <Toast message={toastData.message} type={toastData.type} />
      )}
    </>
  );
}

//solana usage

// https://github.com/solana-labs/wallet-adapter/blob/master/APP.md
