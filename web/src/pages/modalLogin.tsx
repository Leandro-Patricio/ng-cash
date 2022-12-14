import Image from "next/image";
import { FormEvent, useState } from "react";
import logoPequeno from "../assets/LogoPequeno.svg";
import { api } from "../lib/axios";
import { fecharModal } from "../components/open-close-modals";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function ModalLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loginButtonPressed = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`/users/${username}`, {
        password: password,
      });

      return router.push(
        {
          pathname: "/usuarioMain",
          query: {
            tokenJWT: response.data,
          },
        },
        "/minhaConta"
      );
    } catch (err: any) {
      swal({
        title: `Ops!`,
        text: err.response.data,
        icon: "warning",
      });
    }
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 w-full h-full
     bg-black bg-opacity-90
      outsideModal login hidden modal"
    >
      <div
        className="login
         bg-black opacity-1 m-[10%_20%] 
          p-[0rem_1rem_2rem_1rem] 
          rounded-2xl border-purple-500 border-2
      
      "
      >
        <button
          className="relative w-full text-end right-4 "
          onClick={() => fecharModal()}
        >
          X
        </button>

        <div className="grid grid-cols-2 text-center items-center pl-4 h-full gap-2">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold mb-[2rem]">Login</h1>
            <div className="mb-4">Entre com seu nome e senha para entrar</div>
            <form
              onSubmit={loginButtonPressed}
              className="text-white flex flex-col gap-4"
            >
              <input
                className="w-full rounded pl-4 bg-gray-700 placeholder-gray-300"
                type="text"
                placeholder="Usuário"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <input
                className="w-full rounded pl-4 bg-gray-700 placeholder-gray-300"
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              ></input>

              <button
                className="text-black font-bold h-full p-2 mt-4 rounded-xl
                 bg-ligthGreen-400 hover:bg-ligthGreen-500 
                flex align-middle justify-center
                "
                type="submit"
              >
                Acessar Conta
              </button>
            </form>
          </div>
          <div className="flex justify-center">
            <Image
              className="w-max "
              src={logoPequeno}
              alt="logo NH"
              width={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
