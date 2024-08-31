# Bitwise Flags Manager

The `FlagsManager` class provides a way to manage multiple flags using bitwise operations. Instead of having multiple boolean variables (e.g., `verified_email`, `verified_phone`, `invited`, `accepted`, `reset_password`, `logged_in_first_time`, `logged_in`, etc.), we can use bitwise operations to store all these flags in a single integer. By using bitwise operations, we can efficiently set, unset, toggle, and check these flags. This approach reduces the memory footprint and simplifies the management of multiple flags.

## Features

- **Efficient Flag Management**: Streamlines the management of multiple boolean flags using bitwise operations, reducing complexity and improving performance.
- **Optimized Storage**: Consolidates multiple flags into a single integer stored in one table column, eliminating the need for multiple columns and minimizing memory usage.
- **Simplified Logic**: Offers straightforward methods to set, unset, toggle, and check flags, significantly simplifying the code by avoiding convoluted conditional checks.

### Custom Usage Example

```javascript
// Define an array of custom flag names
const customFlagNames = ["CUSTOM_FLAG_1", "CUSTOM_FLAG_2", "CUSTOM_FLAG_3"];
const customFlagsManager = new FlagsManager(customFlagNames);

// Set some flags
customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_3);
console.log(customFlagsManager.flags); // Output: 5 (1 | 4)

// Check if a flag is set
console.log(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)); // Output: true
console.log(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_2)); // Output: false

// Toggle a flag
customFlagsManager.toggleFlag(customFlagsManager.FLAGS.CUSTOM_FLAG_1);
console.log(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1)); // Output: false

// Unset a flag
customFlagsManager.unsetFlag(customFlagsManager.FLAGS.CUSTOM_FLAG_3);
console.log(customFlagsManager.isFlagSet(customFlagsManager.FLAGS.CUSTOM_FLAG_3)); // Output: false

// Get all active flags
customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_2, customFlagsManager.FLAGS.CUSTOM_FLAG_3);
console.log(customFlagsManager.getActiveFlags()); // Output: ["CUSTOM_FLAG_2", "CUSTOM_FLAG_3"]

// Clear all flags
customFlagsManager.clearFlags();
console.log(customFlagsManager.flags); // Output: 0

// Check if multiple flags are set
customFlagsManager.setFlags(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2);
console.log(
  customFlagsManager.areFlagsSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_2)
); // Output: true
console.log(
  customFlagsManager.areFlagsSet(customFlagsManager.FLAGS.CUSTOM_FLAG_1, customFlagsManager.FLAGS.CUSTOM_FLAG_3)
); // Output: false
```

### Default Usage Example

```javascript
const FlagsManager = new FlagsManager();

// Set some flags
FlagsManager.setFlags(FlagsManager.FLAGS.VERIFIED_EMAIL, FlagsManager.FLAGS.INVITED);
console.log(FlagsManager.flags); // Output: 5 (1 | 4)

// Check if a flag is set
console.log(FlagsManager.isFlagSet(FlagsManager.FLAGS.VERIFIED_EMAIL)); // Output: true
console.log(FlagsManager.isFlagSet(FlagsManager.FLAGS.ACCEPTED)); // Output: false

// Toggle a flag
FlagsManager.toggleFlag(FlagsManager.FLAGS.VERIFIED_EMAIL);
console.log(FlagsManager.isFlagSet(FlagsManager.FLAGS.VERIFIED_EMAIL)); // Output: false

// Unset a flag
FlagsManager.unsetFlag(FlagsManager.FLAGS.INVITED);
console.log(FlagsManager.isFlagSet(FlagsManager.FLAGS.INVITED)); // Output: false

// Get all active flags
FlagsManager.setFlags(FlagsManager.FLAGS.ACCEPTED, FlagsManager.FLAGS.LOGGED_IN);
console.log(FlagsManager.getActiveFlags()); // Output: ["ACCEPTED", "LOGGED_IN"]

// Clear all flags
FlagsManager.clearFlags();
console.log(FlagsManager.flags); // Output: 0

// Check if multiple flags are set
FlagsManager.setFlags(FlagsManager.FLAGS.VERIFIED_EMAIL, FlagsManager.FLAGS.INVITED);
console.log(FlagsManager.areFlagsSet(FlagsManager.FLAGS.VERIFIED_EMAIL, FlagsManager.FLAGS.INVITED)); // Output: true
console.log(FlagsManager.areFlagsSet(FlagsManager.FLAGS.VERIFIED_EMAIL, FlagsManager.FLAGS.ACCEPTED)); // Output: false
```

