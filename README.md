**[This project is for learning purpose only, it only works in my local machine]**

# [Todo App CLI](https://www.npmjs.com/package/todo-app-cli) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-red.svg)](https://github.com/wilson-here/todo-app-cli/LICENSE) [![npm version](https://img.shields.io/npm/v/todo-app-cli.svg?style=flat)](https://www.npmjs.com/package/todo-app-cli) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://www.npmjs.com/package/todo-app-cli#Contributing)

# Overview

A cli tool to help you temporarily skip those frustrating tasks in your project and comeback later whenever you're ready with a fresh mind :)

## Installation

```bash
npm i todo-app-cli
```

## Usage

### 1. Initiate the task list

```bash
todo
```

### 2. Commands

#### 2.1. Add a new todo task

```bash
todo new <task>
```

**Example**

```bash
todo new "Responsive for section About in Homepage"
```

#### 2.2. List the tasks

```bash
todo list --[pending|done]
```

or

```bash
todo list -[p|d]
```

**Example**

```bash
todo list
```

to list all the task (pending + done)
or

```bash
todo list -p
```

to list only the pending tasks

#### 2.3. Update a task

```bash
todo done <task_id>
```

**Example**

```bash
todo done 2
```

#### 2.3. Delete a task

```bash
todo delete <task_id>
```

**Example**

```bash
todo delete 2
```

#### 2.4. Display help

```bash
todo help
```

to show all available commands
or

```bash
todo help <command>
```

#### 2.5. Show the current version of the application

```bash
todo -V
```

or

```bash
todo --version
```

## Contributing

Feel free to contribute to the project by submitting a pull request 🙋‍♂️.

## License

Todo App CLI is [MIT licensed](./LICENSE).
