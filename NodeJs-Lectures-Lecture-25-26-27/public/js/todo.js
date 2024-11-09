const todoDiv = document.querySelector(".todo");
let Todo = [];

// const div = document.createElement("div");  //creating a new element
// div.classList.add("todo-item"); //adding class to it
// div.innerText = "This is todo item"  //giving text
// todoDiv.append(div)  //appending div element


let url = "http://localhost:2000/todo"
const FetchTodo = async (url) => {
    try {
        const res = await fetch(url);
        const jsonData = await res.json();
        for (let i = 0; i < jsonData.length; i++) {
            const div = document.createElement("div");  //creating a new element
            div.classList.add("todo-item"); //adding class to it
            div.innerHTML = `
            <img src="${jsonData[i].image}" alt="todo image">
            <h2>${jsonData[i].title}</h2>
            <p>${jsonData[i].desc}</p>
            <p><span>Status: </span><span>${jsonData[i].status =="on"?"Task Complete":"Pending"}</span></p>
            <button onclick="DeleteTodo('${url}','${jsonData[i].id}')">Delete</button>
            `
            todoDiv.append(div)  //appending div element
        }
        Todo = jsonData;
        console.log(jsonData);
    }
    catch (err) {
        console.log(err);
    }
}

FetchTodo(url);

const DeleteTodo = async (url,id) => {
    console.log("hello")
    let deleteUrl = url + "delete/" +id;
    try {
        const res = await fetch(deleteUrl,{
            method: "delete"
        })
        const jsonData = await res.json();
        todoDiv.innerHTML = "";
        FetchTodo(url);
    }
    catch (err) {
        console.log(err);
    }
}