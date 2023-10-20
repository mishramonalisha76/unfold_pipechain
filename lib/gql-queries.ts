import { gql } from 'graphql-request';

export const findAllApplicationQuery = gql`
  query appFindAll{
    appFindAll{
      id
      name
      description
      meta
      InstalledApp {
        id
        name
        inputValues
      }
    }
  }`;

export const findfunctionsByApplicationId = gql`
   query findAllAction($applicationId: String!){
    findAllAction(applicationId:$applicationId)
    {
      id
      name
      functionName
      type
      inputSchema
      outputSchema
      appId
      app {
        name
        meta
      }
      installedApp{
        id
        name
      }
    
    }
   }
`

export const CreateWorkflowQuery = gql`
mutation createWorkflow($createWorkflowInput: CreateWorkflowInput!) {
  createWorkflow(createWorkflowInput: $createWorkflowInput) {
    id
  }
}
`

export const createInstalledApp = gql`
mutation createInstalledApp($createInstalledAppInput: createInstalledAppInput) {
  createInstalledApp(createInstalledAppInput: $createInstalledAppInput)
}`

export const getWorkflowQuery = gql`
query getAllWorkflow{
  getAllWorkflow
  {
    id
    name
    action {
      id
      installedApp {
        userId
        id
      }
      actionTemplate{
        id
        name
        functionName
        app {
          id
          name
          description
          meta
        }
      }
    }
    connections {
      id
      startActionId
      endActionId
    }
    workflowRunJobs{
      id
      status
      ActionRun {
        id
        actionId
        status
      }
    }
  }
}`