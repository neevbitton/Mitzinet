/* Orel Dadon ID 313278061, Neev Bitton 318504164*/
/**variabels */
const email = document.getElementById("mail");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const lname = document.getElementById("lname");
const fname = document.getElementById("fname");
const telephone = document.getElementById("telephone");
const form = document.getElementById("signup");
const submit = document.getElementById("submit");


/*error functions */
function showError(input) {
    const formControl = input.parentElement;
    formControl.className = "form error";
}

function showErrorPassword(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}




/*click on submit and checks if exist errors*/
form.addEventListener("submit", function (e) {
        // prevent the form from submitting
        e.preventDefault();
        if (email.value == "") {
            showError(email);
            document.getElementById("mail").style.border = '2px solid red';
            document.getElementById("mail").style.visibility = 'visible';
        }
        if (fname.value == "") {
            showError(fname);
            document.getElementById("fname").style.border = '2px solid red';
            document.getElementById("fname").style.visibility = 'visible';
        }
        if (lname.value == "") {
            showError(lname);
            document.getElementById("lname").style.border = '2px solid red';
            document.getElementById("lname").style.visibility = 'visible';
        }
        if (telephone.value == "") {
            showError(telephone);
            document.getElementById("telephone").style.border = '2px solid red';
            document.getElementById("telephone").style.visibility = 'visible';
        }

        if (password.value == "" || password.value.length < 8) {
            showErrorPassword(password, 'password length should contains at least 8 characters');

        }
        if (password.value !== confirm.value) {
            showErrorPassword(confirm, 'password are not equals');

        }

        if (fname.value == "" || lname.value == "" || telephone.value == "" || email.value == "" || password.value == "" || confirm.value == "") {
            alert("All fields must be complete");


        }



        fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    //sets the content to JSON
                },
                body: JSON.stringify({
                    fname: fname.value,
                    lname: lname.value,
                    telephone: telephone.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirm.value
                })
            })
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    alert('Registration error : ' + data.message);
                    document.getElementById("signup").reset(); // Resets the form fields
                } else {
                    alert('Sign up successful');
                    document.getElementById("signup").reset(); // Resets the form fields
                }
            })
            .catch(error => console.error('Error:', error));


        ;
    }

);

/* Check if email exists */
email.addEventListener("blur", function () {
    fetch(`/check-email?email=${encodeURIComponent(email.value)}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                alert('Email already exists');
                submit.disabled = true;
            } else {
                submit.disabled = false;
            }
        })
        .catch(error => console.error('Error:', error));
});