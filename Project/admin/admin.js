let productList = localStorage.getItem("mangProduct")
  ? JSON.parse(localStorage.getItem("mangProduct"))
  : [];
let currentPage = 1;
let perPage = 6;
let totalPage = 0;
let perProduct = [];

let products = document.querySelector(".products");
let orders = document.querySelector(".orders");
let customer = document.querySelector(".customer");
let management = document.querySelector(".management");

// Products

document.addEventListener("DOMContentLoaded", function () {
  let listProduct = localStorage.getItem("mangProduct")
    ? JSON.parse(localStorage.getItem("mangProduct"))
    : [];
  perProduct = listProduct.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  renderPageNumber(listProduct);
  renderProduct(perProduct);
});

function renderPageNumber(array) {
  // let listProduct = localStorage.getItem("mangProduct")
  //   ? JSON.parse(localStorage.getItem("mangProduct"))
  //   : [];
  totalPage = Math.ceil(array.length / perPage);
  let html = "";
  html += `<li class="paging active" onclick="handlePageNumber(${1})">${1}</li>`;
  for (let i = 2; i <= totalPage; i++) {
    html += `<li class="paging" onclick="handlePageNumber(${i})">${i}</li>`;
  }
  document.querySelector(".paging-product ul").innerHTML = html;
}

function handlePageNumber(num) {
  let abs = document.querySelectorAll(".paging-product ul .paging");
  console.log(abs);
  if (abs.length <= 1) {
    document.querySelector(".paging-product").style.display = "none";
  } else {
    document.querySelector(".paging-product").style.display = "block";
    for (let i = 0; i < abs.length; i++) {
      if (num == abs[i].innerText) {
        abs[i].classList.add("active");
      } else {
        abs[i].classList.remove("active");
      }
    }
    currentPage = num;
    console.log(currentPage);
    let listProduct = localStorage.getItem("mangProduct")
      ? JSON.parse(localStorage.getItem("mangProduct"))
      : [];
    perProduct = listProduct.slice(
      (currentPage - 1) * perPage,
      (currentPage - 1) * perPage + perPage
    );
    renderProduct(perProduct);
  }
}

function renderTitleProduct() {
  let product = `
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Picture</th>
                    <th>Name Product</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody class="list">
            </tbody>
        </table>
    `;
  document.querySelector(".content .inner-wrap .product-detail").innerHTML =
    product;
}

function renderProduct(array) {
  orders.style.color = "gray";
  customer.style.color = "gray";
  products.style.color = "black";
  management.style.color = "gray";
  document.querySelector(".filter-admin").style.display = "none";
  renderTitleProduct();
  let product = ``;
  for (let i = 0; i < array.length; i++) {
    let prod = array[i];
    product += `
          <tr id="item">
              <td class="item_id">${prod.id}</td>
              <td style="width: 20%;">
                  <img style=" width: 40%;"
                  src="${prod.image}" alt="">
              </td>
              <td>${prod.name}</td>
              <td>${prod.category}</td>
              <td>${prod.price}</td>
              <td class="edit-del" style="text-align: center;">
                  <button id="edit-item" onclick="editProduct(${i})">Edit
                  <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button id="del-item" onclick="delProduct(${i})">Delete
                      <i class="fa-solid fa-eraser"></i>
                  </button>
              </td>
          </tr>
          `;
  }
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(
    ".content .inner-wrap .product-detail table tbody"
  ).innerHTML = product;
}

