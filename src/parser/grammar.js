/**
 * Informations used to parse expression
 */
export const grammar = {
    operator: {
        canFirst: false,
        canLast: false,
        validPredecessors: ['operand', 'close']
    },

    operand: {
        canFirst: true,
        canLast: true,
        validPredecessors: ['operator', 'not', 'open']
    },

    not: {
        canFirst: true,
        canLast: false,
        validPredecessors: ['operator', 'open']
    },

    open: {
        canFirst: true,
        canLast: false,
        validPredecessors: ['operator', 'not', 'open']
    },

    close: {
        canFirst: false,
        canLast: true,
        validPredecessors: ['operand', 'close']
    }
};