import displayNotification from "./displayNotification";
import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

// Ask user permission for push notifications.
export default function askNotificationsPermission() {
  Notification.requestPermission()
    .then((result) => {
      if (result !== "granted") {
        console.log("User Block Notifications");
      } else {
        configurePushSubscription();
      }
    })
    .catch((err) => {
      console.log("Test109 Error in requestPermission for notification :", err);
    });
}
export function configurePushSubscription() {
  if (!("serviceWorker" in navigator)) return;

  
  let sw;
  navigator.serviceWorker.ready
    .then((_sw) => {
      sw = _sw;
      return _sw.pushManager.getSubscription();
    })
    .then((subscription) => {
      // check if subscription is not found create new one.
      if (subscription === null) {
        let publicKey = process.env.REACT_APP_WEB_PUSH_Public_Key;
        let convertedPublicKey = urlBase64ToUint8Array(publicKey);
        // create a subscription
        return sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedPublicKey,
        });
      } else {
        console.log("Test109 in configurePushSubscription::user has a subscription");
      }
    })
    .then((newSubscription) => {
      console.log("Test109 in configurePushSubscription::new subscription", newSubscription);
      var urlCreateSubscription = `${process.env.REACT_APP_SERVER_DOMAIN}create-subscription`;
      
      return fetch(urlCreateSubscription, {
        method: "POST",
        body: JSON.stringify(newSubscription),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    })
    .then((res) => {
      if (res.ok) {
        displayNotification(
          "SubScription Created Successfully :)",
          "You successfully subscribed in a new Subscription"
        );
      }
    })
    .then((err) => {
      console.log("There is an error in config a subscription:", err);
    });
}
