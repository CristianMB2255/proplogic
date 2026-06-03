import { validateExpression } from './parser/validateExpression.js';
import { tokenizeExpression } from './lexer/tokenizer.js';
export { confusablesTable } from './lexer/confusables.js';

/**
 * This function tokenizes a logic expression.
 * Returns the tokens of the expression or false if the expression contains unrecognized characters.
 * @param {string} expression Expression to be formatted.
 * @returns {Array<{type: string, value: string}>} 
 * @throws {Error} Expression can not be tokenized.
 */
export const tokenize = expression => {
    expression = expression.replace(/\s/g, "");
    if (!expression) return false;

    return tokenizeExpression(expression);
}

/**
 * This function formats a logic expression.
 * Returns the formatted expression or false if the expression contains unrecognized characters.
 * @param {string} expression Expression to be formatted.
 * @returns {string}
 * @throws {Error} Expression can not be formatter.
 */
export const format = expression => {
    const tokens = tokenize(expression);

    if (!tokens || tokens.length === 0) return false;

    let formattedExpression = '';

    for (const token of tokens) formattedExpression += token.value;

    return formattedExpression;
}

/**
 * This function analyzes the well-formness of a logic expression. Returns true or false.
 * @param {string} expression Expression to be validated.
 * @returns {boolean}
 */
export const validate = expression => {
    const tokens = tokenize(expression);
    if (!tokens) return false;

    return validateExpression(tokens);
}

export const lexp = { tokenize, format, validate };
