import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { z } from "zod";
import { env } from "~/env.mjs";
import { generateFileName } from "~/helpers/uploader";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCClientError } from "@trpc/client";

export const uploaderRouter = createTRPCRouter({
  getUrl: protectedProcedure
    .input(z.object({ fileType: z.string(), fileName: z.string() }))
    .mutation(async ({ input }) => {
      const s3Client = new S3Client({});

      return await createPresignedPost(s3Client, {
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
      });
    }),

  getSignedURL: protectedProcedure
    .input(
      z.object({
        checksum: z.string(),
        fileType: z.string(),
        fileSize: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const allowedFileTypes = ["image/jpeg", "image/png"];

      if (!allowedFileTypes.includes(input.fileType)) {
        throw new TRPCClientError("Invalid file type");
      }
      const s3Client = new S3Client({});
      const fileName = generateFileName();
      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        ContentType: input.fileType,
        ContentLength: input.fileSize,
        ChecksumSHA256: input.checksum,
      });

      const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60 }, // 60 seconds
      );
      return url;
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
