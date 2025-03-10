const tasks = []; // Array to store tasks

class Task {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

// Function to add a new task
function addTask(id, name, description) {
  const newTask = new Task(id, name, description);
  tasks.push(newTask);
  console.log('Task added:', newTask);
}

// Function to view all tasks
function viewTasks() {
  console.log('All tasks:', tasks);
}

// Function to update a task
function updateTask(id, updatedName, updatedDescription) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.name = updatedName;
    task.description = updatedDescription;
    console.log('Task updated:', task);
  } else {
    console.log('Task not found!');
  }
}

// Function to delete a task
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    console.log('Task deleted:', deletedTask[0]);
  } else {
    console.log('Task not found!');
  }
}

// Example usage
addTask(1, 'Task 1', 'Description for Task 1');
addTask(2, 'Task 2', 'Description for Task 2');

viewTasks();

updateTask(1, 'Updated Task 1', 'Updated description for Task 1');

deleteTask(2);

viewTasks();
