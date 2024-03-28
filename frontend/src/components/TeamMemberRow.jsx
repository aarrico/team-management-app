export default function TeamMemberRow({
  first_name,
  last_name,
  email,
  phone,
  role_name,
}) {
  const displayName = `${first_name} ${last_name}${
    role_name === "ADMIN" ? " (admin)" : ""
  }`;

  return (
    <>
      <div className="memeber-row">
        <div className="member-info">
          <p className="member-name">{displayName}</p>
          <p className="member-detail">{phone}</p>
          <p className="member-detail">{email}</p>
        </div>
      </div>
    </>
  );
}
