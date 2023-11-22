import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const uploaderRouter = createTRPCRouter({
  getUrl: protectedProcedure
    .input(z.object({ fileType: z.string(), fileName: z.string() }))
    .mutation(async ({ input }) => {
      const s3Client = new S3Client({});

      return await createPresignedPost(
        s3Client,
        {
          Bucket: env.AWS_BUCKET_NAME,
          Key: uuidv4(),
          Conditions: [
            ["content-length-range", 0, 10485760], // up to 10 MB
            ["starts-with", "$Content-Type", input.fileType],
          ],
          Fields: {
            acl: "public-read",
            "Content-Type": input.fileType,
          },
          Expires: 600,
        },

        //   {
        //   Bucket: env.AWS_BUCKET_NAME,
        //   Key: input.fileName,
        //   Fields: {
        //     key: input.fileName,
        //     "Content-Type": input.fileType,
        //   },
        //   Expires: 600, // seconds
        //   Conditions: [
        //     ["content-length-range", 0, 10048576], // up to 10 MB
        //   ],
        // }
      );
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
