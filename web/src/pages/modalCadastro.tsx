import swal from "sweetalert";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { fecharModal } from "../components/open-close-modals";

export default function ModalCadastro() {
  const [newUsername, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/users", {
        username: newUsername,
        password: newPassword,
      });
      const apiResponse = response.data;
      /*   alert(apiResponse); */
      return swal({
        title: `Parabéns ${newUsername}!`,
        text: "Você acaba de criar sua nova conta na NG.Cash, e ja tem R$100,00 nela!",
        icon: "sucess",
      }).then(() => {
        setNewPassword("");
        setNewUserName("");
        fecharModal();
      });
    } catch (err: any) {
      swal({
        title: `Ops!`,
        text: err.response.data,
        icon: "warning",
      });
    }
  };

  /*   efeito para mudança de cores na senha do usuário */
  useEffect(() => {
    const changeColorToRed = (classOfDiv: string) => {
      const alvo = document.getElementsByClassName(classOfDiv)[0];
      alvo.classList.add("text-red-500");
      alvo.classList.remove("text-green-500");
    };
    const changeColorToGreen = (classOfDiv: string) => {
      const alvo = document.getElementsByClassName(classOfDiv)[0];
      alvo.classList.add("text-green-500");
      alvo.classList.remove("text-red-500");
    };

    if (newPassword != "") {
      if (newPassword.length < 8) {
        changeColorToRed("8caracteres");
      } else if (newPassword.length >= 8) {
        changeColorToGreen("8caracteres");
      }

      const passwordSplit = newPassword.split("");
      if (passwordSplit.find(Number) === undefined) {
        changeColorToRed("1numero");
      } else {
        changeColorToGreen("1numero");
      }

      if (/[A-Z]/.test(newPassword) !== true) {
        changeColorToRed("letraMaiuscula");
      } else {
        changeColorToGreen("letraMaiuscula");
      }
    }
  }, [newPassword]);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-black bg-opacity-90 outsideModal cadastro hidden modal">
      <div className="cadastro bg-black opacity-1 m-[8rem_20%] p-[0rem_1rem_2rem_1rem] border-purple-500 border-2 rounded-2xl">
        <button
          className="relative w-full text-end right-4 "
          onClick={() => fecharModal()}
        >
          X
        </button>

        <div className="grid grid-cols-2 text-center items-center pl-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold mb-[2rem]">Cadastro</h1>
            <div className="mb-4">
              Crie seu usuário e senha únicos.
              <br />
              Atente para as regras ao lado para criação da sua senha
            </div>
            <form
              onSubmit={sendSubmit}
              className="text-white flex flex-col gap-4"
            >
              <input
                className="w-full rounded pl-4 bg-gray-700 placeholder-gray-300"
                type="text"
                placeholder="Usuário"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUsername}
              ></input>
              <input
                className="w-full rounded pl-4 bg-gray-700 placeholder-gray-300"
                type="password"
                placeholder="Senha"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              ></input>

              <button
                type="submit"
                className="text-black font-bold h-10 mt-4 rounded-xl bg-ligthGreen-400 hover:bg-ligthGreen-500"
              >
                Criar conta
              </button>
            </form>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[1.5rem] font-bold mb-4 ">
              Sua senha deve ter, <br />
              no mínimo:
            </h2>
            <ul className="text-left ml-14 text-white list-disc">
              <li className="8caracteres">8 caracteres</li>
              <li className="1numero">1 número</li>
              <li className="letraMaiuscula">1 letra maiúscula</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
