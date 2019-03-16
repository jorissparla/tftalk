import * as React from "react";
import { useCollection } from "./useCollection";
import { db } from "./firebase";
import { User, UserProps } from "./types";

interface Props {}

export type IMessage = {
  id: string;
  text: string;
  createdAt: Date;
  user: any;
};

export const Messages: React.FC<Props> = () => {
  const initialValue: IMessage[] = [];

  const messages: IMessage[] = useCollection("channels/general/messages", "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      <div>
        {messages.map((message, index) => {
          const previousid = messages[index - 1];
          const showDay = false;
          const showAvatar = !previousid || message.user.id !== previousid.user.id;
          return showAvatar ? (
            <FirstMessageFromUser message={message} showDay={showDay} key={message.id} />
          ) : (
            <div key={message.id}>
              <div className="Message no-avatar">
                <div className="MessageContent">{message.text} </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export interface MessageProps {
  message: IMessage;
  showDay: boolean;
  key: string;
}

interface U {
  user: UserProps;
  id: string;
}

function useDoc(path: string) {
  const [doc, setDoc] = React.useState<U | undefined>(undefined);

  async function getDoc() {
    await db.doc(path).onSnapshot((doc: any) => {
      setDoc({ ...doc.data(), id: doc.id });
    });
  }
  React.useEffect(() => {
    getDoc();
  }, []);

  return doc;
}

const FirstMessageFromUser: React.FC<MessageProps> = ({ message, showDay }) => {
  const author: any = useDoc(message.user.path);

  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/7/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoURL}")` : ``
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">{new Date(message.createdAt).toTimeString()}</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};
export { FirstMessageFromUser };
