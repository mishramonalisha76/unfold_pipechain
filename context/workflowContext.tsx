import Action from "@/public/types/Action";
import Application from "@/public/types/Application";
import selectedAction from "@/public/types/selectedAction";
import { Connection } from "@/public/types/Workflow";
import { createContext } from "react";

export interface IWorkflowDataContextValues {
  selectedAction: selectedAction | null;
  setSelectedAction: React.Dispatch<React.SetStateAction<any | null>>;
  selectedApplication: any | null;
  setSelectedApplication: React.Dispatch<React.SetStateAction<any | null>>;
  selectedStartAction: any | null;
  setSelectedStartAction: React.Dispatch<React.SetStateAction<any | null>>;
  selectedEndAction: any | null;
  setSelectedEndAction: React.Dispatch<React.SetStateAction<any | null>>;
  workflowActions: selectedAction[] | [];
  setWorkflowActions: React.Dispatch<React.SetStateAction<selectedAction[]>>;
  userWorkflows:any[];
  setUserWorkflows: React.Dispatch<React.SetStateAction<any[]>>;
  selectedUserWorkflow:any;
  setSelectedUserWorkflow: React.Dispatch<React.SetStateAction<any>>;
  selectedUserWorkflowJobs:any[];
  setSelectedUserWorkflowJobs: React.Dispatch<React.SetStateAction<any[]>>;
  selectedUserWorkflowJob:any;
  setSelectedUserWorkflowJob: React.Dispatch<React.SetStateAction<any>>;
  actions: Action[] | [];
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
  applications: Application[] | [];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<any[]>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lastClickedActionId: string|null;
  setLastClickedActionId: React.Dispatch<React.SetStateAction<string|null>>;
}

export const initialWorkflowDataContextValues: IWorkflowDataContextValues = {
  selectedAction: null,
  setSelectedAction: () => {
    /** */
  },
  selectedApplication: null,
  setSelectedApplication: () => {
    /** */
  },
  selectedStartAction: null,
  setSelectedStartAction: () => {
    /** */
  },
  selectedEndAction: null,
  setSelectedEndAction: () => {
    /** */
  },
  userWorkflows: [],
  setUserWorkflows: () => {
    /** */
  },
  selectedUserWorkflow: null,
  setSelectedUserWorkflow: () => {
    /** */
  },
  selectedUserWorkflowJobs: [],
  setSelectedUserWorkflowJobs: () => {
    /** */
  },
  selectedUserWorkflowJob: [],
  setSelectedUserWorkflowJob: () => {
    /** */
  },
  actions:   []
  ,
  setActions: () => {
    /** */
  },
  applications:   []
  ,
  setApplications: () => {
    /** */
  },
  workflowActions:   []
  ,
  setWorkflowActions: () => {
    /** */
  },
  connections: [],
  setConnections: () => {
    /**  */
  },
  isSidebarOpen: false,
  setIsSidebarOpen: () => {
    /**  */
  },
  lastClickedActionId:null,
  setLastClickedActionId: () => {
    /**  */
  },
};

export const WorkflowDataContext = createContext<IWorkflowDataContextValues>(
  initialWorkflowDataContextValues
);
