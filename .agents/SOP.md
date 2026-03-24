Kein Problem, das mache ich gerne für dich!

Wenn man sich beide Teile genau ansieht, fällt auf: Der zweite Teil ist eigentlich eine detaillierte Ausführung der Punkte 3, 4 und 5 aus dem ersten Teil. Dein erster Teil hatte diese Vorgaben sogar schon ziemlich gut als "Override Rules" integriert.

Ich habe die Redundanzen entfernt und alles zu einer nahtlosen, logisch strukturierten und übersichtlichen Master-SOP zusammengeführt. Du kannst sie direkt so kopieren und verwenden.
SYSTEM PROMPT & SOP: High-End Boutique Agency Portfolio

Description: 14-Day Premium Boutique Web Design SOP (Anton & Irene Style)
Agent: Antigravity
Total time: 30-40 hours of development
Tech stack: Astro, Tailwind CSS, Cloudflare Pages, React, GSAP, Spline 3D, Lenis (Smooth Scroll).
Target aesthetic: Brutalist, Premium Boutique, Highly Interactive, Kinesthetic (Anton & Irene style).
1. Core Directives & Setup

    No placeholders: No "lorem ipsum" or "TODOs". Generate complete, functional code blocks.

    Architecture: Use Astro for static layout/routing. Use React strictly for interactive client-side components (islands).

    Styling: Use Tailwind CSS exclusively via utility classes.

Dependency Injection Sequence:
Execute these installations before generating component code:

    npm create astro@latest premium-portfolio

    npx astro add tailwind

    npx astro add react

    npm install @splinetool/react-spline @splinetool/runtime

    npm install gsap @gsap/react

    npm install @studio-freight/lenis

2. Directory Structure

Generate exactly this structure:

    src/pages/index.astro (Main entry)

    src/layouts/Layout.astro (Global wrapper, Lenis setup, Dark theme setup)

    src/components/react/SplineHero.jsx (3D Interactive Hero)

    src/components/react/HoverSwitcher.jsx (Stop-motion portrait hover)

    src/components/react/ScrollBattle.jsx (GSAP scroll interaction)

3. Design System & Art Direction Constraints

Antigravity, you must strictly adhere to the following aesthetic rules to achieve a high-end, brutalist boutique agency feel. Do not use standard Tailwind spacing or typography scales.
Typography (The Core Aesthetic)

    Oversized Headings: Headings must be intrusive. Use viewport-based sizing (e.g., text-[8vw], text-[12vw]).

    Extreme Tracking: Headings must have negative letter-spacing (tracking-tighter or custom letter-spacing: -0.05em).

    Tight Line Heights: Must be incredibly tight (leading-none or leading-[0.8]) so multi-line text blocks look like solid graphical blocks.

    Contrasting Fonts: Pair a bold, grotesque Sans-Serif for headings with a clean, technical Monospace or elegant Serif for small UI elements/labels.

Color Palette (High Contrast & Brutalist)

    No Standard Grays: Do not use subtle gray scales. Use pure black (#000000), pure white (#FFFFFF), and one or two aggressively vibrant accent colors (e.g., a piercing neon orange or electric blue).

    Backgrounds: Should often be pitch black (Dark Theme) to make spotlight effects pop, or stark white for high contrast.

Layout & Grids (Breaking the Box)

    Asymmetrical Grids: Avoid standard symmetrical 12-column grids. Use asymmetrical CSS Grids (e.g., grid-cols-7 or grid-cols-11) to force off-center alignments.

    Intentional Overlap: Elements must overlap intentionally. Use negative margins or absolute positioning to let images break out of their containers and overlap typography.

4. Physics & Micro-Interactions (The "Premium" Feel)

Static pages feel cheap. The website must feel alive but heavy and deliberate. Implement these interaction rules:

    Smooth Scrolling (Mandatory): Integrate Lenis (by Studio Freight) or a similar smooth-scroll library. Standard browser scrolling is strictly forbidden. The scroll must feel buttery smooth with a slight easing/inertia.

    Custom Cursor: Hide the default browser cursor (cursor-none on body). Create a custom React component that follows the mouse (using a requestAnimationFrame loop for zero latency). The cursor must react to hover states (e.g., expanding into a circle with text like "VIEW", "DRAG", or blending with the background using mix-blend-mode: difference).

    Animation Easing Curves: When using GSAP or Framer Motion, never use linear or default ease-in-out. Use custom cubic-bezier curves or GSAP's power4.out / expo.out. Animations should start fast and decelerate smoothly.

    Magnetic Elements: Primary CTA buttons and navigation links must be "magnetic". When the custom cursor approaches them within a 50px radius, the button should slightly pull towards the cursor using physics-based spring animations.

5. Specific Component Overrides & Execution
Task A: SplineHero.jsx

    Objective: A React component that integrates Spline 3D scenes.

    Visuals: Combine interactive 3D visualization with a spotlight effect and responsive text content.

    Architecture: Must feature lazy-loaded Spline integration and a responsive layout with flex columns.

    Styling: Utilize gradient text effects, spotlight background effect, and ensure it is dark theme optimized.

    Crucial Override (Typography): The responsive text content over the Spline 3D scene must use a mix-blend-mode (like difference or exclusion) so the text dynamically changes color based on the 3D objects moving behind it.

Task B: HoverSwitcher.jsx (Anton & Irene Effect)

    Logic: Container cycles through an array of image URLs on onMouseMove.

    Crucial Override (0ms Transition): Ensure the images being switched do not have standard CSS transitions on opacity. The switch must be instant (0ms) on mouse movement to create the erratic, stop-motion flipbook effect. The images must be absolutely positioned and cover the full container, masked dynamically.

Task C: ScrollBattle.jsx

    Logic: Two SVGs moving from x: -100vw and x: 100vw into the center.

    Trigger: GSAP ScrollTrigger with scrub: true.

6. Review & Launch Gates

    Meta tags (Title, Description, Open Graph tags) must be present in Layout.astro.

    Configure Cloudflare Pages build command as npm run build and output directory as dist.