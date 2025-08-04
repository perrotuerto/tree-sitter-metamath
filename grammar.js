/**
 * @file A simple and flexible computer-processable language that supports rigorously verifying, archiving, and presenting mathematical proofs.
 * @author Ramiro Santa Ana Anguiano <hi@colima.press>
 * @license GPL-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// Based on Metamath Language EBNF, Appendix E, https://us.metamath.org/downloads/metamath.pdf
// For a ANTLR4 version cfr. https://github.com/antlr/grammars-v4/blob/master/metamath/metamath.g4
module.exports = grammar({
  name: "metamath",

  extras: ($) => [$._comment, $._whitechar],

  rules: {
    // Strictly follow
    database: ($) => repeat($.outermost_scope_stmt),
    outermost_scope_stmt: ($) =>
      choice($.include_stmt, $.constant_stmt, $.stmt),
    include_stmt: ($) => seq("$[", $.filename, "$]"),
    constant_stmt: ($) => seq("$c", repeat1($.constant), "$."),
    stmt: ($) =>
      choice(
        $.block,
        $.variable_stmt,
        $.disjoint_stmt,
        $.hypothesis_stmt,
        $.assert_stmt,
      ),
    block: ($) => seq("${", repeat($.stmt), "$}"),
    variable_stmt: ($) => seq("$v", repeat1($.variable), "$."),
    disjoint_stmt: ($) =>
      seq("$d", $.variable, $.variable, repeat($.variable), "$."),
    hypothesis_stmt: ($) => choice($.floating_stmt, $.essential_stmt),
    floating_stmt: ($) => seq($.label, "$f", $.typecode, $.variable, "$."),
    essential_stmt: ($) =>
      seq($.label, "$e", $.typecode, repeat($.math_symbol), "$."),
    assert_stmt: ($) => choice($.axiom_stmt, $.provable_stmt),
    axiom_stmt: ($) =>
      seq($.label, "$a", $.typecode, repeat($.math_symbol), "$."),
    provable_stmt: ($) =>
      seq(
        $.label,
        "$p",
        $.typecode,
        repeat($.math_symbol),
        "$=",
        $.proof,
        "$.",
      ),
    proof: ($) => choice($.uncompressed_proof, $.compressed_proof),
    uncompressed_proof: ($) => repeat1(choice($.label, "?")),
    compressed_proof: ($) =>
      seq("(", repeat($.label), ")", repeat1($.compressed_proof_block)),
    typecode: ($) => $.constant,
    filename: ($) => $.math_symbol,
    constant: ($) => $.math_symbol,
    variable: ($) => $.math_symbol,
    // Loosely follow
    label: ($) => /[\w\.-]+/,
    compressed_proof_block: ($) => /[A-Z\?]+/,
    math_symbol: ($) => /[\u0021-\u0023\u0025-\u007e]+/u, // ASCII non-whitespace printable characters - $
    _comment: ($) => seq("$(", repeat(/[[:ascii:]]/), "$)"),
    _whitechar: ($) => /\s+/,
  },
});
