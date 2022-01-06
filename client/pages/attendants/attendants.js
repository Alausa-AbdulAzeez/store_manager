// onclick = "handleNavToAttendants()";
// get all attendants
const mainRow = document.querySelector(".mainRow");

const handleNavToProducts = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/products/products.html"
  );
};

const handleNavToSaleRecords = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/saleRecords/saleRecords.html"
  );
};

const handleNavToRegisterPage = () => {
  const user = JSON.parse(localStorage.getItem("user")).isadmin;
  if (user) {
    window.location.assign(
      "http://127.0.0.1:5500/client/pages/Register/register.html"
    );
  } else {
    console.log("Access denied");
  }
};

const handleMakeAdmin = (e) => {
  console.log(e);
};

const handleNavToAttendants = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users/", {
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
              <td>$ ${total_items_sold}</td>
              <td class="tableBtn">
                  ${
                    isadmin
                      ? `<div class="BtnWrapper">
                      <button class="isAdminBtn" disabled=${isadmin}> Already an admin 
                      </button> 
                      </div>`
                      : `<div class="BtnWrapper" >
                      <button class="notAdminBtn" onclick="handleMakeAdmin(event)"> Make admin
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

window.addEventListener("load", handleNavToAttendants);
