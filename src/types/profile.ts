export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  updated_at: string;
  created_at: string;
}

export interface ProfileUpdate {
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
}
