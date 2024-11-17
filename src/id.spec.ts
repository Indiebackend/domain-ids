import { describe, it } from "node:test";
import assert from "node:assert";
import Id from "./id";

describe("Id", () => {
  it("should decode a valid uuid", () => {
    for (let index = 0; index < 100; index++) {
      const uuid = crypto.randomUUID();
      const encoded = Id.encode("test", uuid);
      const decoded = Id.decode(encoded);
      assert.strictEqual(decoded, uuid);
    }
  });

  it("should decode a padded ID", () => {
    const res = Id.decode("profile_01M7QunqejNh1ErAFlmV7p");
    assert.strictEqual(res, "00b811bd-aa79-429a-b239-68dd90595ef1");
  });

  it("should generate a properly formatted id", () => {
    const res = Id.generate("test");
    assert.strictEqual(res.startsWith("test_"), true);
    assert.strictEqual(res.split("_").length, 2);
    assert.strictEqual(res.split("_")[1].length, 22);
  });
});
