import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

function getStorageConfig() {
  return {
    endpoint: process.env.S3_ENDPOINT?.replace(/\/$/, ""),
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    publicBaseUrl: process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, ""),
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  };
}

function normalizePublicBaseUrl({
  endpoint,
  bucket,
  publicBaseUrl,
}: {
  endpoint: string;
  bucket: string;
  publicBaseUrl: string;
}) {
  const normalized = publicBaseUrl.replace(/\/$/, "");

  if (normalized === `${endpoint}/${bucket}` && endpoint.includes("storage.yandexcloud.net")) {
    return `https://${bucket}.storage.yandexcloud.net`;
  }

  return normalized;
}

function sanitizeFilename(filename: string) {
  const parts = filename.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";
  const base = parts.join(".") || "image";
  const safeBase = base.toLowerCase().replace(/[^a-z0-9-_]+/g, "-").replace(/-+/g, "-");
  const safeExt = extension?.toLowerCase().replace(/[^a-z0-9]+/g, "");

  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}

function requireStorageClient() {
  const config = getStorageConfig();

  if (
    !config.endpoint ||
    !config.region ||
    !config.bucket ||
    !config.accessKeyId ||
    !config.secretAccessKey ||
    !config.publicBaseUrl
  ) {
    throw new Error(
      "Object Storage не настроено. Укажите S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY и S3_PUBLIC_BASE_URL.",
    );
  }

  return {
    bucket: config.bucket,
    publicBaseUrl: normalizePublicBaseUrl({
      endpoint: config.endpoint,
      bucket: config.bucket,
      publicBaseUrl: config.publicBaseUrl,
    }),
    client: new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }),
  };
}

export async function uploadCaseImage(file: File) {
  const { client, bucket, publicBaseUrl } = requireStorageClient();
  const originalBuffer = Buffer.from(await file.arrayBuffer());
  const shouldOptimize =
    file.type.startsWith("image/") &&
    file.type !== "image/svg+xml" &&
    file.type !== "image/gif";

  const optimizedBuffer = shouldOptimize
    ? await sharp(originalBuffer)
        .rotate()
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 86,
          effort: 4,
        })
        .toBuffer()
    : originalBuffer;

  const originalName = sanitizeFilename(file.name);
  const optimizedName = shouldOptimize
    ? `${originalName.replace(/\.[^.]+$/, "") || "image"}.webp`
    : originalName;
  const key = `cases/${Date.now()}-${crypto.randomUUID()}-${optimizedName}`;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: optimizedBuffer,
      ContentType: shouldOptimize ? "image/webp" : file.type || "application/octet-stream",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return `${publicBaseUrl}/${key}`;
}
