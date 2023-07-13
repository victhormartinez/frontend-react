import React, { useState } from 'react';

import FormTarea from './tareas/FormTarea';
import ListarTareas from './tareas/ListarTareas';

const App = () => {
    const [tareaGuardada, setTareaGuardada] = useState(false);
    const actualizarTareas = () => {
        setTareaGuardada(!tareaGuardada);
    };

    return (
        <div className="container">
            <FormTarea onTareaGuardada={actualizarTareas} />
            <ListarTareas actualizarTareas={actualizarTareas} />
        </div>
    );
}

export default App;
