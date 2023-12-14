
const modalCart = document.getElementById('modalCart');
// modalCart.style.display = 'none';
const btnCart = document.getElementById('btnCart');
// const cartItemCount = document.getElementById('cartItemCount');
const closeModalCart = document.getElementById('closeModalCart');
const closeTitleCart = document.getElementById("titleCart");
closeModalCart.addEventListener('click', function () {
  modalCart.style.display = 'none'; // Ẩn modal login khi nhấn vào nút đóng
});

// Thêm sự kiện click cho nút login
btnCart.addEventListener('click', function (e) {
  e.preventDefault();
  modalCart.style.zIndex = "1000";
  modalCart.style.display = 'block';
});

var mangCart = [];

window.onload = async function () {
  document.addEventListener("click", function (e) {
    if (localStorage.getItem("accessToken")) {
      if (e.target.classList.contains("fa-bag-shopping")) {
        e.preventDefault();
        let sp = new Product();
        let item = e.target.closest(".item");
        if (item) {
          let itemName = item.querySelector(".name").innerText;
          let itemPrice = item.querySelector(".price").innerText.split('$')[1];
          let quantity = 1;
          sp = { itemName, itemPrice: Number(itemPrice), quantity };
          let slsp = mangCart.findIndex(
            (item) => item.itemName === sp.itemName
          );
          if (slsp !== -1) {
            mangCart[slsp].quantity += 1;
          } else {
            mangCart.push(sp);
            thongBaoThemVaoGioHang();
          }
          renderTable(mangCart);
          luuLocalCart();
        }
      }
    } else {
      if (e.target.classList.contains("fa-bag-shopping")) {
        alert("You must be logged in to make a purchase");
        modalCart.style.display = 'none';
      }
    }
  });
  // Load giỏ hàng từ local storage
  layLocalCart();
};

function luuLocalCart() {
  const userLogin = JSON.parse(localStorage.getItem('userLogin'));
  const infoUser = JSON.parse(localStorage.getItem(userLogin));
  if (!infoUser) {
    localStorage.setItem(userLogin, JSON.stringify({ cart: mangCart }));
  } else {
    infoUser.cart = mangCart;
    localStorage.setItem(userLogin, JSON.stringify(infoUser));
  }
}

function layLocalCart() {
  const userLogin = JSON.parse(localStorage.getItem('userLogin'));
  const infoUser = JSON.parse(localStorage.getItem(userLogin));
  if (infoUser && infoUser.cart) {
    mangCart = infoUser.cart;
  }
  renderTable(mangCart);
}

function clearLocalCart() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  localStorage.removeItem(userLogin);
}

function total() {
  let total = 0;
  mangCart.forEach((prod) => {
    const totalProd = prod.itemPrice * prod.quantity;
    total += totalProd;
  });
  return total;
}
function thongBaoThemVaoGioHang() {
  alert("The product has been added to cart!");
}
function renderTable(mangCart) {
  var htmlString = "";
  for (let index = 0; index < mangCart.length; index++) {
    let sp = mangCart[index];
    htmlString += `
        <tr>
        <td>${sp.itemName}</td>
        <td>${sp.itemPrice}</td>
        <td>
        <button onclick="giamQuantity(${index})" style="padding: 1px 6px; border: 1px solid #ddd">-</button>
          <input style="width: 10%;" type="number" id="typequantity" name="quantity" placeholder="Input number" value=${sp.quantity} oninput="capNhatSoLuong(${index}, this.value)">
          <button onclick="tangQuantity(${index})" style="padding: 1px 6px; border: 1px solid #ddd">+</button>
        </td>
        <td>
        <button style="background-color: #D24852; border: none; padding:2px 4px; border-radius: 5px;" onclick="delSP(${index})"><i class="fa-regular fa-trash-can"></i></button>
        </td>
        </tr>
        `;
  }
  document.querySelector(".totalPrice").innerText = `$${total()}`;
  document.querySelector(" #tblSanPham").innerHTML = htmlString;
}

let updateTimeout;

function capNhatSoLuong(index, soLuongMoi) {
  console.log("so luong moi", soLuongMoi);
  const soLuongMoiInt = parseInt(soLuongMoi, 10);
  if (isNaN(soLuongMoiInt) || soLuongMoiInt <= 0) {
    const confirmDelete = confirm(
      "Invalid Input!!! Do you want to delete?? "
    );
    if (confirmDelete) {
      delSP(index);
    } else {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(function () {
        renderTable(mangCart);
        luuLocalCart();
      }, 500);
    }
  } else {
    mangCart[index].quantity = soLuongMoiInt;
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(function () {
      renderTable(mangCart);
      luuLocalCart();
    }, 500);
  }
}