## Class Overview

### FlagsManager Class

This class manages flags using bitwise operations.

#### FLAGS

A static enumeration that defines each flag as a power of 2, allowing for bitwise operations.

```javascript
  static FLAGS = Object.freeze({
    VERIFIED_EMAIL: 1 << 0, // 1 (2^0)
    VERIFIED_PHONE: 1 << 1, // 2 (2^1)
    INVITED: 1 << 2, // 4 (2^2)
    ACCEPTED: 1 << 3, // 8 (2^3)
    RESET_PASSWORD: 1 << 4, // 16 (2^4)
    LOGGED_IN_FIRST_TIME: 1 << 5, // 32 (2^5)
    ADMIN: 1 << 6, // 64 (2^6)
    MODERATOR: 1 << 7, // 128 (2^7)
    BANNED: 1 << 8, // 256 (2^8)
    PREMIUM_USER: 1 << 9, // 512 (2^9)
    TWO_FACTOR_AUTH: 1 << 10, // 1024 (2^10)
    EMAIL_NOTIFICATIONS: 1 << 11, // 2048 (2^11)
    SMS_NOTIFICATIONS: 1 << 12, // 4096 (2^12)
    PROFILE_COMPLETED: 1 << 13, // 8192 (2^13)
  });
```

### Methods

#### setFlags: Sets multiple flags at once using the bitwise OR (|) operator.

```javascript
  /**
   * Set multiple flags.
   * @param {...number} flags - The flags to set.
   */
  setFlags(...flags) {
    flags.forEach((flag) => this._validateFlag(flag));
    this.flags = flags.reduce((acc, flag) => acc | flag, this.flags);
  }
```

#### isFlagSet: Checks whether a specific flag is set using the bitwise AND (&) operator.

```javascript
  /**
   * Check if a specific flag is set.
   * @param {number} flag - The flag to check.
   * @returns {boolean} - True if the flag is set, false otherwise.
   */
  isFlagSet(flag) {
    this._validateFlag(flag);
    return (this.flags & flag) !== 0;
  }
```

#### toggleFlag: Toggles a specific flag using the bitwise XOR (^) operator.

```javascript
  /**
   * Toggle a specific flag.
   * @param {number} flag - The flag to toggle.
   */
  toggleFlag(flag) {
    this._validateFlag(flag);
    this.flags ^= flag;
  }
```

#### unsetFlag: Unsets a specific flag using the bitwise AND NOT (& ~) operator.

```javascript
  /**
   * Unset a specific flag.
   * @param {number} flag - The flag to unset.
   */
  unsetFlag(flag) {
    this._validateFlag(flag);
    this.flags &= ~flag;
  }
```

#### getActiveFlags: Returns an array of all active flags, represented by their names.

```javascript
  /**
   * Get all active flags as an array of flag names.
   * @returns {string[]} - The names of the active flags.
   */
  getActiveFlags() {
    return Object.keys(FlagsManager.FLAGS).filter((flag) => this.isFlagSet(FlagsManager.FLAGS[flag]));
  }
```

#### clearFlags: Clears all flags.

```javascript
  /**
   * Clear all flags.
   */
  clearFlags() {
    this.flags = 0;
  }
```

#### areFlagsSet: Checks if multiple flags are set using bitwise operations.

```javascript
  /**
   * Check if multiple flags are set.
   * @param {...number} flags - The flags to check.
   * @returns {boolean} - True if all specified flags are set, false otherwise.
   */
  areFlagsSet(...flags) {
    const combinedFlags = flags.reduce((acc, flag) => acc | flag, 0);
    return (this.flags & combinedFlags) === combinedFlags;
  }
```

#### createCustomFlags: Create custom flags from an array of flag names using the bitwise Left shift (<<) operator.

```javascript
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
```

#### printFlagsStatus: Print a table of all flags and their active/inactive status.

```javascript
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
```

#### \_validateFlag: Validate if the flag is a valid flag.

