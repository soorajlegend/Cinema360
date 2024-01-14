import { User } from "@prisma/client";

export type CustomStream = {
  id: string;
  name: string;
  isLive: boolean;
  thumbnailUrl: string | null;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
};

export type CustomeUser = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
  stream: CustomStream | null;
  _count: { followedBy: number };
};

export type CustomCardStream = {
  id: string;
  isLive: boolean;
  user: User;
  name: string;
  thumbnailUrl: string | null;
  updatedAt: Date
};

export type BlockedUser = {
  id: string,
  userId: string,
  imageUrl: string,
  username: string,
  createdAt: Date,
}
