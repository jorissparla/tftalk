import * as React from "react";
import { db } from "./firebase";
import { useEffect } from "react";

interface Props {}

type IMessage = {
  id: string;
  text: string;
  createdat: Date;
};

export const Messages: React.FC<Props> = () => {
  const initialValue: IMessage[] = [];
  const [messages, setMessages] = React.useState(initialValue);

  useEffect(() => {
    return db
      .collection("channels")
      .doc("general")
      .collection("messages")
      .orderBy("createdat")
      .onSnapshot(msgs => {
        const allMessages: any = [];
        msgs.forEach(msg => {
          const aMsg = msg.data();
          allMessages.push({ ...aMsg, id: msg.id });
        });
        setMessages(allMessages);
      });
  }, []);
  if (!messages) return <div />;
  console.log("Messages", messages);
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      <div>
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/7/2018</div>
          <div className="DayLine" />
        </div>

        {messages.map((message, index) => {
          if (index === 0) {
            return (
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div>
                    <span className="UserName">Ryan Florence </span>
                    <span className="TimeStamp">{new Date(message.createdat).toTimeString()}</span>
                  </div>
                  <div className="MessageContent">{message.text}</div>
                </div>
              </div>
            );
          }
          return (
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">{message.text} now?</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
