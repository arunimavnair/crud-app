// --- LOCAL STORAGE ---
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// --- RENDER TABLE ---
function renderTable() {
    const users = getUsers();
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach((user, index) => {
        table.innerHTML += `
            <tr class="fade-in">
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// --- ADD / UPDATE USER ---
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let users = getUsers();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        users.push({ name, email, phone });  
    } else {
        users[editIndex] = { name, email, phone };
    }

    saveUsers(users);
    renderTable();
    this.reset();
    document.getElementById("editIndex").value = "";
});

// --- EDIT USER ---
function editUser(index) {
    const users = getUsers();
    const user = users[index];

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("editIndex").value = index;
}

// --- DELETE USER ---
function deleteUser(index) {
    let users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    renderTable();
}

// --- DARK MODE TOGGLE ---
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initial Load
renderTable();