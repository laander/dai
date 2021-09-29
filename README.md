# Dai

A minimalistic todo app that does as little as possible.

- [Keyboard first](src/constants/hotkeys.ts) (don't lift your fingers)
- Super fast (no cloud)
- Tiny (only 7 mb)

---

[Download for MacOS](https://github.com/laander/dai/releases/latest/download/Dai_0.1.0_x64.dmg)

<img src="misc/app-showcase.png" width="787px" />

---

## Motivation

I wanted to play around with [Chakra UI](https://chakra-ui.com/) and [Tauri](https://tauri.studio/), so I do what any uninspired developer does: build a todo app.

On another note, most native todo apps for MacOS are bloated if you just want a simple list to chew through daily. And most of them have mediocre keyboard support.

## Development

React:

```bash
# Install deps
yarn

# Run devserver
yarn start

# Build for prod
yarn build
```

Tauri:

```bash
# Install deps
brew install gcc
xcode-select --install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify all looks good
yarn tauri info

# Run in dev mode
yarn tauri dev

# Build for release
yarn tauri build
```

## License

MIT _- have fun!_
