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
    const response = await fetch(
      "https://zstore-manager.herokuapp.com/api/products/create",
      {
        method: "post",
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
