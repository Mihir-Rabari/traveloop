module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "pnpm typecheck"
  ],
  "*.{json,md,css}": [
    "prettier --write"
  ]
}
