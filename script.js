// To-Do List Functionality
let todos = [];
let todoId = 1;

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: todoId++,
        text: todoText
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');
    
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button onclick="removeTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Contact Form Functionality
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const messageDiv = document.getElementById('formMessage');
    
    // Basic validation
    if (!name || !email || !message) {
        messageDiv.innerHTML = '<span class="error">Please fill in all fields.</span>';
        return;
    }
    
    // Simulate form submission
    messageDiv.innerHTML = '<span class="success">Thank you for your message! We\'ll get back to you soon.</span>';
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
    
    // Todo input Enter key
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initial render
    renderTodos();
});

// Additional utility functions
function clearAllTodos() {
    if (todos.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all tasks?')) {
        todos = [];
        renderTodos();
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addTodo,
        removeTodo,
        renderTodos,
        clearAllTodos
    };
}