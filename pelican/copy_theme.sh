#!/bin/bash

echo "Importing theme from template folder..."

curdir=$(dirname "$0")
tmpl="$curdir/../template/build"
theme="$curdir/themes/mugcat"

echo " - Copying from $tmpl"

cp -r $tmpl/js $theme/static
cp -r $tmpl/index.css $theme/static/css
cp -r $tmpl/assets/* $theme/static

echo "OK !"
