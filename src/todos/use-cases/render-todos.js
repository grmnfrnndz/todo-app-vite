import { Todo } from "../models/todo.model";
import { createTodoHtml } from "./";


let element;

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementoId, todos = []) => {
    
    // referencia
    if (!element)
        element = document.querySelector(elementoId);    

    if (!element) throw new Error(`elementId ${elementId} not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });

}