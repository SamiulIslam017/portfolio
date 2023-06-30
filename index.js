// For sticky navbar
let nav = document.querySelector("#nav");
// let nav2 = document.querySelector("#nav_two");
window.addEventListener("scroll", function () {
  nav.classList.toggle("fixed-nav", window.scrollY > 200);

  // nav2.classList.toggle("fixed-nav", window.scrollY > 100);
});

// active desktop menu
let menuItem = document.querySelector(".item-menu").children;
const Sections = document.querySelectorAll("section");

for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener("click", function () {
    for (let j = 0; j < menuItem.length; j++) {
      menuItem[j].classList.remove("current-menu");
    }
    this.classList.add("current-menu");
  });
}
// active mobile menu
let menuItem2 = document.querySelector(".item-menu2").children;
for (let i = 0; i < menuItem2.length; i++) {
  menuItem2[i].addEventListener("click", function () {
    for (let j = 0; j < menuItem2.length; j++) {
      menuItem2[j].classList.remove("current-menu");
    }
    this.classList.add("current-menu");
  });
}

// hamburger-menu

const hambu = document.getElementById("hamdu");
const close = document.getElementById("close");
const mobileMenu = document.getElementById("m-menu");

hambu.addEventListener("click", function () {
  close.classList.remove("d-none");
  hambu.classList.add("d-none");
  mobileMenu.style.position = "absolute";
  mobileMenu.style.right = "0%";
  mobileMenu.style.transition = "all .5s";
});
close.addEventListener("click", function () {
  close.classList.add("d-none");
  hambu.classList.remove("d-none");
  mobileMenu.style.position = "absolute";
  mobileMenu.style.right = "-100%";
  mobileMenu.style.transition = "all .5s";
});

// filter portfolio
let sortBtn = document.querySelector(".filter-menu").children;
let sortItem = document.querySelector(".filter-item").children;

for (let i = 0; i < sortBtn.length; i++) {
  sortBtn[i].addEventListener("click", function () {
    for (let j = 0; j < sortBtn.length; j++) {
      sortBtn[j].classList.remove("current");
    }

    this.classList.add("current");

    let targetData = this.getAttribute("data-target");

    for (let k = 0; k < sortItem.length; k++) {
      sortItem[k].classList.remove("active");
      sortItem[k].classList.add("delete");

      if (
        sortItem[k].getAttribute("data-item") == targetData ||
        targetData == "all"
      ) {
        sortItem[k].classList.remove("delete");
        sortItem[k].classList.add("active");
      }
    }
  });
}

// something special for modal

loadData = () => {
  fetch("https://portfolio-server-brown.vercel.app/portfolio")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      // handleModal(data);
    });
};
function loadSingleData(id) {
  const url = `https://portfolio-server-brown.vercel.app/portfolio/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      singlePortfolio(data);
      // handleModal(data);
    });
}
function setData(item) {
  const ul = document.querySelector(".filter-item");
  item.forEach((element) => {
    const li = document.createElement("li");
    li.setAttribute("data-item", `${element.filters}`);
    li.innerHTML = `
        <div class="text-center">
        <img class='rounded' src=${element.picture} >
        <span  onclick='loadSingleData("${element.index}")' type="button" class="modal-btn d-none d-lg-block d-xl-block" data-bs-toggle="modal" data-bs-target="#portfolio">
            <i  class="fa-solid fa-circle-info" title="Live Preview And More"></i>
        </span>
        <span class=" d-lg-none d-xl-none btn btn-primary bg-white text-black border-0 mx-auto" onclick='loadSingleData("${element.index}")' type="button" data-bs-toggle="modal" data-bs-target="#portfolio">Details</span>
        </div>
        `;
    ul.appendChild(li);
  });
}
const singlePortfolio = (data) => {
  console.log(data);
  const modal = document.getElementById("modalId");
  modal.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.classList.add("g-0");
  div.innerHTML = `
                            <div class="col-md-6">
                                <img src=${
                                  data.picture
                                } class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title h2 fw-bold mb-2">${
                                      data.name
                                    }</h5>
                                    <p class="card-text">${data.about}</p>
                                    <p class='h4 fw-bold'>Technology use:</p>
                                    <ul style="list-style:none;">
                                        <li>${
                                          data.feature[0] ? data.feature[0] : ""
                                        }</li>
                                        <li>${
                                          data.feature[1] ? data.feature[1] : ""
                                        }</li>
                                        <li>${
                                          data.feature[2] ? data.feature[2] : ""
                                        }</li>
                                        <li>${
                                          data.feature[3] ? data.feature[3] : ""
                                        }</li>
                                        <li>${
                                          data.feature[4] ? data.feature[4] : ""
                                        }</li>
                                        <li>${
                                          data.feature[5] ? data.feature[5] : ""
                                        }</li>
                                        <li>${
                                          data.feature[6] ? data.feature[6] : ""
                                        }</li>
                                        <li>${
                                          data.feature[7] ? data.feature[7] : ""
                                        }</li>
                                        <li>${
                                          data.feature[8] ? data.feature[8] : ""
                                        }</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center flex-wrap gap-4 mt-3">
                              <a class="live_link" target="_blank" href=${
                                data.link
                              }>Live site link <i class="fa-solid fa-link"></i></a>
                              <a class="git_link" target="_blank" href=${
                                data.git_link
                              }>Github link <i class="fa-solid fa-link"></i></a>
                              ${
                                data.git_link_server
                                  ? `<a class="git_link" target="_blank" href=${data.git_link_server}>Github server link <i class="fa-solid fa-link"></i></a>`
                                  : ""
                              }
                            </div>
  `;
  modal.appendChild(div);
};
loadData();

// fade in animation
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("fadeIn");
    } else {
      reveals[i].classList.remove("fadeIn");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on the page load
reveal();
