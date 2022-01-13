const userProfile = document.querySelector(".user");
const user = JSON.parse(localStorage.getItem("user"));

!user && window.location.assign("/client/pages/login/login.html");

userProfile.innerHTML = `<img
              src=${
                user.profile_picture === "test" || null
                  ? "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                  : user.profile_picture
              }
              alt=""
              class="userImg"
            />
            <h3 class="username">${user.email}</h3>
            `;

const handleNavToProducts = () => {
  window.location.assign("/client/pages/products/products.html");
};

const handleNavToAttendants = () => {
  window.location.assign("/client/pages/attendants/attendants.html");
};

const handleNavToSaleRecords = () => {
  window.location.assign("/client/pages/saleRecords/saleRecords.html");
};

const handleLogout = () => {
  localStorage.removeItem("user");
};

window.addEventListener("load", checkUser());
