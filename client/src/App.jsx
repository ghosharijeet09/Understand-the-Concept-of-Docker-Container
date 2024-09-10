import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const API_URL = 'http://localhost:8000';

const ItemType = 'TASK';

const DraggableTask = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id: task.id, index, status: task.status },
  });

  return (
    <div
      ref={ref}
      className="task"
      style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}
    >
      {task.title}
      {task.description}
    </div>
  );
};

const DroppableColumn = ({ columnId, tasks, moveTask }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.id, item.status, columnId),
  });

  return (
    <div className="column" ref={ref}>
      <h2>{columnId.replace(/([A-Z])/g, ' $1')}</h2>
      {tasks.map((task, index) => (
        <DraggableTask key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inprog: [],
    done: []
  });
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const data = await res.json();
        const fetchedTasks = data.data.tasks;
        const updatedTasks = {
          todo: [],
          inprog: [],
          done: []
        }
        fetchedTasks.forEach((task) => {
          updatedTasks[task.status].push(task);
        });
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskName, description: taskName })
      });
      const data = await res.json();
      const newTask = data.data.task;
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask]
      }));
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const moveTask = async (taskId, sourceStatus, destStatus) => {
    if (sourceStatus === destStatus) return;

    const sourceColumn = Array.from(tasks[sourceStatus]);
    const destColumn = Array.from(tasks[destStatus]);
    const taskIndex = sourceColumn.findIndex(task => task.id === taskId);
    const [movedTask] = sourceColumn.splice(taskIndex, 1);
    destColumn.push(movedTask);

    setTasks({
      ...tasks,
      [sourceStatus]: sourceColumn,
      [destStatus]: destColumn
    });

    console.log("DestStatus: ", destStatus);

    try {
      await fetch(`${API_URL}/tasks/${movedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: destStatus })
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="task-manager">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <DndProvider backend={HTML5Backend}>
        {['todo', 'inprog', 'done'].map((columnId) => (
          <DroppableColumn
            key={columnId}
            columnId={columnId}
            tasks={tasks[columnId]}
            moveTask={moveTask}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default App;