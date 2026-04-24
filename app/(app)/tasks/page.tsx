import { requireAuth } from "@/lib/auth";
import { fetchTasks } from "@/lib/tasks";
import { fetchMembers } from "@/lib/members";
import TasksPage from "./components/task-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ displayDate?: string }>;
}) {
  const { user } = await requireAuth();
  const params = await searchParams;
  const displayDate = params.displayDate
    ? params.displayDate
    : new Intl.DateTimeFormat("sv-SE").format(new Date());
  const tasks = await fetchTasks(user.id, displayDate);
  const members = await fetchMembers(user.id);
  return (
    <>
      <TasksPage
        user={user}
        initialTasks={tasks}
        displayDate={displayDate}
        members={members}
      />
    </>
  );
}
