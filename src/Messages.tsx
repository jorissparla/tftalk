import { differenceInSeconds, format, isSameDay } from "date-fns";
import { useEffect, useRef } from "react";
import * as React from "react";
import { UserProps, IMessage } from "./types";
import { useCollection } from "./useCollection";
import { useDocWithCache } from "./useDoc";

interface Props {
  channelId: string;
}

function useChatScrollManager(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  });
}

export const Messages: React.FC<Props> = props => {
  const messages: IMessage[] = useCollection(`channels/${props.channelId}/messages`, "createdAt");

  const scrollerRef = useRef<HTMLInputElement>(null);
  useChatScrollManager(scrollerRef);
  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      <div>
        {messages.map((message, index) => {
          const previous = messages[index - 1];
          const showAvatar = shouldShowAvatar(previous, message);
          const showDay = shouldShowDay(previous, message);

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

export interface U {
  user: UserProps;
  id: string;
}

const FirstMessageFromUser: React.FC<MessageProps> = ({ message, showDay }) => {
  const author: any = useDocWithCache(message.user.path);

  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">{format(message.createdAt, "DD/MM/YYYY")}</div>
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
            <span className="TimeStamp">{format(message.createdAt, "h:mm A")}</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

function shouldShowDay(previous: IMessage, message: any) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  return !isSameDay(previous.createdAt, message.createdAt);
}

function shouldShowAvatar(previous: IMessage, message: any) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }
  const hasBeenAWhile = differenceInSeconds(message.createdAt, previous.createdAt) > 180;
  if (hasBeenAWhile) {
    return true;
  }
  return false;
}
export { FirstMessageFromUser };
