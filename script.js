const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, done=false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;

  span.addEventListener('dblclick', () => {
    const newText = prompt('ویرایش کار:', span.textContent);
    if (newText && newText.trim()) {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'حذف';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  if (done) li.classList.add('completed');

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  saveTasks();
}

addBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = '';
  }
});

taskInput.addEventListener('keyup', e => {
  if (e.key === 'Enter' && taskInput.value.trim()) {
    addTask(taskInput.value.trim());
    taskInput.value = '';
  }
});

const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
saved.forEach(t => addTask(t.text, t.done));
