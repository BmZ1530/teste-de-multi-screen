(function () {
  const split = document.getElementById("split");
  const divider = document.getElementById("divider");
  const paneA = document.getElementById("paneA");
  const vertical = () => matchMedia("(max-width: 640px)").matches;
  let sizeA = 50, dragging = false;

  const apply = () => { paneA.style.flex = "0 0 " + sizeA + "%"; };

  function pos(e) {
    const r = split.getBoundingClientRect(), d = 10, v = vertical();
    const total = (v ? r.height : r.width) - d;
    const p = (v ? e.clientY - r.top : e.clientX - r.left) - d / 2;
    return Math.min(100, Math.max(0, (p / total) * 100));
  }

  divider.addEventListener("pointerdown", (e) => {
    dragging = true;
    divider.setPointerCapture(e.pointerId);
    divider.classList.add("dragging");
    split.classList.add("dragging");
    e.preventDefault();
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    let p = pos(e);
    if (p < 3) p = 0;
    if (p > 97) p = 100;
    sizeA = p; apply();
  });
  window.addEventListener("pointerup", () => {
    dragging = false;
    divider.classList.remove("dragging");
    split.classList.remove("dragging");
  });
  divider.addEventListener("dblclick", () => { sizeA = 50; apply(); });
  divider.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 10 : 2;
    const back = vertical() ? "ArrowUp" : "ArrowLeft";
    const fwd = vertical() ? "ArrowDown" : "ArrowRight";
    if (e.key === back) sizeA = Math.max(0, sizeA - step);
    else if (e.key === fwd) sizeA = Math.min(100, sizeA + step);
    else return;
    e.preventDefault(); apply();
  });
  apply();
})();
