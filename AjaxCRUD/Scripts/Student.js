
$(document).ready(function () {
    loadData();
});
function loadData() {
    $.ajax({
        url: "/Student/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Course_name + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">Edit</a > | <a href="#" onclick="Delete(' + item.id + ')">Delete</a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var StudObj = {
        id: $('#id').val(),
        Name: $('#Name').val(),
        Course_name: $('#Course_name').val()

    };
    $.ajax({
        url: "/Student/Add",
        data: JSON.stringify(StudObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getbyID(id) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Course_name').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Student/getbyID/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#Name').val(result.Name);
            $('#Course_name').val(result.Course_name);


            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var StudObj = {
        id: $('#id').val(),
        Name: $('#Name').val(),
        Course_name: $('#Course_name').val(),

    };
    $.ajax({
        url: "/Student/Update",
        data: JSON.stringify(StudObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#id').val("");
            $('#Name').val("");
            $('#Course_name').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Student/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function clearTextBox() {
    $('#id').val("");
    $('#Name').val("");
    $('#Course_name').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Course_name').css('border-color', 'lightgrey');

}
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Course_name').val().trim() == "") {
        $('#Course_name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Course_name').css('border-color', 'lightgrey');
    }
    return isValid;
}
