import { createContext, useContext, useState } from "react";
//aprendimos **createContext()**
const initialContext = createContext(null)
//Basicamente es un componente que comparte un estado inicial y que le dices que renderizara lo que yo ponga dentro de el {{children}}

export function SanstreamLyout({children}) {

  const [context, setContext] = useState(true); // Estado compartido

  return (
    <>
     <initialContext.Provider value = {{context, setContext}}>
      {children}
     </initialContext.Provider>
    </>
  );
}
export function useInitialContext(){
  return useContext(initialContext)
}
