export default interface dynamicSchema  {
    schema:any,
    uiSchema:any
}
export default interface Action {
    id: string;
    type:string;
    name: string;
    actionId?:string;
    inputSchema?: dynamicSchema | null;
    app:any;
    installedApp:any[]
}