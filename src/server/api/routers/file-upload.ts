// import { S3Client } from "@aws-sdk/client-s3";
// import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { z } from "zod";
// import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const uploaderRouter = createTRPCRouter({
  getUrl: protectedProcedure
    .input(z.object({ fileName: z.string(), fileType: z.string() }))
    .mutation(({ input }) => {
      // const s3Client = new S3Client({});
      return true;
      // return await createPresignedPost(s3Client, {
      //   Bucket: env.AWS_BUCKET_NAME,
      //   Key: "file Name",
      //   Fields: {
      //     acl: "public-read",
      //     "Content-Type": "image/png",
      //   },
      //   Expires: 600, // seconds
      //   Conditions: [
      //     ["content-length-range", 0, 1048576], // up to 1 MB
      //   ],
      // });
    }),
});
