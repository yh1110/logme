import { JsonValue } from "@prisma/client/runtime/library";

export interface postsType {
  updated_at: Date | null;
  created_at: Date;
  samnail_id: string | null;
  post_id: string;
  post_contents: JsonValue | null;
}

export interface posts_samnailType {
  samnail_year: number | null;
  samnail_month: number | null;
  account_id: string | null;
  updated_at: Date | null;
  created_at: Date;
  samnail_id: string;
  samnail_name: string | null;
  samnail_slug: string;
  samnail_date: Date | null;
}

export interface sns_accountsType {
  account_id: string;
  user_id: string;
  sns_id: string;
  access_token: string | null;
  email: string | null;
  password: string | null;
  updated_at: Date;
  created_at: Date;
}

export interface usersType {
  user_id: string;
  user_name: string | null;
  avatar_url: string | null;
  updated_at: Date;
  created_at: Date;
}
