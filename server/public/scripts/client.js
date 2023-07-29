$(document).ready(onReady);

function onReady() {
    submitTasks();
    $('#submit-task').on('click', addTasks);
}

// might as well start with our handleSubmit
function submitTasks(){
    // target our input with the submit button.. cl first
    console.log("submit is being handled!")
}

function addTasks() {
    console.log("in addTasks");
    
    
}

