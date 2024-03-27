export default function displayNotification(title, body) {
  // send notifivation via service worker
  if ("serviceWorker" in navigator) {
    let options = {
      body,
      dir: "ltr",
      lang: "en-US",
      vibrate: [100, 50, 200],
      tag: "confirm-notification",
      renotify: true,
      actions: [
        {
          action: "confirm",
          title: "OK!",
          icon: "/src/images/icons/app-icon-96x96.png",
        },
        {
          action: "cancel",
          title: "Cancel",
          icon: "/src/images/icons/app-icon-96x96.png",
        },
      ],
    };
    navigator.serviceWorker.ready
      .then((sw) => {
        sw.showNotification(title, options);
      })
      .catch((err) => console.log("Error during SW ready :", err));
  }
}
