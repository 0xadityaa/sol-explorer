"use client";

import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ExplorerLink } from '../cluster/cluster-ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransactionDetailsUI({ transaction }: { transaction: any }) {
  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold">Transaction Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="Description" value={transaction.description} />
        <InfoItem label="Type" value={transaction.type} />
        <InfoItem label="Source" value={transaction.source} />
        <InfoItem label="Fee" value={`${transaction.fee / LAMPORTS_PER_SOL} SOL`} />
        <InfoItem
          label="Fee Payer"
          value={
            <ExplorerLink
              path={`account/${transaction.feePayer}`}
              label={transaction.feePayer}
            />
          }
        />
        <InfoItem
          label="Signature"
          value={
            <ExplorerLink
              path={`tx/${transaction.signature}`}
              label={transaction.signature}
            />
          }
        />
        <InfoItem label="Slot" value={transaction.slot} />
        <InfoItem
          label="Timestamp"
          value={new Date(transaction.timestamp * 1000).toLocaleString()}
        />
      </div>

      <h3 className="text-xl font-bold mt-6">Native Transfers</h3>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {transaction.nativeTransfers.map((transfer: any, index: number) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoItem
            label="From"
            value={
              <ExplorerLink
                path={`account/${transfer.fromUserAccount}`}
                label={transfer.fromUserAccount}
              />
            }
          />
          <InfoItem
            label="To"
            value={
              <ExplorerLink
                path={`account/${transfer.toUserAccount}`}
                label={transfer.toUserAccount}
              />
            }
          />
          <InfoItem
            label="Amount"
            value={`${transfer.amount / LAMPORTS_PER_SOL} SOL`}
          />
        </div>
      ))}

      <h3 className="text-xl font-bold mt-6">Account Data</h3>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {transaction.accountData.map((data: any, index: number) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            label="Account"
            value={
              <ExplorerLink
                path={`account/${data.account}`}
                label={data.account}
              />
            }
          />
          <InfoItem
            label="Native Balance Change"
            value={`${data.nativeBalanceChange / LAMPORTS_PER_SOL} SOL`}
          />
        </div>
      ))}

      <h3 className="text-xl font-bold mt-6">Instructions</h3>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {transaction.instructions.map((instruction: any, index: number) => (
        <div key={index} className="space-y-2">
          <InfoItem
            label="Program ID"
            value={
              <ExplorerLink
                path={`account/${instruction.programId}`}
                label={instruction.programId}
              />
            }
          />
          <InfoItem label="Data" value={instruction.data} />
          <InfoItem
            label="Accounts"
            value={instruction.accounts.map((account: string, i: number) => (
              <div key={i}>
                <ExplorerLink
                  path={`account/${account}`}
                  label={account}
                />
              </div>
            ))}
          />
        </div>
      ))}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="space-y-1">
      <div className="font-medium text-sm">{label}</div>
      <div className="text-sm break-all">{value}</div>
    </div>
  );
}