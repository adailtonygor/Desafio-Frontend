import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cadastro from '../Cadastro/Cadastro';
import Root from '../Root';
import ConsultarUsuario from '../ConsultarUsuario/ConsultarUsuario';

function PaginaInicial() {
    return (
        <div style={{ color: 'black', padding: '40px', textAlign: 'center' }}>
            <h1>Bem-vindo ao Desafio Nova</h1>
            <p>Realize o cadastro do usuário para começar!</p>
        </div>
    );
}

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<PaginaInicial />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route
                        path="/consultar-usuario"
                        element={<ConsultarUsuario />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
