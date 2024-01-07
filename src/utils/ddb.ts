import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "eu-west-2" });

// Define the structure of your DynamoDB item
interface MyDynamoDBItem {
  messageId: string;
  senderId: string;
  timestamp: string;
  message: string;
}

// Interface for the result of GetItemCommand with the original Item type
interface MyGetItemCommandOutput extends GetItemCommandOutput {
  Item?: Record<string, AttributeValue>;
}

export default function getData(): Promise<MyGetItemCommandOutput | null> {
  const params: GetItemCommandInput = {
    TableName: "ChatHistory",
    Key: {
      messageId: { S: "yourMessageId" }, // Adjust as needed
    },
  };
  return createRequest(params);
}

async function createRequest(
  params: GetItemCommandInput,
): Promise<MyGetItemCommandOutput | null> {
  const command = new GetItemCommand(params);

  try {
    const result = await dynamoDBClient.send(command);

    if (result.Item) {
      // Parse and return the DynamoDB item with the specific structure
      return result;
    } else {
      console.log("Item not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error);
    throw error;
  }
}

// function parseDynamoDBItem(
//   item: Record<string, AttributeValue>,
// ): MyDynamoDBItem {
//   // Parse and extract values from the DynamoDB item
//   return {
//     messageId: item.messageId.S ?? "",
//     senderId: item.senderId.S ?? "",
//     timestamp: item.timestamp.S ?? "",
//     message: item.message.S ?? "",
//   };
// }
