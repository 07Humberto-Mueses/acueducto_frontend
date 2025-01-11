import React, { useState, useEffect } from "react";
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
  Gear,
  UserPlus,
  Password,
  List,
} from "@phosphor-icons/react";
import AcueductoLogo from "../imagenes/LogoAcueducto.png";

const Sidebar = () => {
  const [activeItems, setActiveItems] = useState([]);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

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
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
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
            {userRole === "ROL001" && (
              <>
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
                <li className={activeItems.includes(3) ? "active" : ""}>
                  <Link to="#" onClick={() => handleItemClick(3)}>
                    <Gear className="iconSidebar" />
                    <span className="text">Configuración</span>
                    <CaretDown
                      className={`arrow ${activeItems.includes(3) ? "active" : ""}`}
                    />
                  </Link>
                  <ul className={`submenu ${activeItems.includes(3) ? "open" : ""}`}>
                    <li>
                      <Link to="/app/crear_usuario" onClick={() => setActiveItems([])}>
                        <UserPlus className="iconSidebar" />
                        <span className="text">Crear Usuario</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/app/cambiar_contraseña" onClick={() => setActiveItems([])}>
                        <Password className="iconSidebar" />
                        <span className="text">Cambiar Contraseña</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/app/listar_usuarios" onClick={() => setActiveItems([])}>
                        <List  className="iconSidebar" />
                        <span className="text">Listar Usuarios</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {userRole === "ROL002" && (
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
            )}

            {userRole === "ROL003" && (
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
            )}

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

