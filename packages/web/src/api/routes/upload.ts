import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { admin } from "../middleware/admin";
import { s3, publicUrl } from "../lib/s3";
export const upload = {
  presign: admin
    .input(
      z.object({
        contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
        size: z
          .number()
          .int()
          .min(1)
          .max(10 * 1024 * 1024),
      }),
    )
    .handler(async ({ input }) => {
      const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[
        input.contentType
      ];
      const key = `case-studies/${crypto.randomUUID()}.${extension}`;
      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          ContentType: input.contentType,
          ACL: "public-read",
          ContentLength: input.size,
        }),
        { expiresIn: 300, signableHeaders: new Set(["x-amz-acl"]) },
      );
      return { url, publicUrl: publicUrl(key) };
    }),
};
