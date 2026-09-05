# AI한컷 Cosmic Intro

A 14-second cosmic flight to Incheon, delivered as a standalone embeddable player.

## Add to your web app

```html
<script src="https://arthong1.github.io/aihancut-intro/intro.js"></script>
<script>
  AIHancutIntro.play({
    onComplete: () => {
      // The intro is closed; continue with your existing app.
    }
  });
</script>
```

The root page is a working integration example. The iframe player is at `embed/`.
The SDK restores the host page after completion, cancellation or playback failure.
See [INTEGRATION.md](INTEGRATION.md) for options and integration details.

## Deployment

This repository contains prebuilt static files. GitHub Pages serves the root of the `main` branch. `.nojekyll` keeps the distribution unchanged. No server or API key is required.

## Credits

Earth/Moon textures: Solar System Scope, CC BY 4.0. Incheon photographs: IFEZ, KOGL Type 1. Full attribution and changes are documented in [Earth credits](assets/SOURCES.md), [Moon credits](assets/MOON-SOURCES.md) and [Incheon credits](assets/NIGHT-SOURCES.md). The lunar terrain is an artistic reconstruction and the city ending is photo-based 2.5D.

Bundled open-source software licenses are retained in [THIRD-PARTY-LICENSES.txt](THIRD-PARTY-LICENSES.txt).
