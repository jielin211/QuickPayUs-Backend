export const DEFAULT_REFERRAL_FIELDS: {
  investmentLevel: number;
  username: number;
  firstName: number;
  lastName: number;
  depositBalance: number;
  createdAt: number;
  investmentSubLevel: number;
} = {
  investmentLevel: 1,
  username: 1,
  firstName: 1,
  lastName: 1,
  depositBalance: 1,
  createdAt: 1,
  investmentSubLevel: 1,
};

export const DOCUMENT_TYPES: {
  ID_CARD: string;
  PASSPORT: string;
  LICENSE: string;
} = {
  ID_CARD: "ID_CARD",
  PASSPORT: "PASSPORT",
  LICENSE: "LICENSE",
};

export const STATUS: {
  APPROVED: string;
  REJECTED: string;
  PENDING: string;
} = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
};

export const TRANSACTION_TYPES: {
  WITHDRAWAL: string;
  DEPOSIT: string;
  PROFIT: string;
  REWARD: string;
  REFERRAL_CREDIT: string;
} = {
  WITHDRAWAL: "WITHDRAWAL",
  DEPOSIT: "DEPOSIT",
  PROFIT: "PROFIT",
  REWARD: "REWARD",
  REFERRAL_CREDIT: "REFERRAL_CREDIT",
};

export const WITHDRAWAL_TYPES: {
  DEPOSIT: string;
  PROFIT: string;
  REWARD: string;
} = {
  DEPOSIT: "DEPOSIT",
  PROFIT: "PROFIT",
  REWARD: "REWARD",
};

export const DEFAULT_FEE_AMOUNT: number = 0.05;
export const MINIMUM_WITHDRAWAL_AMOUNT: number = 10;

export const NOTIFICATION_TYPES: {
  GENERAL: string;
  ACTIVITY: string;
  IMPORTANT: string;
} = {
  GENERAL: "GENERAL",
  ACTIVITY: "ACTIVITY",
  IMPORTANT: "IMPORTANT",
};

export interface RankConfig {
  title: string;
  rewardFrom: number;
  rewardTo: number;
  requiredSalesFrom: number;
  requiredSalesTo: number;
  weeklyMeetings: number;
  directReferralsRequired: number;
}

export const RANK_CONFIG: RankConfig[] = [
  {
    title: "Leader 1",
    rewardFrom: 300,
    rewardTo: 500,
    requiredSalesFrom: 10000,
    requiredSalesTo: 15000,
    weeklyMeetings: 5,
    directReferralsRequired: 25,
  },
  {
    title: "Leader 2",
    rewardFrom: 750,
    rewardTo: 1500,
    requiredSalesFrom: 30000,
    requiredSalesTo: 50000,
    weeklyMeetings: 5,
    directReferralsRequired: 25,
  },
  {
    title: "Leader 3",
    rewardFrom: 2000,
    rewardTo: 2500,
    requiredSalesFrom: 750000,
    requiredSalesTo: 100000,
    weeklyMeetings: 4,
    directReferralsRequired: 50,
  },
  {
    title: "Leader 4",
    rewardFrom: 3000,
    rewardTo: 7500,
    requiredSalesFrom: 150000,
    requiredSalesTo: 300000,
    weeklyMeetings: 4,
    directReferralsRequired: 50,
  },
  {
    title: "Leader 5",
    rewardFrom: 10000,
    rewardTo: 20000,
    requiredSalesFrom: 500000,
    requiredSalesTo: 1000000,
    weeklyMeetings: 3,
    directReferralsRequired: 100,
  },
];
