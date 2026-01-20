// State of the app
const todos = [
    { description: 'Walk the dog', done: true },
    { description: 'Water the plants', done: false },
    { description: 'Sand the chairs', done: false },
]
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
    span.textContent = todo.description

    if (todo.done) {
        span.classList.add('done')

    }

    if (!todo.done) {
        span.addEventListener("dblclick", () => {
            const idx = todos.indexOf(todo)
            todosList.replaceChild(renderTodoInEditMode(todo), todosList.children[idx])
        })



    }
    li.append(span)


    if (!todo.done) {
        const button = document.createElement('button')
        button.textContent = 'Done';
        button.addEventListener('click', () => {
            const idx = todos.indexOf(todo)
            removeTodo(idx)
        })
        li.append(button)
    }

    return li
}

function addTodo() {
    const description = addTodoInput.value
    if (todoExists(description)) {
        alert('Todo already exists')
        return
    }

    const newTodo = { description: description, done: false }
    todos.push(newTodo)


    const todo = renderTodoInReadMode(newTodo)

    todosList.append(todo);
    addTodoInput.value = ''
    addTodoButton.disabled = true

    readTodo(description)
}

function removeTodo(idx) {
    todos[idx].done = true
    todosList.replaceChild(renderTodoInReadMode(todos[idx]), todosList.children[idx])
}

function renderTodoInEditMode(todo) {

    const li = document.createElement('li')
    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo.description
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
    todos[idx]['description'] = todo
    todosList.replaceChild(renderTodoInReadMode(todos[idx]), todosList.children[idx])
}
function todoExists(description) {
    const cleanTodos = todos.map((todo) => todo.description.trim().toLowerCase())
    return cleanTodos.includes(description.trim().toLowerCase())
}

function readTodo(description) {
    const message = new SpeechSynthesisUtterance()
    message.lang = 'th-TH'
    message.text = description
    message.voice = speechSynthesis.getVoices()[0]
    speechSynthesis.speak(message)
}