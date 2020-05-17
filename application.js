// Page Control
let amountOfGroups = people.map((elem) => elem.group);
amountOfGroups = amountOfGroups.filter(
    (elem, index, arr) => arr.indexOf(elem) === index
);

document.querySelector(
    "#amountOfGroups"
).innerHTML = `${amountOfGroups.length}`;

document.querySelector("#totalAmountOfStudents").innerHTML = `${people.length}`;

let man = people.filter((elem) => elem.gender === "m");
document.querySelector("#totalAmountOfMan").innerHTML = `${man.length}`;

let woman = people.filter((elem) => elem.gender === "f");
document.querySelector("#totalAmountOfWoman").innerHTML = `${woman.length}`;

let average = Math.floor(people.length / amountOfGroups.length);
document.querySelector("#average").innerHTML = `${average}`;

let averageAge = Math.floor(
    people.map((elem) => elem.age).reduce((a, b) => a + b) / people.length
);
document.querySelector("#averageAge").innerHTML = `${averageAge}`;

let averageAmountOfMan = Math.floor(man.length / amountOfGroups.length);
document.querySelector(
    "#averageAmountOfMan"
).innerHTML = `${averageAmountOfMan}`;

let averageAmountOfWoman = Math.floor(woman.length / amountOfGroups.length);
document.querySelector(
    "#averageAmountOfWoman"
).innerHTML = `${averageAmountOfWoman}`;

document.querySelectorAll(".nav-li").forEach((li, i) => {
    li.addEventListener("click", () => {
        document.querySelector(".active") &&
            document.querySelector(".active").classList.remove("active");
        li.classList.add("active");

        document.querySelectorAll(".page").forEach((page) => {
            page.classList.add("hidden");
        });

        document.querySelectorAll(".page")[i].classList.remove("hidden");
    });
});

const showPage = (i) => {
    document
        .querySelectorAll(".page")
        .forEach((page) => page.classList.add("hidden"));

    document.querySelectorAll(".page")[i].classList.remove("hidden");

    document.querySelector(".active").classList.remove("active");
    document.querySelectorAll(".nav-li")[i].classList.add("active");
};

document.querySelector("#list-groups").addEventListener("click", (e) => {
    e.preventDefault();
    showPage(1);
});
document.querySelector("#list-students").addEventListener("click", (e) => {
    e.preventDefault();
    showPage(2);
});

