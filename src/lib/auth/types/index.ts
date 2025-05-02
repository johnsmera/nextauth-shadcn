import type { Profile } from "next-auth";

export interface GoogleProfile extends Profile {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token?: string;
  token_type?: string;
  expires_at?: number;
  scope?: string;
  id_token?: string;
} 