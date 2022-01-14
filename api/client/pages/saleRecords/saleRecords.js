// onclick = "handleNavToAttendants()";
// get all attendants
const mainRow = document.querySelector(".mainRow");
const dashboard2Text = document.querySelector(".dashboard2Text");
const backHome = document.querySelector(".backHome");
const NavToProducts = document.querySelector(".NavToProducts");
const NavToAttendants = document.querySelector(".NavToAttendants");
const NavToSaleRecords = document.querySelector(".NavToSaleRecords");
const logOut = document.querySelector(".logOut");
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");

const user = JSON.parse(localStorage.getItem("user"));
const userProfile = document.querySelector(".user");

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

let userStats;
let xValues = [];
let yValues = [];

dashboard2Text.textContent = "Select attendant to view stats";

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

const handleViewStats = async (id) => {
  dashboard2Text.textContent = "";
  try {
    const response = await fetch(`/api/users/stats/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then(async (response) => {
      userStats = await response.json();
      userStats.map((userStat) => {
        yValues.push(userStat.total);
        xValues.push(userStat.to_char);
      });

      if (response.ok) {
        const myChart = new Chart("myChart", {
          type: "line",
          data: {},
          options: {},
        });

        new Chart("myChart", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [
              {
                lineTension: 0,
                label: "Number of sales per month",
                backgroundColor: "#b03b54",
                borderColor: "rgba(0,0,0,0.1)",
                data: yValues,
              },
            ],
          },
          options: {
            legend: {
              display: true,
            },
            scales: {
              yAxes: [{ ticks: { min: 0, max: 16 } }],
            },
          },
        });
      }
      xValues = [];
      yValues = [];
    });

    // .then(location.reload());
    // return products.filter((product) => product.product_id !== id);
  } catch (error) {
    console.log(error);
  }
};

const handleNavToAttendants = async () => {
  try {
    const response = await fetch("/api/users/", {
      method: "get",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    unsortedAttendants = await response.json();
    attendants = unsortedAttendants.sort((a, b) => b.updated_at - a.updated_at);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>email</th>
            </tr>` +
      (
        await attendants.map((attendant) => {
          const { personnel_id, email, profile_picture } = attendant;
          return `<tr>
              <td>${personnel_id}</td>
              <td>
                <div class="tableProduct">
                  <img src= ${profile_picture} alt="" class="productListImg"><span>${email}</span>
                  <button class="notAdminBtn" onclick="handleViewStats(${personnel_id})"> View stats
                      </button>
                </div>
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
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    unsortedAttendants = await response.json();
    attendants = unsortedAttendants.sort((a, b) => b.updated_at - a.updated_at);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>email</th>
            </tr>` +
      (
        await attendants.map((attendant) => {
          const { personnel_id, email, profile_picture } = attendant;
          return `<tr>
              <td>${personnel_id}</td>
              <td>
                <div class="tableProduct">
                  <img src= ${profile_picture} alt="" class="productListImg"><span>${email}</span>
                  <button class="notAdminBtn" onclick="handleViewStats(${personnel_id})"> View stats
                      </button>
                </div>
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
  window.location.assign("/client/pages/home/home.html");
};

// ADD EVENT LISTENERS
window.addEventListener("load", handleNavToAttendants);
searchIcon && searchIcon.addEventListener("click", (e) => handleChange(e));
backHome && backHome.addEventListener("click", handleNavBackHome);
NavToProducts && NavToProducts.addEventListener("click", handleNavToProducts);
NavToAttendants &&
  NavToAttendants.addEventListener("click", handleNavToAttendants);
NavToSaleRecords &&
  NavToSaleRecords.addEventListener("click", handleNavToSaleRecords);
logOut && logOut.addEventListener("click", handleLogout);
searchInput && searchInput.addEventListener("input", (e) => handleChange(e));
