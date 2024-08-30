const globalExternalName = "nago";

var fs = require("fs").promises, esbuild = require("esbuild");
const { exec } = require('node:child_process');

(async ()=>{
  try{
    await fs.rm("./dist/nago.min.js");
    await fs.rm("./dist/nago.esb.js");
    //await fs.rm("./dist/nago.esb.map");
    await fs.rm("./dist/nago.gcc.js");
  }catch(e){}
  var result = await esbuild.build({
    entryPoints: ["./src/index.js"],
    globalName: globalExternalName,
    platform: "browser",
    format: "iife",
    //sourcemap: "external",
    bundle: true,
    minify: true,
    outfile: "./dist/nago.esb.js",
    logLevel: "verbose"
  });
  result.errors.forEach(console.log);
  result.warnings.forEach(console.log);

  exec("npx google-closure-compiler --js=dist/nago.esb.js --js_output_file=dist/nago.gcc.js --compilation_level=ADVANCED_OPTIMIZATIONS --externs ./gcc_externs.js", async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    await fs.writeFile("./dist/nago.min.js",`var ${globalExternalName}=${(await fs.readFile("./dist/nago.gcc.js", {encoding: "utf-8"})).replace(/[\r\n]+/gm, "")}if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports)exports=module.exports=${globalExternalName};exports.${globalExternalName}=${globalExternalName};}else if(typeof root!=='undefined')root['${globalExternalName}']=${globalExternalName};else window['${globalExternalName}']=${globalExternalName};`, {encoding: "utf-8"});
    await fs.rm("./dist/nago.esb.js");
    //await fs.rm("./dist/nago.esb.map");
    await fs.rm("./dist/nago.gcc.js");
  });
})();
