# proplogic

A lightweight JavaScript library for tokenizing, formatting, and validating propositional logic expressions. Supports standard Unicode logic symbols as well as common aliases.

## Installation

```bash
npm install proplogic
```

## Quick Start

```js
import { lexp } from 'proplogic';

lexp.validate('P∧Q');   // true
lexp.validate('P∧');    // false
lexp.validate('P & Q'); // true
```

---

## API

### `lexp.validate(expression)`

Validates whether a string is a well-formed propositional logic formula.

**Parameters**
- `expression` `{string}` — the formula to validate.

**Returns** `{boolean}` — `true` if the formula is well-formed, `false` otherwise.

Whitespace is ignored. Invalid or unrecognized characters return `false`.

```js
validatelexp('P∧Q');     // true
validatelexp('(P∨Q)→R'); // true
validatelexp('¬(¬P)');   // true
validatelexp('∧P');      // false
validatelexp('P∧∧Q');    // false
validatelexp(')(P)');    // false
```

---

### `lexp.tokenize(expression)`

Tokenizes a propositional logic expression into an array of typed tokens.

**Parameters**
- `expression` `{string}` — the expression to tokenize.

**Returns** `{Array<{type: string, value: string}>}` — an array of token objects, or `false` if the expression contains invalid characters.

**Throws** `Error` - Expression can not be formatted.

Token types: `operand`, `operator`, `not`, `open`, `close`.

```js
tokenizelexp('P∧Q');
// [
//   { type: 'operand',  value: 'P' },
//   { type: 'operator', value: '∧' },
//   { type: 'operand',  value: 'Q' }
// ]

tokenizelexp('P & Q');
// [
//   { type: 'operand',  value: 'P' },
//   { type: 'operator', value: '∧' },  ← alias normalized
//   { type: 'operand',  value: 'Q' }
// ]
```

---

### `lexp.format(expression)`

Normalizes an expression by stripping whitespace and replacing ASCII aliases with their canonical Unicode symbols.

**Parameters**
- `expression` `{string}` — the expression to format.

**Returns** `{string}` — the normalized expression.

**Throws** `Error` — Expression can not te formatted.

```js
formatlexp('P & Q');  // 'P∧Q'
formatlexp('P | Q');  // 'P∨Q'
formatlexp('!P > Q'); // '¬P→Q'
formatlexp('P = Q');  // 'P↔Q'
```

---

### `confusablesTable`

An exported object mapping ASCII aliases and Unicode lookalikes to their canonical logic symbols. Useful for displaying supported input formats to users.

```js
import { confusablesTable } from 'proplogic';

console.log(confusablesTable);
// { 'V': '∨', 'v': '∨', '&': '∧', '^': '∧', '~': '¬', '!': '¬', ... }
```

---

## Supported Symbols

### Operators

| Symbol | Meaning | ASCII Aliases |
|--------|---------|---------------|
| `∧` | Conjunction (AND) | `&`, `^`, `·` |
| `∨` | Disjunction (OR) | `v`, `V`, `\|`, `∥` |
| `→` | Implication | `>`, `⇒`, `⊃` |
| `↔` | Biconditional | `=`, `⇔`, `⟺` |
| `↮` | Not Equals | `≢`, `⇎` |
| `⊻` | Exclusive OR (XOR) | `+`, `⊕` |
| `⊽` | NAND | `↑` |
| `↓` | NOR | `↓` |
| `¬` | Negation (NOT) | `~`, `!` |

### Grouping

| Symbol | Meaning | Aliases |
|--------|---------|---------|
| `(` | Open parenthesis | `[`, `{`, `（`, `﹙` |
| `)` | Close parenthesis | `]`, `}`, `）`, `﹚` |

### Operands

Any single character matching `[A-Za-z]` or falling in the Unicode Greek block (`U+0370–U+03FF`) is treated as an operand (e.g., `P`, `q`, `α`, `φ`).

---
 
## Testing
 
```bash
npm run test
```
 
Tests are run with [Bun](https://bun.sh). Make sure you have Bun installed before running them.
 
```bash
curl -fsSL https://bun.sh/install | bash
```
 
---

## Contributing

Feel free to open a PR or create an issue at
[repository link](https://github.com/CristianMB2255/proplogic).

Additions to the characters map or confusables are welcome, as well as code changes.

---
## License

MIT