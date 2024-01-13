import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../routers/realtime-chat";

type FuncParams = {
  userId: string;
  contactId: string;
};

export async function getContacts({
  userId,
}: Omit<FuncParams, "contactId">): Promise<string[] | undefined> {
  const params = {
    TableName: "Contacts",
    FilterExpression: "userId = :userId", // Filter by userId
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    ProjectionExpression: "contactId",
  };
  const command = new ScanCommand(params);
  const response = await ddbClient.send(command);

  const contactIds = response?.Items?.map((item) => item.contactId);
  return contactIds;
}

export async function saveContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Item: {
      userId: userId,
      contactId: contactId,
    },
  };
  const command = new PutCommand(params);
  return await ddbClient.send(command);
}

export async function deleteContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId: userId,
      contactId: contactId,
    },
  };
  const command = new DeleteCommand(params);
  return await ddbClient.send(command);
}

export async function getContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId: userId,
      contactId: contactId,
    },
  };
  const command = new GetCommand(params);
  return await ddbClient.send(command);
}
