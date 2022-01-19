const editContainer = document.querySelector(".editContainer");
const productsBtn = document.querySelector(".productsBtn");
const mainRow = document.querySelector(".mainRow");
const addAction = document.querySelector(".addAction");
const product_name_input = document.querySelector(".product_name");
const product_price_input = document.querySelector(".product_price");
const product_desc_input = document.querySelector(".product_desc");
const product_img_input = document.querySelector(".product_img");
const product_categories_input = document.querySelector(".product_categories");
const product_quantity_input = document.querySelector(".product_quantity");
// const createBtn = document.querySelector(".createBtn");

let newProductHeader = document.querySelector(".newProductHeader");

let products = [];
let product;
let inputs = {};
let categories = [];
let updatedProduct = {};
let product_id;

if (newProductHeader) {
  newProductHeader.textContent = product ? "" : "Edit Product";
}

editContainer.innerHTML = product
  ? ""
  : `<form class="addProductForm">
          <div class="newProductHeader">Edit product </div>
            <div class="addProductItem">
              <label for="">Title</label>
              <input
                class="product_name"
                name="product_name"
                type="text"
                placeholder="e.g Swim wear"
              />
            </div>
            <div class="addProductItem">
              <label for="">Price</label>
              <input
                class="product_price"
                type="number"
                placeholder="e.g $30"
                name="product_price"
              />
            </div>
            <div class="addProductItem">
              <label for="">Description</label>
              <input
                class="product_desc"
                name="product_desc"
                type="text"
                placeholder="e.g Lorem ipsum, dolor sit amet"
              />
            </div>
            <div class="addProductItem">
              <label for="">Image</label>
              <input
                class="product_img"
                name="product_img"
                type="text"
                placeholder="e.g abc.png"
              />
            </div>
            <div class="addProductItem">
              <label for="">Categories</label>
              <input
                class="product_categories"
                type="text"
                placeholder="men, yellow"
                name="product_categories"
              />
            </div>

            <div class="addProductItem">
              <label for="">Quantity</label>
              <input
                class="product_quantity"
                type="number"
                placeholder="e.g 50"
                name="total_no_available"
              />
            </div>
          </form>
          <button class="createBtn">Save changes</button>`;

const handleChange = (e) => {
  inputs = { ...inputs, [e.target.name]: e.target.value };
  console.log(`inputs 1:${inputs}`);
  updatedProduct = { ...product[0], ...inputs };
  console.log(`updatedProduct 1:${updatedProduct}`);
};

