export interface Connections {
    startActionId: string;
    endActionId: string;
  }
  
  export interface ActionInputs {
    actionTemplateId: string;
    //type: string; 
    inputValues: string;
    actionId?:string;
    installedAppId:string;
  }

  export interface Connection {
    startIconId: string;
    endIconId: string;
  }
  
  export interface CreateWorkflowInput {
    name: string;
    createdById: string
    Connections: Connections[];
    Action: ActionInputs[];
  }