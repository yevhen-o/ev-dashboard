import { describe, expect, it } from "vitest";
import { getUrl, IDENTIFIERS } from "./urlsHelper";

describe("helpers/urlHelper", () => {
  describe(".getUrl", () => {
    it("should pass back a path with no params", () => {
      expect(getUrl("/pets" as IDENTIFIERS)).toEqual("/pets");
    });

    it("should replace params in the path", () => {
      expect(getUrl("/pets/[petId]" as IDENTIFIERS, { petId: "123" })).toEqual(
        "/pets/123"
      );
    });

    it("should replace array params in the path, just as common separated lists", () => {
      expect(
        getUrl("/pets/[petId]/owners" as IDENTIFIERS, { petId: ["123", "456"] })
      ).toEqual("/pets/123%2C456/owners");
    });

    it("should encode the path params", () => {
      expect(
        getUrl("/pets/[petId]" as IDENTIFIERS, { petId: "has spaces in it?" })
      ).toEqual("/pets/has%20spaces%20in%20it%3F");
    });

    it("should add other params to the querystring", () => {
      expect(
        getUrl("/pets/[petId]" as IDENTIFIERS, { hello: "world", petId: "123" })
      ).toEqual("/pets/123?hello=world");
    });

    it("should add an array the querystring", () => {
      expect(
        getUrl("/pets" as IDENTIFIERS, { strings: ["how", "are", "you"] })
      ).toEqual(`/pets?strings=how&strings=are&strings=you`);
    });

    it("should encode the qs params", () => {
      expect(
        getUrl("/pets/[petId]" as IDENTIFIERS, {
          hello: "how are you?",
          petId: "123",
        })
      ).toEqual("/pets/123?hello=how+are+you%3F");
    });
  });
});
