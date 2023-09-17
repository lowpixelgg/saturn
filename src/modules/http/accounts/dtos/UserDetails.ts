export type UserDetails = {
  id: string;
  email: string;
  username: string;
  role: string;
  isPremium: boolean;
  isVerified: boolean;
  auth_system: string;
  features: string[];
  status: string;
  timeout: number;
  createdAt: Date;
};
