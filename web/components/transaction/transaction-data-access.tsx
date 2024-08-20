import { useMutation } from '@tanstack/react-query';

interface TransactionDetails {
  description: string;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  tokenTransfers: any[];
  nativeTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }[];
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: any[];
  }[];
  transactionError: any;
  instructions: {
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: any[];
  }[];
  events: any;
}

export function useTransactionDetails() {
  return useMutation({
    mutationFn: async (signature: string): Promise<TransactionDetails[]> => {
      const response = await fetch('https://api-devnet.helius.xyz/v0/transactions?api-key=' + process.env.NEXT_PUBLIC_HELIUS_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactions: [signature],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transaction details');
      }

      return response.json();
    },
  });
}