function renderAdd() {
  let htmls = `
      <div class="content2">
          <span onclick="exitProduct()">x</span>
          <h1 class="addPro" style="margin-bottom: 10px;">Add Product</h1><br>
          <div class="form">
          <div class="form-add">
              <input type="hidden" name="index" id="index">
          </div>
              <div class="form-add">
                  <label for="name">Name Product</label><br>
                  <input style="width: 80%;" type="text" id="name" class="form-input">
                  <div class="eror-mesage"></div><br><br>
                  <label for="gender">Gender: </label>
                  <select style="width: 65%;" name="gender" id="gender">
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                  </select><br><br>
                  <label for="brand">Brand: </label>
                  <select style="width: 65%;" name="brand" id="brand">
                      <option value="ADIDAS">ADIDAS</option>
                      <option value="NIKE">NIKE</option>
                      <option value="VANS">VANS</option>
                      <option value="CONVERSE">CONVERSE</option>
                  </select><br><br>
              </div>
              <div class="form-add">
                  <label for="price">Price</label><br>
                  <input style="width: 80%;" type="number" name="price" id="price" class="form-input">
                  <div class="eror-mesage"></div><br>
              </div>
              <div class="form-add">
                  <label for="picture">Picture</label> <br>
                  <input style="border: 1px solid black" type="file" name="choose" id="file" class="form-input">
                  <div class="eror-mesage"></div><br>
              </div>
              <button id="addData" onclick="addProduct()">Add Data</button>
              <button style="display: none;" id="editData" onclick="changeProduct()">Edit Data</button>
          </div>
      </div>
      `;
  document.querySelector(".body-temp").style.display = "inline-block";
  document.querySelector(".body-temp").innerHTML = htmls;
}

function resetInput() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("file").value = "";
}

function validateInput() {
  // let listProduct = localStorage.getItem("mangProduct")
  //   ? JSON.parse(localStorage.getItem("mangProduct"))
  //   : [];
  let formElement = document.querySelector(".form");
  let inputElement = formElement.querySelectorAll(".form-input");
  // let newProductId = document.getElementById("id").value;
  for (let i = 0; i < inputElement.length; i++) {
    if (inputElement[i].value === "") {
      inputElement[i].parentElement.querySelector(
        ".eror-mesage"
      ).innerText = `Please enter your ${inputElement[i]}`;
    } else {
      inputElement[i].parentElement.querySelector(".eror-mesage").innerText =
        "";
    }
  }
}

let btnaddProduct = document.getElementById("addProduct");
btnaddProduct.addEventListener("click", () => {
  document.querySelector(".body-main").style.opacity = "0.1";
  renderAdd();
});

function addProduct() {
  let listProduct = localStorage.getItem("mangProduct")
    ? JSON.parse(localStorage.getItem("mangProduct"))
    : [];
  validateInput();
  let formElement = document.querySelector(".form");
  let errorElement = formElement.querySelectorAll(".eror-mesage");
  let arrErrorElement = [];
  for (let i = 0; i < errorElement.length; i++) {
    arrErrorElement.push(errorElement[i].innerText);
  }
  let checkErrorElement = arrErrorElement.every((value) => value === "");
  if (checkErrorElement) {
    // let id = document.getElementById("id").value;
    let nameProduct = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let brand = document.getElementById("brand").value;
    let price = document.getElementById("price").value;
    // let file = document.getElementById("file").value;
    // Lấy file đã chọn
    let fileInput = document.getElementById("file");
    let file = fileInput.files[0];
    // Kiểm tra xem đã chọn file chưa
    if (file) {
      // Đọc file và tạo data URL hoặc Blob
      var reader = new FileReader();
      reader.onload = function (e) {
        fileInput = e.target.result;
        // saveProduct(sp);
        let newProduct = localStorage.getItem("mangProduct")
          ? JSON.parse(localStorage.getItem("mangProduct"))
          : [];
        newProduct.push({
          id: Number.parseInt(listProduct[listProduct.length - 1].id) + 1,
          name: nameProduct,
          gender: gender,
          category: brand,
          price: price,
          image: fileInput,
        });
        localStorage.setItem("mangProduct", JSON.stringify(newProduct));
        resetInput();
        document.querySelector(".body-temp").style.display = "none";
        document.querySelector(".body-main").style.display = "block";
        document.querySelector(".body-main").style.opacity = "1";
        // renderTitleProduct()
        renderProduct(listProduct);
        window.location.reload();
      };
      reader.readAsDataURL(file); // Sử dụng readAsArrayBuffer cho Blob
    }
  }
}

