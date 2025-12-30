const buttons = [...document.querySelectorAll("#filters [data-filter]")];
const cards = [...document.querySelectorAll("#projects [data-category]")];

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    buttons.forEach(b => b.ariaPressed = b === btn);

    cards.forEach(card => {
      card.classList.toggle(
        "hidden",
        filter !== "all" && card.dataset.category !== filter
      );
    });
  });
});
