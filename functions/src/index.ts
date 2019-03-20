// import * as admin from "firebase-admin";
import * as onUserStatusChanged from "./triggers/onUserStatusChanged";
import * as helloWorld from "./routes/helloWorld";
import * as onCleverBotMessage from "./triggers/onCleverBotMessage";
//

exports.helloWorld = helloWorld;

exports.onUserStatusChanged = onUserStatusChanged;

exports.onCleverBotMessage = onCleverBotMessage;
