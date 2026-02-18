const postcss = require("postcss");
const path = require("path");
const { readFileSync } = require("fs");
const resolve = require("resolve");

module.exports = () => {
  let pluginName = "postcss-nested-import-tailwind";

  return {
    postcssPlugin: pluginName,
    Once(root, { result }) {
      root.walkAtRules("nested-import", (node) => {
        if (
          !node.params ||
          typeof node.params !== "string" ||
          node.params.length < 3
        ) {
          return;
        }

        let id = node.params
          .replace(/^(url\(\s*)?['"]?/, "")
          .replace(/['"]?\s*(\))?$/, "");

        let basedir = process.cwd();
        if (node.source && node.source.input && node.source.input.file) {
          basedir = path.dirname(node.source.input.file);
        }

        try {
          let resolvedPath = resolve.sync(id, {
            basedir,
            extensions: [".css"],
            moduleDirectory: ["web_modules", "node_modules"],
            packageFilter: (pkg) => {
              if (pkg.style) pkg.main = pkg.style;
              else if (!pkg.main || !/\.css$/.test(pkg.main))
                pkg.main = "index.css";
              return pkg;
            }
          });

          let replacement = readFileSync(resolvedPath, "utf8");
          let parsed = postcss.parse(replacement, { from: resolvedPath });
          node.replaceWith(parsed);

          result.messages.push({
            file: resolvedPath,
            parent: result.opts.from,
            plugin: pluginName,
            type: "dependency"
          });
        } catch (error) {
          throw node.error(`Error reading file:\n${id}`);
        }
      });
    }
  };
};

module.exports.postcss = true;
