console.log(99876);

let bagItems;
onload();
function onload() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];

  displayItemOnHomePage();
  displayBagIcon();
}

function AddToBag(item) {
  bagItems.push(item);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}
function displayBagIcon() {
  let bagIcon = document.querySelector(".bag_item_count");
  if (bagItems.length > 0) {
    bagIcon.style.visibility = "visible";
    bagIcon.innerHTML = bagItems.length;
  } else {
    bagIcon.style.visibility = "hidden";
  }
}

function displayItemOnHomePage() {
  let itemsContener = document.querySelector(".items_contener");
  if (!itemsContener) {
    return;
  }
  let innerHtml = ``;

  items.forEach((item) => {
    innerHtml += ` <div class="item_contener">  
      <div class="item_contener">
          <img class="item_image" src="${item.image}" alt="">
          <div class="rating">${item.rating.stars}⭐ |${item.rating.count}</div>
          <div class="company_name">${item.company}</div>
          <div class="item_name">${item.item_name}</div>
          <div class="price">
              <span class="current_pirce">Rs ${item.current_price}</span>
              <span class="original_price">Rs ${item.original_price}</span>
              <span class="discount">(${item.discount_percentage}% Off)</span>
          </div>
            <div><button class="btn_add_Bag" onclick='AddToBag(${item.id})'>Add to Bag</button></div>
      </div>
  </div>`;
  });
  itemsContener.innerHTML = innerHtml;
}
console.log("index.js loaded");
