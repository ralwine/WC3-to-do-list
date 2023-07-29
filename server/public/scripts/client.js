$(document).ready(onReady);

function onReady() {
    submitTasks();
    $('#submit-task').on('click', addTasks);
}

// might as well start with our handleSubmit
function submitTasks() {
    // target our input with the submit button.. cl first
    console.log("submit is being handled!");
    let task = $('#task-name').val();
    addTasks();
}

function addTasks(newTask) {
    console.log("in addTasks");
    // this will be a POST route
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data:(newTask)
    }).then(function(response){
        console.log("making POST request", response);
        //getTasks()
    }).catch(function(error){
        console.log("ERROR in POST request", error);
        alert("ERROR adding task!")
    })


}

