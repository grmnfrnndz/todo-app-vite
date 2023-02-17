import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderpending } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderpending(ElementIDs.PendingCount);
    }


    // Cuando la App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);

        
        displayTodos();

    })();


    // referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);

    // eventos
    newDescriptionInput.addEventListener('keyup', (event) => {

        // console.log(event);
        // console.log(event.target.value);

        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        event.target.value = '';
        displayTodos();
    });

    todoListUl.addEventListener('click', (event) => {
        // console.log(event.target);
        // lleva al elemento data-id mas cercano
        const element = event.target.closest('[data-id]');

        console.log(element.getAttribute('data-id'));
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUl.addEventListener('click', (event) => {
        // console.log(event.target.classList.contains('destroy'));
        // lleva al elemento data-id mas cercano

        const element = event.target.closest('[data-id]');
        if (!element || !event.target.classList.contains('destroy')) return;
        
        // console.log(element.getAttribute('data-id'));
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLi.forEach(element => {

        element.addEventListener('click', (element) => {
            filtersLi.forEach(elem => elem.classList.remove('selected'));
            element.target.classList.add('selected');


            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();

        });

    });

}