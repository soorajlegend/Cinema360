import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          name: true,
          isLive: true,
          thumbnailUrl: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
        }
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = db.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });

  return user;
};
