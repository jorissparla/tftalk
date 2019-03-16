import React from "react";
import { useCollection } from "./useCollection";
import { firebase } from "./firebase";
import { UserProps } from "./types";

type Channel = {
  id: string;
  topic: string;
};

export const Nav: React.FC<UserProps> = ({ user }) => {
  const channels: Channel[] = useCollection("channels");
  console.log(channels);
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoURL} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button className="text-button" onClick={() => firebase.auth().signOut()}>
              log out
            </button>
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
