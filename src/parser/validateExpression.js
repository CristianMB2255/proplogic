import { validateSequence, validateFirst, validateLast, validateParentheses } from './validations.js';

/**
 * This function validates the well-formness of an expression. 
 * @param {Object} tokens tokens of the expression 
 * @returns {boolean}
 */
export const validateExpression = tokens => {
    if (!tokens || tokens.length === 0) return false;
    if (!validateParentheses(tokens)) return false;
    if (!validateFirst(tokens[0])) return false;
    if (!validateLast(tokens[tokens.length - 1])) return false;

    for (let i = 1; i < tokens.length; i++) {
        const current = tokens[i];
        const prev = tokens[i - 1];

        if (!validateSequence(prev.type, current.type)) {
            return false;
        }
    }

    return true;
}