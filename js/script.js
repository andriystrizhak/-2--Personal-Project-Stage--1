const taskName = "*Task Name Placeholder*";
const taskList = document.getElementById(".task-list");

// Remove task
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("task-button")) {
        event.target.closest(".task").remove();
    }
});

// Add new task
function addTask(event) {
    // Отримати батьківський елемент колонки
    var column = event.target.closest('.col');

    // Перевірити, чи знайдено колонку
    if (column) {
        // Знайти список в цій колонці
        var taskList = column.querySelector('.task-list');

        // Перевірити, чи знайдено список
        if (taskList) {
            // Створити рядок HTML з необхідним елементом списку
            var taskHTML = `
                <li class="task sh-col-item">
                    <div class="task-name-button">
                        <div class="task-name">
                            <span class="lvl-2-text">${taskName}</span>
                        </div>
                        <button class="task-button small-circle-button">&#x2630;</button>        
                    </div>
                    <div class="task-description">
                        <span class="description-text">
                            *add some description*   
                        </span>
                    </div>
                    <div class="task-time-and-ico">
                        <div class="task-time">
                            <span class="lvl-2-grey-text">*add date*</span>
                        </div>
                    </div>
                    <div class="task-priority">
                        <span class="priority-marks">🔵</span>
                        <span class="priority-text">*not setted*</span>
                    </div>
                    <div class="moveto">
                        <select class="moveto-select">
                            <option value="moveto" selected disabled>
                                <span class="lvl-3-text">Move to:</span>
                            </option>
                        </select>    
                    </div>
                </li>
            `;

            // Додати HTML до списку
            taskList.innerHTML += taskHTML;
        }
    }
}

// Додати обробник подій для кожної кнопки "add-task-button"
var addTaskButtons = document.querySelectorAll('.add-task-button');
addTaskButtons.forEach(function(button) {
    button.addEventListener('click', addTask);
});


document.addEventListener("DOMContentLoaded", function() {
    var colInfoButtons = document.querySelectorAll(".col-info-button");

    colInfoButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.stopPropagation(); // Зупиняємо спливання події, щоб не викликати обробник на document.click
            var contextMenu = document.querySelector(".context-menu");
            if (!contextMenu) return;

            var rect = button.getBoundingClientRect();
            var x = rect.left + window.scrollX;
            var y = rect.top + window.scrollY + button.offsetHeight;

            toggleContextMenu(contextMenu, x, y);
        });
    });

    function toggleContextMenu(contextMenu, x, y) {
        contextMenu.style.display = "block";
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";

        // Закриваємо меню при кліку поза ним
        document.addEventListener("click", function closeContextMenu() {
            contextMenu.style.display = "none";
            document.removeEventListener("click", closeContextMenu);
        }, { once: true });
    }
});



