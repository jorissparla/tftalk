import * as React from "react";
import { ChannelInfo } from "./ChannelInfo";
import { Messages } from "./Messages";
import { ChatInputBox } from "./ChatInputBox";
import { Members } from "./Members";
import { UserProps } from "./types";

interface ChannelProps extends UserProps {
  path: string;
}

export const Channel: React.FC<ChannelProps> = ({ path, user }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
};
