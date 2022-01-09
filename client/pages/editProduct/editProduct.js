const productsBtn = document.querySelector(".productsBtn");
const mainRow = document.querySelector(".mainRow");
const addAction = document.querySelector(".addAction");
let newProductHeader = document.querySelector(".newProductHeader");

let products = [];
let product;
let inputs = {};
let categories = [];
let updatedProduct;
let product_id;

newProductHeader.textContent = product ? "" : "Edit Product";

const handleChange = (e) => {
  inputs = { ...inputs, [e.target.name]: e.target.value };
  updatedProduct = { ...product[0], ...inputs };
};

const handleCat = (e) => {
  categories = e.target.value.split(",");
  updatedProduct = { ...product[0], product_categories: categories };
};

const handleEditProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "get",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then(async (response) => {
      product = await response.json();
      product_id = product[0].product_id;
      newProductHeader.textContent = `Edit ` + product[0].product_name;
    });
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = { ...updatedProduct };

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/update/${product_id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        body: JSON.stringify(body),
      }
    ).then(async (response) => {
      if (response.ok) {
        window.location.assign(
          "http://127.0.0.1:5500/client/pages/products/products.html"
        );
      }
    });
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
                <div class="editAction" onclick="handleEditProduct(${product_id})" >Edit</div>
              </td>
            </tr>`;
        })
      ).join("");
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getProducts);
