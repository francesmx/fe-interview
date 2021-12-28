export type Transaction = {
  amount: number;
  date: string;
  id: number;
};

export type MerchantType = {
  categoryID: number;
  iconUrl: string;
  id: string;
  isBill: boolean;
  name: string;
  transactions: Array<Transaction>;
  showTransactions: Boolean | undefined;
};
