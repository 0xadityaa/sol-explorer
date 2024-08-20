"use client";
import { useState } from 'react';
import { AppHero } from '../ui/ui-layout';
import { useTransactionDetails } from '@/components/transaction/transaction-data-access';
import { TransactionDetailsUI } from '@/components/transaction/transaction-ui';

export default function TransactionDetailsFeature() {
  const [signature, setSignature] = useState('');
  const { mutate, data, isLoading, isError } = useTransactionDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(signature);
  };

  return (
    <div>
      <AppHero title="Transaction Details" subtitle="Enter a transaction signature to view details." />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Enter transaction signature"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </form>
        {isError && <div className="alert alert-error mt-4">Error fetching transaction details</div>}
        {data && <TransactionDetailsUI transaction={data[0]} />}
      </div>
    </div>
  );
}