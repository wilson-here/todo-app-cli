const pg = require("pg");
const { Command } = require("commander");
const program = new Command();

const dotenv = require("dotenv");
dotenv.config();
const conString = process.env.DB_CONNECTION_STRING;
const client = new pg.Client(conString);

const execute = async (query) => {
  try {
    await client.connect();
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end();
  }
};

program
  .name("todo-app-cli")
  .description(
    "a cli tool to help you temporarily skip those frustrating tasks in your project and comeback later whenever you're ready with a fresh mind :) "
  )
  .version("1.0.0");

// Commands
// INIT
program
  .command("init")
  .description("Initiate the task list")
  .action(() => {
    const initQuery = `
    CREATE TABLE "tasks" (
      "id" SERIAL PRIMARY KEY,
	    "name" TEXT NOT NULL,
	    "done" BOOLEAN NOT NULL,
      UNIQUE ("id")
    );`;

    execute(initQuery).then((result) => {
      if (result) {
        console.log(`Initialize table "Tasks" successfully`);
      }
    });
  });

// ADD
program
  .command("new")
  .description("add a new todo task")
  .argument("<task_name>", "your new task name")
  .action((task) => {
    const newQuery = `INSERT INTO tasks (name, done) VALUES ('${task}', false); `;
    execute(newQuery).then((result) => {
      if (result) {
        console.log(`Task "${task}" added successfully`);
      }
    });
  });

// LIST
program
  .command("list")
  .description(
    "list the tasks. default with no option returns all tasks (pending + done)"
  )
  .option("-p, --pending", "display PENDING tasks only")
  .option("-d, --done", "display DONE tasks only")
  .alias("ls")

  .action((option) => {
    const optionArr = Object.keys(option);

    if (optionArr.length > 1)
      throw new Error("Invalid option. Please refer to the README.md");

    if (
      optionArr[0] !== "pending" &&
      optionArr[0] !== "done" &&
      optionArr[0] !== undefined
    )
      throw new Error("Invalid option. Please refer to the README.md");

    const listQuery = `SELECT * FROM tasks ${
      optionArr[0] === "pending"
        ? "WHERE done = false"
        : optionArr[0] === "done"
        ? "WHERE done = true"
        : ""
    } ORDER BY id;`;
    execute(listQuery).then((result) => {
      console.table(result.rows);
    });
  });

// UPDATE
program
  .command("done")
  .description("mark a task as done")
  .argument("<task_id>", "your to-be-updated task id")
  .action((task) => {
    const updateQuery = `UPDATE tasks SET done = true WHERE id = ${task}`;
    execute(updateQuery).then((result) => {
      if (result) {
        console.log(`Task "${task}" updated successfully`);
      }
    });
  });

// DELETE
program
  .command("delete")
  .description("delete a task")
  .argument("<task_id>", "your to-be-deleted task id")
  .action((task) => {
    const updateQuery = `DELETE FROM tasks WHERE id = ${task}`;
    execute(updateQuery).then((result) => {
      if (result) {
        console.log(`Task "${task}" deleted successfully`);
      }
    });
  });

program.parse(process.argv);
