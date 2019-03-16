import React, { FC, useState, useEffect } from "react";

import { db } from "./firebase";
interface Props {}

export const Nav: React.FC<Props> = () => {
  const [channels, setChannels] = useState([{ topic: "HardCoded", id: "General" }]);

  useEffect(() => {
    return db.collection("channels").onSnapshot(snapshot => {
      const docs: any = [];
      snapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setChannels(docs);
    });
  }, []);
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src="https://placekitten.com/64/64" />
        <div>
          <div>Joris Sparla</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a href={`"/channel/${channel.id}`} key={channel.id}>{`# ${channel.id}`}</a>
        ))}
      </nav>
    </div>
  );
};
