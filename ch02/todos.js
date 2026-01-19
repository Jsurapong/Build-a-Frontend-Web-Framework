// State of the app
const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs']
// HTML element references
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')

// Initialize the view
for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo))
}

// Add event listener to the input field
addTodoInput.addEventListener('input', () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

// Add event listener to the button

addTodoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && addTodoButton.disabled === false) {
        addTodo()
    }
})

addTodoButton.addEventListener('click', addTodo)

function renderTodoInReadMode(todo) {
    // TODO: Implement this function
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.textContent = todo
    span.addEventListener("dblclick", () => {
        const idx = todos.indexOf(todo)
        todosList.replaceChild(renderTodoInEditMode(todo), todosList.children[idx])
    })
    li.append(span)
    

    const button = document.createElement('button')
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        removeTodo(idx)
    })
    li.append(button)
    return li
}

function addTodo() {
    const newTodo = addTodoInput.value
    todos.push(newTodo)
    const todo = renderTodoInReadMode(newTodo)

    todosList.append(todo);
    addTodoInput.value = ''
    addTodoButton.disabled = true
}

function removeTodo(idx) {
    todos.splice(idx, 1)
    todosList.removeChild(todosList.children[idx])
}

function renderTodoInEditMode(todo) {
    // TODO: Implement this function
    const li = document.createElement('li')
    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo
    li.append(input)

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        updateTodo(idx, input.value)
    })
    li.append(saveBtn)


    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        todosList.replaceChild(renderTodoInReadMode(todo), todosList.children[idx])
    })
    li.append(cancelBtn)
    return li
}

function updateTodo(idx, todo) {
    // TODO: Implement this function
    todos[idx] = todo
    todosList.replaceChild(renderTodoInReadMode(todo), todosList.children[idx])
}