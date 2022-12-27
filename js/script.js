{
    const tasks = [
        { content: "zadanie" },
        { content: "zadanie1" },
    ];

    const render = () => {
        const newTask = document.querySelector(".js-form__field");
        newTask.focus();

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="form__li js-list__item">
            <button class="list__button--green js-list__button--green">
            ${task.done ? "<b>V</b>" : ""}
            </button>
            <span class=${task.done ? "form__li--done" : ""}>${task.content}</span>
            <button class="list__button--red js-list__button--red">
            <b>X</b></button>
            </li>`
        };
        document.querySelector(".js-list").innerHTML = htmlString;

        const doneButtons = document.querySelectorAll(".js-list__button--green");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            });
        });

        const removeButtons = document.querySelectorAll(".js-list__button--red");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });

    };

    const addNewTask = (fieldValue) => {
        tasks.push({
            content: fieldValue,
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const input = document.querySelector(".js-form__field");
        const fieldValue = input.value.trim();

        if (fieldValue !== "") {
            addNewTask(fieldValue);
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