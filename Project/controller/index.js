import { dataProduct } from "../assets/data/data.js";
let start = 0;
let perPage = 6;
let currentPage = 1;
let end = perPage;
let totalPage = Math.ceil(dataProduct.length / perPage);

function renderListPage() {
  let htmls = "";
  htmls += `
  <li>
  <a href="#" class="active">${1}</a>
  </li>
`;
  for (let i = 2; i <= totalPage; i++) {
    htmls += `
      <li>
      <a href="#">${i}</a>
      </li>
    `;
  }
  document.getElementById("number-page").innerHTML = htmls;
}
export function changePage(arr) {
  const changePages = document.querySelectorAll(".number-page li a");
  if(changePages.length <= 1) {
    document.querySelector(".see-more").style.display = "none";
  } else {
    document.querySelector(".see-more").style.display = "block";
    for (let i = 0; i < changePages.length; i++) {
      changePages[i].addEventListener("click", (event) => {
        event.preventDefault();
        for (let index = 0; index < changePages.length; index++) {
          if (index !== i) {
            changePages[index].classList.remove("active");
          } else {
            changePages[index].classList.add("active"); // Thêm lớp "active" vào trang hiện tại
          }
        }
        let value = i + 1;
        currentPage = value;
        // Tính toán start và end dựa trên currentPage
        start = (currentPage - 1) * perPage;
        end = start + perPage;
        renderTable(arr);
      });
    }
  }
}
export function renderTable(arr) {
  var htmlString = "";
  for (var index = 0; index < arr.length; index++) {
    var dg = arr[index];
    if (index >= start && index < end) {
      htmlString += `
      <div class="item">
      <i class="fa-solid fa-bag-shopping"></i>
        <div class="img">
            <img src="${dg.image}" alt="">
        </div>
        <div class="text">
            <div class="name-price">
                <p class="name">${dg.name}</p>
                <p class="price">$${dg.price}</p>
            </div>
            <div class="start-colors">
                <div class="start">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <button style="cursor: pointer;" onclick="viewDetail('${dg.id}')" class="view-detail">View detail</button>
            </div>
        </div>
      </div>
        `;
    }
  }
  
  // return htmlString;
  document.querySelector(
    ".content .inner-wrap .product-search .product"
  ).innerHTML = htmlString;
}

function luuDanhSach() {
  if (localStorage.getItem('mangProduct')) {
    return;
  }
  var stringMangProd = JSON.stringify(dataProduct);
  localStorage.setItem("mangProduct", stringMangProd);
}
luuDanhSach();
export function layDanhSach() {
  let mangProduct;
  if (localStorage.getItem('mangProduct')) {
    var stringMangProduct = localStorage.getItem("mangProduct");
    mangProduct = JSON.parse(stringMangProduct);
    console.log(mangProduct);
  }
  totalPage = Math.ceil(mangProduct.length / perPage);
  renderListPage();
  changePage(mangProduct);
  renderTable(mangProduct);
  return mangProduct;
}
const mangProduct = layDanhSach();
// layDanhSach();
const home = document.querySelector(".home");
home.addEventListener("load", (e) => {
  e.preventDefault();
  renderTable(dataProduct)
});
const logo = document.querySelector(".inner-wrap .logo");
logo.addEventListener("click", (e) => {
  e.preventDefault();
  renderTable(dataProduct)
});


//showProductByCategory
// Assuming you have category links with the classes 'home', 'nike', 'adidas', 'vans', and 'converse'
const categoryLinks = document.querySelectorAll('.home, .nike, .adidas, .vans, .converse');

// Add click event listeners to the category links
categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => filterByClass(e.target.classList[0], e.target));
});

let categoryFilter = mangProduct;

function filterByClass(className,clickedElement) {
  // Remove 'active' class from all category links
  categoryLinks.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked category link
  clickedElement.classList.add('active');

  categoryFilter = mangProduct.filter(item =>{
    document.getElementById("itemName").value = '';
    document.getElementById('filter_option').style.display = 'none';
    document.querySelector('.filter').reset();
    if(clickedElement != '' || className != 'home')
    return item.category.toLowerCase().includes(className);
  });
  showProduct(categoryFilter);
  console.log(categoryFilter);
}

function showProduct(productList){
  document.querySelectorAll(".item").innerHTML = "";
  start = 0;
  currentPage = 1;
  end = perPage;
  totalPage = Math.ceil(productList.length / perPage);
  renderTable(productList);
  renderListPage();
  changePage(productList);
}

document.getElementById("itemName").addEventListener("input", function () {
    // searchProduct();
    if(document.getElementById("itemName").value == "") {
      document.getElementById('filter_option').style.display = 'none';
      searchProduct();
    }
  });
  document
    .getElementById("itemName")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchProduct();
        if(document.getElementById("itemName").value == "") {
          document.getElementById('filter_option').style.display = 'none';
        } else {
          document.getElementById('filter_option').style.display = 'flex';
          categoryLinks.forEach(link => link.classList.remove('active'));
          document.querySelector(".home").classList.add("active");
        }
      }
    });

function searchProduct() {
  let listProduct = mangProduct;
  let valueSearchInput = document.getElementById("itemName").value;
  let userSearch = listProduct.filter((value) => {
    // Chuyển đổi cả value.id và value.name thành chuỗi trước khi so sánh
    let stringValueName = value.name.toString();

    return (
      stringValueName.toUpperCase().includes(valueSearchInput.toUpperCase())
    );
  });

  if(userSearch.length == 0) {
    document.querySelector(".footer").classList.add("temp");
  } else {
    document.querySelector(".footer").classList.remove("temp");
  }
  
  showProduct(userSearch);
  if(window.innerWidth > 800 ) {
    if( valueSearchInput !== ''){
      document.getElementById('filter_option').style.display = 'flex';
  
    } else {
      document.getElementById('filter_option').style.display = 'none';
    }
  }
  
  document.querySelector('.filter').reset();
  //filter

  let filter = document.querySelector('.filter');

  let productFilter = userSearch;
  // showProduct(productFilter);

  filter.addEventListener('submit', function (event) {
    event.preventDefault();
    
    let valueFilter = event.target.elements;
  //lay gia tri gender
    let selectedGenders = Array.from(valueFilter.gender)
                            .filter(checkbox => checkbox.checked)
                            .map(checkbox => checkbox.value);
    console.log(selectedGenders);
    productFilter = userSearch.filter(item => {
      //filter theo gender
      if(selectedGenders.length > 0) {
        if(!selectedGenders.includes(item.gender)) {
          return false;
        }
      }
      //filter theo gia
      if(valueFilter.minPrice.value != ''){
        if(item.price < valueFilter.minPrice.value){
            return false;
        }
    }
    if(valueFilter.maxPrice.value != ''){
        if(item.price > valueFilter.maxPrice.value){
            return false;
        }
    }
      return true; 
    })
    showProduct(productFilter);

  });
}