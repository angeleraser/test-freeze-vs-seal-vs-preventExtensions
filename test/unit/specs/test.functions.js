"use strict";

const methodNames = ["freeze", "seal", "preventExtensions"];

methodNames.forEach((name) => {
  const method = Object[name];

  describe(`Testing Object.${name}()`, () => {
    describe("[Create] new property", () => {
      it("primitive", () => {
        const emptyObject = {};

        method(emptyObject);

        expect(() => {
          emptyObject.test = "create";
        }).not.toThrow();

        expect(() => {
          Object.defineProperty(emptyObject, "test", {
            writable: true,
            enumerable: true,
            value: "create",
          });
        }).not.toThrow();

        expect(emptyObject.test).toEqual("create");
      });
    });

    describe("[Read] existing property", () => {
      it("primitive", () => {
        const emptyObject = {
          test: "read",
        };

        method(emptyObject);

        expect(emptyObject.test).toEqual("read");
      });
    });

    describe("[Update] existing property", () => {
      it("primitive", () => {
        const emptyObject = {
          test: "",
        };

        method(emptyObject);

        expect(() => {
          Object.defineProperty(emptyObject, "test", {
            writable: true,
            enumerable: true,
            value: "update",
          });
        }).not.toThrow();

        expect(emptyObject.test).toEqual("update");
      });

      it("non primitive", () => {
        const emptyObject = {
          one: { name: "test" },
          two: { name: "test" },
        };

        method(emptyObject);

        expect(() => {
          emptyObject.one.name = "new defined value";
        }).not.toThrow();

        expect(() => {
          Object.defineProperty(emptyObject.two, "name", {
            writable: true,
            enumerable: true,
            value: "new defined value",
          });
        }).not.toThrow();

        expect(emptyObject.one.name).toEqual("new defined value");
        expect(emptyObject.two.name).toEqual("new defined value");
      });
    });

    describe("[Delete] existing property", () => {
      it("primitive", () => {
        const emptyObject = {
          test: "delete",
        };

        method(emptyObject);

        expect(() => {
          delete emptyObject.test;
        }).not.toThrow();

        expect(emptyObject.test).toEqual(undefined);
      });

      it("non primitive", () => {
        const emptyObject = {
          one: { name: "test" },
          two: { name: "test" },
        };

        method(emptyObject);

        expect(() => {
          delete emptyObject.one;
        }).not.toThrow();

        expect(() => {
          Object.defineProperty(emptyObject, "two", {
            writable: true,
            enumerable: true,
            value: undefined,
          });
        }).not.toThrow();

        expect(emptyObject.one).toEqual(undefined);
        expect(emptyObject.two).toEqual(undefined);
      });
    });
  });
});
