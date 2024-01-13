import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../routers/realtime-chat";
import { Message } from "~/types/Socket";
import { SaveMessage } from "~/validation/message";

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
