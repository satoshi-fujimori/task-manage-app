export type MemberType = "adult" | "child";

export type User = {
  id: string;
  email?: string;
  password?: string; // In production, this would be hashed
};

export type AuthContext = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};
