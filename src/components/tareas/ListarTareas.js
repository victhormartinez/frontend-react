import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ListarTareas = ({ actualizarTareas }) => {
    const [tareas, setTareas] = useState([]);
    const [modalVerTareaVisible, setModalVerTareaVisible] = useState(false);
    const [modalEditarTareaVisible, setModalEditarTareaVisible] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [tareaEditada, setTareaEditada] = useState(null);

    useEffect(() => {
        // LISTA LAS TAREAS DESDE LA API
        const listarTareas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tareas');
                setTareas(response.data);
            } catch (error) {
                console.error('Error al obtener tareas:', error);
            }
        };

        listarTareas();
    }, [actualizarTareas]);

    // ELIMINA LAS TAREAS MEDIANTE LA API
    const eliminarTarea = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tareas/${id}`);
            actualizarTareas();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    const guardarTareaEditada = async () => {
        try {
            await axios.put(`http://localhost:8000/api/tareas/${tareaEditada._id}`, tareaEditada);
            cerrarModal();
            actualizarTareas();
        } catch (error) {
            console.error('Error al guardar tarea editada:', error);
        }
    };


    const editarTarea = (tarea) => {
        setTareaEditada(tarea);
        setModalEditarTareaVisible(true);
    };

    // ABRE EL MODAL CON LA TAREA SELECCIONADA
    const abrirModal = (tarea) => {
        setTareaSeleccionada(tarea);
        setModalVerTareaVisible(true);
    };

    // CIERRA EL MODAL
    const cerrarModal = () => {
        setModalVerTareaVisible(false);
        setModalEditarTareaVisible(false);
    };

    return (
        <div>
            {tareas.map((tarea) => (
                <div key={tarea._id}>
                    <div className='row border border-2 bg-white rounded my-3 overflow-hidden shadow-sm'>
                        <div className='col-4 p-3 text-light' style={{ background: '#0e4c68' }}>
                            <span className='fs-5 fw-medium'>{tarea.tarea}</span> <br></br>
                            <span className='fw-light'>Fecha: <span className='fw-medium'>{tarea.fecha}</span></span> <div className='py-2'></div>
                            <span className='badge'> {tarea.etiqueta} </span>
                        </div>
                        <div className='col-2'></div>
                        <div className='col align-self-center text-center'>
                            <button className='btn btn-outline-success rounded-pill px-4 py-2'>
                                <svg width="24" height="24" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                                </svg>
                            </button>
                        </div>
                        <div className='col align-self-center text-center'>
                            <button onClick={() => abrirModal(tarea)} className='btn btn-outline-info rounded-pill px-4 py-2'>
                                <svg width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className='col align-self-center text-center'>
                            <button onClick={() => editarTarea(tarea)} className='btn btn-outline-warning rounded-pill px-4 py-2'>
                                <svg width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>
                        </div>
                        <div className='col align-self-center text-center'>
                            <button onClick={() => eliminarTarea(tarea._id)} className='btn btn-outline-danger rounded-pill px-4 py-2'>
                                <svg width="24" height="24" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <Modal show={modalVerTareaVisible} onHide={cerrarModal}>
                <Modal.Header closeButton className='shadow-sm text-light' style={{background: '#092942'}}>
                    <Modal.Title>TAREA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tareaSeleccionada && (
                        <div>
                            <h5>{tareaSeleccionada.tarea}</h5>
                            <p>Fecha: {tareaSeleccionada.fecha}</p>
                            <span className='badge'> { tareaSeleccionada.etiqueta } </span>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='shadow-sm btn-danger rounded-pill py-2 fs-6' onClick={cerrarModal}>
                        &nbsp; &nbsp; CERRAR &nbsp; &nbsp;
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalEditarTareaVisible} onHide={cerrarModal}>
                <Modal.Header closeButton className='text-light' style={{background: '#092942'}}>
                    <Modal.Title>EDITAR TAREA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tareaEditada && (
                        <div>
                            <label htmlFor="" className='fw-medium text-secondary' style={{ fontSize: '15px' }}> &nbsp; TAREA</label>
                            <input type="text" className='form-control form-control-lg mb-3' value={tareaEditada.tarea} onChange={(e) => setTareaEditada({ ...tareaEditada, tarea: e.target.value })} />
                            <label htmlFor="" className='fw-medium text-secondary' style={{ fontSize: '15px' }}> &nbsp; FECHA</label>
                            <input type="text" className='form-control form-control-lg mb-3' value={tareaEditada.fecha} onChange={(e) => setTareaEditada({ ...tareaEditada, fecha: e.target.value })} />
                            <label htmlFor="" className='fw-medium text-secondary' style={{ fontSize: '15px' }}> &nbsp; ETIQUETA</label>
                            <input type="text" className='form-control form-control-lg mb-3' value={tareaEditada.etiqueta} onChange={(e) => setTareaEditada({ ...tareaEditada, etiqueta: e.target.value })} />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-danger rounded-pill py-2 fs-6' onClick={cerrarModal}>
                        &nbsp; &nbsp; CANCELAR &nbsp; &nbsp;
                    </Button>
                    <Button className='btn-crear-tarea rounded-pill py-2 fs-6' onClick={guardarTareaEditada}>
                        &nbsp; &nbsp; GUARDAR &nbsp; &nbsp;
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ListarTareas;
