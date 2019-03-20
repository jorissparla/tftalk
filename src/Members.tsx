import * as React from "react";
import { useCollection } from "./useCollection";
import { User } from "./types";

interface Props {
  channelId: string;
}

export const Members: React.FC<Props> = ({ channelId }) => {
  const members = useCollection<User>("users", undefined, [`channels.${channelId}`, "==", true]);
  console.log(members);
  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map((member, index) => {
          const status = member.status ? (member.status.state ? member.status.state : "offline") : "offline";
          return (
            <div className="Member" key={index}>
              <div className={`MemberStatus ${status}`} />
              {member.displayName}
            </div>
          );
        })}
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  );
};

function sortByName(a: User, b: User) {
  if (a && b && a.displayName && b.displayName) {
    return a.displayName > b.displayName ? -1 : a.displayName < b.displayName ? 1 : 0;
  }
  return 0;
}
