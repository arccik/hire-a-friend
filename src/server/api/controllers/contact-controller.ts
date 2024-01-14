import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "../routers/realtime-chat";
import { deleteChatHistory } from "./chat-controller";

type FuncParams = {
  userId: string;
  contactId: string;
};

export async function getContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId: userId,
      contactId: contactId,
    },
  };
  const command = new GetCommand(params);
  try {
    return await ddbClient.send(command);
  } catch (error) {
    console.error(error);
    // return { status: "error", message: "Error getting contact" };
    throw error; // Re-throw the error for further handling
  }
}

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
  try {
    const response = await ddbClient.send(command);

    const contactIds: string[] | undefined = response?.Items?.map(
      (item) => item.contactId as string,
    );
    return contactIds;
  } catch (error) {
    console.error(error);
    // return undefined;
    throw error; // Re-throw the error for further handling
  }
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
  try {
    return await ddbClient.send(command);
  } catch (error) {
    console.error(error);
    // return { status: "error", message: "Error saving contact" };
    throw error; // Re-throw the error for further handling
  }
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
  try {
    await ddbClient.send(command);
    await deleteChatHistory({ userId, contactId });
    return { status: "success", message: "Contact deleted successfully" };
  } catch (error) {
    console.error(error);
    // return { status: "error", message: "Error deleting contact" };
    throw error; // Re-throw the error for further handling
  }
}

export async function blockContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId: userId,
      contactId: contactId,
    },
    UpdateExpression: "set blocked = :blocked",
    ExpressionAttributeValues: {
      ":blocked": true,
    },
  };
  const command = new UpdateCommand(params);
  try {
    return await ddbClient.send(command);
  } catch (error) {
    console.error(error);
    // return { status: "error", message: "Error blocking contact" };
    throw error; // Re-throw the error for further handling
  }
}

export async function unblockContact({ userId, contactId }: FuncParams) {
  const params = {
    TableName: "Contacts",
    Key: {
      userId: userId,
      contactId: contactId,
    },
    UpdateExpression: "set blocked = :blocked",
    ExpressionAttributeValues: {
      ":blocked": false,
    },
  };
  const command = new UpdateCommand(params);
  try {
    return await ddbClient.send(command);
  } catch (error) {
    console.error(error);
    // return { status: "error", message: "Error unblocking contact" };
    throw error; // Re-throw the error for further handling
  }
}

export async function isBlocked({ userId, contactId }: FuncParams) {
  const contact = await getContact({ userId, contactId });
  if (!contact) return false;
  if ("Item" in contact) return contact?.Item?.blocked as boolean;
}

export async function isOnline({ userId }: { userId: string }) {
  const params = {
    TableName: "ChatConnections",
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId },
  };
  const command = new ScanCommand(params);

  try {
    const data = await ddbClient.send(command);
    // console.log("isOnline::: ", data);
    if (!data.Count) return false;
    return true;
  } catch (error) {
    console.error("Error querying DynamoDB:isConnected", error);
    throw error; // Re-throw the error for further handling
  }
}