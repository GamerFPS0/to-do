document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const allButton = document.getElementById('all');
    const activeButton = document.getElementById('active');
    const completedButton = document.getElementById('completed');
    const completeAllButton = document.getElementById('complete-all');
    const uncompleteAllButton = document.getElementById('uncomplete-all');
    const deleteAllButton = document.getElementById('delete-all');

    // Variable para almacenar el filtro actual: 'all', 'active' o 'completed'
    let currentFilter = 'all';

    // Mostrar mensaje inicial
    const mensajeInicial = document.createElement('li');
    mensajeInicial.className = 'mensaje-vacio';
    mensajeInicial.textContent = 'No hay tareas pendientes';
    todoList.appendChild(mensajeInicial);

    // Escuchar el evento "keypress" en el input para agregar tareas al presionar Enter
    newTodoInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && newTodoInput.value.trim() !== '') {
            agregarTarea(newTodoInput.value.trim());
            newTodoInput.value = '';
        }
    });

    // Función para agregar una tarea a la lista
    function agregarTarea(texto) {
        // Eliminar mensaje de "no hay tareas" si existe
        const mensajeVacio = todoList.querySelector('.mensaje-vacio');
        if (mensajeVacio) {
            mensajeVacio.remove();
        }

        const li = document.createElement('li');

        // Creamos el checkbox para marcar la tarea como completada
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // Cada vez que se cambia el estado del checkbox se actualiza la visibilidad de la tarea según el filtro
        checkbox.addEventListener('change', () => {
            aplicarFiltro();
        });

        // Creamos un elemento <span> para mostrar el texto de la tarea
        const span = document.createElement('span');
        span.textContent = texto;

        // Añadimos el checkbox y el texto a la tarea (li)
        li.appendChild(checkbox);
        li.appendChild(span);

        // Añadimos la tarea a la lista
        todoList.appendChild(li);

        // Actualizamos la vista según el filtro activo
        aplicarFiltro();
    }

    // Función que aplica el filtro actual a las tareas
    function aplicarFiltro() {
        const tareas = todoList.querySelectorAll('li');
        let tareasVisibles = 0;
        
        // Eliminar mensaje existente si hay alguno
        const mensajeExistente = todoList.querySelector('.mensaje-vacio');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        tareas.forEach(tarea => {
            const checkbox = tarea.querySelector('input[type="checkbox"]');
            switch (currentFilter) {
                case 'all':
                    tarea.style.display = '';
                    tareasVisibles++;
                    break;
                case 'active':
                    tarea.style.display = checkbox.checked ? 'none' : '';
                    if (!checkbox.checked) tareasVisibles++;
                    break;
                case 'completed':
                    tarea.style.display = checkbox.checked ? '' : 'none';
                    if (checkbox.checked) tareasVisibles++;
                    break;
                default:
                    tarea.style.display = '';
                    tareasVisibles++;
            }
        });

        // Mostrar mensaje si no hay tareas visibles
        if (tareasVisibles === 0) {
            const mensaje = document.createElement('li');
            mensaje.className = 'mensaje-vacio';
            if (currentFilter === 'completed') {
                mensaje.textContent = 'No hay ninguna tarea completada';
            } else if (currentFilter === 'active') {
                mensaje.textContent = 'No hay ninguna tarea sin hacer';
            } else {
                mensaje.textContent = 'No hay tareas pendientes';
            }
            todoList.appendChild(mensaje);
        }
    }

    function actualizarTitulo() {
        const sectionTitle = document.getElementById('section-title');
        switch (currentFilter) {
            case 'all':
                sectionTitle.textContent = 'Todas las Tareas';
                break;
            case 'active':
                sectionTitle.textContent = 'Tareas Pendientes';
                break;
            case 'completed':
                sectionTitle.textContent = 'Tareas Completadas';
                break;
        }
    }

    // Asignamos eventos a los botones de filtro
    allButton.addEventListener('click', () => {
        currentFilter = 'all';
        aplicarFiltro();
        actualizarTitulo();
    });

    activeButton.addEventListener('click', () => {
        currentFilter = 'active';
        aplicarFiltro();
        actualizarTitulo();
    });

    completedButton.addEventListener('click', () => {
        currentFilter = 'completed';
        aplicarFiltro();
        actualizarTitulo();
    });

    // Botón "Completar Todas": marca todas las tareas como completadas
    completeAllButton.addEventListener('click', () => {
        const tareas = todoList.querySelectorAll('li');
        tareas.forEach(tarea => {
            const checkbox = tarea.querySelector('input[type="checkbox"]');
            checkbox.checked = true;
        });
        aplicarFiltro();
    });

    // Botón "Descompletar Todas": desmarca todas las tareas como completadas
    uncompleteAllButton.addEventListener('click', () => {
        const tareas = todoList.querySelectorAll('li');
        tareas.forEach(tarea => {
            const checkbox = tarea.querySelector('input[type="checkbox"]');
            checkbox.checked = false;
        });
        aplicarFiltro();
    });

    // Botón "Eliminar Todas": elimina todas las tareas
    deleteAllButton.addEventListener('click', () => {
        todoList.innerHTML = '';
    });
});
