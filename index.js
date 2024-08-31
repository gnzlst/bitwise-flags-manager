/**
 * The FlagsManager class provides a way to manage multiple flags using bitwise operations.
 * Instead of having multiple boolean variables (e.g., verified_email, verified_phone, invited, accepted, reset_password, logged_in_first_time, logged_in, etc.),
 * we can use bitwise operations to store all these flags in a single integer.
 *
 * By using bitwise operations, we can efficiently set, unset, toggle, and check these flags.
 * This approach reduces the memory footprint and simplifies the management of multiple flags.
 *
 */

export class FlagsManager {
  /**
   * @enum {number}
   */
  static DEFAULT_FLAGS = Object.freeze({
    VERIFIED_EMAIL: 1 << 0, // 1 (2^0)
    VERIFIED_PHONE: 1 << 1, // 2 (2^1)
    INVITED: 1 << 2, // 4 (2^2)
    ACCEPTED: 1 << 3, // 8 (2^3)
    RESET_PASSWORD: 1 << 4, // 16 (2^4)
    LOGGED_IN_FIRST_TIME: 1 << 5, // 32 (2^5)
    LOGGED_IN: 1 << 6, // 64 (2^6)
    ADMIN: 1 << 7, // 128 (2^7)
    MODERATOR: 1 << 8, // 256 (2^8)
    BANNED: 1 << 9, // 512 (2^9)
    PREMIUM_USER: 1 << 10, // 1024 (2^10)
    TWO_FACTOR_AUTH: 1 << 11, // 2048 (2^11)
    EMAIL_NOTIFICATIONS: 1 << 12, // 4096 (2^12)
    SMS_NOTIFICATIONS: 1 << 13, // 8192 (2^13)
    PROFILE_COMPLETED: 1 << 14, // 16384 (2^14)
  });

  /**
   * @param {string[]} [customFlagNames] - Optional array of custom flag names.
   */
  constructor(customFlagNames) {
    this.flags = 0; // Initialize with no flags set
    this.FLAGS = customFlagNames ? this.createCustomFlags(customFlagNames) : FlagsManager.DEFAULT_FLAGS;
  }

  /**
   * Set multiple flags.
   * @param {...number} flags - The flags to set.
   */
  setFlags(...flags) {
    flags.forEach((flag) => this._validateFlag(flag));
    this.flags = flags.reduce((acc, flag) => acc | flag, this.flags);
  }

  /**
   * Check if a specific flag is set.
   * @param {number} flag - The flag to check.
   * @returns {boolean} - True if the flag is set, false otherwise.
   */
  isFlagSet(flag) {
    this._validateFlag(flag);
    return (this.flags & flag) !== 0;
  }

  /**
   * Toggle a specific flag.
   * @param {number} flag - The flag to toggle.
   */
  toggleFlag(flag) {
    this._validateFlag(flag);
    this.flags ^= flag;
  }

  /**
   * Unset a specific flag.
   * @param {number} flag - The flag to unset.
   */
  unsetFlag(flag) {
    this._validateFlag(flag);
    this.flags &= ~flag;
  }

  /**
   * Get all active flags as an array of flag names.
   * @returns {string[]} - The names of the active flags.
   */
  getActiveFlags() {
    return Object.keys(this.FLAGS).filter((flag) => this.isFlagSet(this.FLAGS[flag]));
  }

  /**
   * Clear all flags.
   */
  clearFlags() {
    this.flags = 0;
  }

  /**
   * Check if multiple flags are set.
   * @param {...number} flags - The flags to check.
   * @returns {boolean} - True if all specified flags are set, false otherwise.
   */
  areFlagsSet(...flags) {
    const combinedFlags = flags.reduce((acc, flag) => acc | flag, 0);
    return (this.flags & combinedFlags) === combinedFlags;
  }

  /**
   * Create custom flags from an array of flag names.
   * @param {string[]} flagNames - The array of flag names.
   * @returns {Object} - The custom flags object.
   */
  createCustomFlags(flagNames) {
    return flagNames.reduce((acc, flag, index) => {
      acc[flag] = 1 << index;
      return acc;
    }, {});
  }

  /**
   * Print a table of all flags and their active/inactive status.
   */
  printFlagsStatus() {
    const flagsStatus = Object.keys(this.FLAGS).map((flag) => ({
      Flag: flag,
      Status: this.isFlagSet(this.FLAGS[flag]) ? "Active" : "Inactive",
    }));
    console.table(flagsStatus);
  }

  /**
   * Validate if the flag is a valid flag.
   * @param {number} flag - The flag to validate.
   * @private
   */
  _validateFlag(flag) {
    if (!Object.values(this.FLAGS).includes(flag)) {
      throw new Error(`Invalid flag: ${flag}`);
    }
  }
}
