let human;

$("#form-create").submit(function (event) {  // set name form
    let name = $('#name').val();
    if (name === '') {
        name = undefined;
    }
    if (isNaN(name) === false) {  // if string is number
        name = Number(name);  // convert it to number
    }
    try {  // try to create human with this name
        human = new human(name);
        $("#form-create").css({display: 'none'});  // hide this form
        $("#form-set-age").css({display: 'block'});  // show age form
    }
    catch (exception) {
        if (exception instanceof ReferenceError) {
            alert(exception.message);
        }
        if (exception instanceof TypeError) {
            alert(exception.message);
        }
    }
    event.preventDefault();
});

$("#form-set-age").submit(function (event) {  // set age form
    let age = $('#age').val();
    age = Number(age);  // form gives even numbers in string format
    try {  // try to set age
        human.setAge(age);
        $("#form-set-age").css({display: 'none'});
        $("#congratulations").css({display: 'block'});
        $("#your-human-name").html(human.name);
        $("#your-human-age").html(human.getAge());

    }
    catch (exception) {
        if (exception instanceof TypeError) {
            alert(exception.message);
        }
        if (exception instanceof RangeError) {
            alert(exception.message);
        }
    }
    event.preventDefault();
});