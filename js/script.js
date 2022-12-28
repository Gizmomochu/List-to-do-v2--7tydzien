{
    let tasks = [
        { content: "zadanie" },
        { content: "zadanie1" },
    ];

    let hiddenDoneTasks = false;

    const hideTaskDone = () => {
        hiddenDoneTasks = !hiddenDoneTasks;
        render();
    };

    const hideTaskButtonEvent = () => {
        const hiddenTaskButton = document.querySelector(".js-hideTaskDone");

        if (hiddenTaskButton) {
            hiddenTaskButton.addEventListener("click", () => {
                hideTaskDone();
            });
        };
        
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const markAllTasks = () => {
        const toggleTasksDone = document.querySelector(".js-markAll");

        if (toggleTasksDone) {
            toggleTasksDone.addEventListener("click", () => {
                toggleAllTasksDone();
            });
        };
    };

    const renderButtonsHideAndMarkAll = () => {
        let htmlStringButtons = "";

        if (tasks.length > 0) {
            htmlStringButtons += `
        <button class="js-hideTaskDone buttons__hidden">
        ${hiddenDoneTasks ? "Pokaż" : "Ukryj"} Zrobione
        </button>

        <button class="js-markAll buttons__hidden"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Zaznacz wszystkie ukończone
        </button>`
        };

        document.querySelector(".js-hiddenButtons").innerHTML = htmlStringButtons;
    };


    const addNewTask = (newTask) => {
        tasks = [...tasks, { content: newTask }];
        render();
    };

    const render = () => {

        focusOnField();
        renderTasks();
        renderDoneButtons();
        renderRemoveButtons();
        renderButtonsHideAndMarkAll();
        hideTaskButtonEvent();
        markAllTasks();

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