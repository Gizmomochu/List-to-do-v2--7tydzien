{
    let tasks = [
        { content: "zadanie" },
        { content: "zadanie1" },
    ];

    let hiddenDoneTasks = false;

    const addNewTask = (newTask) => {
        tasks = [...tasks, { content: newTask }];
        render();
    };

    const render = () => {

        focusOnField();
        renderTasks();
        renderDoneButtons();
        renderRemoveButtons();

    };

    const focusOnField = () => {
        const newTask = document.querySelector(".js-form__field");
        newTask.focus();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="form__li ${task.done && hiddenDoneTasks ? "form__li--hidden" : ""}">
        <button class="list__button--green js-list__button--green">
        ${task.done ? "<b>V</b>" : ""}
        </button>
        
        <span class=${task.done && "form__li--done"}>
        ${task.content}
        </span>
        
        <button class="list__button--red js-list__button--red">
        <b>X</b>
        </button>
        </li>`
        };
        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderDoneButtons = () => {
        const doneButtons = document.querySelectorAll(".js-list__button--green");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            });
        });
    };

    const renderRemoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-list__button--red");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const input = document.querySelector(".js-form__field");
        const newTask = input.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            render();
        };
        input.focus();
        input.value = "";
    };

    const init = () => {

        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}