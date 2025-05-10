export interface Transaction {
  id?: string;                // Customer id
  transactionCode: string;   // AD/TM
  dateTime: Date;            // Date and time of transaction
  channel: string;           // E.g., Terminal, ATS
  amount: number;            // Debit or credit amount
  balance: number;           // Balance after transaction
  remark: string;            // Remarks about the transaction
  type: string;              // Debit/Credit
  accountNumber: string;
}
