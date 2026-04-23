export type AccrountResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
};

export type SubscriptionPrice = {
  id: string;
  currency: string;
  unitAmount: number | null;
  interval: string;
  intervalCount: number;
  nickname: string | null;
};

export type SubscriptionDetails = {
  id: string;
  status: string;
  priceId: string;
  customerId: string;
  currentPeriodStart: string | number;
  currentPeriodEnd: string | number;
  cancelAtPeriodEnd: boolean;
  cancelAt: string | number | null;
  canceledAt: string | number | null;
  trialStart: string | number | null;
  trialEnd: string | number | null;
  metadata: Record<string, unknown> | null;
  price: SubscriptionPrice | null;
};

export type SubscriptionsResponse = {
  success: boolean;
  data: {
    userId: number;
    email: string;
    customerId: string | null;
    subscription: SubscriptionDetails | null;
  };
};
