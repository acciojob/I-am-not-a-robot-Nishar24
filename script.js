//your code here
const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("h");
const resultMessage = document.getElementById("para");

// Array of unique images (replace with actual image URLs)
const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

// Randomly select one image to duplicate
const duplicateImage = images[Math.floor(Math.random() * images.length)];

// Create an array with 6 images (5 unique + 1 duplicate)
const imageArray = [...images, duplicateImage];

// Shuffle the images
const shuffledImages = shuffleArray(imageArray);

// Render the images
renderImages(shuffledImages);

// Track clicked images
let clickedImages = [];

// Add event listeners to images
imageContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const clickedImage = e.target;

    // Toggle selected state
    clickedImage.classList.toggle("selected");

    // Add or remove the clicked image from the array
    if (clickedImages.includes(clickedImage)) {
      clickedImages = clickedImages.filter((img) => img !== clickedImage);
    } else {
      clickedImages.push(clickedImage);
    }

    // Update buttons based on the number of clicked images
    updateButtons();
  }
});

// Reset button functionality
resetButton.addEventListener("click", () => {
  // Clear selected images
  clickedImages.forEach((img) => img.classList.remove("selected"));
  clickedImages = [];

  // Hide buttons and reset message
  resetButton.classList.add("hidden");
  verifyButton.classList.add("hidden");
  resultMessage.textContent = "";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify button functionality
verifyButton.addEventListener("click", () => {
  // Check if the two selected images are identical
  if (clickedImages[0].src === clickedImages[1].src) {
    resultMessage.textContent = "You are a human. Congratulations!";
  } else {
    resultMessage.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide the Verify button
  verifyButton.classList.add("hidden");
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to render images
function renderImages(images) {
  imageContainer.innerHTML = images
    .map(
      (img) =>
        `<img src="${img}" alt="Tile" class="tile">`
    )
    .join("");
}

// Function to update buttons based on the number of clicked images
function updateButtons() {
  if (clickedImages.length === 1) {
    resetButton.classList.remove("hidden");
    verifyButton.classList.add("hidden");
  } else if (clickedImages.length === 2) {
    verifyButton.classList.remove("hidden");
  } else {
    verifyButton.classList.add("hidden");
  }
}