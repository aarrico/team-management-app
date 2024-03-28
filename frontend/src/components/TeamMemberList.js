import { TEAM_API_URL } from "../index";
import axios from "axios";
import React, { useEffect, useState } from "react";

import TeamMemberRow from "./TeamMemberRow";

const TeamMemberList = () => {
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
          <b>Team Members</b>
        </h1>
        <h4>You have {members.length} team members.</h4>
        <ul>
          {members.map((m) => (
            <li key={m.id}>
              <TeamMemberRow member={m} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TeamMemberList;
