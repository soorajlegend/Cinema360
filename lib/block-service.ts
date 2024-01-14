import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (id === self.id) {
      return false;
    }

    const isBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: self.id,
          blockerId: id,
        },
      },
    });

    return !!isBlocked;
  } catch {
    return false;
  }
};

export const isBlockedUser = async (id: string) => {
  try {
    const self = await getSelf();

    if (id === self.id) {
      return false;
    }

    const isBlocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: id,
          blockerId: self.id,
        },
      },
    });

    return !!isBlocked;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (id === self.id) {
    throw new Error("Cannot block yourself");
  }

  const isAlreadyBlocked = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: id,
        blockerId: self.id,
      },
    },
  });

  if (isAlreadyBlocked) {
    throw new Error("Already blocked");
  }

  const block = await db.block.create({
    data: {
      blockedId: id,
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (id === self.id) {
    throw new Error("Cannot unblock yourself");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: id,
        blockerId: self.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const block = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blocks = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blocks;
};
