import { readdirSync, stat } from "fs";
import { join, resolve } from "path";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

const retrieveInputHtmlFiles = () => {
  function walk(dir) {
    return readdirSync(dir, { withFileTypes: true })
      .flatMap((file) => file.isDirectory()
        ? walk(join(dir, file.name))
        : join(dir, file.name)
      );
  }


  const inputNameFromPath = (path) => path.replace(/\//gm, '-').replace('src-', '').replace('.html', '')

  const htmlFiles = walk('./src')
    .filter(path => path.endsWith('.html'))
    .map(path => [
      inputNameFromPath(path),
      path
    ]);

  console.info(
    "\nFollowing html files will be served:",
    htmlFiles.map(([name, path]) => `\n- ${path} (named ${name})`).join(""),
    "\n"
  );

  return Object.fromEntries(htmlFiles);
}

const input = retrieveInputHtmlFiles();

// plugin
const redirectToDir = ({ root }) => ({
  name: "redirect-to-dir",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const filePath = join(root, req.url);

      stat(filePath, (err, stats) => {
        if (!err && stats.isDirectory() && !req.url.endsWith("/")) {
          res.statusCode = 301;
          res.setHeader("Location", req.url + "/");
          res.setHeader("Content-Length", "0");
          res.end();
          return;
        }

        next();
      });
    });
  },
});

export default defineConfig({
  root,
  publicDir: "../static/",
  plugins: [redirectToDir({ root }), viteTsconfigPaths()],
  base: "./",
  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input,
    },
  },
});
