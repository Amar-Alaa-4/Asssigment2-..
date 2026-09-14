const path = require("path");
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

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
      console.log("error occurred. " + err.message);
      return;
    }
    console.log("The ${path.basename(filePath)} is deleted.");
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

// 13--
appEmitter.on('login', (userName) => {
  console.log(`User logged in: ${userName}`);
});

// 14--
function readNotesSync(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('the file content => ' + content);
}

// 15
function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log("error" + err.message);
      return;
    }
    console.log(" it Saved successfully.");
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
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

// 18
function readFileInChunks(filePath) {
  const readable = fs.createReadStream(filePath, { encoding: 'utf8' });

  readable.on('data', (chunk) => {
    console.log('Chunk: ', chunk);
  });

  readable.on('end', () => {
    console.log('Finished reading the file.');
  });

  readable.on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}

// 19
function copyFileWithStreams(sourcePath, destPath) {
  const readable = fs.createReadStream(sourcePath);
  const writable = fs.createWriteStream(destPath);

  readable.pipe(writable);

  writable.on("finish", () => {
    console.log("File copied using streams");
  });

  readable.on("error", (err) => {
    console.log("Error reading" + err.message);
  });

  writable.on('error', (err) => {
    console.log("Error writing " + err.message);
  });
}

// 20
function compressFile(sourcePath, destPath) {
  const readable = fs.createReadStream(sourcePath);
  const gzip = zlib.createGzip();
  const writable = fs.createWriteStream(destPath);

  pipeline(readable, gzip, writable, (err) => {
    if (err) {
      console.log("Pipeline failed " + err.message);
      return;
    }
    console.log("File compressed successfully");
  });
}

module.exports = {
  readFileInChunks,
  copyFileWithStreams,
  compressFile,
};const fs = require('fs');
const path = './users.json';

function readUsers() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }
  const data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
}
//Part2: Simple CRUD Operations Using HTTP (5 Grades)
// 1) 
app.post('/user', (req, res) => {
  const { name, age, email } = req.body;
  const users = readUsers();

  for (const id in users) {
    if (users[id].email === email) {
      return res.json({ message: "Email already exists." });
    }
  }

  const newId = Date.now().toString();
  users[newId] = { name, age, email };

  writeUsers(users);
  res.json({ message: "User added successfully." });
});

// 2)
app.patch('/user/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  if (!users[id]) {
    return res.json({ message: "User ID not found." });
  }

  const updates = req.body;
  users[id] = { ...users[id], ...updates };

  writeUsers(users);

 const updatedField = Object.keys(updates)[0];
  res.json({ message: `User ${updatedField} updated successfully.` });
});

// 3) 
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  if (!users[id]) {
    return res.json({ message: "User ID not found." });
  }

  delete users[id];
  writeUsers(users);
  res.json({ message: "User deleted successfully." });
});
// 4)  
app.get('/user', (req, res) => {
  const users = readUsers();
  const allUsers = [];

  for (const id in users) {
    const user = users[id];
    allUsers.push({
      id: id,
      name: user.name,
      age: user.age,
      email: user.email
    });
  }

  res.json(allUsers);
});

// 5) 
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const users = readUsers();

  if (users[id]) {
    const user = users[id];
    res.json({
      id: id,
      name: user.name,
      age: user.age,
      email: user.email
    });
  } else {
    res.json({ message: "User not found." });
  }
});