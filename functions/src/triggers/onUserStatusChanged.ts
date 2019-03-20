import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
//

const db = admin.firestore();

module.exports = functions.database.ref("status/{userId}").onUpdate((change, context) => {
  if (change.after) {
    const eventStatus: any = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);
    console.log("onUserStatusChanged", eventStatus);
    return change.after.ref.once("value").then(snapshot => {
      const status = snapshot.val();
      console.log("onUserStatusChanged>", status);
      if (status.lastChanged >= eventStatus.lastChanged) {
        return;
      }
      try {
        //  eventStatus.lastChanged = new Date(eventStatus.lastChanged);
        console.log("in catch ", eventStatus);
      } catch (e) {
        console.log("An error occurred");
      }
      const stat = { state: eventStatus.state, lastChanged: new Date(eventStatus.lastChanged) };
      console.log("stat", stat);
      userDoc.update({
        status: stat
      });
    });
  } else return;
});
