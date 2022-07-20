const date/*fecha*/ = document.querySelector(`#date`)
const list/*lista*/ = document.querySelector(`#list`)
const input = document.querySelector(`#input`)
const enter/*botonEnter*/ = document.querySelector(`#enter`)
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 0



//new todo function
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


//workDone function
function workDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
}


//workDlt function
function workDlt(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
}


enter.addEventListener(`click`,()=> {
    const todo = input.value
    if(todo) {
        newToDo(todo,id,false,false)
    }
    input.value=" "
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const todo = input.value
        if(todo){
            newToDo(todo,id,false,false)
        }
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
})