create table recurring_tasks (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  info text,
  member_id uuid not null references members (id),
  delete_flg boolean not null default false,
  priority varchar not null
  updated_date timestamp not null default now()
);

ALTER TABLE tasks
ADD COLUMN recurring_task_id uuid;

ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_recurring_tasks
FOREIGN KEY (recurring_task_id)
REFERENCES recurring_tasks(id)
ON DELETE CASCADE;