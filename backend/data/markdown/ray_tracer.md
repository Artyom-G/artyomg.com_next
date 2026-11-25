<title>Ray Tracer | Portfolio of Artyom Gabtraupov</title>

# Project Overview

A CPU path tracer written in C++. It renders a procedurally scattered field of spheres around three hero spheres, writing the result out as an image (the banner above is one of its renders).

# Technologies Used

**C++:** The whole renderer, with no graphics libraries.

**CMake:** Build setup.

# Key Features

- **Materials:** Lambertian (matte) surfaces, metals with adjustable fuzz, and glass with refraction, including a hollow glass bubble.
- **Anti-aliasing:** Multiple random samples per pixel, averaged together.
- **Bounce limit:** Rays reflect and refract up to a maximum depth.
- **Positionable camera:** Adjustable field of view, look-from and look-at points, and depth of field (defocus blur).
- **Procedural scene:** Hundreds of small spheres with randomly chosen materials and colours.

# Source

The code is on [GitHub](https://github.com/Artyom-G/RayTracingInOneWeekend).
