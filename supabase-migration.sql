-- Create the contact_messages table
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'archived'))
);

-- Enable Row Level Security (RLS)
alter table public.contact_messages enable row level security;

-- Create a policy that allows anyone to insert messages (for the contact form)
create policy "Anyone can insert contact messages"
  on public.contact_messages
  for insert
  with check (true);

-- Create a policy that only allows authenticated users (you) to view messages
-- Note: Replace with specific email or role if needed
create policy "Only authenticated users can view messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);
