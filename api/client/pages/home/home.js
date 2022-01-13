const user = JSON.parse(localStorage.getItem("user"));
!user && window.location.assign("/pages/login/login.html");

const userProfile = document.querySelector(".user");
const prod = document.querySelector(".products");
const attendants = document.querySelector(".attendants");

// userProfile.innerHTML = `<img
//               src=${
//                 user.profile_picture === "test" || null
//                   ? "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
//                   : user.profile_picture
//               }
//               alt=""
//               class="userImg"
//             />
//             <h3 class="username">${user.email}</h3>
//             `;

const handleNavToProducts = () => {
  window.location.assign("/pages/products/products.html");
};

const handleNavToAttendants = () => {
  window.location.assign("/pages/attendants/attendants.html");
};

const handleNavToSaleRecords = () => {
  window.location.assign("/pages/saleRecords/saleRecords.html");
};

const handleLogout = () => {
  localStorage.removeItem("user");
};

if (prod) {
  attendants.addEventListener("click", handleNavToProducts);
}
if (attendants) {
  attendants.addEventListener("click", handleNavToAttendants);
}
