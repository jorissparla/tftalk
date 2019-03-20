import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();

const bot = {
  displayName: "slimmeBot",
  photoUrl: "https://i.imgur.com/ydOMC2c.png",
  uid: "slimmebot",
  status: {
    state: "online",
    lastChanged: new Date()
  },
  channels: {
    general: true
  }
};
db.collection("users")
  .doc(bot.uid)
  .set(bot, { merge: true });

module.exports = functions.firestore.document("channels/general/messages/{messageId}").onCreate((doc: any, context) => {
  const message = doc.data();
  console.log("cleverbitmessage", message);
  if (!message.text.startsWith("@slimmebot")) {
    return;
  }
  return db.collection("channels/general/messages").add({
    text: "Hi There!",
    createdAt: new Date(),
    user: db.collection("users").doc("slimmebot")
  });
});
