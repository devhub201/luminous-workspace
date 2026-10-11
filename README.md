# Luminous Workspace

PROJECT: LUMO — PREMIUM PERSONAL AI WORKSPACE



Build a complete, polished, responsive frontend for LUMO, a futuristic personal AI assistant and intelligent workspace.



This is a real frontend development project, NOT a static mockup, landing page, or collection of disconnected screens.



The result must feel like a premium, cinematic AI workstation designed by an elite product design team.



1. DESIGN PHILOSOPHY



The visual inspiration is sophisticated science-fiction technology, advanced AI laboratories, futuristic instrumentation, and premium software interfaces.



The interface must feel:



- Intelligent

- Cinematic

- Minimal but technologically advanced

- Immersive

- Precise

- Premium

- Functional rather than decorative



STRICTLY AVOID:



- Cartoonish graphics

- Emoji-based interface icons

- Toy-like 3D objects

- Cheap gaming UI aesthetics

- Excessive neon glow

- Random floating particles everywhere

- Excessively rounded cards

- Oversized empty panels

- Generic SaaS dashboard templates

- Generic chatbot layouts

- Huge gradients used as substitutes for actual design

- Fake terminal output or fake system status



Every element must have a clear purpose.



2. LUMO VISUAL IDENTITY



Create a consistent design system.



Base palette



- Background: near-black with deep midnight navy undertones.

- Primary accent: refined electric cyan.

- Secondary accent: cool electric blue.

- Tertiary accent: restrained violet.

- Main text: soft white.

- Secondary text: muted cool gray.

- Borders: subtle blue-gray with low contrast.



Use cyan and blue as the primary visual identity. Violet should be used sparingly.



Avoid saturating every component with bright colors.



Typography



Use a modern, highly readable typeface such as Inter or a comparable clean sans-serif.



Establish a deliberate hierarchy between:



- Screen titles

- Section headings

- Body text

- Secondary descriptions

- Status labels

- Technical metadata



Avoid excessive letter spacing and unnecessary uppercase text.



Use consistent spacing, alignment, typography, border treatments, and component dimensions throughout the application.



3. SIGNATURE AI CORE — THE LUMO ORB



THIS IS THE MOST IMPORTANT VISUAL ELEMENT.



Create a sophisticated, animated AI core that becomes the recognizable identity of LUMO.



The orb must look like an advanced energy-processing core, NOT a cartoon ball or a glowing gaming logo.



Visual construction



Create the orb using layered visual elements such as:



- A deep, nearly black central core.

- Subtle internal cyan and electric-blue illumination.

- Multiple translucent energy shells.

- Thin orbital structures at different depths.

- Independently moving light paths.

- Controlled volumetric-style lighting.

- Carefully restrained particles.

- Subtle reflections and smooth luminosity transitions.



Create a convincing sense of depth through layering, opacity, gradients, and motion.



Do not simply stack numerous bright circles around a white dot.



Do not use a static image as the orb.



Prefer custom CSS, SVG, or Canvas techniques that work reliably in a mobile WebView. Use WebGL only if justified.



Orb animation states



IDLE:



- Slow, organic energy circulation.

- Subtle internal light movement.

- Gentle changes in luminosity.

- Calm, intelligent presence.



LISTENING:



- Increased responsiveness.

- Smooth energy pulses.

- A visual rhythm suggesting active audio input.



THINKING:



- Faster internal light movement.

- Controlled orbital acceleration.

- Gradually shifting energy patterns.



SPEAKING:



- Subtle rhythmic movement synchronized with audio amplitude when real audio data is available.

- Do not pretend to synchronize with audio if amplitude data is unavailable.



SUCCESS:



- A brief, restrained cyan confirmation pulse.



ERROR:



- A subtle amber or red warning state.



LOADING:



- Continuous, low-intensity motion.



All animations must transition smoothly.



Respect reduced-motion preferences and optimize for mobile performance and battery life.



The orb must remain visually impressive without overwhelming the rest of the interface.



4. APPLICATION LAYOUT



Design LUMO as a landscape-first, immersive AI workspace.



The interface should adapt intelligently to portrait phones, landscape phones, and wider displays.



Use a structured layout with:



- A compact navigation rail or contextual navigation.

- A primary workspace.

- Contextual side panels when useful.

- A dedicated AI core area.

- Consistent system-level status indicators.



Do not force three fixed-width panels into a viewport that cannot accommodate them.



In narrow landscape layouts, adapt the composition, collapse secondary panels, or provide an intentional responsive transition.



Never allow important controls to overlap or disappear behind Android system navigation.



Avoid excessive scrolling in the primary workspace.



5. BUILD THESE SCREENS



Create the following connected application screens with consistent design.



A. HOME / AI WORKSPACE



The main LUMO experience.



Include:



- LUMO branding.

- Signature animated orb.

- A concise, personalized greeting.

- An intuitive interaction area.

- Quick-access tools.

- Recent conversations or activity when available.

- Contextual status information.

- Clear navigation to other features.



The home screen must feel like an advanced personal AI workstation, not a conventional chatbot landing page.



Do not permanently hardcode the greeting to a specific person's name. Make personalization configurable.



B. AUTHENTICATION



Create a premium authentication screen featuring:



