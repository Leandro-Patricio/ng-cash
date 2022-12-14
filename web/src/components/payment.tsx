import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import swal from "sweetalert";
import { api } from "../lib/axios";

interface PaymentProps {
  tokenJWT: string;
}

export default function Payment(props: PaymentProps) {
  const [usernameCashIn, setUsernameCashIn] = useState("");
  const [valueTransfered, setValueTransfered] = useState(0);

  const router = useRouter();

  const handlePaymentBtn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post(
        `/transactions`,
        {
          usernameCashIn: usernameCashIn,
          valueTransfered: valueTransfered,
        },
        {
          headers: {
            Authorization: `Bearer ${props.tokenJWT}`,
          },
        }
      );

      swal({
        title: `A transação foi realizada com sucesso`,
        icon: "success",
      }).then(() => {
        router.reload();
      });
    } catch (err: any) {
      console.log(err.response.data);
      swal({
        title: `Ops!`,
        text: err.response.data,
        icon: "warning",
      });
    }
  };

  return (
    <form
      onSubmit={handlePaymentBtn}
      className="bg-gray-600 text-gray-400 rounded
    p-[0rem_.5rem_.5rem_.5rem] h-full min-w-[28.15rem] w-full
    flex flex-col justify-evenly items-center gap-4 text-center "
    >
      <h1 className="text-xl font-bold ">Para quem você vai pagar?</h1>
      <div>Digite o username e o valor para quem deseja transferir </div>
      <div className="bg-ligthGreen-400 rounded-lg text-black pl-2 h-8 flex justify-center items-center">
        <input
          className="bg-transparent text-black placeholder:text-black
          pl-2 appearance-none outline-none
          "
          type="text"
          placeholder="Username"
          onChange={(e) => setUsernameCashIn(e.target.value)}
          /*     value={userNameCashIn} */
        />
      </div>
      <div className="bg-ligthGreen-400 rounded-lg text-black pl-2 h-8 flex justify-center items-center">
        R$
        <input
          className="bg-transparent text-black placeholder:text-black
          pl-2 appearance-none outline-none
          "
          type="number"
          placeholder="00,00"
          onChange={(e) => setValueTransfered(parseInt(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="text-purple-500 border-2 font-bold
         border-purple-500
        rounded-lg p-[1rem_6rem]
         hover:bg-purple-500 hover:text-black
        "
      >
        Transferir
      </button>
    </form>
  );
}
