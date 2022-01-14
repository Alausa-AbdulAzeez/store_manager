const mainRow = document.querySelector(".mainRow");
const user = JSON.parse(localStorage.getItem("user"));
const userProfile = document.querySelector(".user");
const backHome = document.querySelector(".backHome");
const NavToProducts = document.querySelector(".NavToProducts");
const NavToAttendants = document.querySelector(".NavToAttendants");
const NavToSaleRecords = document.querySelector(".NavToSaleRecords");
const logOut = document.querySelector(".logOut");
const searchInput = document.querySelector(".searchInput");
const NavToRegisterPage = document.querySelector(".NavToRegisterPage");
let attebdant = {};

if (userProfile) {
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
}

const handleNavToProducts = () => {
  window.location.assign("/client/pages/products/products.html");
};

const handleNavToSaleRecords = () => {
  window.location.assign("/client/pages/saleRecords/saleRecords.html");
};

const handleNavToRegisterPage = () => {
  const user = JSON.parse(localStorage.getItem("user")).isadmin;
  if (user) {
    window.location.assign("/client/pages/Register/register.html");
  } else {
    console.log("Access denied");
  }
};

const handleMakeAdmin = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "get",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then(async (response) => {
      attebdant = await response.json();
      console.log(attebdant[0]);
      const updatedAttendant = await {
        ...attebdant[0],
        isadmin: 1,
      };

      const body = { ...updatedAttendant };
      console.log(body);
      const response2 = await fetch(`/api/users/update/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        body: JSON.stringify(body),
      });
      console.log(await response2.json());
    });
    // .then(location.reload());
  } catch (error) {
    console.log(error);
  }

  // console.log(e);
};

const handleNavToAttendants = async (e) => {
  try {
    const response = await fetch("/api/users/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    unsortedAttendants = await response.json();
    attendants = unsortedAttendants.sort((a, b) => b.updated_at - a.updated_at);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>email</th>
              <th>Admin</th>
              <th>Total sales</th>
              <th>Make admin</th>
            </tr>` +
      (
        await attendants.map((attendant) => {
          const {
            personnel_id,
            email,
            profile_picture,
            isadmin,
            total_items_sold,
          } = attendant;
          return `<tr>
              <td>${personnel_id}</td>
              <td>
                <div class="tableProduct">
                  <img src= ${profile_picture} alt="" class="productListImg"><span>${email}</span>
                </div>
              </td>
              <td>${isadmin ? "Admin" : "Not Admin"}</td>
              <td> ${total_items_sold}</td>
              <td class="tableBtn">
                  ${
                    isadmin
                      ? `<div class="BtnWrapper">
                      <button class="isAdminBtn" disabled=${isadmin}> Already an admin 
                      </button> 
                      </div>`
                      : `<div class="BtnWrapper" >
                      <button class="notAdminBtn" onclick="handleMakeAdmin(${personnel_id})"> Make admin
                      </button> 
                      </div>`
                  }
              </td>
            </tr>`;
        })
      ).join("");
  } catch (error) {
    console.log(error);
  }
};
const handleChange = async (e) => {
  inputText = e.target.value;

  try {
    const response = await fetch(`/api/users?name=${inputText}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    unsortedAttendants = await response.json();
    attendants = unsortedAttendants.sort((a, b) => b.updated_at - a.updated_at);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>email</th>
              <th>Admin</th>
              <th>Total sales</th>
              <th>Make admin</th>
            </tr>` +
      (
        await attendants.map((attendant) => {
          const {
            personnel_id,
            email,
            profile_picture,
            isadmin,
            total_items_sold,
          } = attendant;
          return `<tr>
              <td>${personnel_id}</td>
              <td>
                <div class="tableProduct">
                  <img src= ${profile_picture} alt="" class="productListImg"><span>${email}</span>
                </div>
              </td>
              <td>${isadmin ? "Admin" : "Not Admin"}</td>
              <td> ${total_items_sold}</td>
              <td class="tableBtn">
                  ${
                    isadmin
                      ? `<div class="BtnWrapper">
                      <button class="isAdminBtn" disabled=${isadmin}> Already an admin 
                      </button> 
                      </div>`
                      : `<div class="BtnWrapper" >
                      <button class="notAdminBtn" onclick="handleMakeAdmin(${email})"> Make admin
                      </button> 
                      </div>`
                  }
              </td>
            </tr>`;
        })
      ).join("");
  } catch (error) {
    console.log(error);
  }
};

// LOGOUT
const handleLogout = () => {
  localStorage.removeItem("user");
  location.reload();
};

// BACK HOME
const handleNavBackHome = () => {
  window.location.assign("/index.html");
};

// ADD EVENT LISTENERS
backHome && backHome.addEventListener("click", handleNavBackHome);
NavToProducts && NavToProducts.addEventListener("click", handleNavToProducts);
NavToAttendants &&
  NavToAttendants.addEventListener("click", handleNavToAttendants);
NavToSaleRecords &&
  NavToSaleRecords.addEventListener("click", handleNavToSaleRecords);
logOut && logOut.addEventListener("click", handleLogout);
searchInput && searchInput.addEventListener("input", (e) => handleChange(e));
NavToRegisterPage &&
  NavToRegisterPage.addEventListener("click", handleNavToRegisterPage);

window.addEventListener("load", handleNavToAttendants);
