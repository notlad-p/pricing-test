import anime from "./node_modules/animejs/lib/anime.es.js";

import { tableData, planData } from "./data.js";

const isMobile = window.innerWidth < 850 ? true : false;

// render check or x icon
const renderIcon = (isTrue) => {
  if (isTrue) {
    return '<img src="images/check2.svg" class="accordian-icon" alt="checkmark icon" />';
  } else {
    return '<img src="images/x.svg" class="accordian-icon" alt="x icon" />';
  }
}; 

// desktop header row with all plans
const desktopHeaderRow = `
  <div class="header-row">
    <div></div>
    <div class="column">
      <h3 class="plan-name">Basic</h3>
      <p class="plan-price">$297</p>
      <p class="plan-frequency">billed yearly</p>
      <button class="btn btn-basic">Buy Basic</button>
    </div>
    <div class="column">
      <div class="best-value-tag">
        <p>BEST VALUE</p>
      </div>
      <h3 class="plan-name">Business</h3>
      <p class="plan-price">$697</p>
      <p class="plan-frequency">billed yearly</p>
      <button class="btn btn-business">Buy Business</button>
    </div>
    <div class="column">
      <h3 class="plan-name">Pro</h3>
      <p class="plan-price">$997</p>
      <p class="plan-frequency">billed yearly</p>
      <button class="btn btn-pro">Buy Pro</button>
    </div>
  </div>
`;

const desktopFooterRow = `
  <div class="desktop-row" >
    <div></div>
    <div class="footer-column desktop-footer-column" >
      <button class="btn btn-basic">Buy Basic</button>
    </div>
    <div class="footer-column desktop-footer-column" >
      <button class="btn btn-business">Buy Business</button>
    </div>
    <div class="footer-column desktop-footer-column" >
      <button class="btn btn-pro">Buy Pro</button>
    </div>
  </div>
`;

// desktop accordian for each section
const desktopAccordian = (item) => {
  // determine if accordian items are strings
  const isString = typeof item.basic === "string";

  return `
    <div class="accordian-row">
      <div class="accordian-category">${item.subcategory}</div>
      <div class="column">
        ${isString ? item.basic : renderIcon(item.basic)}
      </div>
      <div class="column">
        ${isString ? item.business : renderIcon(item.business)}
      </div>
      <div class="column">
        ${isString ? item.pro : renderIcon(item.pro)}
      </div>
    </div>
  `;
};

// desktop rows that toggle accordians
const desktopTable = tableData
  .map(
    (item) =>
      `
    <div class="row desktop-row">
      <div class="row-category">
        <img
          src="./images/chevron-up.svg"
          class="category-icon chevron-icon"
          alt="chevron icon"
        />
        <p class="row-text row-title">${item.category}</p>
        <img
          src="./images/question-circle.svg"
          class="category-icon"
          alt="question mark icon"
        />
      </div>
      <div class="column">
        <p class="row-text">${item.basic ? "Yes" : "No"}</p>
      </div>
      <div class="column">
        <p class="row-text">${item.business ? "Yes" : "No"}</p>
      </div>
      <div class="column">
        <p class="row-text">${item.pro ? "Yes" : "No"}</p>
      </div>
      <div class="accordian">
        ${item.accordian.map(desktopAccordian).join(" ")}
      </div>
    </div>
  `
  )
  .join(" ");

// mobile accordian content
const mobileAccordian = (plan, accordian) => {
  return accordian
    .map((item) => {
      const isString = typeof item[plan] === "string";

      return `
      <div class="mobile-accordian-row">
        <div class="accordian-category">${item.subcategory}</div>
        <div class="column">
          ${isString ? item[plan] : renderIcon(item[plan])}
        </div>
      </div>
    `;
    })
    .join(" ");
};

// mobile category rows that toggle accordians
const mobileRows = (plan) => {
  return tableData
    .map(
      (item) =>
        `
    <div class="row mobile-row">
      <div class="row-category">
        <img
          src="./images/chevron-up.svg"
          class="category-icon chevron-icon"
          alt="chevron icon"
        />
        <p class="row-text row-title">${item.category}</p>
        <img
          src="./images/question-circle.svg"
          class="category-icon"
          alt="question mark icon"
        />
      </div>
      <div class="column">
        <p class="row-text">${item[plan] ? "Yes" : "No"}</p>
      </div>
      <div class="mobile-accordian">
        ${mobileAccordian(plan, item.accordian)}
      </div>
    </div>
    `
    )
    .join(" ");
};

// mobile tables separated based on plan
const mobileTable = planData
  .map((category) => {
    return `
    <div class="table-container">
      <div class="mobile-header-row">
        <div class="column">
          ${
            category.plan === "business"
              ? `
              <div class="best-value-tag">
                <p>BEST VALUE</p>
              </div>
            `
              : ""
          }
          <h3 class="plan-name">${category.plan}</h3>
          <p class="plan-price">$${category.price}</p>
          <p class="plan-frequency">billed yearly</p>
          <button class="btn btn-${category.plan}">Buy ${category.plan}</button>
        </div>
      </div>
      ${mobileRows(category.plan)}
      <div class='footer-column'>
        <button class="btn btn-${category.plan}">Buy ${category.plan}</button>
      </div>
    </div>
  `;
  })
  .join(" ");

const fullDesktopTable = `
  <div class="desktop-container" style="display: ${
    isMobile ? "none" : "block"
  }">
    ${desktopHeaderRow + desktopTable + desktopFooterRow}
  </div>
`;

const fullMobileTable = `
  <div class="mobile-container" style="display: ${isMobile ? "block" : "none"}">
    ${mobileTable}
  </div>
`;

// inject into body
const body = document.querySelector("body");
body.innerHTML = fullMobileTable + fullDesktopTable;

// Resize listener for testing mobile responsiveness
const mTable = document.querySelector(".mobile-container");
const dTable = document.querySelector(".desktop-container");

window.onresize = () => {
  if (window.innerWidth < 850) {
    mTable.style.display = "block";
    dTable.style.display = "none";
  } else {
    mTable.style.display = "none";
    dTable.style.display = "block";
  }
};

// onClick listener for rows to toggle accordian
const rows = document.querySelectorAll(".row");

rows.forEach((row) => {
  row.addEventListener("click", (e) => {
    row.classList.toggle("active");

    const isActive = row.classList.contains("active");

    anime({
      targets: row.lastElementChild,
      height: isActive ? row.lastElementChild.scrollHeight : 0,
      easing: "easeInQuad",
      duration: 300,
    });
  });
});
