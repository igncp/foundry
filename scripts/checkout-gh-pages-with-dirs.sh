# `git checkout gh-pages` but moving the `projects` and `common` dirs,
# so it doesn't have to reinstall modules and build assets. It copies them
# temporally to the directory above.

# No arguments

rm -rf ../foundry-tmp
mkdir ../foundry-tmp

cp -r projects ../foundry-tmp/
cp -r common ../foundry-tmp/

git checkout gh-pages

rm -rf projects
rm -rf common

mv ../foundry-tmp/projects .
mv ../foundry-tmp/common .

rm -rf ../foundry-tmp
