export type Profile = {
  id?: string;
  email: string;
  created_at: string;
  username?: string;
};

export type Context = {
  id?: number;
  user_id: string;
  title: string;
  description?: string;
  created_at: string;
};

export type Session = {
  id?: number;
  user_id: string;
  context_id: number;
  notes?: string;
  intention: string;
  duration: number;
  created_at: string;
  updated_at: string | null;
  finished_at: string | null;
  reflection_id: number | null;
};

export type SessionReflection = {
  id?: number;
  session_id: number | null;
  user_id: string | null;
  reflection: unknown;
  created_at: string;
};
