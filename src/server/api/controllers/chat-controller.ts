import { PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../routers/realtime-chat";

type FuncParams = {
  userId: string;
  contactId: string;
};

export async function getChatHistory({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Item: {
      userId,
      contactId,
    },
  };
  const command = new PutCommand(params);
  return await ddbClient.send(command);
}
export async function deleteChatHistory({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId,
      contactId,
    },
  };
  const command = new DeleteCommand(params);
  return await ddbClient.send(command);
}
