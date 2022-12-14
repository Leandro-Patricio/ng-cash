import { get } from "http";
import { type } from "os";
import { use, useEffect, useState } from "react";
import TransactionsBtn from "./transactionsBtn";

interface TransactionsProps {
  transactionsCreditaded: Array<Object>;
  transactionsDebitaded: Array<Object>;
  accountID: string;
}

export default function Transactions(props: TransactionsProps) {
  const [allTransactionsModifiedState, setAllTransactionsModifiedState] =
    useState([{}]);

  const handleTimesSorted = (sortType: string) => {
    let botao = document.getElementById(sortType);

    if (botao?.classList.contains("sorted-0")) {
      botao?.classList.replace("sorted-0", "sorted-1");
    } else if (botao?.classList.contains("sorted-1")) {
      botao?.classList.replace("sorted-1", "sorted-2");
    } else {
      botao?.classList.replace("sorted-2", "sorted-0");
    }
    return botao;
  };

  const handleColorOfSortedTransactions = (sortType: string) => {
    let botao = handleTimesSorted(sortType);

    if (botao?.classList.contains("sorted-0")) {
      if (botao?.classList.contains("shadow-red-400")) {
        botao?.classList.replace("shadow-red-400", "shadow-ligthGreen-400");
        botao?.classList.replace(
          "hover:shadow-red-300",
          "hover:shadow-ligthGreen-500"
        );
      }
    } else if (botao?.classList.contains("sorted-1")) {
      botao?.classList.replace("shadow-ligthGreen-400", "shadow-yellow-400");
      botao?.classList.replace(
        "hover:shadow-ligthGreen-500",
        "hover:shadow-yellow-300"
      );
    } else {
      botao?.classList.replace("shadow-yellow-400", "shadow-red-400");
      botao?.classList.replace(
        "hover:shadow-yellow-300",
        "hover:shadow-red-300"
      );
    }
    console.log(botao);
    return botao;
  };

  const rebootSorting = () => {
    setAllTransactionsModifiedState(allTransactionsModifiedStatic);

    for (let i = 0; i < transactionsButtons.length - 1; i++) {
      let botao = document.getElementById(transactionsButtons[i]);
      botao?.classList.remove("sorted-1");
      botao?.classList.remove("sorted-2");
      botao?.classList.add("sorted-0");

      botao?.classList.remove("shadow-red-400");
      botao?.classList.remove("hover:shadow-red-300");
      botao?.classList.remove("shadow-yellow-400");
      botao?.classList.remove("hover:shadow-yellow-300");
      botao?.classList.add("shadow-ligthGreen-400");
      botao?.classList.add("hover:shadow-ligthGreen-500");
    }
  };

  const handleSortingTransactionsID = (sortType: string) => {
    let botao = document.getElementById(sortType);

    //sort em transação
    if (sortType === "Transação" && botao?.classList.contains("sorted-1")) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.id < b.id) return 1;
          if (a.id > b.id) return -1;
          return 0;
        }
      );
    } else if (
      sortType === "Transação" &&
      botao?.classList.contains("sorted-2")
    ) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        }
      );
    }
    return setAllTransactionsModifiedState(allTransactionsModified);
  };

  const handleSortingTransactionsDate = (sortType: string) => {
    let botao = document.getElementById(sortType);

    if (sortType === "Data" && botao?.classList.contains("sorted-1")) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.dateRaw < b.dateRaw) return 1;
          if (a.dateRaw > b.dateRaw) return -1;
          return 0;
        }
      );
    } else if (sortType === "Data" && botao?.classList.contains("sorted-2")) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.dateRaw < b.dateRaw) return -1;
          if (a.dateRaw > b.dateRaw) return 1;
          return 0;
        }
      );
    }
    return setAllTransactionsModifiedState(allTransactionsModified);
  };

  const handleSortingTransactionsOriginDestiny = (sortType: string) => {
    let botao = document.getElementById(sortType);

    if (
      sortType === "Origem/ Destino" &&
      botao?.classList.contains("sorted-1")
    ) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.from_to < b.from_to) return 1;
          if (a.from_to > b.from_to) return -1;
          return 0;
        }
      );
    } else if (
      sortType === "Origem/ Destino" &&
      botao?.classList.contains("sorted-2")
    ) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.from_to < b.from_to) return -1;
          if (a.from_to > b.from_to) return 1;
          return 0;
        }
      );
    }
    return setAllTransactionsModifiedState(allTransactionsModified);
  };

  const handleSortingTransactionsCash = (sortType: string) => {
    let botao = document.getElementById(sortType);

    if (sortType === "Cash" && botao?.classList.contains("sorted-1")) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.value < b.value) return 1;
          if (a.value > b.value) return -1;
          return 0;
        }
      );
    } else if (sortType === "Cash" && botao?.classList.contains("sorted-2")) {
      allTransactionsModified = allTransactionsModified.sort(
        (a: any, b: any) => {
          if (a.value < b.value) return -1;
          if (a.value > b.value) return 1;
          return 0;
        }
      );
    }
    return setAllTransactionsModifiedState(allTransactionsModified);
  };

  const handleOnClick = (sortType: string) => {
    if (sortType === "X") {
      return rebootSorting();
    }
    handleColorOfSortedTransactions(sortType);

    sortType === "Transação"
      ? handleSortingTransactionsID(sortType)
      : sortType === "Data"
      ? handleSortingTransactionsDate(sortType)
      : sortType === "Origem/ Destino"
      ? handleSortingTransactionsOriginDestiny(sortType)
      : sortType === "Cash" && handleSortingTransactionsCash(sortType);

    return;
  };

  let allTransactionsModified: Array<object> = [];
  let allTransactionsModifiedStatic: Array<object> = [];

  const allTransactionsRaw: Array<object> = [
    ...props.transactionsCreditaded,
    ...props.transactionsDebitaded,
  ];

  (function gettingTransactions() {
    for (let i = 0; i < allTransactionsRaw.length; i++) {
      const transaction: any = allTransactionsRaw[i];
      const data = new Date(transaction.createdAt);

      if (transaction.accountCreditadeId === props.accountID) {
        allTransactionsModified[i] = {
          id: transaction.id,
          dateRaw: transaction.createdAt,
          date: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
          time: `${data.getHours()}:${data.getMinutes()}`,
          type: "creditaded",
          from_to: transaction.debitedAccountId.users[0].username,
          value: transaction.value * -1,
        };
      } else {
        allTransactionsModified[i] = {
          id: transaction.id,
          dateRaw: transaction.createdAt,
          date: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
          time: `${data.getHours()}:${data.getMinutes()}`,
          type: "debitaded",
          from_to: transaction.creditedAccountId.users[0].username,
          value: transaction.value,
        };
      }
    }
    allTransactionsModifiedStatic = allTransactionsModified;
    return allTransactionsModified;
  })();

  useEffect(() => {
    setAllTransactionsModifiedState(allTransactionsModifiedStatic);
  }, []);

  const transactionsButtons = [
    "Transação",
    "Data",
    "Origem/ Destino",
    "Cash",
    "X",
  ];

  return (
    <div
      className="bg-gray-600 text-gray-400 rounded
    h-full min-w-[28.15rem] w-full
    flex flex-col justify-between items-center 
    gap-4 text-center text-sm
    overflow-auto
    "
    >
      <div
        className="grid grid-cols-[1fr_1fr_1fr_1fr+.1fr] 
         gap-4 bg-gray-500 p-2 rounded-md
       sticky top-0 items-center
       h-fit w-full "
      >
        {transactionsButtons.map((transactionButton) => {
          return (
            <button
              id={transactionButton}
              className=" w-full h-full flex justify-center  items-center bg-gray-500 rounded-lg p-2 
                          shadow-[2px_2px_6px_0px] shadow-ligthGreen-400
                           hover:cursor-pointer
                          hover:shadow-ligthGreen-500
                          active:shadow-purple-500 selection:shadow-purple-500
                          sorted-0
                          "
              onClick={() => handleOnClick(transactionButton)}
            >
              {transactionButton}
            </button>
          );
        })}
      </div>

      <div
        className="
      h-full w-full rounded-lg
      flex flex-col
            "
      >
        {allTransactionsModifiedState.map((transaction: any) => {
          return (
            <div
              className="grid grid-cols-[1fr_1fr_1fr_1fr_.2fr]  grid-flow-row
            h-fit w-full 
            items-center text-center
            p-[.5rem] 
            border-b-2 border-dashed border-gray-400  border-opacity-20
            bg-gray-500
           "
            >
              <div className="break-all  pr-2">{transaction.id}</div>
              <div className="break-all  pr-2">
                {transaction.date} <br /> {transaction.time}{" "}
              </div>
              <div className="break-all  pr-2">{transaction.from_to}</div>
              <div className="break-all  pr-2">R$ {transaction.value}</div>
              <div className="break-all pr-2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
