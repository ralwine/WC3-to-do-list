$(document).ready(onReady);
    console.log("The house of bling")
    //getTasks()


function onReady() {
    
    $('#submit-task').on('click', handleSubmit);
}

// might as well start with our handleSubmit
function handleSubmit() {
    // target our input with the submit button.. cl first
    console.log("submit is being handled!");
    let task = $('#task-name').val();
    addTasks(task);
}

function addTasks(task) {
    console.log("in addTasks");
    // this will be a POST route
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: task
    }).then(function(response){
        console.log("making POST request", response);
        //getTasks when ready
        //getTasks()
    }).catch(function(error){
        console.log("ERROR in POST request", error);
        alert("ERROR adding task!")
    })
}

function getTasks(){
    console.log("in getTasks")
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response){
        console.log("making GET request", response);
        //render here?
        //render()
    }).catch(function (error){
        console.log('error in GETting tasks!', error);
    })

}

