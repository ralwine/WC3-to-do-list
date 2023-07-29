$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#add').on('click', postTask);
}

function getTasks() {
    console.log("in getTasks");
}

function postTask() {
    console.log("in postTask");
}