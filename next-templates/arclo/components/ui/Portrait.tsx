import { asset } from "@/lib/urls";
const positions = ["7%", "40%", "69%", "100%"];
export function Portrait({
  person = 0,
  className = "",
}: {
  person?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`portrait ${className}`}
      style={{
        backgroundImage: `url(${asset("/images/team.webp")})`,
        backgroundPosition: `${positions[person]} 22%`,
      }}
    />
  );
}
export function AvatarStack() {
  return (
    <span className="avatar-stack">
      <Portrait person={0} />
      <Portrait person={1} />
      <Portrait person={3} />
    </span>
  );
}
