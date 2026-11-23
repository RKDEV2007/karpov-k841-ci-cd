"use strict";
const button = document.getElementById("show-details");
const details = document.getElementById("details");
button.addEventListener("click", () => {
  details.hidden = !details.hidden;
  button.setAttribute("aria-expanded", String(!details.hidden));
  button.textContent = details.hidden ? "Показать навыки" : "Скрыть навыки";
});
