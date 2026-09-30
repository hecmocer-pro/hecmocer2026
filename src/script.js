const profileCard = document.querySelector("#profileCard");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const resetTilt = () => { profileCard.style.transform = ""; };
const cardStage = document.querySelector(".card-stage");
const mobileLayout = window.matchMedia("(max-width: 580px)");
const applyPointerTilt = event => {
  if (reduceMotion.matches || mobileLayout.matches || event.pointerType !== "mouse") return;
  const bounds = cardStage.getBoundingClientRect();
  const x = (event.clientX - bounds.left - bounds.width / 2) / profileCard.offsetWidth;
  const y = (event.clientY - bounds.top - bounds.height / 2) / profileCard.offsetHeight;
  if (Math.abs(x) > .5 || Math.abs(y) > .5) { resetTilt(); return; }
  const tiltX = Math.max(-.5, Math.min(.5, x));
  const tiltY = Math.max(-.5, Math.min(.5, y));
  profileCard.style.transform = `perspective(900px) rotateX(${-tiltY * 28}deg) rotateY(${tiltX * 36}deg)`;
};
cardStage.addEventListener("pointerenter", applyPointerTilt);
cardStage.addEventListener("pointermove", applyPointerTilt);
cardStage.addEventListener("pointerleave", resetTilt);
window.addEventListener("blur", resetTilt);
reduceMotion.addEventListener("change", resetTilt);
mobileLayout.addEventListener("change", resetTilt);
document.addEventListener("visibilitychange", () => { if (document.hidden) resetTilt(); });

document.addEventListener("contextmenu", event => {
  if (!window.matchMedia("(pointer: coarse)").matches) return;
  if (event.target instanceof HTMLImageElement || event.target.matches?.(".card-stage canvas")) {
    event.preventDefault();
  }
});
