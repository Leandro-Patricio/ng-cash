import { useState } from "react";
import { api } from "../lib/axios";

interface GetAccountInfoProps {
  tokenJWT?: string;
  username?: boolean;
  balance?: boolean;
  transactionsCreditaded?: boolean;
  transactionDebeitaded?: boolean;
}

export default async function getAccountInfo(props: GetAccountInfoProps) {
  const getAccountInfos = async () => {
    const userAccount = await api.get(`/accounts/me`, {
      headers: {
        Authorization: `Bearer ${tokenJWT}`,
      },
    });
    setUsername(userAccount.data.username);
    setBalance(userAccount.data.account.balance);
    setTrasactionsCreditaded(userAccount.data.account.transactionsCreditade);
    setTrasactionsDebitaded(userAccount.data.account.transactionsDebitade);
  };

  getAccountInfos();

  return;
}