function tangQuantity(index) {
  mangCart[index].quantity++;
  renderTable(mangCart);
  luuLocalCart();
}

function giamQuantity(index) {
  if (mangCart[index].quantity > 1) {
    mangCart[index].quantity--;
  } else {
    const confirmDelete = confirm("Confirm Delete?");
    if (confirmDelete) {
      delSP(index);
    }
  }
  renderTable(mangCart);
    luuLocalCart();
}
function delSP(index) {
  mangCart.splice(index, 1); // Xóa phần tử tại vị trí index từ mảng
  renderTable(mangCart);
  luuLocalCart();
}

function OrderBy() {
  let userorders = localStorage.getItem("userOrder")
    ? JSON.parse(localStorage.getItem("userOrder"))
    : [];
  const id = "DH" + (userorders.length + 1);
  console.log(id);
  const totalPrice = total();
  const date = new Date();
  const customer = JSON.parse(localStorage.getItem("userLogin"))
  const condition = "Unprocessed";
  const detail = mangCart.map((item) => {
    return {
      itemName : item.itemName,
      quantity: item.quantity,
      itemPrice: item.itemPrice,
    };
  });
  const order = new Order({id, date, customer, totalPrice, condition, detail });
  clearLocalCart();
  // document.querySelector(".history").style.display = "none";
  luuLocalOrder(order);
  clearCart();
}

function luuLocalOrder(order) {
  const userOrder = localStorage.getItem("userOrder");
  let newUserOrder;
  if (userOrder) {
    newUserOrder = JSON.parse(userOrder);
    newUserOrder.push(order);
  } else {
    newUserOrder = [order];
  }
  localStorage.setItem("userOrder", JSON.stringify(newUserOrder));
}

function renderOrders(mangCart) {
  let htmls = "";
  for (let index = 0; index < mangCart.length; index++) {
    let sp = mangCart[index];
    htmls += `
      <tr>
        <td>${sp.detail.map((item) => {
          return `<ul>Name: ${item.itemName}</ul>
                          <li>Quantity: ${item.quantity}</li>`
        })}</td>
        <td>${sp.date}</td>
        <td>${sp.totalPrice}</td>
        <td>${sp.condition}</td>
      </tr>
        `;
  }
  console.log(document.querySelector(".cart"));
  document.querySelector(".cart #order").innerHTML = htmls;
}

function productCart() {
  let html = `
  <thead>
  <tr class="tableProduct" >
    <th>Name Product</th>
    <th>Price</th>
    <th>Quantity</th>
    <th style="padding-right:80px;"></th>
  </tr>
</thead>
<tbody id="tblSanPham">
</tbody>
  `;

  document.querySelector(".cart").innerHTML = html;
  console.log(  document.querySelector(".cart"))
  document.querySelector(".Oderhistory").style.color = "black";
  document.querySelector(".cartProduct").style.color = "#2691d9";
  document.querySelector(".none1").style.display = "block";
  document.querySelector(".none2").style.display = "block";

  renderTable(mangCart);
}

function historyOrder() {
  document.querySelector(".Oderhistory").style.color = "#2691d9";
  document.querySelector(".cartProduct").style.color = "black";
  document.querySelector(".none1").style.display = "none";
  document.querySelector(".none2").style.display = "none";
  let listOrdes = localStorage.getItem("userOrder")
    ? JSON.parse(localStorage.getItem("userOrder"))
    : [];
  let userLogins = JSON.parse(localStorage.getItem("userLogin"));
  let mang = [];
  for (let i = 0; i < listOrdes.length; i++) {
    if (userLogins === listOrdes[i].customer) {
      mang.push(listOrdes[i]);
    }
  }
  let htmls = `
    <thead>
      <tr class="titleTable">
        <th>Detail Order</th>
        <th>Date Purchase</th>
        <th>Total Price</th>
        <th>Condition</th>
      </tr>
    </thead>
    <tbody id="order">
    </tbody>
  `;

  document.querySelector(".cart").innerHTML = htmls;
  renderOrders(mang);
}

function clearCart() {
  mangCart = [];
  renderTable(mangCart)
}