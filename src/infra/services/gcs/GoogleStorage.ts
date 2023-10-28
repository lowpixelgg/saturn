import express from 'express';
import multer from 'multer';
import BucketName from '@infra/libs/gcloud/storage';
import { publicURL } from '@infra/http/helpers/gcloud-helpers';
import { Bucket } from '@google-cloud/storage';

class UploadService {
  private multerMiddleware: multer.Multer;

  constructor() {
    this.multerMiddleware = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 150 * 1024 * 1024,
      },
    });
  }

  uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const fileName = `${folder}/${Date.now()}-${file.originalname}`;
      const blob = BucketName.file(fileName);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        return resolve(publicURL(fileName, BucketName.name));
      });

      blobStream.end(file.buffer);
    });
  }
}

export default new UploadService();
