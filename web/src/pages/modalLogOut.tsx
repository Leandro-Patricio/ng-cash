import { useRouter } from "next/router";
import React from "react";
import { fecharModal } from "../components/open-close-modals";

export default function ModalLogOut() {
  const router = useRouter();

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 w-full h-full
     bg-black bg-opacity-90
     outsideModal logOut hidden modal"
    >
      <div
        className="logOut bg-black opacity-1
       m-[8rem_20%] p-[0rem_1rem_2rem_1rem]
        border-purple-500 border-2 rounded-2xl"
      >
        <button
          className="relative w-full text-end right-4 "
          onClick={() => fecharModal()}
        >
          X
        </button>

        <div className="text-center items-center pl-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold mb-[2rem]">Já vai?</h1>
            <div className="mb-4">Tem certeza que deseja sair?</div>
            <div className="text-white flex mt-4 h-10 gap-4">
              <button
                onClick={() => fecharModal()}
                className="text-black font-bold
                w-full  rounded-xl bg-ligthGreen-400 hover:bg-ligthGreen-500"
              >
                Ficar
              </button>
              <button
                onClick={() => router.push("landingPage")}
                className="text-black font-bold w-full
              rounded-xl bg-ligthGreen-400 hover:bg-ligthGreen-500"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
