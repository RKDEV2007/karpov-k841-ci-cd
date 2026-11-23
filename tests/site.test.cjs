const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
test("Every local resource and fragment exists", () => {
  const html = fs.readFileSync("index.html", "utf8");
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (target.startsWith("#")) {
      assert(html.includes('id="' + target.slice(1) + '"'));
    } else {
      assert(fs.existsSync(target), target);
    }
  }
});
test("Details toggle updates visibility, label and aria-expanded", () => {
  const button = { textContent: "", attributes: {}, setAttribute(key, value) { this.attributes[key] = value; }, addEventListener(event, callback) { this.click = callback; } };
  const details = { hidden: true };
  vm.runInNewContext(fs.readFileSync("script.js", "utf8"), {
    document: { getElementById: id => id === "details" ? details : button }
  });
  button.click();
  assert.equal(details.hidden, false);
  assert.equal(button.attributes["aria-expanded"], "true");
  assert.equal(button.textContent, "Скрыть навыки");
  button.click();
  assert.equal(details.hidden, true);
  assert.equal(button.attributes["aria-expanded"], "false");
});
