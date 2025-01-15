const Convenience_FEE = 99;
let bagItemObjects;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItem();
  displayBagSumary();
}
function displayBagSumary() {
  let bagSumaryelement = document.querySelector(".bag-summary");
  let totalItem = bagItemObjects.length;
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalPayment = 0;
  bagItemObjects.forEach((bagItem) => {
    totalMrp += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  totalPayment = totalMrp - totalDiscount + Convenience_FEE;

  bagSumaryelement.innerHTML = `   <div class="bag-details-container">
 
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹${Convenience_FEE}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${totalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItem() {
  let bagItemContainer = document.querySelector(".bag-items-container");
  let innerHTML = "";
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateHtmlItem(bagItem);
  });
  bagItemContainer.innerHTML = innerHTML;
}
function removeFromBag(bagId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId !== bagId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItem();
  displayBagSumary();
  console.log(bagId);
}
function generateHtmlItem(item) {
  return ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company"> ${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">₹ ${item.current_price}</span>
                <span class="original-price">MRP ₹<span  style='text-decoration: line-through'> ${item.original_price}</span></span>
                <span class="discount-percentage" style='color: #ff905a;'>(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick='removeFromBag(${item.id})'>×</div>
          </div>`;
}
console.log("bag.js loaded");
