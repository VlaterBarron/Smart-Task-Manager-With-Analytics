const getTasks = async () => {
    const tasks = await fetch('http://localhost:3000/api/v0/tasks')
    .then(res => res.json());

    console.log(tasks);

    return tasks;
}

export default getTasks;