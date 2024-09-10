import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Task from "./database/schema.js";
import db from "./database/db.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({
        message: "Tasks not found",
      });
    }
    res.status(200).json({
      data: {
        tasks: tasks,
      },
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      id: uuidv4().toString(),
      title: req.body.title,
      description: req.body.description,
      status: "todo",
    });
    await task.save();
    res.status(201).json({
      data: {
        task: task,
      },
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (req.body.status === "inprog") {
      task.status = "inprog";
    } else if (req.body.status === "done") {
      task.status = "done";
    } else if (req.body.status === "todo") {
      task.status = "todo";
    } else {
      task.status = task.status;
    }

    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    await task.save();
    res.status(200).json({
      data: {
        task: task,
      },
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
