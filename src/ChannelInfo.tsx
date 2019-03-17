import * as React from "react";
import { useState } from "react";
import { useDoc } from "./useDoc";
import { Channel } from "./types";

interface Props {
  channelId: string;
}

export const ChannelInfo: React.FC<Props> = ({ channelId }) => {
  const channel: any = useDoc(`/channels/${channelId}`);
  const [topic, setTopic] = useState("Awesome Stuff");
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" defaultValue={channel ? channel.topic : ""} />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  );
};
