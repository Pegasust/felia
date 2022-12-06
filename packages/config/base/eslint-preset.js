module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/docs/",
        "apps/web/",
        "apps/about-me/",
        "packages/ui/",
        "packages/config/base/",
        "packages/config/tailwind/",
        "packages/tsconfig/",
      ],
    },
  },
};
