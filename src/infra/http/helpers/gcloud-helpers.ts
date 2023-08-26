export const publicURL = (filename: string, bucketname: string): string =>
  `https://storage.googleapis.com/${bucketname}/${filename}`

export const getFileKey = (url: string): any => {
  const [bucket, folder, key] = url.split('/').slice(3)
  return { bucket, folder, key }
}
