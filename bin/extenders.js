"use strict";
String.prototype.cleanSpaces = function () {
    return String(this.replace(/\s+/g, " ").trim());
};
String.prototype.toTitle = function () {
    const str = this.toLowerCase().split(" ");
    const final = [];
    for (const word of str) {
        final.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return final.join(" ");
};
Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};
