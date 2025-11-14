const todo = JSON.parse( localStorage.getItem('storage')) || [];

function taskTodoArray(){
    const inputElement = document.querySelector('.js-input');
    const dateElement = document.querySelector('.js-date-input');
    let inputElemValue = inputElement.value;
    let dateElemValue = dateElement.value;

    todo.push({ name: inputElemValue, duedate: dateElemValue});
    // inputElement.value = '';
    todoRender();
};


function todoRender(){
    let todoListHtml = '';
    for(i= 0; i < todo.length; i++){
        const todoObject = todo[i];
        // const {name} = todoObject;
        // const {duedate} = todoObject;
        const {name, duedate} = todoObject;
        const html = `<div>${name}</div> <div>${duedate}</div> 
        <button type= "submit" class = "css-deletebutton js-deletebutton">
        Delete</button>`;
        todoListHtml += html;
    };

    document.querySelector('.js-paragraph-render').innerHTML = todoListHtml;

    deletebutton();
    storage(); 
}

document.querySelector('.js-addbutton').addEventListener('click', () =>{
    if(document.querySelector('.js-input').value){taskTodoArray()};})


function storage(){
    localStorage.setItem('storage', JSON.stringify(todo))
}

function deletebutton(){
    document.querySelectorAll('.js-deletebutton').forEach((deletebutton, i) => {
        deletebutton.addEventListener('click', () =>{
            todo.splice(i, 1),
            todoRender()})
    });
}

document.body.addEventListener('keydown', (event) => {
    let inputElemValue = document.querySelector('.js-input').value;
    if(event.key === 'Enter' && inputElemValue){taskTodoArray()}
})


todoRender();