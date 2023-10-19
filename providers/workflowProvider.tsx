import { WorkflowDataContext } from "@/context";
import { IWorkflowDataContextValues } from "@/context/workflowContext";
import { client } from "@/lib/gql-client";
import { findAllApplicationQuery } from "@/lib/gql-queries";
import Action from "@/public/types/Action";
import Application from "@/public/types/Application";
import selectedAction from "@/public/types/selectedAction";
import { Connection } from "@/public/types/Workflow";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

export interface IWorkflowDataProviderProps {
  children: ReactNode;
}

export function WorkflowDataProvider({ children }: IWorkflowDataProviderProps) {
  const [selectedAction, setSelectedAction] = useState<selectedAction | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  const [selectedStartAction, setSelectedStartAction] = useState<any | null>(null);
  const [selectedEndAction, setSelectedEndAction] = useState<any | null>(null);
  const [actions, setActions] = useState<Action[]>([]);
   const [userWorkflows, setUserWorkflows] = useState<any[]>([])
  //   {
  //     name:'NFT mint workflow',
  //     links: [
  //       {
  //         startConnectionId: '65281faac15c142df43bc2ac',
  //         endConnectionId: '6526cf3b42235506407672fe'
  //       }
  //     ],
  //     actionTemplate: [
  //       {
  //         id: '6526cf3b42235506407672fe',
  //         type: 'Trigger',
  //         inputsValue: '{"firstName":"Chuck","lastName":"msg send"}',
  //         name:'Post Message',
  //         app:{name:'slack',
  //         meta:{
  //           src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
  //         }
        
  //       }
  //       },
  //       {
  //         id: '65281faac15c142df43bc2ac',
  //         type: 'Trigger',
  //         inputsValue: '{"firstName":"Chuck","lastName":"send nft"}',
  //         name:'Listen Message',
  //         app:{name:'whatsap',
  //         meta:{
  //           src:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
  //         }
  //       }
  //       }
  //     ]
  //   }]
  //);
  const [selectedUserWorkflow, setSelectedUserWorkflow] = useState<any>();
  const [selectedUserWorkflowJobs, setSelectedUserWorkflowJobs] = useState<any[]>([]);
  const [selectedUserWorkflowJob, setSelectedUserWorkflowJob] = useState<any>();

  const [applications, setApplications] = useState<Application[]>([]);
  const [workflowActions, setWorkflowActions] = useState<selectedAction[]>([]);

  const [connections, setConnections] = useState<Connection[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [lastClickedActionId, setLastClickedActionId] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Define your API call function within the useEffect
    const getAllApplication = async () => {
      try {
        const response:any = await client.request(findAllApplicationQuery);
        setApplications(response.appFindAll);
        console.log('RESPONSE FROM GRAPHQL-REQUEST API CALL', response);
        // Update state with the response data as needed
        // For example, setApplications(response.appFindAll)
      } catch (err) {
        console.log('ERROR FROM GRAPHQL-REQUEST API CALL', err);
      }
    };

    // Call the API function
    getAllApplication();
  }, []);

  let sharedState: IWorkflowDataContextValues = {
    selectedAction: selectedAction,
    setSelectedAction: setSelectedAction,
    userWorkflows:userWorkflows,
    setUserWorkflows:setUserWorkflows,
    selectedUserWorkflow:selectedUserWorkflow,
    setSelectedUserWorkflow:setSelectedUserWorkflow,
    selectedUserWorkflowJobs:selectedUserWorkflowJobs,
    setSelectedUserWorkflowJobs:setSelectedUserWorkflowJobs,
    selectedUserWorkflowJob:selectedUserWorkflowJob,
    setSelectedUserWorkflowJob:setSelectedUserWorkflowJob,
    selectedApplication:selectedApplication,
    setSelectedApplication:setSelectedApplication,
    selectedEndAction:selectedEndAction,
    selectedStartAction:selectedStartAction,
    setSelectedEndAction:setSelectedEndAction,
    setSelectedStartAction:setSelectedStartAction,
    applications:applications,
    setApplications:setApplications,
    workflowActions: workflowActions,
    setWorkflowActions: setWorkflowActions,
    actions: actions,
    setActions: setActions,
    connections: connections,
    setConnections: setConnections,
    isSidebarOpen: isSidebarOpen,
    setIsSidebarOpen: setIsSidebarOpen,
    lastClickedActionId: lastClickedActionId,
    setLastClickedActionId: setLastClickedActionId,
  };

  return (
    <WorkflowDataContext.Provider value={sharedState}>
      {children}
    </WorkflowDataContext.Provider>
  );
}
