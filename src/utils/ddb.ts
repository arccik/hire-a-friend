import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { env } from "~/env.mjs";

const client = new DynamoDBClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

type PutMessageParams = {
  primaryKey: string;
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: string;
};
type SaveContactParams = {
  userId: string;
  contactId: string;
};
export const saveMessage = async (item: PutMessageParams) => {
  const params = {
    TableName: "ChatHistory",
    Item: item,
  };
  const command = new PutCommand(params);
  return client.send(command);
};
// chatId example > userId:recipientId
export const getMessage = async (chatId: string) => {
  const params = {
    TableName: "ChatHistory",
    Key: {
      primaryKey: { S: chatId },
    },
  };
  const command = new GetCommand(params);
  return client.send(command);
};
export const deleteMessage = (chatId: string) => {
  const params = {
    TableName: "ChatHistory",
    Key: {
      primaryKey: { S: chatId },
    },
  };
  const command = new DeleteCommand(params);
  return client.send(command);
};
export const saveContact = ({ userId, contactId }: SaveContactParams) => {
  const params = {
    TableName: "ChatContactsList",
    Key: {
      userId,
    },
    UpdateExpression: "ADD #contactsIds :contactId",
    ExpressionAttributeNames: {
      "#contactsIds": "contactsIds",
    },
    ExpressionAttributeValues: {
      ":contactId": [contactId],
    },
  };
  const command = new UpdateCommand(params);
  return client.send(command);
};
export const deleteContact = (id: string) => {
  const params = {
    TableName: "ChatContactsList",
    Key: {
      id: { S: id },
    },
  };
  const command = new DeleteCommand(params);
  return client.send(command);
};
