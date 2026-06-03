import { grammar } from "./grammar.js";

/**
 * This function validates a series of two characters.
 * @param {string} prev First / Previous character
 * @param {string} current Last / Current Character.
 * @returns {string | boolean}
 */
export const validateSequence = (prev, current) => {
    return grammar[current].validPredecessors.includes(prev);
}

/**
 * This function validates whether the given character can initiate an expression.
 * @param {string} char Character to be analyzed
 * @returns {boolean} 
 */
export const validateFirst = char => {
    return grammar[char.type].canFirst;
}

/**
 * This function validates whether the given character can end an expression.
 * @param {string} char Character to be analyzed
 * @returns {boolean} 
 */
export const validateLast = char => {
    return grammar[char.type].canLast;
}

/**
 * This function checks the parentheses quantity and order.  
 * @param {Object} tokens Tokens to be analyzed 
 * @returns {boolean}
 */
export const validateParentheses = tokens => {
    let count = 0;

    for (const token of tokens) {
        if (token.type === 'open') count++;
        if (token.type === 'close') count--;
        if (count < 0) return false;
    }

    return count === 0;
}