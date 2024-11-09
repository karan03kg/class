const path = require ("path")

console.log(__dirname);  //Directory name
console.log(__filename); //path of directory with filename and extension
let dirname = __dirname;
let filename = __filename

console.log(path.basename(dirname))
console.log(path.basename(filename))

console.log(path.extname("main.js")) //extension name
console.log(path.dirname(__dirname))
console.log(path.isAbsolute("./path.js"))

let pathobj = path.parse(dirname)
let pathfileobj = path.parse(filename)
console.log(pathobj)
console.log(pathfileobj)

console.log(path.format(pathobj))  //format the object to diretory string

