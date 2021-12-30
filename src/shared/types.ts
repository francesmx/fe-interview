export type TransactionType = {
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
  transactions: Array<TransactionType>;
  showTransactions: boolean;
};
