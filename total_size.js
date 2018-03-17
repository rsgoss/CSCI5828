/*
	CSCI 5828 – Spring 2018
	Homework 3
	Ryan Goss [no team]
*/

ar fs = require('fs');

var processDir = function(current_dir, callback) {
	fs.lstat(current_dir, function(err, stat) {
		if (err) throw err;

		if (stat.isFile()) {
			file_counter--;
			total += stat.size;
		} else if (stat.isDirectory()) {
			file_counter--;
			dir_counter++;
			fs.readdir(current_dir, function(err, files) {
				dir_counter--;
				if (err) throw err
				file_counter += files.length;
            	return Array.from(files).map(function(file) {
            		return getDirSize(current_dir + '/' + file);
            	})
			});
		} else {
			file_counter--;
		}
		if ((file_counter === 0) && dir_counter === 0) {
			return callback(null, total)
		}
	});
}

var getDirSize = function(dir) {
	processDir(dir, function(err, total) {
		if (root_dir.match(/^.$/)) {console.log(root_dir + "/", "- Total Size:" , total)}
		else if (root_dir.includes("..")) {console.log(root_dir + "/", "- Total Size:" , total)}
		else {console.log("./" + root_dir, "- Total Size:" , total)}
		});	
}

var total = 0;
var file_counter = 1;
var dir_counter = 0;
var args = process.argv.slice(2);
var root_dir = args[0];
console.log("processing..." , root_dir)

getDirSize(root_dir);
