import { requireAuth } from "@/lib/auth";
import { fetchMembers } from "@/lib/members";
import RecurringTaskPage from "./components/recurring-task-page";
import { fetchRecurringTasks } from "@/lib/recurring-tasks";

export default async function Page() {
  const { user } = await requireAuth();
  const recurringTask = await fetchRecurringTasks(user.id);
  const members = await fetchMembers(user.id);
  return (
    <>
      <RecurringTaskPage
        user={user}
        initialTasks={recurringTask}
        members={members}
      />
    </>
  );
}
