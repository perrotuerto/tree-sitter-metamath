# Metamath tree-sitter grammar

## Use in python

Add this repo as dependency, for example:

```
uv add tree-sitter-metamath
```

Create a parser:

```
import tree_sitter_metamath as tsmetamath
from tree_sitter import Language

MM_LANGUAGE = Language(tsmetamath.language())

parser = Parser(MM_LANGUAGE)
```

Read a metamath database:

```
from pathlib import Path

tree = parser.parse(Path("path/to/database.mm").read_bytes())
```

Happy hacking!
