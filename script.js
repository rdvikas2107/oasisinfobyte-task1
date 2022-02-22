/*
out = textfield which takes input/shows final result
hidsign = textfield which shown intermediate result
hidnum = textfield which shows input
*/

function load() { //Clears all fields and set focus to input text field
    document.Cal.out.value = "";
    document.Cal.hidnum.value = "";
    document.Cal.hidsign.value = "";
    document.Cal.ind.value = "";
    document.Cal.out.focus();
    scroll();
}

function fnum(num) { //Input from number buttons
    document.Cal.out.value = document.Cal.out.value + num;
    document.Cal.out.focus();
    chk();
}

function fopt(opt) { //Input from operators button
    document.Cal.out.value = document.Cal.out.value + opt;
    document.Cal.out.focus();
}

function Operation() { //Input from select tab which shows different operations like sin,cos,etc
    var opt = document.getElementById("ex_opt").value;
    document.Cal.out.value = document.Cal.out.value + opt + "(";
    document.Cal.out.focus();
}

function optionclk() { //Sets focus to input textfield
    document.Cal.out.focus();
}

function fans() { //Calculates result
    try {
        var input = document.Cal.out.value;
        if (input != "") {
            input = IntCom(input); //converts trigonometric function and others like sin,cos,etc. in input to Math.sin, Math.cos format so that it can be recognized by eval() function
            var output = eval(input);

            document.Cal.hidnum.value = input;
            document.Cal.out.value = output;
            document.Cal.hidsign.value = "";
            if (input != output && !isNaN(output)) {
                document.getElementById("history").value = document.getElementById("history").value + document.Cal.hidnum.value + "\nAns. = " + output + "\n\n";
                scroll();
            }
        }
    }
    catch (err) { document.Cal.hidsign.value = "Error..."; }
    document.Cal.out.focus();
}

function chk() { //Validates input and shows intermediate result in hidsign
    var input = document.Cal.out.value;
    input = IntCom(input);
    try{
        var output = eval(input);
        if (input == "") { output = ""; }
        if (!isNaN(output)) {
            document.Cal.hidsign.value = output;
            if (eval(document.Cal.hidnum.value) != document.Cal.out.value) {
                document.Cal.hidnum.value = "";
            }
        }
    } catch(e){}
}

function IntCom(input) { //converts trigonometric function and others like sin,cos,etc. in input to Math.sin, Math.cos format so that it can be recognized by eval() function
    input = Compute(input, 'sqrt');
    input = Compute(input, 'sin');
    input = Compute(input, 'cos');
    input = Compute(input, 'tan');
    input = Compute(input, 'log');
    input = Compute(input, 'pow');
    input = Compute(input, 'max');
    input = Compute(input, 'min');
    return (input);
}

function Compute(input, tag) { //Prepend sin,cos,etc. by "Math."
    var i, str, output = "";
    for (i = 0; i < input.length; i++) {
        str = input.substr(i, tag.length);
        if (str == tag) {
            output = output + "Math." + tag;
            i = i + tag.length - 1;
        }
        else {
            output = output + input.charAt(i);
        }
    }
    return (output);
}

function fclsa() { //Clear all fields
    document.Cal.hidnum.value = "";
    document.Cal.hidsign.value = "";
    document.Cal.out.value = "";
    document.Cal.out.focus();
}

function enter(event) { //event for Enter button
    if (event.which == 13 || event.keyCode == 13) {
        fans();
    }
}

function fcls() { //Backspace
    var i, ch, num;
    num = "";
    for (i = 0; i < document.Cal.out.value.length - 1; i++) {
        ch = document.Cal.out.value.charAt(i);
        num = num + ch;
    }
    document.Cal.out.value = num;
    chk();
    document.Cal.out.focus();
}


function scroll() { //Auto scroll history tab

    document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
}

function show() { //hide or show history tab by manipulating css classes

    if (document.getElementById("hisstat").value == "Show History") {
        document.getElementById("hisstat").value = "Hide History";
        document.getElementById("Cal").className = "frmchk";
        document.getElementById("history").className = "historychk";
    }
    else if ((document.getElementById("hisstat").value == "Hide History")) {
        document.getElementById("hisstat").value = "Show History";
        document.getElementById("Cal").className = "frmunchk";
        document.getElementById("history").className = "historyunchk";
    }
    document.Cal.out.focus();
}
