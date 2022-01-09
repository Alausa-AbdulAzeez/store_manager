const userProfile = document.querySelector(".user");
const user = JSON.parse(localStorage.getItem("user"));

const checkUser = () => {
  !user &&
    window.location.assign(
      "http://127.0.0.1:5500/client/pages/login/login.html"
    );
};

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
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/attendants/attendants.html"
  );
};

const handleNavToSaleRecords = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/saleRecords/saleRecords.html"
  );
};

const handleLogout = () => {
  localStorage.removeItem("user");
};

window.addEventListener("load", checkUser);
