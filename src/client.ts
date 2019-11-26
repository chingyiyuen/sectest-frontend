import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { AWSAppSyncConfigs } from "./aws-exports";

const client = new AWSAppSyncClient({
  url: AWSAppSyncConfigs.AWS_APPSYNC_GRAPHQL_ENDPOINT || "",
  region: AWSAppSyncConfigs.AWS_APPSYNC_REGION || "",
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AWSAppSyncConfigs.AWS_APPSYNC_API_KEY || ""
  }
});

export default client;
