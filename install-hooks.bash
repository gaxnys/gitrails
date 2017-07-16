#!/bin/bash

pushd .git/hooks > /dev/null

declare -a hooks=("post-commit"
                  "post-checkout"
                  "post-rewrite")

for hook in "${hooks[@]}"
do
    rm $hook 2> /dev/null
    ln -s ../../hook-scripts/$hook $hook
done

popd > /dev/null

echo "Installation done"
