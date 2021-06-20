const bootstrap = window.bootstrap
const input = document.querySelector("#task")
const list = document.querySelector("#list")
let todos = []
const toastElList = [].slice.call(document.querySelectorAll('.toast'))
const toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })

window.addEventListener("load",init)

function init(){
    todos = JSON.parse(localStorage.getItem("todos"))
    handleLocalStorage()
    todos.forEach(todo => {
        newElement(todo)
        if(todo.checked){
            let input = {}
            input.target = list.lastChild.firstChild
            check(input)
        }
    })

}

function check(e){
    if(e.isTrusted){
        let todoTexts = todos.map(todo => todo.text)
        const index = todoTexts.indexOf(e.target.parentElement.innerText.split("\n")[0])
        todos[index].checked == false ? todos[index].checked = true : todos[index].checked = false
    }
    if (e.target.parentElement.classList != "checked"){
        e.target.parentElement.classList += "checked",
        e.target.setAttribute("checked","true")
    } else {
        e.target.parentElement.classList = ""
        e.target.removeAttribute("checked","false")
    }
    handleLocalStorage()
}

function deleteItem(e){
    let todoTexts = todos.map(todo => todo.text)
    const index = todoTexts.indexOf(e.target.parentElement.innerText.split("\n")[0])
    todos.splice(index,1)
    handleLocalStorage()
    e.target.parentElement.parentElement.removeChild(e.target.parentElement)
    toastList.forEach(toast => toast.hide())
    toastList[3].show()
}

function handleLocalStorage(){
        if(todos == null) {
            localStorage.setItem("todos",JSON.stringify([]))
            todos = []
        }
        localStorage.setItem("todos",JSON.stringify([...todos]))
    
}


function newElement(todo){
    let todoTexts = todos.map(todo => todo.text)
    let checkVar = input.value.split(" ")
    checkVar = checkVar.filter(check => check == "" ? false : true)
    if (checkVar.length != 0 || todo) {
        if(todoTexts.includes(checkVar[0])) {
            toastList.forEach(toast => toast.hide())
            toastList[2].show()
        }
        else {
            let newTodo = input.value || todo.text
            const checkbox = document.createElement("input")
            checkbox.setAttribute("type","checkbox")
            const deleteButton = document.createElement("button")
            deleteButton.innerHTML = "X"
            deleteButton.style.color = "red";
            const listElement = document.createElement("li")
            listElement.appendChild(checkbox)
            listElement.innerHTML += ` ${newTodo}`
            listElement.appendChild(deleteButton)
            deleteButton.addEventListener("click", deleteItem)
            listElement.addEventListener("change",check)
            list.appendChild(listElement)
            if(!todo){
                newObject = {"checked": false, "text": newTodo}
                todos.push(newObject)
                handleLocalStorage()
                input.value = ""
                toastList.forEach(toast => toast.hide())
                toastList[0].show()
            }
        }
    }
    else {
        toastList.forEach(toast => toast.hide())
        toastList[1].show()
    }
}