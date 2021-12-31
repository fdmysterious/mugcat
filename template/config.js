const path = require("path");

exports.project_path = path.resolve(__dirname);
exports.src_path     = path.resolve(path.join(exports.project_path, "src"  ));
exports.build_path   = path.resolve(path.join(exports.project_path, "build"));

exports.path_to_src = function(pth) {
    return path.resolve(path.join(exports.src_path, pth));
}

exports.path_to_build = function(pth) {
    return path.resolve(path.join(exports.build_path, pth));
}

exports.path
