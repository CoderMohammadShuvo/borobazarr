import { Order } from './../app/dashboard/sales/columns';
import prisma from '@/index';
import { endOfDay, formatDate, startOfDay } from 'date-fns';

export const generateId = async (module: string) => {
  //Switch data table by module name
  let todayTotal = 0;
  let modulePrefix = '';
  // get data count by date from database by prisma query
  switch (module) {
    case 'po':
      todayTotal = await prisma.purchaseOrder.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'PO';
      break;
  }
  switch (module) {
    case 'tpn':
      todayTotal = await prisma.tpn.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'TPN';
      break;
  }
  switch (module) {
    case 'grn':
      todayTotal = await prisma.grn.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'GRN';
      break;
  }
  switch (module) {
    case 'sale':
      todayTotal = await prisma.sales.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'INV';
      break;
  }
  switch (module) {
    case 'adj':
      todayTotal = await prisma.sales.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'ADJ';
      break;
  }
  switch (module) {
    case 'dmg':
      todayTotal = await prisma.damage.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
          },
        },
      });
      modulePrefix = 'DMG';
      break;
  }
  //   switch (module) {
  //     case "order":
  //       todayTotal = await prisma.sales.count({
  //         where: {
  //           createdAt: {
  //             gte: new Date(new Date().setHours(0, 0, 0, 0)), // Filter documents created today
  //           },
  //         },
  //       });
  //       break;
  //   }

  const number = ('000' + (todayTotal + 1)).toString();
  const current = number.substring(number.length - 4);
  const date = formatDate(new Date(new Date()), 'MMddyyyy');
  const newId =
    process.env.ID_PREFIX + '-' + modulePrefix + date + '-' + current;

  return newId;
};
