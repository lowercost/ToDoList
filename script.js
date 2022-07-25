const date/*fecha*/ = document.querySelector(`#date`)
const list/*lista*/ = document.querySelector(`#list`)
const input = document.querySelector(`#input`)
const enter/*botonEnter*/ = document.querySelector(`#enter`)
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LIST




//  date 

const DATE = new Date()
date.innerHTML= DATE.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})




//  new todo function
function newToDo/*agregarTarea*/ (todo/*tarea*/,id,done/*realizado*/,supr/*eliminado*/) {

    if(supr){return}

    const DONE/*REALIZADO*/ = done ?check :uncheck
    const LINE = done ?lineThrough :''

    const component/*elemento*/ = `<li id="component">
                     <i class="far ${DONE}" data="done" id="${id}"></i>
                     <p class="text ${LINE}">${todo}</p>
                     <i class="fas fa-trash de" data="supr" id="${id}"></i>
                     </li>`

    list.insertAdjacentHTML("beforeend",component)
}


//  workDone function
function workDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    console.log(LIST[element.id].done)
    LIST[element.id].done = LIST[element.id].done ?false :true
}


//  workDlt function
function workDlt(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].supr = true
}


enter.addEventListener(`click`,()=> {
    const todo = input.value
    if(todo) {
        newToDo(todo,id,false,false)
        LIST.push({
            name: todo,
            id:id,
            done:false,
            supr:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=" "
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const todo = input.value
        if(todo){
            newToDo(todo,id,false,false)
            LIST.push({
                name: todo,
                id:id,
                done:false,
                supr:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value=''
        id++
    }
})


list.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='done'){
        workDone(element)/*tareaRealizada */
    }
    else if(elementData==='supr'){
        workDlt(element)/*tareaEliminada */
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})


//  local storage get item

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else {
    LIST = []
    id = 0
}

function loadList(DATA) {
    DATA.forEach(function(i){
        newToDo(i.name,i.id,i.done,i.supr)
    })
}