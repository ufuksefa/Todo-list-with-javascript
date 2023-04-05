const input = document.querySelector("#addInput");
const button = document.querySelector("#addButton");
const todoList = document.querySelector("#todo");
const form = document.querySelector(".frm");

let todo = [];

button.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", domLoaded);
form.addEventListener("click" , formEvent)

function addTodo(e){
    const newTodo = input.value.trim();
    if(!newTodo == ""){
        addTodoUI(newTodo);
        addTodoLocal(newTodo);
    }
    e.preventDefault();
}


function addTodoUI(todos){
        const div1 = document.createElement("div");
        div1.className = "form-control mt-3 d-flex justify-content-between";
        
        const div2 = document.createElement("div");
        div2.className = "d-flex";
        const p = document.createElement("p");
        p.innerText = todos;
        const check = document.createElement("input");
        check.type = "checkbox";
        check.className = "m-2"
        
        const div3 = document.createElement("div");
        div3.className = "icons";
        const i1 = document.createElement("i");
        i1.className = "fa-solid fa-pencil p-2";
        const i2 = document.createElement("i");
        i2.className = "fa-solid fa-trash";
        
        div3.appendChild(i1);
        div3.appendChild(i2);
        div2.appendChild(check);
        div2.appendChild(p);
        div1.appendChild(div2);
        div1.appendChild(div3);
        todoList.appendChild(div1)

        input.value = "";
}

function addTodoLocal(todos){
    todo.push(todos);
    localStorage.setItem("todos",JSON.stringify(todo));
}

function checkLocal(){
    if(localStorage.getItem("todos")){
        todo = JSON.parse(localStorage.getItem("todos"))
    }else{
        todo = []
    }
}

function domLoaded(){
    checkLocal();
    todo.forEach((todos)=>{
        addTodoUI(todos);
    });
}

function formEvent(e){
    if(e.target.className == "fa-solid fa-trash"){
        checkLocal();
         todo.forEach((todos,index)=>{
             if(e.target.parentElement.parentElement.children[0].children[1].innerText == todos){
                 todo.splice(index,1)
                 localStorage.setItem("todos",JSON.stringify(todo));
             }
         });
        e.target.parentElement.parentElement.remove();
    }
}