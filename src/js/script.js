var contactForm = document.getElementById("contact-form");
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var email = document.getElementById("email");
var description = document.getElementById("description");
var firstNameError = document.getElementById("first-name-error");
var lastNameError = document.getElementById("last-name-error");
var emailError = document.getElementById("email-error");
var descriptionError = document.getElementById("description-error");
var submitButton = document.getElementById("submit-button");
var formError = document.getElementById("submit-error");
var header = document.getElementById("header");
var prevScrollpos = window.pageYOffset;

window.addEventListener("scroll", bringmenu);

function bringmenu() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    header.style.top = "-100%";
  } else {
    header.style.top = "0";
  }
  prevScrollpos = currentScrollPos;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var isFirstNameEmpty = firstName.value == "";
  var isLastNameEmpty = lastName.value == "";
  var isEmailEmpty = email.value == "";
  var isEmailValid = validateEmail(email.value);
  var isDescriptionEmpty = description.value == "";


  if (isFirstNameEmpty) {
    firstName.style.borderColor = "#f03434";
    firstNameError.innerHTML = "First name can't be empty";
  } else {
    firstName.style.borderColor = "rgb(1, 63, 1)";
    firstNameError.innerHTML = "";
  }

  if (isLastNameEmpty) {
    lastName.style.borderColor = "#f03434";
    lastNameError.innerHTML = "Last name can't be empty";
  } else {
    lastName.style.borderColor = "rgb(1, 63, 1)";
    lastNameError.innerHTML = "";
  }

  if (isEmailEmpty) {
    email.style.borderColor = "#f03434";
    emailError.innerHTML = "Email can't be empty";
  } else if (!isEmailValid) {
    email.style.borderColor = "#f03434";
    emailError.innerHTML = "Email is not valid";
  } else if (!isEmailEmpty && isEmailValid) {
    email.style.borderColor = "rgb(1, 63, 1)";
    emailError.innerHTML = "";
  }


  if (isDescriptionEmpty) {
    description.style.borderColor = "#f03434";
    descriptionError.innerHTML = "Desription can't be empty";
  } else {
    description.style.borderColor = "rgb(1, 63, 1)";
    descriptionError.innerHTML = "";
  }

  if (!isFirstNameEmpty && !isLastNameEmpty && !isEmailEmpty && isEmailValid && !isDescriptionEmpty) {
    sendEmail(email.value, firstName.value + " " + lastName.value, description.value);

  }


});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function sendEmail(email, fullname, description) {
  submitButton.disabled = true;
  Email.send({
    Host: "smtp.mailtrap.io",
    Username: "090ebf3926e9cc",
    Password: "f26a1005b69afb",
    To: 'alinasytnik1999@gmail.com',
    From: email,
    Subject: "Email from Ucoil website",
    Body: "<html><h2>" + fullname + "</h2><p>" + description + "</p></html>"
  }).then(
    function (message) {
      if (message == "OK") {
        contactForm.innerHTML = '<div id="contact-form__success"><h3>Successfully submitted email.</h3></div>';
        contactForm.style.padding = 0;
      }
      submitButton.disabled = false;
      formError.innerHTML = "Form error, try again";
    }
  );
}