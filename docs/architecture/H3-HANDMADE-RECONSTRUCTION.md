# MiniMax H3 Handmade Reconstruction in PARALLAX

PARALLAX exposes a bounded prompt compiler and verification receipt for 15-second reference-image reconstruction films.

## Capability

`parallax.video.handmade-reconstruction`

The capability compiles a rights-cleared reference identifier, one coherent construction method, and optional provider parameters into the canonical Agenttropolis prompt. It does not claim that a MiniMax endpoint or credentials are available.

## Closed-loop mapping

| PARALLAX stage | Reconstruction operation |
|---|---|
| Intent | Request a handmade reconstruction film |
| Authorize | Confirm reference rights and provider permission |
| Inspect | Identify the main subject and material logic |
| Operate | Compile the prompt and submit through an authorized adapter |
| Capture | Preserve the returned video URI and generation metadata |
| Verify | Check maker, hands, subject continuity, causal assembly, reference match, final reveal, and overlays |
| Receipt | Record the prompt version, provider parameters, output URI, checks, and result |

## Browser API

Load `public/parallax-h3-reconstruction.js`, then compile a request:

```js
const request = PARALLAX_H3.compileHandmadeReconstruction({
  referenceId: "sha256:REFERENCE_IMAGE_HASH",
  constructionMethod: "miniature fabrication",
  subjectHint: "the central agent avatar",
  aspectRatio: "1:1",
  seed: 333
});
```

After provider execution, issue a verification receipt:

```js
const receipt = PARALLAX_H3.createVerificationReceipt(request, {
  outputUri: "https://authorized-storage.example/output.mp4",
  sameMaker: true,
  maximumTwoHands: true,
  continuousSubject: true,
  noSpontaneousComponents: true,
  referenceMatch: true,
  cleanFinalReveal: true,
  noTextOverlay: true
});
```

A receipt is `verified` only when every check is explicitly true. Missing evidence fails closed.

## Authority boundary

The compiler prepares a request. It does not upload an image, call a provider, publish a video, or infer image rights. Those actions require separately authorized adapters. Generated does not mean verified.
