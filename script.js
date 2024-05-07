var items = [
  {
    place: "Taj Mahal",
    location: "Agra, India",
    plan: "I'm looking forward to leisurely walking through the lush gardens surrounding the Taj. I'll keep my camera ready for every picturesque corner.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg",
    date: "26 May 2024",
    link: "https://www.indiatajmahaltour.com/holiday-packages/taj-mahal-tours-from-bangalore.htm",
  },
  {
    place: "Eiffel Tower",
    location: "Paris, France",
    plan: "Climbing up the Eiffel Tower is a must-do for me. Whether by elevator or stairs, reaching the top for panoramic views of Paris is going to be unforgettable.",
    image:
      "https://media.cntraveler.com/photos/58de89946c3567139f9b6cca/16:9/w_1920,c_limit/GettyImages-468366251.jpg",
    date: "09 September 2028",
    link: "https://traveltriangle.com/tour-packages/eiffel-tower",
  },
  {
    place: "Great Wall Of China",
    location: "Huairou District, China",
    plan: "I'm beyond excited to finally see the Great Wall of China in person! I'll make sure to take it all in, marveling at its sheer size and historical significance.",
    image:
      "https://th-thumbnailer.cdn-si-edu.com/tTWLQXzOH6vwsp7kSFf6Td7ZpZc=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/80/fa/80facab4-fe0e-4a56-bd99-a71eb1845fa0/01_14_2014_great_wall.jpg",
    date: "14 January 2032",
    link: "https://www.sotc.in/tourism/china-tourism/things-to-do-in-china/great-wall-of-china/2239",
  },
];

const listEle = document.getElementById("list-container");
const formEle = document.getElementById("item-form");
const placeInput = document.getElementById("place");
const locationInput = document.getElementById("location");
const planInput = document.getElementById("plan");
const imageInput = document.getElementById("image");
const dateInput = document.getElementById("date");
const linkInput = document.getElementById("link");

function addItem(e) {
  e.preventDefault();

  if (!formEle.dataset.editIndex) {
    // If edit index is not set, add new item
    const place = placeInput.value;
    const location = locationInput.value;
    const plan = planInput.value;
    const image = imageInput.value;
    const date = dateInput.value;
    const link = linkInput.value;

    items.push({
      place: place,
      location: location,
      plan: plan,
      image: image,
      date: date,
      link: link,
    }); // use .unshift() method to add item to the beginning of the list
  } else {
    // If edit index is set, update existing item
    const index = parseInt(formEle.dataset.editIndex);
    items[index] = {
      place: placeInput.value,
      location: locationInput.value,
      plan: planInput.value,
      image: imageInput.value,
      date: dateInput.value,
      link: linkInput.value,
    };

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
  dateInput.value = item.date;
  linkInput.value = item.link;

  formEle.dataset.editIndex = index; // Set the edit index
}

function deleteItem(index) {
  items.splice(index, 1);
  renderList(); // Re-render the list after deleting an item
}

function renderList() {
  listEle.innerHTML = items
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
              <img src="/assets/edit-icon.svg" alt="edit" />
            </button>
            <button class="delete-button">
              <img src="/assets/trash-icon.svg" alt="delete" />
            </button>
          </div>
        </div>
        <p>${item.plan}</p>
        <p class="card-footer">${item.date}</p>
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
