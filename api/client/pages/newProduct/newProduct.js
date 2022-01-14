const product_name_input = document.querySelector(".product_name");
const product_price_input = document.querySelector(".product_price");
const product_desc_input = document.querySelector(".product_desc");
const product_img_input = document.querySelector(".product_img");
const product_categories_input = document.querySelector(".product_categories");
const product_quantity_input = document.querySelector(".product_quantity");
const createBtn = document.querySelector(".createBtn");

let inputs = {};
let categories = [];

const handleChange = (e) => {
  inputs = { ...inputs, [e.target.name]: e.target.value };
  console.log(inputs);
};

const handleCat = (e) => {
  categories = e.target.value.split(",");
  console.log(categories);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = { ...inputs, product_categories: categories };

  try {
    const response = await fetch("api/products/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      if (response.ok) {
        window.location.assign("/client/pages/products/products.html");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

product_name_input &&
  product_name_input.addEventListener("change", (e) => handleChange(e));
product_price_input &&
  product_price_input.addEventListener("change", (e) => handleChange(e));
product_desc_input &&
  product_desc_input.addEventListener("change", (e) => handleChange(e));
product_img_input &&
  product_img_input.addEventListener("change", (e) => handleChange(e));
product_categories_input &&
  product_categories_input.addEventListener("change", (e) => handleCat(e));
product_quantity_input &&
  product_quantity_input.addEventListener("change", (e) => handleChange(e));
createBtn && createBtn.addEventListener("click", (e) => handleSubmit(e));
