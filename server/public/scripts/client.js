$(document).ready(onReady);
console.log("The house of bling");
getTasks();
onReady();
function onReady() {
    $('#submit-task').on('click', handleSubmit);
    // Checkbox listener for completed task? Dropdown? Button?
    // CSS target required here?
    $('#taskTableBody').on('click', '#change-status', changeTaskStatus)
    //DELETE button
    $('#taskTableBody').on('click', '#delete-task', deleteTasks)
}
// might as well start with our handleSubmit
function handleSubmit(event) {
    event.preventDefault()
    // target our input with the submit button.. cl first
    console.log("submit is being handled!");
    let task = $('#task-name').val();
    addTasks(task);
}
function addTasks(newTask) {

    console.log("in addTasks", newTask);
    // this will be a POST route
    const taskID = {
        name: newTask,
        status: 'false'
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskID
    }).then(function (response) {
        console.log("making POST request", response);
        console.log(taskID)
        getTasks()
    }).catch(function (error) {
        console.log("ERROR in POST request", error);
        alert("ERROR adding task!")
    })
}
function getTasks() {
    console.log("in getTasks")
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log("making GET request", response.name);
        //render here?
        render(response)
    }).catch(function (error) {
        console.log('error in GETting tasks!', error);
    })
}
function deleteTasks() {
    console.log("in deleteBook");
    console.log("clicking on: ", $(this));
    const taskID = $(this).parent().parent().data('id');
    console.log("deleting: ", taskID); //showing undefined!
    //ajax DELETE
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskID}`
    }).then((response) => {
        console.log(`Deleted task id: ${taskID}`)
        getTasks()
    }).catch((error) => {
        alert("Error deleting task: ", error)
    })
}

function changeTaskStatus() {
    console.log("in changeTaskStaus");
    console.log("clicking on: ", $(this));
    const id = $(this).parent().parent().data('id');
    const taskStatus = $(this).parent().parent().data('false');
    //ajax PUT... fingers crossed
    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`,
        data: { newStatus: !taskStatus }
    }).then((response) => {
        console.log("Changing status with PUT", response)
        getTasks();
    }).catch((error) => {
        alert("Error with PUT status at client", error)
    })
}

function render(tasks) {
    $('#taskTableBody').empty();
    console.log(tasks);
    // for loop time
    for (let task of tasks) {
        console.log("in for loop", task.name)
        //appending items, just task(s) to start
        let newRow = $(`
            <tr>
                <td>${task.task}</td>
                <td id="center">${task.status}
                    <button id="change-status">
                        Finished
                    </button>
                </td>
                <td id="centerToo">
                    <button id ="delete-task">
                        Delete Task
                    </button>
                </td>
            </tr>
        `);
        newRow.data('id', task.id)
        $('#taskTableBody').append(newRow);
        // task.task wtf? It works!
        //... or is the CSS target happening in here?
        if(task.status==true){
            $('#change-status').addClass('.finished');
        }
    }
}