```javascript
  /**
   * Validate if the flag is a valid flag.
   * @param {number} flag - The flag to validate.
   * @private
   */
  _validateFlag(flag) {
    if (!Object.values(FlagsManager.FLAGS).includes(flag)) {
      throw new Error(`Invalid flag: ${flag}`);
    }
  }
```

## Choose your datatype

Bitwise operations on a standard integer are limited to 32 bits. This means you can only have a maximum of 32 flags. The following table helps you choose the appropriate SQL datatype based on the number of flags you need to manage:

| Number of Flags | Recommended Type | Storage (Bytes) |
| --------------- | ---------------- | --------------- |
| 1 - 8           | TINYINT          | 1               |
| 9 - 16          | SMALLINT         | 2               |
| 17 - 24         | MEDIUMINT        | 3               |
| 25 - 32         | INT              | 4               |

If you need to manage more than 32 flags, you will need to use multiple integers or another data structure to store the additional flags.

## How does it work

We use bitwise operations to manage multiple flags within a single integer. Each flag represents a specific state or attribute of a user, and we use bitwise operations to set, unset, toggle, and check these flags efficiently.

### Explanation of Flags

Each flag is represented by a unique power of 2, which allows us to use bitwise operations to manipulate them. Here is a detailed explanation of each flag:

| Flag                  | Decimal | Binary                                      |
| --------------------- | ------- | ------------------------------------------- |
| VERIFIED_EMAIL        | 1       | 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 **1**         |
| VERIFIED_PHONE        | 2       | 0 0 0 0 0 0 0 0 0 0 0 0 0 0 **1** 0         |
| INVITED               | 4       | 0 0 0 0 0 0 0 0 0 0 0 0 0 **1** 0 0         |
| ACCEPTED              | 8       | 0 0 0 0 0 0 0 0 0 0 0 0 **1** 0 0 0         |
| RESET_PASSWORD        | 16      | 0 0 0 0 0 0 0 0 0 0 0 **1** 0 0 0 0         |
| LOGGED_IN_FIRST_TIME  | 32      | 0 0 0 0 0 0 0 0 0 0 **1** 0 0 0 0 0         |
| LOGGED_IN             | 64      | 0 0 0 0 0 0 0 0 0 **1** 0 0 0 0 0 0         |
| ADMIN                 | 128     | 0 0 0 0 0 0 0 0 **1** 0 0 0 0 0 0 0         |
| MODERATOR             | 256     | 0 0 0 0 0 0 0 **1** 0 0 0 0 0 0 0 0         |
| BANNED                | 512     | 0 0 0 0 0 0 **1** 0 0 0 0 0 0 0 0 0         |
| PREMIUM_USER          | 1024    | 0 0 0 0 0 **1** 0 0 0 0 0 0 0 0 0 0         |
| SUBSCRIBED            | 2048    | 0 0 0 0 **1** 0 0 0 0 0 0 0 0 0 0 0         |
| TWO_FACTOR_AUTH       | 4096    | 0 0 0 **1** 0 0 0 0 0 0 0 0 0 0 0 0         |
| EMAIL_NOTIFICATIONS   | 8192    | 0 0 **1** 0 0 0 0 0 0 0 0 0 0 0 0 0         |
| SMS_NOTIFICATIONS     | 16384   | 0 **1** 0 0 0 0 0 0 0 0 0 0 0 0 0 0         |
| **Value from the DB** | **112** | 0 0 0 0 0 0 0 0 0 **1** **1** **1** 0 0 0 0 |

#### Example: Determining Flags for the Integer 112

Let's take the integer 112 as an example to understand how we determine which flags are set.

1. **Convert 112 to Binary:**

   - `112` in binary is `01110000`.

2. **Identify Set Flags:**

   - Compare each bit position with the corresponding flag value.
   - The binary representation `01110000` indicates that the flags for `16`, `32`, and `64` are set.

3. **Determine Active Flags:**

   - `RESET_PASSWORD` (16): The fifth bit is 1.
   - `LOGGED_IN_FIRST_TIME` (32): The sixth bit is 1.
   - `LOGGED_IN` (64): The seventh bit is 1.

4. **Summary:**

   - For the integer 112, the active flags are RESET_PASSWORD, LOGGED_IN_FIRST_TIME, and LOGGED_IN.
