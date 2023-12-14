//
document.addEventListener("DOMContentLoaded", function () {
  const modalLogin = document.getElementById("modalLogin");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignupRegister = document.getElementById("btnSignup");
  const closeModalLoginBtn = document.getElementById("closeModal");
  const overlay = document.querySelector(".overlay");
  function closeModalFunction(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("modal-active");
  }

  closeModalLoginBtn.addEventListener("click", function () {
    modalLogin.style.display = "none";
  });

  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    modalLogin.style.maxWidth = "400px";
    modalLogin.style.width = "100%";
    modalLogin.style.top = "270px";
    modalLogin.style.left = "37%";
    modalLogin.style.zIndex = "10000";
    modalLogin.style.display = "block";
  });

  document.getElementById("control").onclick = function (event) {
    event.preventDefault();
    var signin = new UserLogin();
    signin.email = document.getElementById("email").value;
    signin.password = document.getElementById("password").value;
    var adminEmail = "admin@gmail.com";
    var adminPassword = "123456";
    var adminToken = "huydeptraisomot";
    if (signin.email === adminEmail && signin.password === adminPassword) {
      alert("Logged in successfully. (admin)");
      modalLogin.style.display = "none";
      btnLogin.style.display = "none";
      btnSignupRegister.style.display = "none";
      luuLogin(adminToken);
      resetForm();
      checkLogin(); // Gọi hàm checkLogin ngay sau khi đăng nhập
      window.location.href = "./view/admin.html";
    } else {
      var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Users/signin",
        method: "POST",
        data: {
          email: signin.email,
          password: signin.password,
        },
      });
      promise.then(function (res) {
        console.log(res.data.content);
        alert("Logged in successfully. ");
        luuLogin(res.data.content.accessToken, signin.email);
        const cart = localStorage.getItem(signin.email);
        console.log(JSON.parse(cart));
        checkLogin();
        modalLogin.style.display = "none";
        closeModalFunction(modalLogin);
        window.location.reload();
        resetForm();
      });
      promise.catch(function (err) {
        console.log(err.response.data);
        alert("Wrong account or password ");
      });
    }
  };
  document.addEventListener("click", function (event) {
    var logoutButton = document.getElementById("logout");
    if (event.target === logoutButton && logoutButton) {
      event.preventDefault();
      btnLogin.style.display = "block";
      btnSignupRegister.style.display = "block";
      logoutButton.style.display = "none";
      alert("Log out Successfully.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userLogin");
      document.querySelector("tbody").innerHTML = "";
      resetForm();
      window.location.href = "/Project/index.html";
    }
  });
  function resetForm() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
  function luuLogin(accesstoken, userEmail) {
    localStorage.setItem("accessToken", JSON.stringify(accesstoken));
    localStorage.setItem("userLogin", JSON.stringify(userEmail));
    let infoUser = localStorage.getItem(userEmail);
    if (!infoUser) {
      infoUser = {
        cart: [],
      };
    } else {
      infoUser = JSON.parse(infoUser);
    }
    localStorage.setItem(userEmail, JSON.stringify(infoUser));
  }
  function layLogin() {
    if (localStorage.getItem("accessToken")) {
      var checkLogin = localStorage.getItem("accessToken");
      userLogin = JSON.parse(checkLogin);
    }
  }
  function checkLogin() {
    // var adminSectionHTML = '<button id="logout">Logout</button>';
    var adminSectionHTML1 =
      '<a id="a"  href=""> hi <span id="abc"></span>!</a>';
    var adminSectionHTML2 = '<a id="logout" href="">Logout</a>';
    if (localStorage.getItem("accessToken")) {
      //  var testElement = document.querySelector(".test");
      //  testElement.insertAdjacentHTML('beforeend', adminSectionHTML);
      var testElement1 = document.querySelector("#btnLogin");
      testElement1.insertAdjacentHTML("afterend", adminSectionHTML1);
      var testElement2 = document.querySelector("#btnSignup");
      testElement2.insertAdjacentHTML("afterend", adminSectionHTML2);
      btnLogin.style.display = "none";
      btnSignupRegister.style.display = "none";
    }
  }
  layLogin();
  checkLogin(); // Gọi hàm checkLogin khi DOM đã được load
});

document.addEventListener("DOMContentLoaded", function () {
  const modalLogin = document.getElementById("modalLogin");
  const overlay = document.querySelector(".overlay");
  const closeModal = document.getElementById("closeModal");
  const btnLogin = document.getElementById("btnLogin");

  let customer = localStorage.getItem("customerCr")
    ? JSON.parse(localStorage.getItem("customerCr"))
    : [];
  let userLg = JSON.parse(localStorage.getItem("userLogin"));
  for (let i = 0; i < customer.length; i++) {
    if (customer[i].email == userLg) {
      // console.log(document.getElementById("abc"), customer[i].userName)
      document.getElementById("abc").innerText = customer[i].username;
    }
  }

  function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("modal-active");
  }

  function closeModalFunction(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("modal-active");
  }
  // Show the signup modal when the signup button is clicked
  btnLogin.addEventListener("click", function (e) {
    // e.preventDefault();
    openModal(modalLogin);
  });
  // Close the signup modal when clicking the close button
  closeModal.addEventListener("click", function () {
    closeModalFunction(modalLogin);
  });
});
