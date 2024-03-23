// method to jump to the desired element by using the element's id
export default function jumpToReleventDiv(id) {
  const releventDiv = document.getElementById(id);
  // behavior: "smooth" parameter for smooth movement
  releventDiv?.scrollIntoView({ behavior: "smooth" });
}
