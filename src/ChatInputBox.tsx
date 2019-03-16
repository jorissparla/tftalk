import * as React from "react";
import { db } from "./firebase";

interface Props {}

export const ChatInputBox: React.FC<Props> = () => {
  const [message, setMessage] = React.useState("");
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const value = event.target;
        console.log(message);
        db.collection("channels")
          .doc("general")
          .collection("messages")
          .add({ text: message, createdat: Date.now() });
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
