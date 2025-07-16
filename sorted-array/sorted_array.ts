const sortedArray = (arr: string[]) => {
    return [...arr].sort((a, b) => a.localeCompare(b));
}

module.exports = { sortedArray };