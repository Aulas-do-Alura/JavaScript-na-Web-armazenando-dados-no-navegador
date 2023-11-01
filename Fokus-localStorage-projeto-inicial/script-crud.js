//criando variaveis com elementos do Html
const taskListContainer = document.querySelector('.app__section-task-list')
const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')
const cancelar = document.querySelector('.app__form-footer__button--cancel')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const textarea = document.querySelector('.app__form-textarea')
const taskAtiveDescription = document.querySelector('.app__section-active-task-description')
const localStorageTarefas = localStorage.getItem('tarefa')
let tarefa = localStorageTarefas ? JSON.parse(localStorageTarefas) : []
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

//criando variavis que vão vir a serem alteradas posteriormente
let tarefaSelecionada = null
let itemTarefaSelecionada = null
let tarfaEmEdicao = null
let paragraphEmEdicao = null

//Função de seleção de tarefas ja criadas
const selecionaTarefa = (tarefa, elemento) => {
    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })

    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }

    tarefaSelecionada = tarefa
    itemTarefaSelecionada = elemento
    taskAtiveDescription.textContent = tarefa.descricao
    elemento.classList.add('app__section-task-list-item-active')
}

//Função para o formulario estar limpo sempre que for escrver no mesmo
const limparFormulario = () => {
    tarfaEmEdicao = null
    paragraphEmEdicao = null
    textarea.value = ''
    formTask.classList.add('hidden')
}

//Função para editar a tarefa selecionada
const selecionaTarefaParaEditar = (tarefa, elemento) => {
    if (tarfaEmEdicao == tarefa) {
        limparFormulario()
        return
    }

    formLabel.textContent = 'Editando Tarefa'
    tarfaEmEdicao = tarefa
    paragraphEmEdicao = elemento
    textarea.value = tarefa.descricao
    formTask.classList.remove('hidden')


}

//Função para criar tarefas
function createTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcon = document.createElement('svg')
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao

    const button = document.createElement('button')
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', './imagens/edit.png')
    button.classList.add("app_button-edit") // botao de edição
    button.appendChild(editIcon)



    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }
    svgIcon.addEventListener('click', (event) => {
        event.stopPropagation()
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    })

    if (tarefa.concluida) {
        button.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    }

    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}


tarefa.forEach(task => {
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
})

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

cancelar.addEventListener('click', () => {
    formTask.classList.add('hidden')
})
btnCancelar.addEventListener('click', limparFormulario)

const updateLocalStorage = () => {
    localStorage.setItem('tarefa', JSON.stringify(tarefa))
}

formTask.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const task = {
        descricao: textarea.value,
        concluida: false
    }
    tarefa.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
    updateLocalStorage()
    limparFormulario()

})






