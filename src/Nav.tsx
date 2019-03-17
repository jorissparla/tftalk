import React, { useState, useEffect } from "react";
import { useCollection } from "./useCollection";
import { firebase, db } from "./firebase";
import { UserProps, Channel } from "./types";
import { Link } from "@reach/router";

export const Nav: React.FC<UserProps> = ({ user }) => {
  const channels: Channel[] = useCollection("channels");
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
          <Link to={`/channel/${channel.id}`} key={channel.id}>{`# ${channel.id}`}</Link>
        ))}
      </nav>
    </div>
  );
};
