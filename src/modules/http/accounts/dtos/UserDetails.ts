export type UserDetails = {
  id: string;
  email: string;
  username: string;
  role: string;
  isPremium: boolean;
  isEarlySupporter: boolean;
  isVerified: boolean;
  auth_system: string;
  features: string[];
  status: string;
  timeout: number;
  createdAt: Date;
};
