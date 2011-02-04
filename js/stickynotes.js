function addNote() {
    var newNote = document.createElement("div");
    newNote = $(newNote);
    newNote.attr("class", "note");
    
    var newTitle = document.createElement("div");
    var newTitleInput = document.createElement("input");
    newTitleInput = $(newTitleInput).attr("class", "title");
    newTitleInput = newTitleInput.attr("value", "New sticky note");
    newTitle = $(newTitle).append(newTitleInput);
    
    var newNoteBody = document.createElement("div");
    var newNoteBodyTextarea = document.createElement("textarea");
    newNoteBodyTextarea = $(newNoteBodyTextarea).attr("class", "noteBody");
    newNoteBody = $(newNoteBody).append(newNoteBodyTextarea);
    
    newNote = newNote.append(newTitle);
    newNote = newNote.append(newNoteBody);
    var notesContainer = $("#notesContainer");
    notesContainer.append(newNote);
    newNote.draggable();
}

function save() {
    var notes = [];
    var note;
    $(".note").each(function(index, element) {
        var jElement = $(element);
        var jBody = jElement.find(".noteBody");
        note = {
            title: jElement.find(".title").val(),
            left: jElement.css("left"),
            top: jElement.css("top"),
            body: jElement.find(".noteBody").val(),
            body_height: jBody.css("height"),
            body_width: jBody.css("width")
        }
        notes.push(note);
    });
    stringifiedNotes = JSON.stringify(notes);
    console.info({notes: notes});
    $.ajax({
        url: "save.php",
        type: "POST",
        data: {data: stringifiedNotes},
        dataType: "text",
        success: function(data1) {
            $("#debugText").val("Inserted: " + data1);
        }
    });
}

$(document).ready(function() {
    $(".note").draggable();
});