function editProduct(index) {
  // alert("amcmcam")
  let listProduct = localStorage.getItem("mangProduct")
    ? JSON.parse(localStorage.getItem("mangProduct"))
    : [];
  document.querySelector(".body-main").style.opacity = "0.1";
  renderAdd();
  perProduct = listProduct.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );

  // document.getElementById("id").value = listProduct[index].id;
  document.getElementById("name").value = perProduct[index].name;
  document.getElementById("price").value = perProduct[index].price;
  document.getElementById("brand").value = perProduct[index].category;
  document.getElementById("index").value = index;
  document.getElementById("editData").style.display = "inline-block";
  document.getElementById("addData").style.display = "none";
}


function changeProduct() {
  let listProduct = localStorage.getItem("mangProduct")
    ? JSON.parse(localStorage.getItem("mangProduct"))
    : [];
  let index = document.getElementById("index").value;
  perProduct = listProduct.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
  // Create a new Product instance
  var sp = new Product();
  sp.id = perProduct[index].id;
  sp.nameProduct = document.getElementById("name").value;
  sp.brand = document.getElementById("brand").value;
  sp.price = document.getElementById("price").value;
  // Check if a new image is selected
  var fileInput = document.getElementById("file");
  var file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Update the product data, including the image
      sp.image = e.target.result;
      perProduct[index] = {
        id: sp.id,
        name: sp.nameProduct,
        category: sp.brand,
        price: sp.price,
        image: sp.image,
      };
      // Update localStorage
      listProduct.splice((currentPage - 1) * perPage, perPage, ...perProduct);
      localStorage.setItem("mangProduct", JSON.stringify(listProduct));
      // Render the updated product list
      validateInput();
      renderProduct(perProduct);
    };
    reader.readAsDataURL(file);
  } else {
    // No new image selected, update other product data without changing the image
    perProduct[index] = {
      id: sp.id,
      name: sp.nameProduct,
      category: sp.brand,
      price: sp.price,
      image: perProduct[index].image, // Keep the existing image
    };

    listProduct.splice((currentPage - 1) * perPage, perPage, ...perProduct);
    // Update localStorage
    localStorage.setItem("mangProduct", JSON.stringify(listProduct));
    // Render the updated product list
    renderProduct(perProduct);
  }
  document.getElementById("editData").style.display = "none";
  document.getElementById("addData").style.display = "inline";
  resetInput();
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(".body-main").style.display = "block";
  document.querySelector(".body-main").style.opacity = "1";
  renderProduct(perProduct);
}

function delProduct(index) {
  let listProduct = localStorage.getItem("mangProduct")
    ? JSON.parse(localStorage.getItem("mangProduct"))
    : [];

  // Lấy vị trí của sản phẩm trong danh sách hiển thị (perProduct)
  let productIndex = (currentPage - 1) * perPage + index;

  // Hiển thị thông báo xác nhận xóa
  if (confirm("Do you want to delete this product?")) {
    // Xóa sản phẩm khỏi danh sách hiển thị
    perProduct.splice(index, 1);

    // Xóa sản phẩm khỏi danh sách đầy đủ
    listProduct.splice(productIndex, 1);

    // Cập nhật localStorage với danh sách mới
    localStorage.setItem("mangProduct", JSON.stringify(listProduct));

    // Hiển thị lại trang với dữ liệu mới
    window.location.reload();
    renderProduct(perProduct);
  }
}

