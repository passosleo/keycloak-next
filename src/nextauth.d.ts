export type Token = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_at: number;
  scope: string;
  token_type: string;
  session_state: string;
};

export enum Role {
  admin = "admin",
  manager = "manager",
  colaborator = "colaborator",
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    emailVerified: string;
    roles: Role[];
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
