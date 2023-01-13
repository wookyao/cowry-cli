import { execSync } from "node:child_process";

export default function getUser() {
  var name, email;
  try {
    var name = execSync("git config --get user.name");
    var email = execSync("git config --get user.email");
  } catch (e) {}
  name = name && name.toString().trim();
  email = email && "<" + email.toString().trim() + ">";
  return {
    name,
    email,
  };
}
