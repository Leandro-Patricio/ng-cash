import Transactions from "../components/transactions";
import UsuarioMainNav from "../components/usuarioMainNav";
import { useEffect, useState } from "react";
import Payment from "../components/payment";
import ModalLogOut from "./modalLogOut";
import { api } from "../lib/axios";
import { useRouter } from "next/router";
import { abrirModal, fecharModal } from "../components/open-close-modals";

export default function UsuarioMain() {
  const router = useRouter();
  const userTokenJWT = router.query.tokenJWT as string;

  const [navBarEvent, setNavBarEvent] = useState("fig");

  const [accountID, setAccountID] = useState("");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(Number);
  const [transactionsCreditaded, setTrasactionsCreditaded] = useState([]);
  const [transactionsDebitaded, setTrasactionsDebitaded] = useState([]);

  useEffect((): any => {
    if (!router.isReady) return;

    const getAccountInfos = async () => {
      if (!userTokenJWT) {
        router.push("/landingPage");
      }

      const userAccount = await api.get(`/accounts/me`, {
        headers: {
          Authorization: `Bearer ${userTokenJWT}`,
        },
      });
      setAccountID(userAccount.data.account.id);
      setUsername(userAccount.data.username);
      setBalance(userAccount.data.account.balance);
      setTrasactionsCreditaded(userAccount.data.account.transactionCreditade);
      setTrasactionsDebitaded(userAccount.data.account.transactionDebitade);
    };
    getAccountInfos();
  }, [router.isReady]);

  return (
    <div className="max-w-[20000] grid grid-cols-[2fr_3fr] grid-rows-4 m-[0_2rem] h-screen items-center">
      <div className="border-4 row-span-2 border-purple-500 rounded-3xl flex flex-col justify-evenly items-center w-[80%] h-[80%] bg-gray-600">
        <div>Boas-vindas</div>
        <div>{username}</div>
        <div className="opacity-0">Editar Profile</div>
      </div>
      <div
        className="
        row-span-1
        align-top
        border-4 border-purple-500 rounded-3xl flex
        justify-start
        flex-nowrap
        overflow-x-auto
        bg-gray-600
         h-fit 
        p-[.5rem_1rem_0.5rem_1rem]
      "
      >
        Saldo: R$ {balance}
      </div>

      <div
        className="
       row-span-3 h-full
       mb-6
       "
      >
        {navBarEvent === "fig" ? (
          <img
            src="https://cdn.myportfolio.com/e23c03130f693097e11e908e3f95d7ec/7f252b23-676e-4144-b505-cfdb6f19faf6_rw_1920.gif?h=284067f4610242357fba06d66d01ccbd"
            alt="propaganda antes da navegação"
          />
        ) : navBarEvent === "Extrato" ? (
          <Transactions
            accountID={accountID}
            transactionsCreditaded={transactionsCreditaded}
            transactionsDebitaded={transactionsDebitaded}
          />
        ) : navBarEvent === "Pagar" ? (
          <Payment tokenJWT={userTokenJWT} />
        ) : (
          <img
            src="https://cdn.myportfolio.com/e23c03130f693097e11e908e3f95d7ec/7f252b23-676e-4144-b505-cfdb6f19faf6_rw_1920.gif?h=284067f4610242357fba06d66d01ccbd"
            alt="propaganda antes da navegação"
          />
        )}

        <ModalLogOut />
      </div>

      <div
        className="grid grid-cols-2 justify-center gap-4
      min-h-full w-[80%] mb-6 row-span-2
      "
      >
        <UsuarioMainNav
          action="Extrato"
          navegacao={() => setNavBarEvent("Extrato")}
        />
        <UsuarioMainNav
          action="Pagar"
          navegacao={() => setNavBarEvent("Pagar")}
        />
        <UsuarioMainNav
          action="Btn Sobrando"
          navegacao={() => setNavBarEvent("Btn")}
        />
        <UsuarioMainNav
          action="Log-out"
          navegacao={() => abrirModal("logOut")}
        />
      </div>
    </div>
  );
}
