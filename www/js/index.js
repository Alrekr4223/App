/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

    // create a new to-do
function createNewToDo()
{
    var todoDictionary = {};
 
    // prompt the user to enter to-do
    var todo = prompt("To-Do","");
    if (todo != null)
    {
        if (todo == "")
        {
            alert("To-Do can't be empty!");
        }
        else
        {
            // append the new to-do with the table
            todoDictionary = { check : 0 , text : todo, name : "", times : "1"}; //this is where we store local permamenet data
            addTableRow(todoDictionary, false); //this is defined below
        }
    }
 
}


//populate the table with new row
var rowID = 0;
function addTableRow(todoDictionary, appIsLoading)
{
    rowID +=1;
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
 
    // create the checkbox
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chkbox[]";
    element1.checked = todoDictionary["check"];
    element1.setAttribute("onclick", "checkboxClicked()");
    cell1.appendChild(element1);
 
    // create the textbox
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.type = "text";
    element2.name = "txtbox[]";
    element2.size = 16;
    element2.id = "text" + rowID;
    element2.value = todoDictionary["text"];
    element2.setAttribute("onchange", "saveToDoList()");
    cell2.appendChild(element2);
 
    // create the name textbox
    var cell22 = row.insertCell(2);
    var element22 = document.createElement("input");
    element22.type = "text";
    element22.name = "namebox[]";
    element22.size = 16;
    element22.id = "name" + rowID;
    element22.placeholder = "Name";
    element22.value = todoDictionary["name"];
    element22.setAttribute("onchange", "saveToDoList()");
    cell22.appendChild(element22);
 
    // create the times per week textbox
    var cell23 = row.insertCell(3);
    var element23 = document.createElement("input");
    element23.type = "number";
    element23.name = "timesbox[]";
    element23.size = 16;
    element23.id = "times" + rowID;
    element23.placeholder = "Times per week";
    element23.value = todoDictionary["times"];
    element23.min = 1;
    element23.setAttribute("onchange", "saveToDoList()");
    cell23.appendChild(element23);
 
    // create the view button
    var cell3 = row.insertCell(4);
    var element3 = document.createElement("input");
    element3.type = "button";
    element3.id = rowID;
    element3.value = "View";
    element3.setAttribute("onclick", "viewSelectedRow(document.getElementById('text' + this.id))");
    cell3.appendChild(element3);
 
    // create the delete button
    var cell4 = row.insertCell(5);
    var element4 = document.createElement("input");
    element4.type = "button";
    element4.value = "Completed";
    element4.setAttribute("onclick", "completedTask(this)");
    cell4.appendChild(element4);
 
    // update the UI and save the to-do list
    checkboxClicked();
    saveToDoList();
 
    //if (!appIsLoading) alert("Task Added Successfully.");
}
// add the strike-through styling to completed tasks
function checkboxClicked()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        var textbox = row.cells[1].childNodes[0];
        var timesbox = row.cells[3].childNodes[0];
 
        // if the checkbox is checked, add the strike-through styling
        if(null != chkbox && true == chkbox.checked)
        {
            if(null != textbox)
            {
                if (timesbox.value > 1) {
                    timesbox.value -= 1;
                    chkbox.checked = false;
                } else {
                    textbox.style.setProperty("text-decoration", "line-through");
                }
            }
        }
 
        // if the checkbox isn't checked, remove the strike-through styling
        else
        {
            textbox.style.setProperty("text-decoration", "none");
        }
 
    }
 
    // save the to-do list
    saveToDoList();
}
// view the content of the selected row
function viewSelectedRow(todoTextField)
{
    alert(todoTextField.value);
}


// completed task

function completedTask(task) {
    deleteSelectedRow(task);
}
// delete the selected row
function deleteSelectedRow(deleteButton)
{
    var p = deleteButton.parentNode.parentNode;
    p.parentNode.removeChild(p);
    saveToDoList();
}

// remove completed tasks
function removeCompletedTasks()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        // if the checkbox is checked, delete the row
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if(null != chkbox && true == chkbox.checked)
        {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }
 
    // save the to-do list
    saveToDoList();
 
    alert("Completed Tasks Were Removed Successfully.");
}

// save the to-do list
function saveToDoList()
{
    var todoArray = {};
    var checkBoxState = 0;
    var textValue = "";
    var nameValue = "";
 
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    if (rowCount != 0)
    {
        // loop through all rows of the table
        for(var i=0; i<rowCount; i++)
        {
            var row = table.rows[i];
 
            // determine the state of the checkbox
            var chkbox = row.cells[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked)
            {
                checkBoxState = 1;
            }
            else
            {
                checkBoxState= 0;
            }
 
            // retrieve the content of the to-do
            var textbox = row.cells[1].childNodes[0];
            textValue = textbox.value;
            var namebox = row.cells[2].childNodes[0];
            nameValue = namebox.value;
            var timesbox = row.cells[3].childNodes[0];
            timesValue = timesbox.value;
 
            // populate the array with checkbox state and text value
            todoArray["row" + i] =
            {
                check : checkBoxState, //this formate is nescessary because we are going to turn it into a json key value pair
                text : textValue,
                name : nameValue,
                times: timesValue
            };
        }
    }
    else
    {
        todoArray = null;
    }
 
    // use the local storage API to persist the data as JSON, hence the storage format
    window.localStorage.setItem("todoList", JSON.stringify(todoArray)); //the function to save data locally, to the phone.  Takes json object format.
}

// load the to-do list
function loadToDoList()
{
    // use the local storage API load the JSON formatted to-do list, and decode it
    var theList = JSON.parse(window.localStorage.getItem("todoList"));
 
    if (null == theList || theList == "null")
    {
        deleteAllRows();
    }
    else
    {
        var count = 0;
        for (var obj in theList)
        {
            count++;
        }
 
        // remove any existing rows from the table
        deleteAllRows();
 
        // loop through the to-dos
        for(var i = 0; i < count; i++)
        {
            // adding a row to the table for each one
            addTableRow(theList["row" + i], true); //same function we use to add a new table row, we're just looping now though through all the rows that were saved
        }
    }
}

// delete all the rows
function deleteAllRows()
{
    var table = document.getElementById("dataTable");
    var rowCount = table.rows.length;
 
    // loop through all rows of the table
    for(var i = 0; i < rowCount; i++)
    {
        // delete the row
        table.deleteRow(i);
        rowCount--;
        i--;
    }
 
    // save the to-do list
    saveToDoList();
}





