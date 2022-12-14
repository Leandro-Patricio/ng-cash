export const abrirModal = (qualModal: string) => {
  let modal = undefined;
  if (qualModal === "login") {
    modal = document.getElementsByClassName("login")[0];
  } else if (qualModal === "cadastro") {
    modal = document.getElementsByClassName("cadastro")[0];
  } else if (qualModal === "logOut") {
    modal = document.getElementsByClassName("logOut")[0];
  }

  modal?.classList.remove("hidden");
  modal?.classList.add("block");
};

export const fecharModal = () => {
  const modal = document.getElementsByClassName("modal");

  for (let index = 0; index < modal.length; index++) {
    modal[index].classList.remove("block");
    modal[index].classList.add("hidden");
  }

  /*   modal.classList.remove("block");
    modal.classList.add("hidden"); */
};