function exitProduct() {
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(".body-main").style.opacity = "1";
}
// End Products
// Oders
function renderTitleOder() {
  document.querySelector(".paging-product ").style.display = "none";
  let oderTiltle = `
    <table>
        <thead>
            <tr>
                <th>Id Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Detail</th>
                <th>Condition</th>
            </tr>
        </thead>
        <tbody class="list" id="listOrder"></tbody>
    </table>
    `;
  document.querySelector(".content .inner-wrap .product-item").style.display =
    "none";
  document.querySelector(
    ".content .inner-wrap .product-detail"
  ).style.marginTop = "70px";
  document.querySelector(".content .inner-wrap .product-detail").innerHTML =
    oderTiltle;
}
function renderOder() {
  orders.style.color = "black";
  customer.style.color = "gray";
  products.style.color = "gray";
  management.style.color = "gray";
  document.querySelector(".filter-admin").style.display = "none";
  renderTitleOder();
  let listOder = localStorage.getItem("mangPro")
    ? JSON.parse(localStorage.getItem("mangPro"))
    : [];
  let oder = ``;
  for (let i = 0; i < listOder.length; i++) {
    let prod = listOder[i];
    oder += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.date}</td>
                <td>${prod.nameCustomer}</td>
                <td>$${prod.price}</td>
                <td>
                    <p>${prod.condition[0]}</p>
                </td>
            </tr>
        `;
  }
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(
    ".content .inner-wrap .product-detail table tbody"
  ).innerHTML = oder;

  layLocalOrder();
}
// End Oders

// Customer
function renderTitleCustomer() {
  document.querySelector(".paging-product ").style.display = "none";
  let customerTitle = `
    <table>
        <thead>
            <tr>
                <th>Customer Name</th>
                <th>Name Login</th>
                <th>Password</th>
                <th> </th>
            </tr>
        </thead>
        <tbody class="list" id="listCustomer"></tbody>
    </table>
    `;
  document.querySelector(".content .inner-wrap .product-item").style.display =
    "none";
  document.querySelector(
    ".content .inner-wrap .product-detail"
  ).style.marginTop = "70px";
  document.querySelector(".content .inner-wrap .product-detail").innerHTML =
    customerTitle;
}
function renderCustomer() {
  orders.style.color = "gray";
  customer.style.color = "black";
  products.style.color = "gray";
  management.style.color = "gray";
  document.querySelector(".filter-admin").style.display = "none";
  renderTitleCustomer();
  let listCustomer = localStorage.getItem("mangPro")
    ? JSON.parse(localStorage.getItem("mangPro"))
    : [];
  let customers = ``;
  for (let i = 0; i < listCustomer.length; i++) {
    let prod = listCustomer[i];
    customers += `
        <tr>
            <td>${prod.IdCustomer}</td>
            <td>${prod.nameCustomer}</td>
            <td>${prod.nameLogin}</td>
            <td>${prod.date}</td>
            <td>
                <button id="del-item">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
            </td>
        </tr>
        `;
  }
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(
    ".content .inner-wrap .product-detail table tbody"
  ).innerHTML = customers;
  layLocalCustomer();
}
// End Customer

function layLocalOrder() {
  const userOrder = localStorage.getItem("userOrder");
  if (userOrder) {
    const userOrderData = JSON.parse(userOrder);

    renderTableOrder(userOrderData);
  }

}

function renderTableOrder(arr) {
  let htmlString = "";
  arr.map((item, index) => {
    const detail = item.detail;
    htmlString += `
        <tr>
          <td>${item.id}</td>
          <td>${item.date}</td>
          <td>${item.customer}</td>
          <td>${item.totalPrice}</td>
             <td>
             ${detail.map((item) => {
               return `<ul>Name: ${item.itemName}</ul>
                      <li>Quantity: ${item.quantity}</li>`;
             })}
            </td>
            <td>
            <button id="btnCondition" onclick="hanDle('${item.id}')">${
      item.condition
    }</button>
            </td>
        </tr>
        `;
  });
  document.querySelector("#listOrder").innerHTML = htmlString;
  return htmlString;
}

// function hanDle(index) {
//   let userOrder = JSON.parse(localStorage.getItem("userOrder"));
//   console.log("btn", userOrder);
//   userOrder[index].condition = "Processed";
//   localStorage.setItem("userOrder", JSON.stringify(userOrder));
//   renderTableOrder(userOrder);
// }

function hanDle(id) {
  let userOrder = localStorage.getItem("userOrder")
    ? JSON.parse(localStorage.getItem("userOrder"))
    : [];
  for(let i = 0; i < userOrder.length; i++) {
    if(userOrder[i].id == id) {
      userOrder[i].condition = "Processed";
      localStorage.setItem("userOrder", JSON.stringify(userOrder));
    }
  }
  // userOrder[index].condition = "Processed";
  layLocalOrder();
  // renderTableOrder(userOrder);
}

function layLocalCustomer() {
  const customerCr = localStorage.getItem("customerCr");
  if (customerCr) {
    const customerData = JSON.parse(customerCr);
    renderTableCustomer(customerData);
  }
}

function renderTableCustomer(arr) {
  let htmlString = "";
  arr.map((user, index) => {
    htmlString += `
    <tr>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>
        <button id="delCus" onclick="delCusTomer(${index})"><i class="fa-solid fa-user-slash"></i></button>
    </td>
    </tr>
    `;
  });
  document.querySelector("#listCustomer").innerHTML = htmlString;
  return htmlString;
}

// function togglePasswordVisibility() {
//   const passwordInput = document.getElementById("password");
//   const toggleIcon = document.getElementById("togglePassword");

//   // Toggle the input type between "password" and "text"
//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     toggleIcon.innerHTML = "👁️"; // Change to an open eye icon
//   } else {
//     passwordInput.type = "password";
//     toggleIcon.innerHTML = "👁️"; // Change to a closed eye icon
//   }
// }
function delCusTomer(index) {
  let mangCus = JSON.parse(localStorage.getItem("customerCr"));
  console.log("mangcus", mangCus);
  mangCus.splice(index, 1);

  localStorage.setItem("customerCr", JSON.stringify(mangCus));

  renderTableCustomer(mangCus);
}

//Management
function renderManagement() {
  orders.style.color = "gray";
  customer.style.color = "gray";
  products.style.color = "gray";
  management.style.color = "black";
  document.querySelector(".filter-admin").style.display = "block";
  document.querySelector(".product-item").style.display = "none";
  document.querySelector(".paging-product ").style.display = "none";
  let managements = `
        <table>
            <thead>
                <tr>
                    <th>Name Product</th>
                    <th>Quantity</th>
                    <th class="price" style="display:none">Price</th>
                </tr>
            </thead>
            <tbody class="list" id="listManagement">
            </tbody>
        </table>
    `;
  document.querySelector(".body-temp").style.display = "none";
  document.querySelector(".content .inner-wrap .product-detail").innerHTML =
    managements;
  findProductHot();
}

function renderTableManagement(prod) {
  document.querySelector(".paging-product ").style.display = "none";
  let htmlString = `
  <tr>
    <td>${prod.itemName}</td>
    <td>${prod.quantity}</td>
  </tr>
  `;
  document.querySelector("#listManagement").innerHTML += htmlString;
  return htmlString;
}

function findProductHot() {
  const userOrder = localStorage.getItem("userOrder");
  const arrQuantityProduct = {};
  if (userOrder) {
    const userOrderData = JSON.parse(userOrder);
    const dateUser = userOrderData.map((date) => date.date);
    // console.log(dateUser);
    const arrDetail = userOrderData.map((item) => item.detail);
    arrDetail.map((item) => {
      item.map((prod) => {
        if (arrQuantityProduct[prod.itemName]) {
          arrQuantityProduct[prod.itemName] += prod.quantity;
          return;
        }
        arrQuantityProduct[prod.itemName] = 0 + prod.quantity;
      });
    });
    let prodHot;
    for (const [prodName, quantity] of Object.entries(arrQuantityProduct)) {
      if (prodHot) {
        const prodHotQuantity = arrQuantityProduct[prodHot];
        if (quantity > prodHotQuantity) {
          prodHot = prodName;
        }
      } else {
        prodHot = prodName;
      }
    }
    const productHot = {
      itemName: prodHot,
      quantity: arrQuantityProduct[prodHot],
      date: dateUser,
    };
    let productsNotSold = [];
    // Kiểm tra và lấy danh sách sản phẩm không bán được
    for (const [prodName, quantity] of Object.entries(arrQuantityProduct)) {
      if (quantity < arrQuantityProduct[prodHot]) {
        productsNotSold.push({
          itemName: prodName,
          quantity: quantity,
          date: dateUser,
        });
      }
    }
    productsNotSold.sort((a, b) => b.quantity - a.quantity);
    console.log("Sản phẩm bán không chạy:", productsNotSold);
    renderTableManagement(productHot);
    for (const productNotSold of productsNotSold) {
      renderTableManagement(productNotSold);
    }
  }
}
// End Management

// logout
document.addEventListener("click", function (event) {
  var logoutButton = document.getElementById("btnLogin");
  if (event.target === logoutButton) {
    event.preventDefault();
    logoutButton.style.display = "none";
    alert("Log out successfully.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
    window.location.href = "/Project/index.html";
    document.querySelector("tbody").innerHTML = "";
    resetForm();
  }
});

function renderDetailProduct(detailProduct) {
  let htmlString = `
    <tr>
      <td>${detailProduct.itemName}</td>
      <td>${detailProduct.quantity}</td>
      <td>${detailProduct.itemPrice}</td>
    </tr>
  `;
  return htmlString;
}
document.getElementById('searchDate').addEventListener('click', function(e) {
  e.preventDefault();
  // Gọi hàm lọc ở đây
  filterProductsByDate();
});
function filterProductsByDate() {
  document.querySelector(".price").style.display = "block";
  // Lấy giá trị ngày tháng từ input
  const fromDate = document.getElementById('fromdate').value;
  const toDate = document.getElementById('todate').value;
  const fromDateObject = new Date(fromDate);
  fromDateObject.setHours(0, 0, 0, 0);
  const toDateObject = new Date(toDate);
  toDateObject.setHours(0, 0, 0, 0);
  const fromTimestamp = fromDateObject.getTime();
  const toTimestamp = toDateObject.getTime();
  console.log("fromTimestamp", fromTimestamp);
  console.log("toTimestamp", toTimestamp);
  // Duyệt qua danh sách sản phẩm
  const products = JSON.parse(localStorage.getItem("userOrder")) || [];
  // Làm mới bảng quản lý trước khi hiển thị dữ liệu mới
  document.querySelector("#listManagement").innerHTML = '';
  products.filter(function(product) {
    // Chuyển đối tượng ngày tháng của sản phẩm và đặt giờ, phút, giây, miligiây về 0
    const productDate = new Date(product.date);
    console.log("prodate",productDate)
    productDate.setHours(0, 0, 0, 0);
    // Kiểm tra nếu sản phẩm nằm trong khoảng ngày tháng được chọn
    if (productDate.getTime() >= fromTimestamp && productDate.getTime() <= toTimestamp) {
      console.log("Sản phẩm", product);
      // Duyệt qua danh sách sản phẩm trong mảng detail của sản phẩm
      if (product.detail && Array.isArray(product.detail)) {
        product.detail.forEach(function(detailProduct) {
          console.log("Sản phẩm trong detail", detailProduct);
          // Gọi hàm renderDetailProduct để nhận chuỗi HTML
          const detailProductHTML = renderDetailProduct(detailProduct);
          // Thêm chuỗi HTML vào DOM
          document.querySelector("#listManagement").innerHTML += detailProductHTML;
        });
      }
    } else {
      // Ẩn sản phẩm nếu không nằm trong khoảng ngày tháng
    }
  });
}