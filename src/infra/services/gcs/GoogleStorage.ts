import express from 'express';
import multer from 'multer';
import BucketName from '@infra/libs/gcloud/storage';
import { publicURL } from '@infra/http/helpers/gcloud-helpers';
import { Bucket } from '@google-cloud/storage';
import { getMimeTypeAndExtensionFromBase64 } from '@utils/getMimeType';

interface CommonReturn {
  fileKey: string;
  url: string;
}

class UploadService {
  constructor() {}

  upload(file: Express.Multer.File, folder: string): Promise<CommonReturn> {
    return new Promise(async (resolve, reject) => {
      const fileName = `${folder}/${Date.now()}-${file.originalname}`;
      const blob = BucketName.file(fileName);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        return resolve({
          fileKey: fileName,
          url: publicURL(fileName, BucketName.name),
        });
      });

      blobStream.end(file.buffer);
    });
  }

  uploadBase64(file: string, folder: string): Promise<CommonReturn> {
    return new Promise(async (resolve, reject) => {
      const { extension, mimeType } = getMimeTypeAndExtensionFromBase64(file);

      if (!extension || !mimeType) {
        return reject(new Error('Is not a base64 file'));
      }

      const b64 = file.replace(/^data:image\/\w+;base64,/, '');
      const fileName = `${folder}/${Date.now()}-${Date.now()}.${extension}`;
      const blob = BucketName.file(fileName);
      const buffer = Buffer.from(b64, 'base64');
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        return resolve({
          fileKey: fileName,
          url: publicURL(fileName, BucketName.name),
        });
      });

      blobStream.end(buffer);
    });
  }

  delete(key: string) {
    return new Promise(async (resolve, reject) => {
      const file = BucketName.file(key);
      const exists = await file.exists();

      if (exists[0]) {
        await file.delete();

        return resolve(true);
      } else {
        return reject(new Error('File dont exists'));
      }
    });
  }
}

export default new UploadService();
