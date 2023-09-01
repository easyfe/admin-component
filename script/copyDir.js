const fse = require("fs-extra");

function copyDir(sourcePath, destinationPath) {
    fse.copySync(sourcePath, destinationPath, { overwrite: true });
}

copyDir("./packages", "./docs");
