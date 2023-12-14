//
const modalSignup = document.getElementById('modalSignup');
const btnSignup = document.getElementById('btnSignup');
const closeModalSignupBtn = document.getElementById('closeModalSign');
closeModalSignupBtn.addEventListener('click', function (e) {
  modalSignup.style.display = 'none';
});
btnSignup.addEventListener('click', function (e) {
    e.preventDefault();
    modalSignup.style.maxWidth = "400px";
    modalSignup.style.width = "100%";
    modalSignup.style.top = "270px";
    modalSignup.style.left = "37%";
    modalSignup.style.zIndex = "10000";
    modalSignup.style.display = 'block';
});
document.getElementById("btn_submit").onclick = function (e) {
 e.preventDefault();
 var username = document.querySelector('#nameSign');
 var email = document.querySelector('#emailSign');
 var password = document.querySelector('#passwordSign');
 var confirmPassword = document.querySelector('#confirm-passwordSign');
 function showError(input, message) {
   let parent = input.parentElement;
   let small = parent.querySelector('small');
   parent.classList.add('error');
   small.innerText = message;
 }
 function showSuccess(input) {
   let parent = input.parentElement;
   let small = parent.querySelector('small');
   parent.classList.remove('error');
   small.innerText = '';
 }
 function checkEmptyError(listInput) {
   let isEmptyError = false;
   listInput.forEach(input => {
     input.value = input.value.trim();
     if (!input.value) {
       showError(input, 'Do not leave it blank');
       isEmptyError = true;
     } else {
       showSuccess(input);
     }
   });
   return isEmptyError;
 }
 function checkEmailError(input) {
   const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
   input.value = input.value.trim();
   let isValidEmail = regexEmail.test(input.value); //false // khong co loi la true, co loi la false
   console.log(isValidEmail) // dung dinh dang ==> true
   if (!isValidEmail) {
     showError(input, 'Invalid email format');
   } else {
     showSuccess(input);
   }
   return !isValidEmail;  // false
 }
 function checkLengthError(input, min, max) {
   input.value = input.value.trim();
   if (input.value.length < min) {
     showError(input, `Must have at least ${min} characters`);
     return true;
   }
   if (input.value.length > max) {
     showError(input, `must not exceed ${max} characters`);
     return true;
   }
   showSuccess(input);
   return false;
 }
 function checkMatchPasswordError(passwordInput, cfPasswordInput) {
   if (passwordInput.value !== cfPasswordInput.value) {
     showError(cfPasswordInput, 'Password is not the same');
     return true;
   }
   showSuccess(cfPasswordInput);
   return false;
 }
 // Kiểm tra lỗi và thực hiện API call khi không có lỗi
 let isEmptyError = checkEmptyError([username, email, password, confirmPassword]);
 let isEmailError = checkEmailError(email); // false
 let isUsernameLengthError = checkLengthError(username, 3, 10);
 let isPasswordLengthError = checkLengthError(password, 6, 12);
 let isMatchError = checkMatchPasswordError(password, confirmPassword);
 if (!isEmptyError && !isEmailError && !isUsernameLengthError && !isPasswordLengthError && !isMatchError) {
  // if (!isEmptyError && !isEmailError &&  !isPasswordLengthError && !isMatchError) {
   // Thực hiện API call
   handleFormSubmission();
 }
};

function handleFormSubmission() {
 var signup = new UserRegister();
 signup.username = document.getElementById("nameSign").value;
 signup.email = document.getElementById("emailSign").value;
 signup.password = document.getElementById("passwordSign").value;
 // Thêm trường ngày tạo tài khoản
 signup.dateCr = new Date();
 var promise = axios({
   url: "https://shop.cyberlearn.vn/api/Users/signup",
   method: "POST",
   data: {
     name: signup.username,
     email: signup.email,
     password: signup.password,
     dateCr: signup.dateCr,
   },
 });
 promise.then(function (res) {
   console.log(res.data.content);
   alert("Sign up success!");
   // Lưu thông tin đăng ký vào Local Storage
   luuLocalCustomer(signup);
   resetForm();
 });
 promise.catch(function (err) {
   console.log(err.response.data.content);
   alert("Registration failed!");
 });
}
function resetForm() {
  document.getElementById("nameSign").value = "";
  document.getElementById("emailSign").value = "";
  document.getElementById("passwordSign").value = "";
  document.getElementById("confirm-passwordSign").value = "";
}

function clearErrorMessage(field) {
 document.querySelector(`#${field} ~ small`).innerHTML = '';
}
document.addEventListener('DOMContentLoaded', function () {
 const modalSignup = document.getElementById('modalSignup');
 const overlay = document.querySelector('.overlay');
 const closeModalSign = document.getElementById('closeModalSign');
 const btnSignup = document.getElementById('btnSignup');

 function openModal(modal) {
   modal.classList.add('active');
   overlay.classList.add('active');
   document.body.classList.add('modal-active');
 }

 function closeModalFunction(modal) {
   modal.classList.remove('active');
   overlay.classList.remove('active');
   document.body.classList.remove('modal-active');
 }

 // Show the signup modal when the signup button is clicked
 btnSignup.addEventListener('click', function (e) {
   e.preventDefault();
   openModal(modalSignup);
 });

 // Close the signup modal when clicking the close button
 closeModalSign.addEventListener('click', function () {
   closeModalFunction(modalSignup);
 });
});

function luuLocalCustomer(signup) {
  const customerCr = localStorage.getItem("customerCr")
  let newCustomer;
  if(customerCr) {
    newCustomer = JSON.parse(customerCr);
    newCustomer.push(signup)
  } else {
    newCustomer = [signup]
  }
  localStorage.setItem("customerCr",JSON.stringify(newCustomer))
}