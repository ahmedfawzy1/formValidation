var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passwordError = document.getElementById("passwordError");

var username = document.getElementById("username");

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var wrong = document.getElementById("wrong");

var dataContainer = [] || localStorage.getItem("userData");

function signUp() {
  wrong.innerHTML = "";
  nameError.innerHTML = "";
  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  var data = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    wrong.innerText = "All inputs is required";
  } else {
    if (!isVailName(signupName.value)) {
      nameError.innerText = "Only letters and spaces are allowed.";
    }
    if (!isVaildEmail(signupEmail.value)) {
      emailError.innerText = "Enter Valid Email Address, (user@user.com)";
    }
    if (!isStrongPassword(signupPassword.value)) {
      passwordError.innerText =
        "Password must be at least 8 characters, one lowercase, one uppercase, one digit.";
    }
    if (emailError.innerHTML === "" && passwordError.innerHTML === "") {
      dataContainer.push(data);
      wrong.innerText = "success";
      clearForm();
      localStorage.setItem("userData", JSON.stringify(dataContainer));
    }
  }
}

function clearForm() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function logIn() {
  if (loginEmpty() == false) {
    wrong.innerText = "All inputs is required";
    return false;
  }

  var email = signinEmail.value;
  var password = signinPassword.value;

  var userData = JSON.parse(localStorage.getItem("userData")) || [];

  for (var i = 0; i < userData.length; i++) {
    if (
      userData[i].email.toLowerCase() == email.toLowerCase() &&
      userData[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("logInUser", userData[i].name);
      console.log("success");
      wrong.innerText = "";
      window.open("./home.html", "_self");
    } else {
      wrong.innerText = "Incorrect Email or Password";
    }
  }
}

function loginEmpty() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

// validation
function isVailName(name) {
  var nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}

function isVaildEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}
