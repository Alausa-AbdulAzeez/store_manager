const handleNavToProducts = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/products/products.html"
  );
};
const handleNavToAttendants = () => {
  window.location.assign(
    "http://127.0.0.1:5500/client/pages/attendants/attendants.html"
  );
};

productsBtn.addEventListener("click", handleNavToProducts);
