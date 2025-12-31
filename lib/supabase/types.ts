export type Profile = {
  id?: string;
  email: string;
  created_at: string;
  username?: string;
};

export type Context = {
  id?: bigint;
  user_id: string;
  title: string;
  description?: string;
  created_at: string;
};
