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
  exclusiveStartKey = undefined,
}: {
  primaryKey: string;
  limit?: number;
  exclusiveStartKey?: Record<string, string>;
}) {
  const params = {
    TableName: "History",
    KeyConditionExpression: "primaryKey = :primaryKey",
    Limit: limit,
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":primaryKey": primaryKey,
    },
    ExclusiveStartKey: exclusiveStartKey,
  };

  const command = new QueryCommand(params);
  const response = await ddbClient.send(command);

  const items = response?.Items as Message[];
  const lastEvaluatedKey = response?.LastEvaluatedKey;

  return { items, lastEvaluatedKey };
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
