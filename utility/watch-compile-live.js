const fs = require("fs");
const chokidar = require("chokidar");
const path = require("path");
const { spawn } = require("child_process");

const scriptFolderPath = "./script";
const htmlFolderPath = "./html";
const styleFolderPath = "./style";
const outputFolderPath = "./output";
const ignoredFiles = [];
const cloudflaredPath = "C:\\Program Files (x86)\\cloudflared\\cloudflared.exe"; // Updated path

let debounceTimeout;
let cloudflaredUrls = { scriptUrl: "", styleUrl: "" };
let server;
let cloudflared;

// Ensure output directory exists
if (!fs.existsSync(outputFolderPath)) {
  fs.mkdirSync(outputFolderPath);
}

// Function to read script files without wrapping them in <script> tags
function getScriptFilesContent() {
  const scriptFiles = fs
    .readdirSync(scriptFolderPath)
    .filter((file) => file.endsWith(".js") && !ignoredFiles.includes(file));
  let scriptContent = "";

  scriptFiles.forEach((file) => {
    const filePath = path.join(scriptFolderPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    scriptContent += `${fileContent}\n`;
  });

  return scriptContent;
}

// Function to read HTML files without wrapping
function getHtmlFilesContent() {
  const htmlFiles = fs
    .readdirSync(htmlFolderPath)
    .filter((file) => file.endsWith(".html") && !ignoredFiles.includes(file));
  let htmlContent = "";

  htmlFiles.forEach((file) => {
    const filePath = path.join(htmlFolderPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    htmlContent += `${fileContent}\n`;
  });

  return htmlContent;
}

// Function to read CSS files without wrapping them in <style> tags
function getStyleFilesContent() {
  const styleFiles = fs
    .readdirSync(styleFolderPath)
    .filter((file) => file.endsWith(".css"));
  let styleContent = "";

  styleFiles.forEach((file) => {
    const filePath = path.join(styleFolderPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    styleContent += `${fileContent}\n`;
  });

  return styleContent;
}

// Function to compile all contents into their respective output files
function compileFiles() {
  const htmlContent = getHtmlFilesContent();
  const styleContent = getStyleFilesContent();
  const scriptContent = getScriptFilesContent();

  fs.writeFileSync(
    path.join(outputFolderPath, "scripts.js"),
    scriptContent,
    "utf-8"
  );
  fs.writeFileSync(
    path.join(outputFolderPath, "style.css"),
    styleContent,
    "utf-8"
  );
  fs.writeFileSync(
    path.join(outputFolderPath, "head.html"),
    htmlContent,
    "utf-8"
  );

  // Append the cloudflared embed code if URLs are available
  appendCloudflaredLinks();

  console.log("Files compiled successfully to the output folder.");
}

// Function to append cloudflared links to the head.html file
function appendCloudflaredLinks() {
  if (cloudflaredUrls.scriptUrl && cloudflaredUrls.styleUrl) {
    const embedCode = `
<!-- Place these lines in the head of your site -->
<script src="${cloudflaredUrls.scriptUrl}"></script>
<link rel="stylesheet" href="${cloudflaredUrls.styleUrl}">
`;

    const headHtmlPath = path.join(outputFolderPath, "head.html");
    fs.appendFileSync(headHtmlPath, embedCode, "utf-8");

    console.log("Cloudflared links appended to head.html");
    console.log("Embed Code:\n", embedCode);
  }
}

// Function to handle debounced CSS file change events
function handleCssFileChange() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(compileFiles, 200);
}

// Function to handle immediate file change events
function handleImmediateFileChange() {
  compileFiles();
}

// Initialize watchers.
const scriptWatcher = chokidar.watch(scriptFolderPath, {
  persistent: true,
  ignored: (file) => ignoredFiles.includes(file),
});

const htmlWatcher = chokidar.watch(htmlFolderPath, {
  persistent: true,
  ignored: (file) => ignoredFiles.includes(file),
});

const styleWatcher = chokidar.watch(styleFolderPath, {
  persistent: true,
});

// Add event listeners.
scriptWatcher
  .on("change", handleImmediateFileChange)
  .on("add", handleImmediateFileChange)
  .on("ready", compileFiles);
htmlWatcher
  .on("change", handleImmediateFileChange)
  .on("add", handleImmediateFileChange)
  .on("ready", compileFiles);
styleWatcher
  .on("change", handleCssFileChange)
  .on("add", handleCssFileChange)
  .on("ready", compileFiles);

console.log("Watching for changes...");

// Start a simple server to serve the output files
const express = require("express");
const app = express();

app.use(express.static(outputFolderPath));

server = app.listen(3000, () => {
  console.log("Server is running on port 3000");

  cloudflared = spawn(cloudflaredPath, ["tunnel", "--url", "http://localhost:3000"]);

  const captureOutput = (data) => {
    const output = data.toString();
    const urlMatch = output.match(/https:\/\/[-\w.]+\.trycloudflare\.com/);
    if (urlMatch) {
      const url = urlMatch[0];
      cloudflaredUrls.scriptUrl = `${url}/scripts.js`;
      cloudflaredUrls.styleUrl = `${url}/style.css`;

      // Append cloudflared links to head.html after server starts
      appendCloudflaredLinks();

      console.log("Cloudflared URL:", url);
    }
  };

  cloudflared.stdout.on("data", captureOutput);
  cloudflared.stderr.on("data", captureOutput);

  cloudflared.on("error", (err) => {
    console.error("Failed to start cloudflared:", err);
  });

  cloudflared.on("close", (code) => {
    console.log(`Cloudflared process exited with code ${code}`);
  });
});

// Handle cleanup on exit
const cleanup = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed.");
    });
  }

  if (cloudflared) {
    cloudflared.kill('SIGINT');
    console.log("Cloudflared process terminated.");
  }
};

process.on("exit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  cleanup();
  process.exit(1);
});
