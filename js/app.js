document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('#taskInput');
    var list = document.querySelector('#taskList');
    var button = document.querySelector('#addTaskButton');
    var text = '';
    var taskCounter = document.querySelector('#counter');
    var counter = 0;
    button.addEventListener('click', function (e) {

        function addNewTask() {
            text = input.value;
            if (text.length > 5 && text.length < 100) {
                // create task

                var addLi = document.createElement('li');
                var addLiInDom = list.appendChild(addLi);

                var addTask = document.createElement('h1');
                var addTaskInDom = addLiInDom.appendChild(addTask); // add element to DOM


                addTaskInDom.innerText = (text);
                input.value = ' ';
                counter++;
                taskCounter.innerText = (counter);

                // checkbox
                var complete = document.createElement('input'); // create complete input
                var addComplete = addLiInDom.appendChild(complete);
                addComplete.type = ('checkbox'); // create checkbox
                addComplete.className = ('toComplete');
                var div1 = document.createElement('div');
                var addDiv1 = addLiInDom.appendChild(div1);
                addDiv1.innerText = 'Complete';

                // delete button
                var deleteButton = document.createElement('input'); // create delete input
                var addDeleteButton = addLiInDom.appendChild(deleteButton);
                addDeleteButton.type = ('button');
                addDeleteButton.className = ('toDelete');
                addDeleteButton.value = 'Delete';

            } else {
                alert('Your task is too short. It should has min 6 letters but less than 100.')
            }
        }

        function changeColorForCompleteTask() {
            var toCompleteButtons = document.querySelectorAll('input.toComplete');
            for (var i = 0; i < toCompleteButtons.length; i++) {
                toCompleteButtons[i].addEventListener('change', function (e) {
                    if (this.checked) {
                        this.className = ('completed');
                        this.previousElementSibling.style.color = ('red'); // changes color of the task name
                    } else {
                        this.classList.remove('completed');
                        this.className = ('toComplete');
                        this.previousElementSibling.style.color = ('black');
                    }

                });
            }
        }

        function deleteOneTask() {
            var deleteButtons = document.getElementsByClassName('toDelete');
            for (var j = 0; j < deleteButtons.length; j++) {
                deleteButtons[j].addEventListener('click', function (e) {
                    var parent = this.parentElement;

                    if (this.previousElementSibling.previousElementSibling.classList.contains("completed") == true ) { // if task was completed, before deleting, we remove clas completed
                        this.previousElementSibling.previousElementSibling.classList.remove("completed");
                    }
                    parent.className = ('hidden');
                    for(var z = 0; z < this.classList.length; z++) {
                        if((this.classList)[z] === 'toDelete'){
                            counter--;
                        }
                    }
                    taskCounter.innerText = (counter);
                    this.classList.remove('toDelete');
                });
            }
        }

        function deleteCompletedTasks() {
            var completedTasks = document.getElementsByClassName("completed");
            var deleteAll = document.querySelector('#removeFinishedTasksButton');

            deleteAll.addEventListener('click', function (e) {
                for (var k = 0; k < completedTasks.length; k++) {
                    if (completedTasks[k].checked) {
                        completedTasks[k].parentElement.className = ('hidden');
                        completedTasks[k].classList.remove('completed');
                        counter--;
                        taskCounter.innerText = (counter);
                    }
                }
            });
        }

        function init() {
            addNewTask();
            changeColorForCompleteTask();
            deleteCompletedTasks();
            deleteOneTask();
        }

        init();
    });
});
