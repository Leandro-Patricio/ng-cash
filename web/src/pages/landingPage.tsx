import Image from "next/image";
import { useEffect, useState } from "react";

import logoGrande from "../assets/logoGrande.svg";
import { abrirModal, fecharModal } from "../components/open-close-modals";
import { api } from "../lib/axios";
import ModalCadastro from "./modalCadastro";
import ModalLogin from "./modalLogin";

interface HomeProps {
  numOfUsers?: number;
}

export default function LandingPage(props: HomeProps) {
  const toggleModal = useEffect(() => {
    window.onclick = function (e) {
      const alvo = e.target as Element;
      alvo.classList.contains("outsideModal") ? fecharModal() : null;
      return;
    };
  });

  return (
    <div className="text-white ">
      <main className="max-w-[1124] h-screen mx-auto grid grid-cols-[2fr_1fr] items-center ">
        <div className="text-center ml-10 items-center flex flex-col gap-8">
          <h1 className=" text-xl font-bold ">
            Crie uma conta nova e já saia usando
          </h1>

          <div className="flex flex-col justify-center gap-2">
            <div>
              Os priemeiros clientes que se cadastrarem ganham 100 reais para
              transferir para outros usuários!
            </div>
            <div>Promoção por tempo limitado.</div>
            <h2 className="text-[2rem] font-bold">Aproveite!</h2>
          </div>

          <div className="flex text-black font-bold gap-12 h-auto justify-center w-full">
            <button
              onClick={() => abrirModal("cadastro")}
              className="bg-ligthGreen-400 hover:bg-ligthGreen-500 rounded-2xl p-5 w-1/2 "
            >
              Cadastre-se agora mesmo
            </button>

            <button
              onClick={() => abrirModal("login")}
              className="bg-ligthGreen-400 hover:bg-ligthGreen-500 rounded-2xl p-5 w-1/2"
            >
              Já possui uma conta? <br />
              Então clique aqui
            </button>
          </div>

          <div className="">
            {props.numOfUsers} pessoas já aproveitaram. Faça já a sua conta
          </div>
        </div>

        <div className="flex flex-col h-full justify-evenly">
          <Image src={logoGrande} alt="logo NG.Cash" height={400} />

          <img
            src="https://cdn.myportfolio.com/e23c03130f693097e11e908e3f95d7ec/3bd56789-8e47-410c-be4c-b446aa28cb2b_rw_1920.gif?h=b97cf691e6785044b2b1e0f3158f9061"
            alt="gif de celular girando"
            height={400}
          />
        </div>
      </main>

      <ModalLogin />
      <ModalCadastro />
    </div>
  );
}

export const getServerSideProps = async () => {
  const numOfUsersResponse = await api.get("/users/count");
  return {
    props: {
      numOfUsers: numOfUsersResponse.data.numOfUsers,
    },
  };
};
