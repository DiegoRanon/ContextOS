// components/Navbar.tsx
import { getUser } from "./actions";
import Navigation from "./NavClient";

export default async function Navbar() {
  const user = await getUser();

  return <Navigation user={user} />;
}
