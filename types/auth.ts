export type MemberType = "adult" | "child";

export type Member = {
  id: string;
  name: string;
  type: MemberType;
  icon: string; // emoji or avatar URL
};

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
