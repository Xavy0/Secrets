const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");
const angryText = document.getElementById("angry-text");

const foodPopup = document.getElementById("food-popup");
const drinkPopup = document.getElementById("drink-popup");
const overlay = document.getElementById("overlay");

const foodChoiceText = document.getElementById("chosen-food");
const drinkChoiceText = document.getElementById("chosen-drink");

const pizzaButton = document.getElementById("pizza-btn");
const sushiButton = document.getElementById("sushi-btn");
const burgerButton = document.getElementById("burger-btn");
const saladButton = document.getElementById("salad-btn");

const coffeeButton = document.getElementById("coffee-btn");
const juiceButton = document.getElementById("juice-btn");
const teaButton = document.getElementById("tea-btn");
const sodaButton = document.getElementById("soda-btn");

const summary = document.getElementById("summary");
const summaryFood = document.getElementById("food-choice");
const summaryDrink = document.getElementById("drink-choice");

// CONFETTI LIBRARY
// https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js

// "Yes" button click: show popup then food choice
yesButton.addEventListener("click", () => {
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "block";
        foodPopup.classList.remove("hidden");
        foodPopup.style.display = "block";
    }, 1500);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
});

// "No" button mouseover: move and show angry emoji
noButton.addEventListener("mouseover", () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const randomX = Math.random() * (vw - noButton.offsetWidth);
    const randomY = Math.random() * (vh - noButton.offsetHeight);

    noButton.style.position = "absolute";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    angryText.style.display = "block";
    setTimeout(() => {
        angryText.style.display = "none";
    }, 1000);
});

// FOOD choice event listeners
[pizzaButton, sushiButton, burgerButton, saladButton].forEach(button => {
    button.addEventListener("click", () => chooseFood(button));
});

function chooseFood(button) {
    const food = button.textContent.trim();

    foodChoiceText.textContent = `You chose: ${food}!`;

    // Disable and mark selected
    [pizzaButton, sushiButton, burgerButton, saladButton].forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("selected");
    });
    button.classList.add("selected");

    // Hide food popup, show drink popup
    foodPopup.style.display = "none";
    drinkPopup.classList.remove("hidden");
    drinkPopup.style.display = "block";
}

// DRINK choice event listeners
[coffeeButton, juiceButton, teaButton, sodaButton].forEach(button => {
    button.addEventListener("click", () => chooseDrink(button));
});

function chooseDrink(button) {
    const drink = button.textContent.trim();

    drinkChoiceText.textContent = `You chose: ${drink}!`;

    // Disable and mark selected
    [coffeeButton, juiceButton, teaButton, sodaButton].forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("selected");
    });
    button.classList.add("selected");

    // Hide drink popup and overlay
    drinkPopup.style.display = "none";
    overlay.style.display = "none";

    // Show summary
    showSummary();
}

// Show summary and print after delay
function showSummary() {
    summaryFood.textContent = foodChoiceText.textContent;
    summaryDrink.textContent = drinkChoiceText.textContent;
    summary.classList.remove("hidden");

    // Confetti celebration!
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
    });

    // Scroll to summary smoothly
    summary.scrollIntoView({ behavior: "smooth" });

    // Wait 2 seconds then print automatically
    setTimeout(() => {
        window.print();
    }, 2000);
}
