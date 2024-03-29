export default function TeamMemberRow({
  member: { first_name, last_name, email, phone, role_name },
}) {
  const displayName = `${first_name} ${last_name}${
    role_name === "ADMIN" ? " (admin)" : ""
  }`;

  return (
    <>
      <div className="memeber-row">
        <img src="../../public/blankAvatar.png" alt="Profile Picture" className="profile-pictue"/>
        <div className="member-info">
          <p className="member-name">{displayName}</p>
          <p className="member-detail">{phone}</p>
          <p className="member-detail">{email}</p>
        </div>
      </div>
    </>
  );
}
