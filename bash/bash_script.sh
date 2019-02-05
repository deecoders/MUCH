#!/bin/bash
if [ $3==".c" ]; then
	gcc temp/$4 -o $2
	a="testcases/"
	b=$a$1
	c=$b"/"
	#echo $b
	#echo $c
	n=3
	d=$c"in_"
	e=$d$2
	f=$c"out_"
	g=$f$2
	h="temp"$2
	./$2 < $e > $h
	# echo $2
	diff $h $g | wc -l
	rm $2 $h
fi
