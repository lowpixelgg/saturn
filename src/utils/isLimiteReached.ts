interface FileLimits {
  fileType: string;
  maxSizeInBytes: number;
}

export function isLimitReached(
  limits: FileLimits[],
  file: Express.Multer.File
): boolean {
  const fileType = file.mimetype;
  const fileSize = file.size;

  console.log(fileType);

  const limit = limits.find(item => item.fileType === fileType);

  if (!limit || fileSize >= limit.maxSizeInBytes) {
    return true;
  }

  return false;
}
