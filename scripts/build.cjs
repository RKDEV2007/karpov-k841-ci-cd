const fs = require("node:fs");
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
for (const file of ["index.html", "style.css", "script.js", "booking.png"]) {
  fs.copyFileSync(file, "dist/" + file);
}
console.log("Built dist with 4 files");
