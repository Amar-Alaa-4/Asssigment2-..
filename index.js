const path = require('path');
const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');

// 1.
function showPathInfo() {
  const info = { File: __filename, Dir: __dirname };
  console.log(info);
  return info;
}

const Show_route_information = showPathInfo;

// 2
function getFileName(fullPath) {
  return path.basename(fullPath);
}

const get_File_Name = getFileName;

// 3
function buildPath(fileObj) {
  return path.format(fileObj);
}

// 4
function getExtension(fullPath) {
  return path.extname(fullPath);
}

// 5
function parseFilePath(fullPath) {
  const parsed = path.parse(fullPath);
  return { Name: parsed.name, Ext: parsed.ext };
}

// 6
function isAbsolutePath(somePath) {
  return path.isAbsolute(somePath);
}

// 7
function joinSegments(...segments) {
  return path.join(...segments);
}

// 8
function resolveToAbsolute(relativePath) {
  return path.resolve(relativePath);
}

// 9
function joinTwoPaths(basePath, subPath) {
  return path.join(basePath, subPath);
}

// 10
function deleteFileAsync(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('حصل خطأ: ' + err.message);
      return;
    }
    console.log(`The ${path.basename(filePath)} is deleted.`);
  });
}

// 11
function createFolderSync(folderPath) {
  try {
    fs.mkdirSync(folderPath);
    return 'Success';
  } catch (err) {
    return 'Failed: ' + err.message;
  }
}

// 12
const appEmitter = new EventEmitter();
appEmitter.on('start', () => {
  console.log('Welcome event triggered!');
});

// 13
appEmitter.on('login', (userName) => {
  console.log(`User logged in: ${userName}`);
});

// 14
function readNotesSync(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('the file content => ' + content);
}

// 15
function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log('خطأ: ' + err.message);
      return;
    }
    console.log('تم الحفظ بنجاح');
  });
}

// 16
function checkPathExists(somePath) {
  return fs.existsSync(somePath);
}

// 17
function getSystemInfo() {
  return { Platform: os.platform(), Arch: os.arch() };
}

module.exports = {
  showPathInfo,
  Show_route_information,
  getFileName,
  get_File_Name,
  buildPath,
  getExtension,
  parseFilePath,
  isAbsolutePath,
  joinSegments,
  resolveToAbsolute,
  joinTwoPaths,
  deleteFileAsync,
  createFolderSync,
  appEmitter,
  readNotesSync,
  writeFileAsync,
  checkPathExists,
  getSystemInfo,
};
