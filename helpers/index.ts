import crypto, { randomUUID } from "crypto";
import moment from "moment";
import momentTZ from "moment-timezone";

momentTZ().tz("Asia/Karachi");

const applyPercentage = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100;
};

const firstDayOfLastMonth = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, 1);
};

const lastDayOfLastMonth = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 0);
};

const minusDaysFromDate = (count: number): string => {
  const date = new Date();
  return new Date(date.setDate(date.getDate() - count)).toISOString();
};

const currentDate = (): Date => {
  return new Date();
};

const uuid = (): string => {
  return crypto.randomBytes(24).toString("hex");
};

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

declare global {
  interface String {
    capitalizeFirst(): string;
  }
}

String.prototype.capitalizeFirst = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const startOfToday = (): string => {
  return moment().startOf("day").format(); // set to 12:00 am today
};

const endOfToday = (): string => {
  return moment().endOf("day").format(); // set to 12:00 am today
};

export {
  applyPercentage,
  firstDayOfLastMonth,
  lastDayOfLastMonth,
  minusDaysFromDate,
  currentDate,
  uuid,
  crypto,
  randomUUID as randomUUID,
  capitalizeFirstLetter,
  startOfToday,
  endOfToday,
};
