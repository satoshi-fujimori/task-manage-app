export type Member = {
  id: string;
  name: string;
  userId: string;
  icon: string;
  isUser: boolean;
};

export type MemberCreateInput = Omit<Member, "id">;
