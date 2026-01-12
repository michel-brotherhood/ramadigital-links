-- Create table for storing contact requests
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Service type
  servico TEXT NOT NULL,
  
  -- Common fields across all forms
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  empresa TEXT,
  cargo TEXT,
  
  -- Complete form data as JSON (flexible for different form types)
  form_data JSONB NOT NULL,
  
  -- Lead management status
  status TEXT DEFAULT 'novo' NOT NULL,
  
  -- Request metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy for public insert (allows form submission without authentication)
CREATE POLICY "Allow public insert" ON public.contact_requests
  FOR INSERT
  WITH CHECK (true);

-- No SELECT policy for public (sensitive data - access only via service_role)

-- Create index for common queries
CREATE INDEX idx_contact_requests_created_at ON public.contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_servico ON public.contact_requests(servico);
CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);