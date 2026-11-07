
"use strict";

const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const total = document.getElementById("total");
const itemName = document.getElementById("itemName");

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2
  }).format(amount);

function calculateTotal() {
  const qty = Math.max(0, Number(quantity.value) || 0);
  const unitPrice = Math.max(0, Number(price.value) || 0);

  total.textContent = formatNaira(qty * unitPrice);
}

[quantity, price].forEach((field) => {
  field.addEventListener("input", calculateTotal);
});

// Component tray selection
const tools = document.querySelectorAll(".tool");

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    tools.forEach((item) => item.classList.remove("active"));
    tool.classList.add("active");

    const selected = tool.dataset.tool;

    if (selected === "type") {
      itemName.focus();
    }

    if (selected === "calculate") {
      calculateTotal();
    }

    if (selected === "inventory") {
      itemName.focus();
      itemName.placeholder = "Enter an inventory item";
    }

    if (selected === "speak") {
      startVoiceInput();
    }
  });
});

// Optional browser voice input.
// Unsupported browsers simply continue without voice.
function startVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    itemName.placeholder = "Voice input unavailable — type instead";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-NG";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    itemName.value = transcript;
  };

  recognition.onerror = () => {
    itemName.placeholder = "Try again or type your item";
  };

  recognition.start();
}
