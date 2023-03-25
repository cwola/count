
const isPlainObject = require('is-plain-object').isPlainObject;

/**
 * object.
 *
 * @param {any} val
 * @return {boolean}
 */
function isObject(val) {
    return val !== null && typeof val === 'object';
}

/**
 * class.
 *
 * @param {any} val
 * @return {boolean}
 */
function isClassObject(val) {
    return (
        isObject(val) &&
        !isPlainObject(val)
    );
}

/**
 * array or array-like.
 *
 * @param {any} val
 * @return {boolean}
 */
function isArrayLike(val) {
    return (
        Array.isArray(val) ||
        isClassObject(val) &&
        typeof val.length === 'number' &&
        val.length >= 0
    );
}

/**
 * countable.
 *
 * @param {any} val
 * @return {boolean}
 */
function isCountable(val) {
    return (
        isClassObject(val) &&
        typeof val.count === 'function'
    );
}

/**
 * Count number.
 *
 * @param {number} val
 * @return {number}
 */
function countNumber(val) {
    return Number.isNaN(val) ? 0 :
        Number.isFinite(val) ? Math.abs(val) : 1;
}

/**
 * Count string.
 *
 * @param {string} val
 * @return {number}
 */
function countString(val) {
    return val.length;
}

/**
 * Count boolean.
 *
 * @param {boolean} val
 * @return {number}
 */
function countBoolean(val) {
    return 1;
}

/**
 * @param {any} val
 * @param {boolean} recursive
 * @return {number}
 */
function countIt(val, recursive) {
    if (val !== null && isPlainObject(val)) {
        return countObject(val, recursive);
    } else if (isArrayLike(val)) {
        return countArray(val, recursive);
    }
    return 0;
}

/**
 * Count object.
 *
 * @param {object} val
 * @param {boolean} recursive
 * @return {number}
 */
function countObject(val, recursive) {
    if (!recursive) {
        return Object.keys(val).length;
    }
    let cnt = countObject(val, false);
    for (const k in val) {
        if (!val.hasOwnProperty(k)) {
            continue;
        }
        cnt += countIt(val[k], recursive);
    }
    return cnt;
}

/**
 * Count array.
 *
 * @param {Array|ArrayLike} val
 * @param {boolean} recursive
 * @return {number}
 */
function countArray(val, recursive) {
    if (!recursive) {
        return val.length;
    }
    let cnt = countArray(val, false);
    Array.from(val).forEach((v) => {
        cnt += countIt(v, recursive);
    });
    return cnt;
}

/**
 * Count countable instance.
 *
 * @param {object} val - countable instance.
 * @return {number}
 */
function countCountableInstance(val) {
    try {
        return val.count();
    } catch {
        // @TODO thorw error ?
        return 0;
    }
}

/**
 * Count.
 *
 * @param {any} val
 * @param {boolean} recursive
 * @return {number}
 */
module.exports = function(val, recursive = false) {
    const type = typeof val;
    if (val === null || val === undefined) {
        return 0;
    } else if (type === 'number') {
        return countNumber(val);
    } else if (type === 'string') {
        return countString(val);
    } else if (type === 'boolean') {
        return countBoolean(val);
    } else if (isPlainObject(val) || isArrayLike(val)) {
        return countIt(val, recursive);
    } else if (isCountable(val)) {
        return countCountableInstance(val);
    }
    // other
    return 1;
};
