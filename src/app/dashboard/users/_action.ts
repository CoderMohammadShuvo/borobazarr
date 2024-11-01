'use server';
import prisma from '../../../../prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { UserFormSchema } from './UserFormSchema';
import { getBrowserInfo, getDeviceType } from '../../lib/deviceDetect';

export type User = z.infer<typeof UserFormSchema>;

export const handleDelete = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    //  (user);
    if (user) {
      `${user.name} deleted successful!`;
      revalidatePath('/dashboard/offers');
      return user;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const createUser = async (data: User) => {
  try {
    //ts-ignore
    let { name, phone, email, username, password, type, status } = data;

    if (!name || !phone || !username || !password) return false;

    password = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      //@ts-ignore
      data: { name, phone, email, username, password, type, status },
    });
    if (createUser) {
      `${createUser.name} Create successful!`;
      revalidatePath('/dashboard/offers');
      return createUser;
    }
  } catch (err) {
    err;
    return false;
  }
};

export const updateUser = async (id: string, data: User) => {
  try {
    const { name, phone, email, username, password, type, status } = data;

    if (!name || !phone || !username) {
      return false;
    }

    let userData = {};
    if (password !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    userData = { ...userData, name, phone, email, username, type, status };
    //ts-ignore
    // const { id, ...data } = data;
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      //ts-ignore
      data: userData,
    });
    updateUser;
    if (updateUser) {
      `${updateUser.name} Update successful!`;
      revalidatePath('/dashboard/users');
      return updateUser;
    }
  } catch (err) {
    return err;
  }
};

export const createUserLogs = async (
  userId: string,
  oInvoice: string,
  module: string,
  otype: string,
  route: string,
) => {
  try {
    //GET USER AGENT
    const deviceInfo = getDeviceType();
    const browserInfo = getBrowserInfo();
    const createUserLog = await prisma.userLogs.create({
      data: {
        userId: userId,
        otInvoice: oInvoice,
        module: module,
        otType: otype,
        date: new Date(), // Automatically use the current date
        userAgent: {
          //@ts-ignore
          deviceInfo: deviceInfo,
          browserInfo: browserInfo,
          routeInfo: route,
        },
      },
      include: {
        user: true, // Include related user information
      },
    });

    if (createUserLog) {
      // revalidatePath("/dashboard/user-logs"); // Adjust the path as needed
      return createUserLog;
    }
  } catch (err) {
    return false;
  }
};

export const UpdateUserStatus = async (id: string, status: string) => {
  // console.log("Triggered update", id, status);
  try {
    const update = await prisma.user.update({
      where: {
        id: id,
      },
      //@ts-ignore
      data: { status: status },
    });

    if (update) {
      console.log('update successful');
      revalidatePath('/dashboard/user');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('sales update error', error);
    return false;
  }
};
