const btnAdd = document.getElementById('add')
const title = document.getElementById('title')
const des = document.getElementById('des')
const alert = document.getElementById('alert')
const table = document.getElementById('tbody')
let todos = []
let todo_render = []

btnAdd.addEventListener('click', ()=>{
    addToDo()
})

class Task {
    constructor(title, des, key){
        this.title = title
        this.des = des
        this.key = key
    }
    
}
function getKey(){
    let key = localStorage.length
    key ++
    return key
    
}
function addToDo(){
    if (title.value == '' || des.value == ''){
        alert.classList.remove('d-none')
    }
    else{
        alert.classList.add('d-none')
        key = getKey()
        value = new Task(title.value, des.value)
        localStorage.setItem(key, JSON.stringify(value))
        title.value = ''
        des.value = ''
        renderTodos(key, value)

    }
}
function localRender(){
    table.innerHTML = ''
    for(i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        let value = JSON.parse(localStorage.getItem(key))
        renderTodos(key, value)
    
    }
}
function renderTodos(key, value){
    row = document.createElement('tr')
    row.id = key
    row.innerHTML = `
        <td>${value.title}</td>
        <td>${value.des}</td>
        <td class="text-center align-middle">
            <button type="button" class="btn btn-warning"onclick="edit(${key})"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>
        <td class="text-center align-middle">
            <button type="button" class="btn btn-success"onclick="complete(${key})"><i class="fa-solid fa-check" style="color: #000000;"></i></button>
        </td>  
    `
    table.appendChild(row)
    
}

function complete(key){
    if(window.confirm('Are you sure you want to continue?')){
        document.getElementById(key).remove()
        localStorage.removeItem(key)
    }
}

function edit(key){
    
    data = JSON.parse(localStorage.getItem(key))
    title.value = data.title
    des.value = data.des
    document.getElementById(key).remove()
    localStorage.removeItem(key)
}


localRender()