# sortedArray Function - Unit Test Documentation

## Overview

This document explains the design choices and rationale behind the unit tests for the `sortedArray` function, which sorts an array of strings using `localeCompare()` without mutating the original array.

## Function Under Test

```typescript
const sortedArray = (arr: string[]) => {
    return [...arr].sort((a, b) => a.localeCompare(b));
}
```

## Testing Philosophy

### Behavior-Driven Testing
Our tests focus on **what the function actually does** rather than what we initially assumed it should do. This approach was adopted after discovering that `localeCompare()` has specific locale-aware sorting behavior that differs from simple ASCII sorting.

### Empirical Test Design
Each test expectation was verified by running the function with sample inputs and observing the actual output. This ensures our tests validate real behavior rather than theoretical assumptions.

## Test Cases Explained

### 1. Basic Alphabetical Sorting
```javascript
expect(sortedArray(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry']);
```
**Purpose:** Verifies the core functionality works for simple lowercase strings.  
**Choice:** Uses common fruit names that are clearly distinguishable and have obvious alphabetical order.

### 2. Immutability Check
```javascript
const input = ['zebra', 'apple', 'dog'];
const original = [...input];
sortedArray(input);
expect(input).toEqual(original);
```
**Purpose:** Ensures the spread operator `[...arr]` successfully prevents mutation of the original array.  
**Choice:** This is critical because the function's value proposition is non-destructive sorting. We test this explicitly rather than assuming it works.

### 3. Empty Array Handling
```javascript
expect(sortedArray([])).toEqual([]);
```
**Purpose:** Verifies graceful handling of edge case.  
**Choice:** Empty arrays are a common edge case that can break array operations. This ensures robustness.

### 4. Single Element Array
```javascript
expect(sortedArray(['hello'])).toEqual(['hello']);
```
**Purpose:** Tests another edge case where sorting is trivial.  
**Choice:** Single-element arrays should pass through unchanged. This verifies no unexpected behavior occurs.

### 5. Mixed Case Behavior
```javascript
expect(sortedArray(['Apple', 'banana', 'Cherry'])).toEqual(['Apple', 'banana', 'Cherry']);
```
**Purpose:** Documents the actual behavior of `localeCompare()` with mixed case.  
**Choice:** **This was corrected** after discovering that `localeCompare()` uses locale-aware sorting where case doesn't strictly separate (A, a, B, b, C, c...). The test validates this real behavior rather than forcing ASCII-style sorting.

### 6. Unicode Character Support
```javascript
expect(sortedArray(['café', 'apple', 'naïve'])).toEqual(['apple', 'café', 'naïve']);
```
**Purpose:** Verifies proper handling of accented characters.  
**Choice:** `localeCompare()` is designed for internationalization, so we test its Unicode capabilities. This ensures the function works globally, not just with English text.

### 7. Duplicate Handling
```javascript
expect(sortedArray(['apple', 'banana', 'apple', 'cherry'])).toEqual(['apple', 'apple', 'banana', 'cherry']);
```
**Purpose:** Ensures duplicates are preserved and sorted correctly.  
**Choice:** Duplicate handling is important for real-world data. We verify that duplicates aren't removed and maintain proper order.

