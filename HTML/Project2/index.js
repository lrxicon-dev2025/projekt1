// Tip calculator removed — kept todo list only

// -----------------------------
// Todo list implementation
// -----------------------------
const TODO_KEY = 'todoListV1';
let todos = [];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');

function loadTodos() {
	try {
		const raw = localStorage.getItem(TODO_KEY);
		todos = raw ? JSON.parse(raw) : [];
	} catch (e) {
		console.error('Failed to load todos', e);
		todos = [];
	}
}

function saveTodos() {
	try {
		localStorage.setItem(TODO_KEY, JSON.stringify(todos));
	} catch (e) {
		console.error('Failed to save todos', e);
	}
}

function renderTodos() {
	if (!todoListEl) return;
	todoListEl.innerHTML = '';
	todos.forEach(item => {
		const li = document.createElement('li');
		li.className = 'todo-item';
		if (item.done) li.classList.add('done');
		li.dataset.id = item.id;

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!item.done;
		checkbox.className = 'todo-toggle';

		const span = document.createElement('span');
		span.className = 'todo-text';
		span.textContent = item.text;

		const del = document.createElement('button');
		del.className = 'todo-delete';
		del.setAttribute('aria-label', 'Delete task');
		del.textContent = '✕';

		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(del);
		todoListEl.appendChild(li);
	});
}

function addTodo(text) {
	const t = text && text.trim();
	if (!t) return;
	const newTodo = { id: Date.now().toString(), text: t, done: false };
	todos.unshift(newTodo);
	saveTodos();
	renderTodos();
}

function toggleTodo(id) {
	const it = todos.find(t => t.id === id);
	if (!it) return;
	it.done = !it.done;
	saveTodos();
	renderTodos();
}

function deleteTodo(id) {
	todos = todos.filter(t => t.id !== id);
	saveTodos();
	renderTodos();
}

// Event handlers
if (todoForm) {
	todoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		if (!todoInput) return;
		addTodo(todoInput.value);
		todoInput.value = '';
		todoInput.focus();
	});
}

if (todoListEl) {
	todoListEl.addEventListener('click', (e) => {
		const li = e.target.closest('li.todo-item');
		if (!li) return;
		const id = li.dataset.id;
		if (e.target.matches('.todo-toggle')) {
			toggleTodo(id);
			return;
		}
		if (e.target.matches('.todo-delete')) {
			deleteTodo(id);
			return;
		}
	});
}

// Initialize todos and render
loadTodos();
renderTodos();

// -----------------------------
// AI compatibility: export/import and JSON-LD
// -----------------------------
const exportBtn = document.getElementById('export-json');
const importBtn = document.getElementById('import-json');
const importFileInput = document.getElementById('import-file');
const jsonLdEl = document.getElementById('todo-jsonld');

function updateJsonLd() {
	if (!jsonLdEl) return;
	// Build a simple schema.org ItemList
	const itemList = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		'itemListElement': todos.map((t, i) => ({
			'@type': 'ListItem',
			'position': i + 1,
			'name': t.text,
			'url': window.location.href + '#todo-' + t.id,
			'additionalProperty': { 'done': !!t.done }
		}))
	};
	jsonLdEl.textContent = JSON.stringify(itemList, null, 2);
}

function exportTodos() {
	const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'todos.json';
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

function importTodosFromFile(file) {
	if (!file) return;
	const reader = new FileReader();
	reader.onload = () => {
		try {
			const parsed = JSON.parse(reader.result);
			if (Array.isArray(parsed)) {
				// basic validation: array of {id,text,done}
				todos = parsed.map(t => ({ id: t.id || Date.now().toString(), text: t.text || '', done: !!t.done }));
				saveTodos();
				renderTodos();
				updateJsonLd();
			} else {
				alert('Imported JSON must be an array of todos');
			}
		} catch (e) {
			alert('Failed to parse JSON: ' + e.message);
		}
	};
	reader.readAsText(file);
}

if (exportBtn) exportBtn.addEventListener('click', () => { exportTodos(); });
if (importBtn && importFileInput) {
	importBtn.addEventListener('click', () => importFileInput.click());
	importFileInput.addEventListener('change', (e) => {
		const f = e.target.files && e.target.files[0];
		if (f) importTodosFromFile(f);
		importFileInput.value = '';
	});
}

// update JSON-LD whenever todos change
const originalSaveTodos = saveTodos;
saveTodos = function () {
	originalSaveTodos();
	updateJsonLd();
};

// initialize JSON-LD
updateJsonLd();
