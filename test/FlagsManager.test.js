import { expect } from "chai";
import { FlagsManager } from "../index.js";

describe("FlagsManager", () => {
  let defaultFlagsManager;
  let customFlagsManager;
  const customFlagNames = ["CUSTOM_FLAG_1", "CUSTOM_FLAG_2", "CUSTOM_FLAG_3"];

  beforeEach(() => {
    defaultFlagsManager = new FlagsManager();
    customFlagsManager = new FlagsManager(customFlagNames);
  });

  describe("Default Flags", () => {
    it("should initialize with no flags set", () => {
      expect(defaultFlagsManager.flags).to.equal(0);
    });

    it("should set multiple flags", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.INVITED);
      expect(defaultFlagsManager.flags).to.equal(5); // 1 | 4
    });

    it("should check if a specific flag is set", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL);
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL)).to.be.true;
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.INVITED)).to.be.false;
    });

    it("should toggle a specific flag", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL);
      defaultFlagsManager.toggleFlag(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL);
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL)).to.be.false;
      defaultFlagsManager.toggleFlag(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL);
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL)).to.be.true;
    });

    it("should unset a specific flag", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.INVITED);
      defaultFlagsManager.unsetFlag(FlagsManager.DEFAULT_FLAGS.INVITED);
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.INVITED)).to.be.false;
      expect(defaultFlagsManager.isFlagSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL)).to.be.true;
    });

    it("should get all active flags", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.ACCEPTED, FlagsManager.DEFAULT_FLAGS.LOGGED_IN);
      const activeFlags = defaultFlagsManager.getActiveFlags();
      expect(activeFlags).to.include.members(["ACCEPTED", "LOGGED_IN"]);
    });

    it("should clear all flags", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.INVITED);
      defaultFlagsManager.clearFlags();
      expect(defaultFlagsManager.flags).to.equal(0);
    });

    it("should check if multiple flags are set", () => {
      defaultFlagsManager.setFlags(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.INVITED);
      expect(
        defaultFlagsManager.areFlagsSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.INVITED)
      ).to.be.true;
      expect(
        defaultFlagsManager.areFlagsSet(FlagsManager.DEFAULT_FLAGS.VERIFIED_EMAIL, FlagsManager.DEFAULT_FLAGS.ACCEPTED)
      ).to.be.false;
    });

    it("should throw an error for invalid flags", () => {
      expect(() => defaultFlagsManager.setFlags(1 << 15)).to.throw("Invalid flag: 32768");
    });
  });

  describe("Custom Flags", () => {
    it("should initialize with no flags set", () => {
      expect(customFlagsManager.flags).to.equal(0);
    });

    it("should set multiple flags", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2);
      expect(customFlagsManager.flags).to.equal(3); // 1 | 2
    });

    it("should check if a specific flag is set", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1);
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)).to.be.true;
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_2)).to.be.false;
    });

    it("should toggle a specific flag", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1);
      customFlagsManager.toggleFlag(customFlagsManager.FLAGS.CUSTOM_FLAG_1);
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)).to.be.false;
      customFlagsManager.toggleFlag(customFlagsManager.FLAGS.CUSTOM_FLAG_1);
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)).to.be.true;
    });

    it("should unset a specific flag", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2);
      customFlagsManager.unsetFlag(customFlagsManager.FLAGS.CUSTOM_FLAG_2);
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_2)).to.be.false;
      expect(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)).to.be.true;
    });

    it("should get all active flags", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_3);
      const activeFlags = customFlagsManager.getActiveFlags();
      expect(activeFlags).to.include.members(["CUSTOM_FLAG_1", "CUSTOM_FLAG_3"]);
    });

    it("should clear all flags", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2);
      customFlagsManager.clearFlags();
      expect(customFlagsManager.flags).to.equal(0);
    });

    it("should check if multiple flags are set", () => {
      customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2);
      expect(
        customFlagsManager.areFlagsSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2)
      ).to.be.true;
      expect(
        customFlagsManager.areFlagsSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_3)
      ).to.be.false;
    });

    it("should throw an error for invalid flags", () => {
      expect(() => customFlagsManager.setFlags(1 << 15)).to.throw("Invalid flag: 32768");
    });
  });
});