- LUMO branding.

- Refined animated AI core.

- Clear identity-verification messaging.

- A primary biometric authentication action.

- A secondary recovery action.

- Readable privacy information.

- Honest loading, unavailable, cancelled, and failure states.



IMPORTANT:

This frontend is not automatically connected to native biometric authentication.



Implement a clean authentication interface and a well-defined integration boundary.



Do not claim biometric verification succeeded unless a real authentication provider confirms it.



Do not fabricate secure sessions or authenticated backend identities.



C. CHAT WORKSPACE



Build a modern AI conversation interface.



Include:



- Conversation history/navigation.

- A polished conversation view.

- User and assistant message styles.

- Message composition.

- Send, stop, and loading states.

- Copy and retry actions where appropriate.

- Code and formatted-text presentation.

- File-attachment interface.

- Clear error handling.



Do not make the interface resemble a direct clone of a generic chatbot.



Make the conversation area feel integrated with the broader LUMO workspace.



If no real AI API is connected, clearly identify the interface as a frontend preview. Do not generate fake AI responses and present them as real model output.



D. VOICE MODE



Create a dedicated immersive voice interface.



Include:



- A prominent animated orb.

- Listening, processing, speaking, and idle states.

- Microphone permission and error states.

- Clear microphone controls.

- A visible way to exit voice mode and return to text chat.



Voice interaction must only be described as functional when real microphone and speech-processing integration exists.



E. CAMERA / VISION MODE



Create a camera-focused interface for future visual assistance.



Include:



- Camera preview area.

- Capture control.

- Image-analysis state.

- Results panel.

- Permission-denied and camera-unavailable states.



Use real browser camera access where supported and permission is granted.



Do not fabricate object detection, prices, object identities, or visual-analysis results.



Keep native Android camera integration as a clearly defined future integration point if required.



F. TOOLS WORKSPACE



Create an organized tools area for:



- Web search

- Calculator

- File intelligence

- Memory

- Coding tools

- Device integrations



Use a polished, consistent component system.



Only present a tool as connected or functional when it actually works. Unimplemented integrations must be visibly marked as unavailable, preview, or requiring setup.



G. SETTINGS



Include:



- Theme preferences

- Appearance controls

- Animation preferences

- Accessibility options

- Permission explanations

- Application information



Controls should work locally where appropriate.



Do not display fabricated account information or connected-service status.



6. SKELETON LOADING AND MICRO-INTERACTIONS



Implement reusable skeleton components for genuine asynchronous loading.



Requirements:



- Low-contrast placeholders matching the actual content layout.

- Subtle shimmer animation.

- Smooth transitions into loaded content.

- Proper error and empty states.

- No permanent skeletons when no request is running.



Add carefully tuned hover, focus, press, and transition effects where applicable.



On touch devices, provide responsive press states rather than desktop-only hover interactions.



Avoid excessive animation and motion that interferes with usability.



7. COMPONENT ARCHITECTURE



Use a maintainable React and TypeScript architecture.



Recommended structure:



- Reusable design tokens.

- Shared typography and spacing rules.

- Reusable buttons, panels, status indicators, and skeletons.

- A dedicated orb component with explicit visual states.

- Separate components for each screen.

- Centralized navigation.

- Clearly defined interfaces for future API and native integrations.



Use the project's existing supported framework and dependencies when possible.



Do not introduce unnecessary dependencies.



Keep components understandable and easy to integrate into an existing Android application.



8. FUNCTIONAL REQUIREMENTS



This must be a navigable frontend, not just a single attractive page.



- Navigation between implemented screens must work.

- Buttons must have meaningful behavior.

- Forms must validate their inputs.

- Settings should persist locally when appropriate.

- Loading, empty, unavailable, and error states must be designed.

- Layouts must adapt to viewport changes.

- The application must not rely on hardcoded device-specific positioning.

- Do not include secrets or API keys in frontend code.



Clearly separate implemented functionality from preview-only functionality.



9. QUALITY AND RESPONSIVENESS



Prioritize the following:



1. Exceptional visual quality.

2. Realistic, sophisticated animated orb.

3. Clean typography.

4. Consistent color hierarchy.

5. Responsive landscape and portrait layouts.

6. Functional navigation.

7. Accessible controls and readable text.

8. Mobile performance.

9. Maintainable source code.



Test narrow landscape dimensions carefully.



Ensure the primary controls remain visible and panels never overlap.



Use deliberate responsive layout changes instead of shrinking everything indiscriminately.



10. FINAL DELIVERABLE



Build the complete frontend with working navigation and polished visual styling.



Do not stop after creating a hero section or one screen.



Do not substitute screenshots for functional components.



After implementation:



- Check the complete application visually.

- Fix layout issues.

- Check TypeScript errors.

- Test navigation.

- Verify responsive layouts.

- Identify all integrations that still require real backend or native implementation.



The goal is a premium LUMO frontend that can later be integrated into an existing Android application through its source code.



FINAL DESIGN PRINCIPLE:



LUMO should feel like a sophisticated AI presence inside an advanced personal workstation.



The orb is its signature. The interface supports the orb, rather than competing with it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ce15bcc-c165-453f-8c30-252bfde94fdf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
