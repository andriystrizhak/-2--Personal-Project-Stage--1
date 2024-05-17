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
            event.stopPropagation();
            var contextMenu = document.querySelector(".context-menu");
            
            if (!contextMenu) {
                contextMenu = createContextMenu();
                document.body.appendChild(contextMenu);
            }

            var rect = button.getBoundingClientRect();
            var x = rect.left + window.scrollX;
            var y = rect.top + window.scrollY + button.offsetHeight;

            if (contextMenu.classList.contains("show")) {
                hideContextMenu(contextMenu);
            } else {
                showContextMenu(contextMenu, x, y);
            }
        });
    });

    function createContextMenu() {
        var menu = document.createElement("div");
        menu.className = "context-menu";

        var editItem = document.createElement("div");
        editItem.className = "context-menu-item";
        editItem.id = "edit-cm-item";
        var editItemIco = document.createElement("img");
        editItemIco.src = "img/edit-ico.png";
        editItemIco.alt = "edit-icon";
        editItemIco.className = "context-menu-icon";
        var editItemSpan = document.createElement("span");
        editItemSpan.textContent = "Редагувати";
        editItem.appendChild(editItemIco);
        editItem.appendChild(editItemSpan);

        var deleteItem = document.createElement("div");
        deleteItem.className = "context-menu-item";
        deleteItem.id = "delete-cm-item";
        var deleteItemIco = document.createElement("img");
        deleteItemIco.src = "img/delete-ico.png";
        deleteItemIco.alt = "delete-icon";
        deleteItemIco.className = "context-menu-icon";
        var deleteItemSpan = document.createElement("span");
        deleteItemSpan.textContent = "Видалити";
        deleteItem.appendChild(deleteItemIco);
        deleteItem.appendChild(deleteItemSpan);

        menu.appendChild(editItem);
        menu.appendChild(deleteItem);
        return menu;
    }

    function showContextMenu(contextMenu, x, y) {
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
        contextMenu.style.display = "block";
        setTimeout(() => {
            contextMenu.classList.add("show");
        }, 10);

        document.addEventListener("click", function closeContextMenu() {
            hideContextMenu(contextMenu);
            document.removeEventListener("click", closeContextMenu);
        }, { once: true });
    }

    function hideContextMenu(contextMenu) {
        contextMenu.classList.remove("show");
        setTimeout(() => {
            contextMenu.style.display = "none";
        }, 300);
    }
});



