let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  return false;
});

export function installAppOnDesktop() {
  console.log("deferredPrompt", deferredPrompt);
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((chice) => {
      if (chice.outcome == "dismissed") {
        console.log("User Cancel :/");
      } else {
        console.log("User added out icon :)");
      }
    });
    deferredPrompt = undefined;
  }
}
