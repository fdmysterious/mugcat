#!/bin/bash

rm *_blur.jpg

mkdir out
for f in *.jpg
do
		echo "$f"
		convert -blur 10x10 $f out/${f%.*}_blur.jpg
done

mv out/* .
rm out -r
