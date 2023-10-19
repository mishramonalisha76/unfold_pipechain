import { GraphQLClient} from 'graphql-request';
import { BACKEND_URL } from "@/lib/constants";

export const client = new GraphQLClient(BACKEND_URL);