import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    CaretDown,
    CaretLeft,
    Invoice,
    Calculator,
    SignOut,
    FilePlus,
    User,
    MoneyWavy,
    FolderPlus,
    Wallet,
    Plus,
    TreasureChest,
    Minus,
} from "@phosphor-icons/react";
import AcueductoLogo from "../imagenes/LogoAcueducto.png";

const Sidebar = () => {
    const [activeItems, setActiveItems] = useState([]);
    const [isSidebarActive, setSidebarActive] = useState(false);

    const handleItemClick = (index) => {
        setActiveItems((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    };

    const toggleSidebar = () => {
        setSidebarActive((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <div className={`Sidebar ${isSidebarActive ? "active" : ""}`}>
            <div className="menuBtn" onClick={toggleSidebar}>
                <CaretLeft className="iconArrow" />
            </div>
            <div className="navSidebar">
                <div className="AcueductoMenu">
                    <div className={`logo-container ${isSidebarActive ? "open" : "closed"}`}>
                        <img src={AcueductoLogo} alt="Logo Acueducto" className="logo" />
                        {!isSidebarActive && <p className="SideBarTittle">Agua Pura, Vida Segura</p>}
                    </div>

                    <ul>
                        <li className={activeItems.includes(1) ? "active" : ""}>
                            <Link to="#" onClick={() => handleItemClick(1)}>
                                <Invoice className="iconSidebar" />
                                <span className="text">Facturación</span>
                                <CaretDown
                                    className={`arrow ${activeItems.includes(1) ? "active" : ""}`}
                                />
                            </Link>
                            <ul className={`submenu ${activeItems.includes(1) ? "open" : ""}`}>
                                <li>
                                    <Link to="/app/facturacion" onClick={() => setActiveItems([])}>
                                        <FilePlus className="iconSidebar" />
                                        <span className="text">Crear Factura</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/clientes" onClick={() => setActiveItems([])}>
                                        <User className="iconSidebar" />
                                        <span className="text">Clientes</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/multas" onClick={() => setActiveItems([])}>
                                        <MoneyWavy className="iconSidebar" />
                                        <span className="text">Multas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/matriculas" onClick={() => setActiveItems([])}>
                                        <FolderPlus className="iconSidebar" />
                                        <span className="text">Matrículas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/pagos" onClick={() => setActiveItems([])}>
                                        <Wallet className="iconSidebar" />
                                        <span className="text">Pagos</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={activeItems.includes(2) ? "active" : ""}>
                            <Link to="#" onClick={() => handleItemClick(2)}>
                                <Calculator className="iconSidebar" />
                                <span className="text">Contabilidad</span>
                                <CaretDown
                                    className={`arrow ${activeItems.includes(2) ? "active" : ""}`}
                                />
                            </Link>
                            <ul className={`submenu ${activeItems.includes(2) ? "open" : ""}`}>
                                <li>
                                    <Link to="/app/ingresos" onClick={() => setActiveItems([])}>
                                        <Plus className="iconSidebar" />
                                        <span className="text">Ingresos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/egresos" onClick={() => setActiveItems([])}>
                                        <Minus className="iconSidebar" />
                                        <span className="text">Egresos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/app/inventario" onClick={() => setActiveItems([])}>
                                        <TreasureChest className="iconSidebar" />
                                        <span className="text">Inventario</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <div className="logout-container">
                            <li className="logout-button">
                                <Link to="/" onClick={handleLogout}>
                                    <SignOut className="iconSidebar" />
                                    <span className="text">Salir</span>
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
