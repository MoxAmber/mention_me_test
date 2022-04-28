export type Order = {
  // There's a fair chance this could also be a string (ie. a UUID)
  id: number;
  date: string;
  amount: string;
  shipped: boolean;
};
