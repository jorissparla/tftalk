import * as React from "react";
import { useState } from "react";

interface Props {}

export const ChannelInfo: React.FC<Props> = () => {
  const [topic, setTopic] = useState("Awesome Stuff");
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value={topic} onChange={e => setTopic(e.target.value)} />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  );
};
