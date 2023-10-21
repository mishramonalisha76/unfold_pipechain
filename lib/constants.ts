//export const BACKEND_URL = "/graphql"
//export const BACKEND_URL = "https://pipe-chain-kngs-j3rzx36ey-mishramonalisha76.vercel.app/graphql"
export const BACKEND_URL = "/graphql"

export const StatusColor = {
    Running:'yellow-500',
    Failed:'red-500',
    Success:'lime-600',
    Pending:'slate-600'
}

export type StatusKeys  =  keyof typeof StatusColor;
