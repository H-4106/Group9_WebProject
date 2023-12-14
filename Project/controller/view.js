
// let sp = new Product();
//Chi tiết sản phẩm
function renderDetail(index) {
    let detailIndex;
    let listProduct = localStorage.getItem("mangProduct") ? JSON.parse( localStorage.getItem("mangProduct")) : [];
    // listProduct = 
    for(let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == index) {
            detailIndex = listProduct[i];
            console.log(listProduct[i].id);
        }
    }
    
    console.log(detailIndex);
    let htmls = `
          <div class="inner-product">
              <div class="inner-img">
                  <img src="${detailIndex.image}" alt="">
              </div>
              <div class="inner-content">
                  <span onclick="exitDetail()" style="font-size:30px;width:30px;text-align:center;border-radius:10px">x</span>
                  <div class="backgr">
                      <div class="pro-name">${detailIndex.name}</div>
                      <div class="pro-price">$${detailIndex.price}</div>
                  </div>
                  <div class="number">
                      <label for="input">Quantity  
                      <button class="num1">-</button>
                      <input type="number" class="input" value = "1" id="quantity" >
                      <button class="num2">+</button>
                  </div>
                  <div class="but">
                    <button class="button" id="button-1" style="width:100%" onclick="addToCart(${detailIndex.id})">Add to cart</button>
                  </div>
              </div>
          </div>
          `;
      document.querySelector(".body-temp").style.display = "inline-block";
      document.querySelector(".body-temp").innerHTML = htmls;  
    document.querySelector(".num1").addEventListener("click", function () {
        decreaseQuantity();
    });
    document.querySelector(".num2").addEventListener("click", function () {
        increaseQuantity();
    });
  }
  
function viewDetail(index) {
        renderDetail(index);
        document.querySelector(".body-main").style.opacity = "0.2";  
}

function addToCart(index) {
    let listProduct = localStorage.getItem("mangProduct") ? JSON.parse(localStorage.getItem("mangProduct")) : [];
    let detailIndex;
    for(let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == index) {
            detailIndex = listProduct[i];
            console.log(listProduct[i].id);
        }
    }
    if (localStorage.getItem("accessToken")) {
        let product = detailIndex;
        var sp = new Product();
        sp.itemName = product.name;
        sp.itemPrice = product.price;
        sp.quantity = parseInt(document.getElementById("quantity").value);
        let slsp = mangCart.findIndex(item => item.itemName === sp.itemName);
        if (slsp !== -1) {
            mangCart[slsp].quantity += sp.quantity;
        } else {
            mangCart.push(sp);
        }
        renderTable(mangCart);
        luuLocalCart();
        // Đóng chế độ xem chi tiết
        exitDetail();
    } else {
        if (document.getElementById("button-1").onclick) {
          alert("You must be logged in to make a purchase.");
        }
      }
}

function increaseQuantity() {
    let quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    sp.quantity = currentQuantity + 1;
}

function decreaseQuantity() {
    let quantityInput = document.getElementById("quantity");
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
        sp.quantity = currentQuantity - 1;
    }
}
  function exitDetail() {
      document.querySelector(".body-temp").style.display = "none";
      document.querySelector(".body-main").style.opacity = "1";
  }