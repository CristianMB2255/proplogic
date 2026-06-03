import { confusablesTable } from './confusables.js';
import { symbolTable } from './map.js';

/**
 * Subtitute characters to their default version. 
 * @param {string} char Character to be normalized. 
 * @returns {string}
 */
const normalizeChar = char => {
    return confusablesTable[char] || char;
}

/**
 * Verify if given character is an operand.
 * @param {string} char 
 * @returns {boolean}
 */
const isOperand = char => {
    const unicodeValue = char.codePointAt(0);

    return (
        (unicodeValue >= 0x0370 && unicodeValue <= 0x03FF)
        || /^[A-Za-z]+$/.test(char)
    );
};

/**
 * Transform the given expression in tokens.
 * @param {string} expression 
 * @returns {{ type: string, value: string }[]}
 */
export const tokenizeExpression = expression => {
    if (typeof expression !== 'string') {
        return false;
    }

    const tokens = [];

    for (let char of expression) {
        char = normalizeChar(char);

        const symbolType = symbolTable[char];

        if (!symbolType) {
            if (isOperand(char)) {
                tokens.push({
                    type: 'operand',
                    value: char
                });

                continue;
            }

            throw new Error(`Invalid Character '${char}'`);
        };

        tokens.push({
            type: symbolType,
            value: char
        });
    }

    return tokens;
}