// Page Groups
amountOfGroups = amountOfGroups.sort((a, b) => a - b);
for (let i = 1; i <= amountOfGroups.length; i++) {
    let group = people.filter((elem) => elem.group === i);
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<b>Группа ${i}</b>
    <div>Студентов: ${group.length}</div>
    <div>Ср. возраст: ${Math.round(
        group.map((elem) => elem.age).reduce((a, b) => a + b) / group.length
    )}</div>
    <div>Мужчин: ${group.filter((elem) => elem.gender === "m").length}, 
    ср. возраст: ${Math.round(
        group
            .filter((elem) => elem.gender === "m")
            .map((m) => m.age)
            .reduce((a, b) => a + b) /
            group.filter((elem) => elem.gender === "m").length
    )}</div>
    <div>Женщин: ${
        group.filter((elem) => elem.gender === "f").length
    }, ср. возраст: ${Math.round(
        group
            .filter((elem) => elem.gender === "f")
            .map((w) => w.age)
            .reduce((a, b) => a + b) /
            group.filter((elem) => elem.gender === "f").length
    )}</div>
    <br>
    `;
    document.querySelector("#page-groups").appendChild(newDiv);
}

// Page Add Students
document.querySelector("#btn-add-student").addEventListener("click", () => {
    document.querySelector("#page-students").classList.add("hidden");
    document.querySelector("#page-add-students").classList.remove("hidden");
    document.querySelector(".active").classList.remove("active");
});

const deleteRow = () => {
    document.querySelectorAll("#btn-del").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.currentTarget.parentElement.parentElement.remove();
        });
    });
};

const createRow = (e) => {
    e.preventDefault();
    let tBody = document.querySelector("tbody");
    let row = document.createElement("tr");
    let sex;
    document.querySelector("#gender_f").checked ? (sex = "ж") : (sex = "м");
    row.innerHTML = `<td>${document.querySelector("#last").value}</td>
        <td>${document.querySelector("#first").value}</td>
        <td>${document.querySelector("#group").value}</td>
        <td>${document.querySelector("#age").value}</td>
        <td>${sex}</td>
        <td>
            <button type='button' class="btn btn-default del" id="btn-del"><span class="glyphicon glyphicon-remove"></span></button>
            <button type='button' class="btn btn-default edit" id="btn-edit"><span class="glyphicon glyphicon-pencil"></span></button>
        </td>
        `;

    tBody.appendChild(row);

    document.querySelector("#page-add-students").classList.add("hidden");
    document.querySelector("#page-students").classList.remove("hidden");
    document.querySelectorAll(".nav-li")[2].classList.add("active");

    deleteRow();
};

document
    .querySelector("#save-new-student")
    .addEventListener("click", createRow);

const editStudent = () => {
    document.querySelectorAll("#btn-edit").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const tblRow = e.currentTarget.parentElement.parentElement;

            document.querySelector("#first").value =
                tblRow.children[0].textContent;
            document.querySelector("#last").value =
                tblRow.children[1].textContent;
            document.querySelector("#group").value =
                tblRow.children[2].textContent;
            document.querySelector("#age").value =
                tblRow.children[3].textContent;
            tblRow.children[4].textContent === "м"
                ? (document.querySelector("#gender_m").checked = true)
                : (document.querySelector("#gender_f").checked = true);

            document.querySelector("#page-students").classList.add("hidden");
            document
                .querySelector("#page-add-students")
                .classList.remove("hidden");
            document.querySelector(".active").classList.remove("active");
        });
    });
};

// Page Students
const createTable = (array) => {
    if (document.querySelector("tbody")) {
        document.querySelector("tbody").remove();
    }

    let tBody = document.createElement("tbody");
    document.querySelector("table").appendChild(tBody);

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement("tr");
        let sex;
        array[i].gender === "f" ? (sex = "ж") : (sex = "м");
        row.innerHTML = `<td>${array[i].name.last}</td>
        <td>${array[i].name.first}</td>
        <td>${array[i].group}</td>
        <td>${array[i].age}</td>
        <td>${sex}</td>
        <td>
            <button type='button' class="btn btn-default del" id="btn-del"><span class="glyphicon glyphicon-remove"></span></button>
            <button type='button' class="btn btn-default edit" id="btn-edit"><span class="glyphicon glyphicon-pencil"></span></button>
        </td>
        `;

        tBody.appendChild(row);
    }
    deleteRow();
    editStudent();
};

createTable(people);

let isSorted = false;

const sortBy = (array, key, key2 = null) => {
    if (!isSorted) {
        isSorted = true;
        array.sort((a, b) => {
            if (key2) {
                if (a[key][key2] > b[key][key2]) {
                    return 1;
                }
                if (a[key][key2] < b[key][key2]) {
                    return -1;
                }
                return 0;
            } else {
                if (a[key] > b[key]) {
                    return 1;
                }
                if (a[key] < b[key]) {
                    return -1;
                }
                return 0;
            }
        });
    } else {
        isSorted = false;
        array.sort((a, b) => {
            if (key2) {
                if (a[key][key2] < b[key][key2]) {
                    return 1;
                }
                if (a[key][key2] > b[key][key2]) {
                    return -1;
                }
                return 0;
            } else {
                if (a[key] < b[key]) {
                    return 1;
                }
                if (a[key] > b[key]) {
                    return -1;
                }
                return 0;
            }
        });
    }
};

let tableHeadings = document.querySelectorAll("th");

tableHeadings.forEach((elem, i) => {
    elem.addEventListener("click", () => {
        if (i === 0) {
            sortBy(people, "name", "last");
            createTable(people);
        } else if (i === 1) {
            sortBy(people, "name", "first");
            createTable(people);
        } else if (i === 2) {
            sortBy(people, "group");
            createTable(people);
        } else if (i === 3) {
            sortBy(people, "age");
            createTable(people);
        } else if (i === 4) {
            sortBy(people, "gender");
            createTable(people);
        }
    });
});

// Creating buttons for sorting students by group
for (let i = 1; i <= amountOfGroups.length; i++) {
    let newBtn = document.createElement("button");
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("data-group", `${i}`);
    newBtn.classList.add("btn", "btn-default", "sort-students");
    newBtn.innerHTML = `${i}`;
    document.querySelector("#sortByNameOfGroup").appendChild(newBtn);
}

let newBtn = document.createElement("button");
newBtn.setAttribute("type", "button");
newBtn.setAttribute("data-group", "All");
newBtn.classList.add("btn", "btn-default", "sort-students");
newBtn.innerHTML = `ВСЕ`;
document.querySelector("#sortByNameOfGroup").appendChild(newBtn);

let sortGroupsBtns = document.querySelectorAll(".sort-students");
sortGroupsBtns.forEach((elem, i) => {
    elem.addEventListener("click", () => {
        if (i === 0) {
            let students = people.filter((elem) => elem.group === 1);
            createTable(students);
        } else if (i === 1) {
            let students = people.filter((elem) => elem.group === 2);
            createTable(students);
        } else if (i === 2) {
            let students = people.filter((elem) => elem.group === 3);
            createTable(students);
        } else if (i === 3) {
            let students = people.filter((elem) => elem.group === 4);
            createTable(students);
        } else if (i === 4) {
            let students = people.filter((elem) => elem.group === 5);
            createTable(students);
        } else if (i === 5) {
            let students = people.filter((elem) => elem.group === 6);
            createTable(students);
        } else if (i === 6) {
            createTable(people);
        }
    });
});
