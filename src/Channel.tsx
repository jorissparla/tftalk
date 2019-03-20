import * as React from "react";
import { useEffect } from "react";
import { ChannelInfo } from "./ChannelInfo";
import { Messages } from "./Messages";
import { ChatInputBox } from "./ChatInputBox";
import { Members } from "./Members";
import { UserProps } from "./types";
import { db } from "./firebase";

interface ChannelProps extends UserProps {
  path: string;
  other?: any;
}
interface Props extends UserProps {}

export const Channel: React.FC<ChannelProps> = (props: any) => {
  const { channelId, user } = props;

  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true
    });
  }, [user.uid, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={props.user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
};
