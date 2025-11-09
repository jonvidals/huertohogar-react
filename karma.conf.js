// =============================
// ⚙️ Karma + Jasmine + React + Puppeteer
// =============================


module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "karma-typescript"],

    files: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx"
    ],

    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
      "src/**/*.tsx": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        target: "ES2020",
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        jsx: "react-jsx",                        
        module: "commonjs",
        moduleResolution: "node",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        resolveJsonModule: true,               
        skipLibCheck: true
      },
      exclude: ["node_modules"]
    },

    reporters: ["progress", "karma-typescript"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],               
    singleRun: false,
    concurrency: Infinity
  });
};
