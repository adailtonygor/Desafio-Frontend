import { BrowserRouter, Routes, Route} from "react-router-dom";

import Cadastro from '../Cadastro/Cadastro'
import Root from "../Root";
import UserTable from "../ConsultaUsuario/ConsultaUsuario";

function Index() {
  return (
    <div style={{ color: "black", padding: "40px", textAlign: "center" }}>
      <h1>Bem-vindo ao Desafio Nova</h1>
      <p>Realize o cadastro do usuário para começar!</p>
    </div>
  );
}


function RoutesApp()  {
    return (
        <BrowserRouter>

            <Routes>
              <Route path="/" element={<Root/>} >
                <Route index element={ <Index />}/>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="UserTable" element={<UserTable/>} />

              </Route>
               
            </Routes>

        </BrowserRouter>
    )
}

export default RoutesApp