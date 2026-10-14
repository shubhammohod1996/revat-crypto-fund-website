<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Revat website
- Keep the public homepage in `src/routes/index.tsx`, with section anchors for this single-page experience.
- Use the supplied WebGL halftone nebula in a standalone UI component; initialize browser APIs only inside effects to preserve SSR safety.
- Define all brand and animation color roles in `src/styles.css`; the shader resolves those semantic CSS tokens at runtime.
- Position the nebula cloud and main sparkle through shared focal-point shader parameters so composition stays aligned across viewport sizes.
- Keep portfolio allocation interactions illustrative and client-side; no investments or trader applications are submitted without a connected service.
- Use the shared Slider for the portfolio allocation illustration; its upper bound is a preview limit, not an investment cap.
- Render the four process steps with the shared GradientCard and bundled illustrations; keep copy and art in separate grid tracks to avoid overlap.
