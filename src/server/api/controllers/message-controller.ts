import { PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../routers/chat";
import type { Message } from "~/components/chat/ChatBody";
import { type SaveMessage } from "~/validation/message";

type FuncParams = {
  userId: string;
  contactId: string;
};

export async function saveMessage(message: SaveMessage) {
  const params = {
    TableName: "History",
    Item: message,
  };
  const command = new PutCommand(params);
  return await ddbClient.send(command);
}

export async function getMessages({
  primaryKey,
  limit = 11,
}: {
  primaryKey: string;
  limit?: number;
}) {
  const params = {
    TableName: "History",
    KeyConditionExpression: "primaryKey = :primaryKey",
    Limit: limit,
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":primaryKey": primaryKey,
    },
  };

  const command = new QueryCommand(params);
  const response = await ddbClient.send(command);
  return response?.Items as Message[];
}

export async function deleteMessage({ userId }: FuncParams) {
  const params = {
    TableName: "History",
    Key: {
      userId,
    },
  };
  const command = new DeleteCommand(params);
  await ddbClient.send(command);
  return { status: "ok" }; // Return a response indicating the message was deleted successfully
}
