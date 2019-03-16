import * as React from "react";
import { db } from "./firebase";
import { UserProps } from "./types";

export const ChatInputBox: React.FC<UserProps> = ({ user }) => {
  const [message, setMessage] = React.useState("");
  console.log("user", user);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const value = event.target;
        console.log(message);
        db.collection("channels")
          .doc("general")
          .collection("messages")
          .add({
            user: db.collection("users").doc(user.uid),

            text: message,
            createdAt: Date.now()
          });
        //event.target.reset();
        setMessage("");
      }}
      className="ChatInputBox"
    >
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </form>
  );
};
