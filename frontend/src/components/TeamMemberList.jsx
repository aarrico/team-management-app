import { TEAM_API_URL } from "../index";
import axios from "axios";
import React, { useEffect, useState } from "react";

import TeamMemberRow from "./TeamMemberRow";

function TeamMemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await axios.get(TEAM_API_URL);
      setMembers(result.data);
    };
    fetchMembers();
  }, []);

  return (
    <>
      <div>
        <h1>
          <b>Team members</b>
        </h1>
        <h4>You have {members.length} team {members.length === 1 ? "member" : "members"}.</h4>
        <ul>
          {members.map((m) => {
            console.log(m);
            return (<li key={m.id}>
              <TeamMemberRow member={m} />
            </li>);
          })}
        </ul>
      </div>
    </>
  );
}

export default TeamMemberList;
