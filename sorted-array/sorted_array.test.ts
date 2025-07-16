const { sortedArray } = require('./sorted_array');


describe('sortedArray', () => {
    it('should sort strings in alphabetical order', () => {
        const input = ['banana', 'apple', 'cherry'];
        const result = sortedArray(input);
        expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should not mutate the original array', () => {
        const input = ['zebra', 'apple', 'dog'];
        const original = [...input];
        sortedArray(input);
        expect(input).toEqual(original);
    });

    it('should handle empty array', () => {
        const result = sortedArray([]);
        expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
        const result = sortedArray(['hello']);
        expect(result).toEqual(['hello']);
    });

    it('should handle case-sensitive sorting', () => {
        const input = ['Apple', 'banana', 'Cherry'];
        const result = sortedArray(input);
        expect(result).toEqual(['Apple', 'banana', 'Cherry']);
    });

    it('should handle unicode characters correctly', () => {
        const input = ['café', 'apple', 'naïve'];
        const result = sortedArray(input);
        expect(result).toEqual(['apple', 'café', 'naïve']);
    });

    it('should handle duplicate strings', () => {
        const input = ['apple', 'banana', 'apple', 'cherry'];
        const result = sortedArray(input);
        expect(result).toEqual(['apple', 'apple', 'banana', 'cherry']);
    });
});