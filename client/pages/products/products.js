const productsBtn = document.querySelector(".productsBtn");
const mainRow = document.querySelector(".mainRow");
const addAction = document.querySelector(".addAction");
const createNew = document.querySelector(".createNew");

let products = [];
const userId = JSON.parse(localStorage.getItem("user")).personnel_id;

const handleNavToProducts = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/products/products.html"
  );
};

const handleEditProduct = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/editProduct/editProduct.html"
  );
};

const backHome = () => {
  window.location.assign("http://127.0.0.1:5500/client/pages/home/home.html");
};

const handleNavToAttendants = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/attendants/attendants.html"
  );
};

const handleItemsSold = async (id, personnelId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/items_sold/${personnelId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    ).then(async (response) => {
      console.log(response);
      if (response.ok) {
        const response2 = await fetch(
          `http://localhost:5000/api/users/items_sold/${personnelId}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        ).then(async (response2) => {
          console.log(response2);
          if (response2.ok) {
            const response3 = await fetch(
              `http://localhost:5000/api/products/updateamount/${id}`,
              {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  token:
                    "Bearer " +
                    JSON.parse(localStorage.getItem("user")).accessToken,
                },
              }
            ).then(async (response3) => {
              if (response3.ok) {
                window.location.assign(
                  "http://127.0.0.1:5500/client/pages/products/products.html"
                );
              }
            });
            // console.log(response3);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const handleCreateNewProduct = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/newProduct/newProduct.html"
  );
};

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/products/delete/${id}`, {
      method: "delete",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then(location.reload());
    // return products.filter((product) => product.product_id !== id);
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products/", {
      method: "get",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    unsortedProducts = await response.json();
    products = unsortedProducts.sort((a, b) => b.updated_at - a.updated_at);

    console.log(products);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>` +
      (
        await products.map((product) => {
          const {
            product_id,
            product_name,
            product_price,
            product_img,
            total_no_available,
          } = product;
          return `<tr>
              <td>${product_id}</td>
              <td>
                <div class="tableProduct">
                  <img src=${product_img} alt="" class="productListImg"><span>${product_name}</span>
                </div>
              </td>
              <td>${total_no_available}</td>
              <td>$ ${product_price}</td>
              <td class="tableBtn">
                <div class="addAction" onclick="handleItemsSold(${product_id}, ${userId})" >Add</div>
                <div class="removeAction" onclick="handleDelete(${product_id})">Del</div>
              </td>
            </tr>`;
        })
      ).join("");
  } catch (error) {
    console.log(error);
  }
};
const getFilteredProducts = async (e) => {
  const name_query = e.target.value;
  try {
    const response = await fetch(
      `http://localhost:5000/api/products?name='${name_query}'`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    unsortedProducts = await response.json();
    products = unsortedProducts.sort((a, b) => b.updated_at - a.updated_at);

    console.log(products);

    mainRow.innerHTML =
      `<tr class="mainContentHeader">
              <th class="idColumn">Id</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>` +
      (
        await products.map((product) => {
          const {
            product_id,
            product_name,
            product_price,
            product_img,
            total_no_available,
          } = product;
          return `<tr>
              <td>${product_id}</td>
              <td>
                <div class="tableProduct">
                  <img src=${product_img} alt="" class="productListImg"><span>${product_name}</span>
                </div>
              </td>
              <td>${total_no_available}</td>
              <td>$ ${product_price}</td>
              <td class="tableBtn">
                <div class="addAction" onclick="handleItemsSold(${product_id}, ${userId})" >Add</div>
                <div class="removeAction" onclick="handleDelete(${product_id})">Del</div>
              </td>
            </tr>`;
        })
      ).join("");
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getProducts);
createNew.addEventListener("click", handleCreateNewProduct);
