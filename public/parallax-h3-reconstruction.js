(function (global) {
  "use strict";

  const VERSION = "1.0.0";
  const ALLOWED_METHODS = Object.freeze([
    "clay sculpting",
    "miniature fabrication",
    "sewing",
    "mechanical assembly",
    "wood carving",
    "metalworking"
  ]);

  function required(value, name) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError(name + " is required");
    }
    return value.trim();
  }

  function compileHandmadeReconstruction(input) {
    const config = input || {};
    const constructionMethod = required(config.constructionMethod, "constructionMethod");
    const referenceId = required(config.referenceId, "referenceId");
    const subjectHint = config.subjectHint ? " " + String(config.subjectHint).trim() : "";

    const prompt = `A cinematic creation film follows one maker reconstructing the main subject${subjectHint} shown in the referenced image completely from scratch using ${constructionMethod} as the single continuous construction method. The referenced image defines the finished subject’s complete visible appearance, proportions, structure, materials, colors, clothing or surface details, and distinctive features; ignore its background, framing, lighting, and unrelated elements.

Begin directly on an empty, clean virtual workbench. Use a stable front three-quarter overhead view that keeps the developing subject readable. There is one maker throughout, represented by the same consistent left and right hands and forearms. Show no more than two hands at once.

From 0 to 14 seconds, the entire creation unfolds as a clearly accelerated timelapse with rapid, purposeful hand movement and restrained motion blur. Short jump cuts compress repetitive manual work only after each action has visibly completed. Every cut inherits the exact form and progress left by the previous action.

0-2 seconds: One hand enters already holding the first foundation material, armature, or base element appropriate to the referenced subject and places it at the center. The second hand steadies it as the maker establishes the initial supporting form.

2-8 seconds: The maker rapidly develops the subject’s major structure and volumes using ${constructionMethod}. A living subject is sculpted as one continuous, non-gory form from armature to anatomy; a vehicle or machine is built from chassis to functional structure; an object is formed or assembled from its supporting body outward. Each additional material or component enters from outside the frame while firmly held by one of the maker’s hands, is carried to its destination, and remains under hand control until attached or shaped.

8-12 seconds: The same hands develop the recognizable outer form and reference-specific features. The maker sculpts, fits, wraps, stitches, fastens, carves, or polishes only where appropriate to ${constructionMethod} and the subject. Facial features, hair, clothing, body panels, wheels, glass, surfaces, accessories, or equivalent defining elements emerge through visible hand and tool contact, never through spontaneous transformation.

12-14 seconds: The maker refines proportions, edges, joints, surface transitions, textures, colors, and distinctive details until the developing subject closely matches the referenced image. One hand stabilizes the form while the other performs each final adjustment with a hand-held tool.

14-15 seconds: The maker removes the last tool by hand and withdraws both hands. The timelapse returns to normal speed as the camera makes a restrained push toward the completed subject and holds on a clean final view.

Materials and components do not need to be visible before use, but anything newly introduced must enter the frame already held by one of the maker’s hands. Nothing moves, assembles, appears, disappears, or changes material independently. Maintain one maker, one continuous subject, one creation position, and one category-appropriate construction method. No assistants, extra hands, detached anatomy, duplicated elements, magical morphing, drawing phase, software interface, cursor, menus, annotations, or text overlays.`;

    return Object.freeze({
      capability: "parallax.video.handmade-reconstruction",
      version: VERSION,
      referenceId,
      prompt,
      provider: Object.freeze({
        model: config.model || "minimax-h3",
        durationSeconds: 15,
        aspectRatio: config.aspectRatio || null,
        seed: config.seed ?? null
      }),
      constraints: Object.freeze({
        maximumHands: 2,
        makers: 1,
        subjects: 1,
        constructionMethod,
        allowedMethodPreset: ALLOWED_METHODS.includes(constructionMethod)
      })
    });
  }

  function createVerificationReceipt(request, evidence) {
    if (!request || request.capability !== "parallax.video.handmade-reconstruction") {
      throw new TypeError("A compiled handmade-reconstruction request is required");
    }
    const result = evidence || {};
    const checks = Object.freeze({
      sameMaker: result.sameMaker === true,
      maximumTwoHands: result.maximumTwoHands === true,
      continuousSubject: result.continuousSubject === true,
      noSpontaneousComponents: result.noSpontaneousComponents === true,
      referenceMatch: result.referenceMatch === true,
      cleanFinalReveal: result.cleanFinalReveal === true,
      noTextOverlay: result.noTextOverlay === true
    });
    const verified = Object.values(checks).every(Boolean);

    return Object.freeze({
      receiptType: "parallax.verification-receipt",
      capability: request.capability,
      promptVersion: request.version,
      referenceId: request.referenceId,
      provider: request.provider,
      outputUri: result.outputUri || null,
      checks,
      verified,
      status: verified ? "verified" : "rejected",
      issuedAt: new Date().toISOString()
    });
  }

  global.PARALLAX_H3 = Object.freeze({
    VERSION,
    ALLOWED_METHODS,
    compileHandmadeReconstruction,
    createVerificationReceipt
  });
})(typeof window !== "undefined" ? window : globalThis);
