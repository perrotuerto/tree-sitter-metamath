# Go to repo root
cd $(git rev-parse --show-toplevel)

for mm in opt/set.mm/*.mm; do
    filename=$(basename -- "$mm")
    echo "Making test $mm"
    cat <<EOF >test/corpus/"$filename".txt
===|||
$filename
===|||

$(cat "$mm")

---|||

$(tree-sitter parse --no-ranges "$mm")
EOF
done
