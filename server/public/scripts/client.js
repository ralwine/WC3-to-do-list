$(document).ready(onReady);
console.log("The house of bling");
getTasks();
onReady();


function onReady() {

    $('#submit-task').on('click', handleSubmit);
    // Checkbox listener for completed task?

    //DELETE button
    $('#taskTableBody').on('click', '#delete-task', deleteTasks)
}

// might as well start with our handleSubmit
function handleSubmit() {
    // target our input with the submit button.. cl first
    console.log("submit is being handled!");
    let task = $('#task-name').val();
    addTasks(task);
}

function addTasks(newTask) {
    console.log("in addTasks", newTask);
    // this will be a POST route
    const taskNstatus = {
        name: newTask,
        status: false
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskNstatus
    }).then(function (response) {
        console.log("making POST request", response);
        //getTasks when ready
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
        console.log("making GET request", response);
        //render here?
        render(response)
    }).catch(function (error) {
        console.log('error in GETting tasks!', error);
    })

}

function deleteTasks() {
    console.log("in deleteBook");
    console.log("clicking on: ", $(this));
    const taskID = $(this)/*.parent().parent()*/.data('id');
    console.log("deleting: ", taskID); //showing undefined!
    //ajax DELETE
    $.ajax({
        method: 'DELETE',
        url: `/tasks/deletetasks/${taskID}`
    }).then((response) => {
        console.log(`Deleted task id: ${taskID}`)
        getTasks()
    }).catch((error) => {
        alert("Error deleting task: ", error)
    })

}

function render(tasks) {
    $('#taskTableBody').empty();
    console.log(tasks);
    // for loop time
    for (let task of tasks) {
        console.log("in for loop", task)
        //appending items, just task(s) to start
        let newRow = $(`
            <tr>
                <td>${task.task}</td>
                <td>${task.complete}</td>
                <td>
                    <button id ="delete-task">
                        Delete Task
                    </button>
                </td>
            </tr>
        `);
        newRow.data('id', tasks.id)
        $('#taskTableBody').append(newRow);

    }
}

