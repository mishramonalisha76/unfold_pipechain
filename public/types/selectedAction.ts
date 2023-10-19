import dynamicSchema from "./Action";

export default interface selectedAction  {
    id: string;
    name: string;
    type:string;
    formData?:any;
    actionId?:string;
    inputSchema?:dynamicSchema | null;
    app:any;
    schema: any;
    uiSchema: any;
    installedApp:any;
    installedAppId:any;
}