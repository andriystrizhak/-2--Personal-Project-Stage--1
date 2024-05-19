document.addEventListener("DOMContentLoaded", function() {
    const taskName = "*Task Name Placeholder*";

    // Remove task
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("task-button")) {
            event.target.closest(".task").remove();
        }
    });

    // Add new task
    function addTask(event) {
        event.stopPropagation();
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
                            <span class="priority-text">*not set*</span>
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

    // Reset "Add new column" block
    function resetAddColDiv(addColDiv) {
        addColDiv.innerHTML = `
            <div class="add-col">
                <div class="add-col-text">
                    <span class="lvl-2-text">Add another list</span>
                </div>
                <button class="add-col-button small-circle-button">
                    <span class="lvl-2-text">+</span>
                </button>
            </div>
        `;
        addColDiv.querySelector(".add-col-button").addEventListener("click", createNewColForm);
    }

    // Show "Add new column form"
    function createNewColForm(event) {
        event.preventDefault();
        var addColDiv = document.getElementById("add-col");

        var newColForm = document.createElement("div");
        newColForm.className = "new-col-form";
        newColForm.innerHTML = `
            <input type="text" class="new-col-name-input" placeholder="Enter list name">
            <div class="new-col-buttons">
                <button class="add-list-button">Додати список</button>
                <button class="cancel-list-button">Скасувати</button>
            </div>
        `;

        addColDiv.innerHTML = '';
        addColDiv.appendChild(newColForm);

        newColForm.querySelector(".cancel-list-button").addEventListener("click", function(event) {
            event.preventDefault();
            resetAddColDiv(addColDiv);
        });

        // Add new column
        newColForm.querySelector(".add-list-button").addEventListener("click", function(event) {
            event.preventDefault();
            var newColName = newColForm.querySelector(".new-col-name-input").value;
            if (newColName.trim() !== "") {
                var newCol = document.createElement("div");
                newCol.className = "col";
                newCol.innerHTML = `
                    <div class="col-info">
                        <div class="col-name">
                            <span class="lvl-2-text">${newColName}</span>
                        </div>
                        <div class="spacer"></div>
                        <div class="tasks-amount">
                            <span class="lvl-3-text">0</span>
                        </div>
                        <button class="col-info-button small-circle-button">&#x2630;</button>
                    </div>
                    <button class="add-task-button sh-col-item">
                        <span class="lvl-2-text">
                            <div class="add-task-content"></div>
                        </span>
                    </button>
                    <ul class="task-list"></ul>
                `;
                addColDiv.parentNode.insertBefore(newCol, addColDiv);

                resetAddColDiv(addColDiv);

                attachColHandlers(newCol);
            }
        });
    }

    // Show "Edit column form"
    function showEditColForm(column) {
        var colName = column.querySelector('.col-name span').textContent;
        var colInfo = column.querySelector('.col-info');
        var addTaskButton = column.querySelector('.add-task-button');

        var editColForm = document.createElement("div");
        editColForm.className = "new-col-form";
        editColForm.innerHTML = `
            <input type="text" class="new-col-name-input" value="${colName}">
            <div class="new-col-buttons">
                <button class="save-list-button">Зберегти</button>
                <button class="cancel-list-button">Скасувати</button>
            </div>
        `;

        colInfo.style.display = 'none';
        addTaskButton.style.display = 'none';
        column.insertBefore(editColForm, column.firstChild);

        editColForm.querySelector(".cancel-list-button").addEventListener("click", function(event) {
            event.preventDefault();
            column.removeChild(editColForm);
            colInfo.style.display = '';
            addTaskButton.style.display = '';
        });

        editColForm.querySelector(".save-list-button").addEventListener("click", function(event) {
            event.preventDefault();
            var newColName = editColForm.querySelector(".new-col-name-input").value;
            if (newColName.trim() !== "") {
                column.querySelector('.col-name span').textContent = newColName;
                column.removeChild(editColForm);
                colInfo.style.display = '';
                addTaskButton.style.display = '';
            }
        });
    }

    // Attach handlers to column
    function attachColHandlers(col) {
        col.querySelector(".col-info-button").addEventListener("click", function(event) {
            event.stopPropagation();
            var currentColumn = this.closest('.col');
            var contextMenu = document.querySelector(".context-menu");

            if (!contextMenu) {
                contextMenu = createContextMenu();
                document.body.appendChild(contextMenu);
            }

            var rect = this.getBoundingClientRect();
            var x = rect.left + window.scrollX;
            var y = rect.top + window.scrollY + this.offsetHeight;

            if (contextMenu.classList.contains("show")) {
                hideContextMenu(contextMenu);
            } else {
                showContextMenu(contextMenu, x, y, currentColumn);
            }
        });

        // Add new task
        col.querySelector(".add-task-button").addEventListener("click", addTask);
    }

    // Create context menu
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

    // Show context menu
    function showContextMenu(contextMenu, x, y, column) {
        contextMenu.style.left = x + "px";
        contextMenu.style.top = y + "px";
        contextMenu.style.display = "block";
        setTimeout(() => {
            contextMenu.classList.add("show");
        }, 10);

        // Remove previous event listeners for edit item
        var editItem = contextMenu.querySelector("#edit-cm-item");
        var newEditItem = editItem.cloneNode(true);
        editItem.parentNode.replaceChild(newEditItem, editItem);

        newEditItem.addEventListener("click", function(event) {
            event.stopPropagation();
            showEditColForm(column);
            hideContextMenu(contextMenu);
        });

        // Remove previous event listeners for delete item
        var deleteItem = contextMenu.querySelector("#delete-cm-item");
        var newDeleteItem = deleteItem.cloneNode(true);
        deleteItem.parentNode.replaceChild(newDeleteItem, deleteItem);

        newDeleteItem.addEventListener("click", function(event) {
            event.stopPropagation();
            column.remove();
            hideContextMenu(contextMenu);
        });

        document.addEventListener("click", function closeContextMenu() {
            hideContextMenu(contextMenu);
            document.removeEventListener("click", closeContextMenu);
        }, { once: true });
    }

    // Hide context menu
    function hideContextMenu(contextMenu) {
        contextMenu.classList.remove("show");
        setTimeout(() => {
            contextMenu.style.display = "none";
        }, 300);
    }

    document.querySelector(".add-col-button").addEventListener("click", createNewColForm);
    document.querySelectorAll(".col").forEach(attachColHandlers);
});
