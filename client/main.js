// import { items } from "./data.js";

const listEle = document.getElementById("list-container");
const formEle = document.getElementById("item-form");
const placeInput = document.getElementById("place");
const locationInput = document.getElementById("location");
const planInput = document.getElementById("plan");
const imageInput = document.getElementById("image");
const dateInput = document.getElementById("date");
const linkInput = document.getElementById("link");

var items = [];
const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/items/`;

function formatDateToIST(isoString) {
  const date = new Date(isoString);

  // Convert the date to India Standard Time (IST)
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleString("en-IN", options);

  return formattedDate;
}

async function addItem(e) {
  e.preventDefault();

  const place = placeInput.value;
  const location = locationInput.value;
  const plan = planInput.value;
  const image = imageInput.value;
  const date = dateInput.value;
  const link = linkInput.value;

  if (!formEle.dataset.editIndex) {
    // If edit index is not set, add new item
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place, location, plan, image, link, date }),
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    // If edit index is set, update existing item
    const index = parseInt(formEle.dataset.editIndex);
    const id = items[index].id;

    try {
      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place, location, plan, image, link, date }),
      });
    } catch (error) {
      console.error("Error:", error.message);
    }

    formEle.removeAttribute("data-edit-index"); // Remove the edit index after updating the item
  }

  renderList(); // Re-render the list after adding a new item
  formEle.reset(); // Reset the form after adding a new item
}

function editItem(index) {
  const item = items[index];
  placeInput.value = item.place;
  locationInput.value = item.location;
  planInput.value = item.plan;
  imageInput.value = item.image;
  dateInput.value = formatDateToIST(item.date);
  linkInput.value = item.link;

  formEle.dataset.editIndex = index; // Set the edit index
}

async function deleteItem(index) {
  const id = items[index].id;
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error:", error.message);
  }

  renderList(); // Re-render the list after deleting an item
}

async function renderList() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    items = data.items;
  } catch (error) {
    console.error("Error:", error.message);
  }

  listEle.innerHTML =
    items &&
    items
      .map(
        (item) => `
    <div class="card">
      <img src=${item.image} alt=${item.place} />
      <div class="card-content">
        <div class="card-header">
          <div class="card-header-text">
            <a href={item.link} target="_blank">
              ${item.place}
            </a>
            <p>${item.location}</p>
          </div>
          <div class="card-header-actions">
            <button class="edit-button">
              <img src="./assets/edit-icon.svg" alt="edit" />
            </button>
            <button class="delete-button">
              <img src="./assets/trash-icon.svg" alt="delete" />
            </button>
          </div>
        </div>
        <p>${item.plan}</p>
        <p class="card-footer">${formatDateToIST(item.date)}</p>
      </div>
    </div>
    `
      )
      .join("");

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => deleteItem(index));
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button, index) => {
    button.addEventListener("click", () => editItem(index));
  });
}

renderList(); // Render the initial list of items
formEle.addEventListener("submit", addItem);
