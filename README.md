# Metamath tree-sitter grammar

## Use in python

Add this repo as dependency, for example:

```
uv add "tree-sitter-metamath @ https://gitlab.com/perritotuerto/codigo/tree-sitter-metamath.git"
```

Create parser:

```
import tree_sitter_metamath as tsmetamath
from tree_sitter import Language

MM_LANGUAGE = Language(tsmetamath.language())

parser = Parser(MM_LANGUAGE)
```