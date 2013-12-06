module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('build.json'),
    nodewebkit: {
        options: {
            build_dir: './build', // Destination for built apps.
            mac: true,            // OS X support.
            win: true,            // Windows support.
            linux32: false,       // Linux 32-bit support.
            linux64: false        // Linux 64-bit support.
        },
        src: ['./package.json', './www/**/*', './node_modules/phonegap/**/*']
    }
  });

  // Load the grunt plugins.
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Load task to launch app
  grunt.task.registerTask('open', 'Open the app', function() {
    var os = require('os'),
        opener = require('opener'),
        appName = grunt.config('pkg.name'),
        macPath = 'build/releases/appName/mac/appName.app',
        winPath = 'build/releases/appName/win/appName/appName.exe';

    macPath = macPath.replace(/appName/g, appName);
    winPath = winPath.replace(/appName/g, appName);

    opener((os.platform() === 'darwin') ? macPath : winPath);
  });

  // Default tasks.
  grunt.registerTask('default', ['nodewebkit']);

};
