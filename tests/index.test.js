import { confusablesTable, lexp } from "../src/index.js"
import { expect, test } from "bun:test";

test("well-formed", () => {
    expect(lexp.validate("!(P ^ Q) > ([Q | R] + P)")).toBeTruthy();
});

test("well-formed-greek", () => {
    expect(lexp.validate("!(φ ^ ψ) > ([ψ | χ] + φ)")).toBeTruthy();
});

test("malformed", () => {
    expect(lexp.validate("^(P ^ Q)")).toBeFalsy();
});

test("format", () => {
    expect(lexp.format("!(P ^ Q) > ([Q | R] + P)")).toBe("¬(P∧Q)→((Q∨R)⊻P)");
});

test("format-malformed", () => {
    expect(() => lexp.format("...")).toThrowError("Invalid Character");
});

test("tokenize", () => {
    expect(lexp.tokenize("!P")).toEqual([
        {
            type: "not",
            value: "¬",
        }, {
            type: "operand",
            value: "P",
        }
    ]);
});

test("tokenize-invalid", () => {
    expect(() => lexp.tokenize("...")).toThrowError("Invalid Character");
});