package tree_sitter_metamath_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_metamath "github.com/tree-sitter/tree-sitter-metamath/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_metamath.Language())
	if language == nil {
		t.Errorf("Error loading Metamath grammar")
	}
}
