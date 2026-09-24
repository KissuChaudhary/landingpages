import { BackgroundStyle } from "./types";

export const BACKGROUND_STYLE_MAP: Record<BackgroundStyle, string> = {
  [BackgroundStyle.BLACK]: "a matte charcoal seamless backdrop with soft falloff to near‑black background.",
  [BackgroundStyle.GRAY]: "a neutral mid‑gray seamless paper; evenly lit; slight vignette background.",
  [BackgroundStyle.BEIGE]: "a light warm beige background; high‑key look; soft shadows only.",
  [BackgroundStyle.GRADIENT]: "a very faint center‑weighted gradient from dark to light; avoid banding background.",
  [BackgroundStyle.BROWN]: "a classic dark brown background with a gentle vignette.",
  [BackgroundStyle.BOKEH]: "an abstract shallow depth‑of‑field bokeh background with soft circular highlights.",
};

export const DAMAGE_DETECTION_PROMPT = `Review the restored image and decide if the remaining damage is so severe that the customer would likely request a refund or complain and output STRICT JSON ONLY.
Definitions:
- structural_damage: physical or age-related defects such as tears, scratches, rips, creases/folds, stains/water damage, mold/mildew, large dark or colorized spots/blotches, burn marks, holes, cracks, severe discoloration/color bleeding. These are the focus.
- non_structural_quality: minor grain/noise, mild blur, typical compression artifacts, natural texture loss, slight banding; these should be largely IGNORED unless extreme and obviously resembling structural_damage.
Return keys:
- overall_quality_score: number (0-100) where 100 = no structural_damage visible; THIS SCORE MUST NOT penalize minor non_structural_quality issues.
- confidence: number (0-1) indicating your confidence in the assessment.
- damage_categories: array of { name: string; severity: number (0-1); confidence: number (0-1); notes?: string } listing ONLY structural_damage types you see 
- recommended_second_pass_prompt: string (one concise prompt focused on removing remaining structural_damage conservatively while preserving facial and character identity).
Guidance:
- Exclude minor noise, mild blur, and typical compression artifacts from scoring and categories.
- Include a damage category only if it is clearly visible; set severity by its prominence/coverage (e.g., large stain across face = high severity).
- The recommended_second_pass_prompt MUST: preserve the original subject’s identity, facial features, and character consistency; avoid altering age, gender, facial structure, or distinctive marks; reduce structural damages non-destructively; keep skin texture natural (no plastic look); prevent over-sharpening halos and unnatural smoothing; keep background details intact ; avoid hallucinations and new elements; be a single, succinct command.
- Output ONLY JSON. No preface or markdown. Example:
{"overall_quality_score": 92, "confidence": 0.85, "damage_categories": [{"name":"stain/water_damage", "severity":0.6, "confidence":0.8}], "recommended_second_pass_prompt": "Carefully reduce remaining stains and water damage without altering the subject’s identity; avoid plastic smoothing and halos; preserve natural textures. paint comaplete backgorund in full frame for the teared/cracks photos, and join all peieces carefully."}`;

export const getPortraitPrompt = (backgroundStyleText: string, arrangement: string = "Generate new, appropriate, three-quarter (half-body) or full-body studio poses for all subjects. Subjects should be posed naturally as a group, oriented toward the camera.") => {
  return `You are an experienced, expert photographer and compositor.
Generate a single, high-resolution, photorealistic family portrait in a professional studio setting.
Identity & Subjects: Identify every unique individual from the provided input images. Use the exact facial identity of each person.
Scene & Composition: Place all identified individuals together in a classic, cohesive group portrait arrangement. 
against ${backgroundStyleText}
${arrangement}
Synthesis Requirements (Critical):  Apply unified, professional studio lighting (e.g., softbox) consistently across all subjects. Style must be studio-quality, high-detail, and photorealistic.
Constraints & Negative Prompts: CRITICAL: IGNORE all original poses, backgrounds, props, and lighting from the input images. DO NOT create a collage, "cut-and-paste," or "photoshop" composite. AVOID mismatched lighting, shadows, scale, or perspective. The final output must be a single, newly synthesized photograph. Ensure facial identities and clothing are preserved accurately.`;
};
