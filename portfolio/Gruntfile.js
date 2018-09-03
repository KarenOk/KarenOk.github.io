module.exports = function (grunt) {
    grunt.initConfig({
        responsive_images:{
            dev: {
                options: {
                    engine: "im",
                    sizes: [{

                    },{
                        width: "400",
                        suffix: "_1x",
                        quality: "90"
                    }, {
                        width: "750",
                        suffix: "_2x",
                        quality: "90"
                    }]
            },
            files: [{
                expand: true,
                src: ["*.{jpg,jpeg,png,gif}"],
                cwd: "images/resize/",
                dest: "images_resp/"
            }]
        }
    },

    clean : {
        dev : {
            src: ["images_resp/*{jpg,png,jpeg,gif}"]
        }
    }
});

    grunt.loadNpmTasks("grunt-responsive-images");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.registerTask("default", ["clean", "responsive_images"]);
}