const handleCat = (e) => {
  categories = e.target.value.split(",");
  updatedProduct = { ...product[0], product_categories: categories };
};
const handleSubmit = async () => {
  const body = { ...updatedProduct };

  try {
    const response = await fetch(`/api/products/update/${product_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      console.log(await response);
      if (response.ok) {
        console.log(await response.json());
        window.location.assign("/pages/products/products.html");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const handleEditProduct = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "get",
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    }).then(async (response) => {
      product = await response.json();
      product_id = product[0].product_id;
      if (newProductHeader) {
        newProductHeader.textContent = `Edit ` + product[0].product_name;
      }
      editContainer.innerHTML = product
        ? `<div class="newProductHeader">
        Edit ${product[0].product_name} </div>
          <form class="addProductForm">
            <div class="addProductItem">
              <label for="">Title</label>
              <input
                class="product_name"
                name="product_name"
                type="text"
                oninput='handleChange(event)'
                value=${product[0].product_name.split(" ")}
              />
            </div>
            <div class="addProductItem">
              <label for="">Price</label>
              <input
                class="product_price"
                type="number"
                                oninput='handleChange(event)'

                value=${product[0].product_price}
                name="product_price"
              />
            </div>
            <div class="addProductItem">
              <label for="">Description</label>
              <input
                class="product_desc"
                name="product_desc"
                type="text"
                                oninput='handleChange(event)'

                value=${product[0].product_desc.split(" ")}
              />
            </div>
            <div class="addProductItem">
              <label for="">Image</label>
              <input
                class="product_img"
                name="product_img"
                type="text"
                oninput='handleChange(event)'
                value=${product[0].product_img}
              />
            </div>
            <div class="addProductItem">
              <label for="">Categories</label>
              <input
                class="product_categories"
                type="text"
                value=${product[0].product_categories}
                oninput='handleCat(event)'
                name="product_categories"
              />
            </div>

            <div class="addProductItem">
              <label for="">Quantity</label>
              <input
                class="product_quantity"
                type="number"
                value=${product[0].total_no_available}
                oninput='handleChange(event)'
                name="total_no_available"
              />
            </div>
          </form>
          <button class="createBtn" onclick="handleSubmit()">Save changes</button>`
        : "";
    });
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async () => {
  try {
    const response = await fetch("/api/products/", {
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

// editContainer.innerHTML = product
//   ? `<div class="newProductHeader"></div>
//           <form class="addProductForm">
//             <div class="addProductItem">
//               <label for="">Title</label>
//               <input
//                 class="product_name"
//                 name="product_name"
//                 type="text"
//                 value=${product[0].product_name}
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Price</label>
//               <input
//                 class="product_price"
//                 type="number"
//                 value=${product[0].product_price}
//                 name="product_price"
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Description</label>
//               <input
//                 class="product_desc"
//                 name="product_desc"
//                 type="text"
//                 value=${product[0].product_desc}
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Image</label>
//               <input
//                 class="product_img"
//                 name="product_img"
//                 type="text"
//                 value=${product[0].product_img}
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Categories</label>
//               <input
//                 class="product_categories"
//                 type="text"
//                 value=${product[0].product_categories}
//                 name="product_categories"
//               />
//             </div>

//             <div class="addProductItem">
//               <label for="">Quantity</label>
//               <input
//                 class="product_quantity"
//                 type="number"
//                 value=${product[0].product_quantity}
//                 name="total_no_available"
//               />
//             </div>
//           </form>
//           <button class="createBtn">Save changes</button>`
//   : `<div class="newProductHeader"></div>
//           <form class="addProductForm">
//             <div class="addProductItem">
//               <label for="">Title</label>
//               <input
//                 class="product_name"
//                 name="product_name"
//                 type="text"
//                 placeholder="e.g Swim wear"
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Price</label>
//               <input
//                 class="product_price"
//                 type="number"
//                 placeholder="e.g $30"
//                 name="product_price"
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Description</label>
//               <input
//                 class="product_desc"
//                 name="product_desc"
//                 type="text"
//                 placeholder="e.g Lorem ipsum, dolor sit amet"
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Image</label>
//               <input
//                 class="product_img"
//                 name="product_img"
//                 type="text"
//                 placeholder="e.g abc.png"
//               />
//             </div>
//             <div class="addProductItem">
//               <label for="">Categories</label>
//               <input
//                 class="product_categories"
//                 type="text"
//                 placeholder="men, yellow"
//                 name="product_categories"
//               />
//             </div>

//             <div class="addProductItem">
//               <label for="">Quantity</label>
//               <input
//                 class="product_quantity"
//                 type="number"
//                 placeholder="e.g 50"
//                 name="total_no_available"
//               />
//             </div>
//           </form>
//           <button class="createBtn">Save changes</button>`;

// product_name_input &&
//   product_name_input.addEventListener("change", (e) => handleChange(e));
// product_price_input &&
//   product_price_input.addEventListener("change", (e) => handleChange(e));
// product_desc_input &&
//   product_desc_input.addEventListener("change", (e) => handleChange(e));
// product_img_input &&
//   product_img_input.addEventListener("change", (e) => handleChange(e));
// product_categories_input &&
//   product_categories_input.addEventListener("change", (e) => handleCat(e));
// product_quantity_input &&
//   product_quantity_input.addEventListener("change", (e) => handleChange(e));

window.addEventListener("load", getProducts);
