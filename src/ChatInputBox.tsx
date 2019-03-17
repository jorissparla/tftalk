import * as React from "react";
import { db } from "./firebase";
import { UserProps } from "./types";

interface ChatInputBoxProps extends UserProps {
  channelId: string;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({ user, channelId }) => {
  const [message, setMessage] = React.useState("");
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const value = event.target;
        db.collection("channels")
          .doc(channelId)
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
