Run them all and list them with number:
```zsh
find . -name "*.js" -exec node {} \; | cat -n
```