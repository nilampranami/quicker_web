quicker
=======
View a series of images on autopilot, from the command-line via quicklook. Perfect for comics, archived image sets or displaying an auto-generated slideshow! Also supports viewing via the terminal.

Using quicklook requires OS X.

It currently only supports directories of unpacked images. If you are interested in .cbr/.cbz support... contact me. 

Install
-------

	npm install -g quicker
    
Usage
-----
Type `quicker -h` to get:

	Usage: quicker [options]
	
	Options:
	  -d, --directory   The path of the comic                             [required]
	  -f, --fullscreen  fullscreen
	  -H, --headless    display images as ascii console output
	  -i, --interval    interval between files (in ms)
	  -h, --help        Show help                                          [boolean]
	
	Examples:
	  quicker -d ~/foo/MyComic/   slideshow this directory


If you find any rough edges, please submit a bug!

Enjoy,

-Abbey Hawk Sparrow