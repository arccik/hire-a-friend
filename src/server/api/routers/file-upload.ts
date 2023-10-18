import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const uploaderRouter = createTRPCRouter({
  getUrl: protectedProcedure
    .input(z.object({ fileName: z.string(), fileType: z.string() }))
    .mutation(async ({ input }) => {
      const s3Client = new S3Client({});
      const fileName = new Date().toDateString() + "-" + input.fileName;
      return await createPresignedPost(s3Client, {
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Fields: {
          key: fileName,
          "Content-Type": input.fileType,
        },
        Expires: 600, // seconds
        Conditions: [
          ["content-length-range", 0, 10048576], // up to 10 MB
        ],
      });
    }),
  delete: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      const client = new S3Client({});
      const toDelete = input.url.split("/").at(-1);
      const confing = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: toDelete,
      };
      const command = new DeleteObjectCommand(confing);
      await client.send(command);
    }),
});
