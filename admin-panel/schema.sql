-- Create the quotations table
CREATE TABLE quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  client_name text NOT NULL,
  location text,
  project_date text,
  scheme text,
  data jsonb NOT NULL
);

-- Enable Row Level Security (RLS) but allow anon access for local dev
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for anon (for development purposes)
CREATE POLICY "Enable all for anon" ON quotations
  FOR ALL
  USING (true)
  WITH CHECK (true);
