import { abrirModal, fecharModal } from "../components/open-close-modals";

interface UsuarioMainProps {
  action: string;
  navegacao?: VoidFunction;
}

export default function UsuarioMainNav(props: UsuarioMainProps) {
  return (
    <button
      className="border-1 
    shadow-[5px_5px_5px_0px]
    shadow-ligthGreen-400
    hover:shadow-ligthGreen-500
   flex justify-center items-center
   hover:bg-gray-500
   bg-gray-600
   rounded  
   break-all
   "
      onClick={props.navegacao}
    >
      {props.action}
    </button>
  );
}
