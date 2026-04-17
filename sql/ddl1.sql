-- MEMBERS
create table members (
  id uuid primary key default gen_random_uuid (),
  name text not null,
  user_id uuid not null references auth.users (id),
  is_user boolean not null,
  updated_date timestamp not null default now()
);

-- TASKS
create table tasks (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  info text,
  status boolean not null default false,
  limit_date date not null,
  member_id uuid not null references members (id),
  delete_flg boolean not null default false,
  updated_date timestamp not null default now()
);