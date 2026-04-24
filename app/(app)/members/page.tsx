import { requireAuth } from "@/lib/auth";
import { fetchMembers } from "@/lib/members";
import MembersPage from "./components/members-page";

export default async function Page() {
  const { user } = await requireAuth();
  const members = await fetchMembers(user.id);
  return (
    <>
      <MembersPage members={members} userId={user.id} />
    </>
  );
}
