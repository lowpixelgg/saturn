import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GCP_PROJECTID,
  keyFilename: process.env.GCP_KEYFILENAME,
})

export default storage.bucket(process.env.GCP_BUCKETNAME)
