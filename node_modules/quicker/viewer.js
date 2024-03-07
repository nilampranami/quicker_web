(function (root, factory) {
    if (typeof define === 'function' && define.amd){
        define(['fs', 'node-dir', 'extended-emitter', 'async-arrays', 'exec', 'osx-quicklook', 'ascii-art'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(
            require('fs'), 
            require('node-dir'), 
            require('extended-emitter'), 
            require('async-arrays'), 
            require('child_process').exec, 
            require('osx-quicklook'), 
            require('ascii-art')
        );
    } else {
        root.comicViewer = factory(root.fileSystem, root.nodeDir, root.Emitter, root.AsyncArrays, root.exec, root.OSXQuicklook);
    }
}(this, function (fs, dir, Emitter, arrays, exec, quicklook, art) {
    function Viewer(options){
        this.options = options || {};
        //todo: make this 'native' option
    }
    function terminal(pages, options, cb){
        arrays.forEachEmission(pages, function(page, index, done){
            var file = options.directory?options.directory+'/'+page:page;
            art.image({
                filepath: file,
	            alphabet:'variant4'
	        }, function(text){
    	       //exec('clear', function(){
                   setTimeout(function(){
                       console.log('\033[2J');
                       console.log(text);
                       done();
                   }, options.interval || 2000);
    	       //});
	        });
        }, function(){
            if(cb) cb();
        })
    }
    
    Viewer.prototype.display = function(dir, pages, cb){
        if(this.options.console){
            terminal(pages, {
                directory:dir, 
                fullscreen:this.options.fullscreen,
                interval:this.options.interval
            }, function(){
                if(cb) cb();
            });
        }else{
            switch(process.platform){
                case 'darwin':
                    quicklook(pages, {
                        directory:dir, 
                        fullscreen:this.options.fullscreen,
                        interval:this.options.interval
                    }, function(){
                        if(cb) cb();
                    });
                    break;
                case 'linux':
                    // todo:
                    // https://www.npmjs.com/package/is-gnome => eog
                    
                    break;
                default : throw new Exception('Unsupported platform: '+process.platform+"\n Currently only supported on OS X.");
            }
        }
    };
    Viewer.prototype.read = function(book, cb){
        var viewer = this;
         viewer.listPages(book, function(err, dir, pages){
             viewer.display(dir, pages, function(){
                 if(cb) cb();
             });
        });
    };
    Viewer.prototype.listPages = function(book, cb){
        var root = this.options.directory;
        var path = root?(book?root+'/'+book:root):book
        dir.files(path, function(err, files) {
             if (err) throw err;
             files = files.filter(function(file){
                 return file[0] !== '.';
             }).map(function(file){
                 return root?file.substring(root.length):file;
             });
             return cb(undefined, root, files);
        });
    };
    Viewer.prototype.listBooks = function(cb){
         fs.readdir(this.options.directory, function(err, files){
             if(err) return cb(err);
             files = files.filter(function(file){
                 return file[0] !== '.';
             });
             return cb(undefined, files);
         });
    };
    return Viewer;
}));