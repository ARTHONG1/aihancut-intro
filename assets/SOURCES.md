# Cosmic assets

Downloaded 2026-09-05. Original downloaded files are unmodified. Dimensions verified by decoding with System.Drawing; hashes are in manifest.json.

## Earth: Three.js examples distribution

Pinned revision: c4ffe022f2a4f982b42b7da5af79a87066a138ae
Source example: https://github.com/mrdoob/three.js/blob/c4ffe022f2a4f982b42b7da5af79a87066a138ae/examples/webgpu_tsl_earth.html
The example explicitly credits Solar System Scope, with textures resized and merged.
Original source and reuse license: https://www.solarsystemscope.com/textures/
License: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/
Commercial use, adaptation, and redistribution allowed with attribution, license link, and indication of changes. These image rights are distinct from the Three.js MIT software license (included as THREE-LICENSE.txt).
Suggested credit: Earth textures by Solar System Scope (https://www.solarsystemscope.com/textures/), CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); resized and channel-packed by Three.js contributors. Add any further modifications when used.

- earth_day_4096.jpg: 4096 x 2048, 2:1 equirectangular, sRGB day color.
  https://raw.githubusercontent.com/mrdoob/three.js/c4ffe022f2a4f982b42b7da5af79a87066a138ae/examples/textures/planets/earth_day_4096.jpg
- earth_night_4096.jpg: 4096 x 2048, 2:1 equirectangular, sRGB night/city-light color. Mask to the unlit hemisphere in rendering.
  https://raw.githubusercontent.com/mrdoob/three.js/c4ffe022f2a4f982b42b7da5af79a87066a138ae/examples/textures/planets/earth_night_4096.jpg
- earth_bump_roughness_clouds_4096.jpg: 4096 x 2048, 2:1 equirectangular DATA texture. R = bump elevation, G = roughness, B = cloud mask. No alpha channel. Sample BLUE for clouds; white/high values indicate clouds. Do not apply sRGB decoding to this packed data texture. Three.js example shapes cloud coverage with smoothstep(0.2, 1.0, sample.b). This is not a ready-to-use RGBA cloud overlay, and assigning it directly as a standard alphaMap would read the wrong channel.
  https://raw.githubusercontent.com/mrdoob/three.js/c4ffe022f2a4f982b42b7da5af79a87066a138ae/examples/textures/planets/earth_bump_roughness_clouds_4096.jpg

## Real galaxy photograph

m51_hubble_4669x3240.png: 4669 x 3240, NASA Hubble image of the Whirlpool Galaxy (M51) and companion NGC 5195. Rectangular photograph, not a spherical environment map or an image of the Milky Way. Suitable as a subtle distant background plate; original file is approximately 26 MB.
Source: https://svs.gsfc.nasa.gov/30852
Download: https://svs.gsfc.nasa.gov/vis/a030000/a030800/a030852/m51_full-hst-4669x3240.png
Required source credit: NASA, ESA, S. Beckwith (STScI), and The Hubble Heritage Team (STScI/AURA)
Reuse guidance: https://www.nasa.gov/nasa-brand-center/images-and-media/
NASA imagery is generally not subject to US copyright; credit the source, preserve third-party credits, and do not imply NASA endorsement of AI한컷 or any commercial product. The source links to NASA reproduction guidelines and has no item-specific copyright restriction displayed.

Site fallback derivative: m51_hubble_4669x3240.png resized to 2000x1388 and converted to JPEG (galaxy.jpg).
