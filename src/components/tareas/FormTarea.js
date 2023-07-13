import React, { useState } from 'react';
import axios from 'axios';

const FormTarea = ({ onTareaGuardada }) => {
    const [tarea, setTarea] = useState('');
    const [etiqueta, setEtiqueta] = useState('');

    const fechaActual = new Date();
    const fecha = new Date(fechaActual);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");
    const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}`;

    const crearTarea = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/tareas', { id: 0, tarea: tarea, etiqueta: etiqueta, fecha: fechaFormateada });
            setTarea('');
            setEtiqueta('');
            onTareaGuardada();
        } catch (error) {
            console.error('Error al guardar tarea:', error);
        }
    };

    return (
        <div>
            <div className='row py-4'>
                <div className='col-12 py-4 rounded text-center text-light fw-bold' style={{ background: '#092942' }}>
                    MODULO 3 - REACT - APLICACION DE TAREAS
                </div>
            </div>
            <div className='row p-5 mt-3 mb-5 bg-white rounded shadow-sm'>
                <div className='col-8 py-3'>
                    <label htmlFor="" className='fw-medium text-secondary' style={{ fontSize: '15px' }}> &nbsp; TAREA</label>
                    <input type="text" className='form-control form-control-lg' value={tarea} onChange={(e) => setTarea(e.target.value)}></input>
                </div>
                <div className='col-4 py-3'>
                    <label htmlFor="" className='fw-medium text-secondary' style={{ fontSize: '15px' }}> &nbsp; ETIQUETA</label>
                    <input type="text" className='form-control form-control-lg' value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)}></input>
                </div>
                <div className='col-12 py-3 text-center'>
                    <button onClick={crearTarea} className='btn btn-xl fs-6 py-3 btn-crear-tarea shadow rounded-pill'> &nbsp; &nbsp; &nbsp; &nbsp;
                        <svg width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg> &nbsp;CREAR TAREA &nbsp; &nbsp; &nbsp; &nbsp;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormTarea;