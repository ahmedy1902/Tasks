import bcrypt from "bcryptjs";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read db.json file
const dbPath = join(__dirname, "db.json");
const db = JSON.parse(readFileSync(dbPath, "utf8"));

// Hash passwords for all users
async function hashPasswords() {
  for (let user of db.users) {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  // Save changes to the file
  writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Passwords have been hashed successfully!");
}

hashPasswords();
