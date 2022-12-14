interface TransactionsBtn {
  type: string;
}
export default function transactionsBtn(props: TransactionsBtn) {
  const tipo = props.type;

  return (
    <button
      className=" w-full h-full flex justify-center  items-center bg-gray-500 rounded-lg p-2 
      shadow-[2px_2px_6px_0px] hover:cursor-pointer
shadow-ligthGreen-400
hover:shadow-ligthGreen-500
active:shadow-purple-500 selection:shadow-purple-500
  "
    >
      {props.type}
    </button>
  );
}
