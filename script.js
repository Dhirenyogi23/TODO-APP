const addbtn = document.getElementById('add-btn')
const newTaskInput = document.querySelector("#wrapper input")
const taskContainer = document.getElementById('tasks')
const error = document.getElementById('error')
const countvalue = document.querySelector('.count-value')

let taskCount = 0;

const displayCount = (taskCount) => {
    countvalue.innerText = taskCount;
}

const addTask = () => {
    taskName = newTaskInput.value.trim()
    error.style.display = 'none';

    if(!taskName){
        setTimeout( () => {
            error.style.display = 'block'
        }, 200)
        return;
    }

    const task = `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>

        <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>

        <button class="delete">
        <i class="fa-solid fa-trash"></i>
        </button>

    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);


    // for delete

    const deletebuttons = document.querySelectorAll(".delete")
    deletebuttons.forEach( (button) => {
        button.onclick = () => {
            button.parentNode.remove()
            taskCount = taskCount-1;
            displayCount(taskCount);
        }
    } )


    // for edit


    const editbuttons = document.querySelectorAll('.edit')
    editbuttons.forEach( (editbtn) => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;

            if(!(e.target.className == 'edit')){
                targetElement = e.target.parentElement
            }

            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount = taskCount-1;
            displayCount(taskCount);
        }
    } )

    const taskCheck = document.querySelectorAll('.task-check')
    taskCheck.forEach((checkbox) => {
        checkbox.onchange = () => {
            checkbox.nextElementSibling.classList.toggle('completed');

            if(checkbox.checked){
                taskCount = taskCount-1
            }
            else{
                taskCount = taskCount+1
            }
            displayCount(taskCount)
        }
    })

    taskCount = taskCount+1;
    displayCount(taskCount);
    newTaskInput.value = '';

}





addbtn.addEventListener('click', addTask)



window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}