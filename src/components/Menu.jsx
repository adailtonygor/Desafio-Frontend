import './Menu.css'
import React from 'react'

import { Link } from 'react-router-dom'

const Menu = props => (
    <aside className="Menu">
        <nav>
            <ul>
                <li>
                    <Link to="/">Início</Link>
                </li>
                <li>
                    <Link to="/Cadastro">Cadastro</Link>
                </li>
                <li>
                    <Link to="/useReducer">Usuário</Link>
                </li>
               
            </ul>
        </nav>
    </aside>
)

export default Menu