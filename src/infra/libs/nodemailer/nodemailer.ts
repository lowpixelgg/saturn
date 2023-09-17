import nodemailer from 'nodemailer';
import config from '@configs/mailer';

export default nodemailer.createTransport(config);
