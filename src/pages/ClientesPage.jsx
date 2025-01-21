import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientesPage = () => {
    const [noClientsFound, setNoClientsFound] = useState(false);

    const [formData, setFormData] = useState({
        id_cliente: "",
        tipo_documento: "C.C",
        numero_documento: "",
        nombre: "",
        telefono: "",
        direccion: "",
        id_estado_cliente: "ESTCLI001",
        id_tarifa_estandar: "TAREST001",
        id_tarifa_medidor: "TARMED001",
    });

    const [clientes, setClientes] = useState([]);

    const notify = (message, type) => {
        if (type === "success") {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9090/agregar_cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                notify("Cliente agregado exitosamente", "success");
                setFormData({
                    id_cliente: "",
                    tipo_documento: "C.C",
                    numero_documento: "",
                    nombre: "",
                    telefono: "",
                    direccion: "",
                    id_estado_cliente: "ESTCLI001",
                    id_tarifa_estandar: "TAREST001",
                    id_tarifa_medidor: "TARMED001",
                });
                fetchAllClientes();
            } else {
                notify(data.message || "Error al agregar el cliente", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const fetchClienteById = async () => {
        try {
            const response = await fetch(`http://localhost:9090/buscar_cliente?id_cliente=${formData.id_cliente}`);
            const data = await response.json();
            if (response.ok) {
                setFormData(data);
            } else {
                notify("Error al obtener el cliente", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const fetchAllClientes = async () => {
        try {
            const response = await fetch("http://localhost:9090/buscar_todos_clientes");
            const data = await response.json();
            if (response.ok) {
                setClientes(data);
                if (data.length === 0) {
                    toast.info("No se encontraron clientes.");
                }
            } else {
                notify("Error al obtener los clientes", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const searchClientesByKeyword = async () => {
        try {
            const response = await fetch(`http://localhost:9090/buscar_clientes_por_palabra?palabra_clave=${formData.nombre}`);
            const data = await response.json();
            if (response.ok) {
                setClientes(data);
            } else {
                notify("Error al buscar los clientes", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:9090/actualizar_cliente?id_cliente=${formData.id_cliente}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                notify("Cliente actualizado exitosamente", "success");
                setFormData({
                    id_cliente: "",
                    tipo_documento: "C.C",
                    numero_documento: "",
                    nombre: "",
                    telefono: "",
                    direccion: "",
                    id_estado_cliente: "ESTCLI001",
                    id_tarifa_estandar: "TAREST001",
                    id_tarifa_medidor: "TARMED001",
                });
                fetchAllClientes();
            } else {
                notify(data.message || "Error al actualizar el cliente", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:9090/eliminar_cliente?id_cliente=${formData.id_cliente}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                notify("Cliente eliminado exitosamente", "success");
                setFormData({
                    id_cliente: "",
                    tipo_documento: "C.C",
                    numero_documento: "",
                    nombre: "",
                    telefono: "",
                    direccion: "",
                    id_estado_cliente: "ESTCLI001",
                    id_tarifa_estandar: "TAREST001",
                    id_tarifa_medidor: "TARMED001",
                });
                fetchAllClientes();
            } else {
                notify(data.message || "Error al eliminar el cliente", "error");
            }
        } catch (error) {
            notify("Error de conexión con el servidor", "error");
            console.error("Error:", error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value);
    };

    useEffect(() => {
        fetchAllClientes();
    }, []);

    return (
        <div className="ClientesPageCustom">
            <ToastContainer />
            <h1 className="pagesTitleCustom">Clientes</h1>
            <form className="FormContainerCustom" onSubmit={handleSubmit}>
                <div className="inputsRowCustom">
                    <div className="groupCustom">
                        <select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} className="inputCustom">
                            <option value="C.C">C.C</option>
                            <option value="Nit">Nit</option>
                        </select>
                        <label>Tipo de Identificación</label>
                    </div>
                    <div className="groupCustom">
                        <input
                            type="text"
                            name="numero_documento"
                            value={formData.numero_documento}
                            onChange={handleChange}
                            required
                            className="inputCustom"
                        />
                        <span className="highlightCustom"></span>
                        <span className="barCustom"></span>
                        <label>Número de Identificación</label>
                    </div>
                    <div className="groupCustom">
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="inputCustom"
                        />
                        <span className="highlightCustom"></span>
                        <span className="barCustom"></span>
                        <label>Nombre Completo</label>
                    </div>
                    <div className="groupCustom">
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                            className="inputCustom"
                        />
                        <span className="highlightCustom"></span>
                        <span className="barCustom"></span>
                        <label>Teléfono</label>
                    </div>
                    <div className="groupCustom">
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            className="inputCustom"
                        />
                        <span className="highlightCustom"></span>
                        <span className="barCustom"></span>
                        <label>Dirección</label>
                    </div>
                    <div className="groupCustom">
                        <select name="id_estado_cliente" value={formData.id_estado_cliente} onChange={handleChange} className="inputCustom">
                            <option value="ESTCLI001">Activo</option>
                            <option value="ESTCLI002">Inactivo</option>
                            <option value="ESTCLI003">Suspendido</option>
                        </select>
                        <label>Estado Cliente</label>
                    </div>
                    <div className="groupCustom">
                        <input
                            type="text"
                            name="id_matricula"
                            value={formData.id_matricula}
                            onChange={handleChange}
                            required
                            className="inputCustom"
                            readOnly
                        />
                        <span className="highlightCustom"></span>
                        <span className="barCustom"></span>
                        <label>Número de Matrícula</label>
                    </div>
                    <div className="groupCustom">
                        <select name="id_tarifa_estandar" value={formData.id_tarifa_estandar} onChange={handleChange} className="inputCustom">
                            <option value="TAREST001">Tarifa Residencial</option>
                            <option value="TAREST002">Tarifa Quesera</option>
                            <option value="TAREST003">Tarifa Matadero</option>
                            <option value="TAREST004">Tarifa Marranera</option>
                        </select>
                        <label>Tipo de Tarifa</label>
                    </div>
                </div>
                <div className="buttonsCustom">
                    <button className="crudBtnCustom" type="submit">Crear Cliente</button>
                    <button className="crudBtnCustom" type="button" onClick={fetchAllClientes}>Listar Clientes</button>
                    <button className="crudBtnCustom" type="button" onClick={searchClientesByKeyword}>Buscar Clientes</button>
                    <button className="crudBtnCustom" type="button" onClick={handleEdit}>Editar Cliente</button>
                    <button className="btnEliminarCustom" type="button" onClick={handleDelete}>Eliminar Cliente</button>
                </div>
            </form>
            <div className="ClientListCustom">
                <h2 className="ListClientTitleCustom">Resultados de la Búsqueda:</h2>
                <div className="clientTableCustom">
                    <div className="clientTableHeaderCustom">
                        <div>ID Cliente</div>
                        <div>Tipo Documento</div>
                        <div>Número Documento</div>
                        <div>Nombre</div>
                        <div>Teléfono</div>
                        <div>Dirección</div>
                        <div>Estado</div>
                        <div>Matrícula</div>
                        <div>Tarifa</div>
                    </div>
                    <div className="clientTableBodyCustom">
                        {clientes.map((cliente) => (
                            <div key={cliente.id_cliente} className="clientTableRowCustom">
                                <div>{cliente.id_cliente}</div>
                                <div>{cliente.tipo_documento}</div>
                                <div>{cliente.numero_documento}</div>
                                <div>{cliente.nombre}</div>
                                <div>{cliente.telefono}</div>
                                <div>{cliente.direccion}</div>
                                <div>{cliente.id_estado_cliente}</div>
                                <div>{cliente.id_matricula}</div>
                                <div>{cliente.id_tarifa_estandar}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesPage;
