import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = 3000;

// Marvel and DC superhero catalog for server-side fallback or augmentation
const SUPERHERO_POOL = [
  "Tony Stark (Iron Man)",
  "Bruce Wayne (The Batman)",
  "Peter Parker (Spider-Man)",
  "Clark Kent (Superman)",
  "Diana Prince (Wonder Woman)",
  "Logan (Wolverine)",
  "Natasha Romanoff (Black Widow)",
  "Stephen Strange (Doctor Strange)",
  "Wade Wilson (Deadpool)",
  "Thor Odinson (God of Thunder)",
  "Barry Allen (The Flash)",
  "Steve Rogers (Captain America)",
  "Bruce Banner (The Incredible Hulk)",
  "Matt Murdock (Daredevil)",
  "Wanda Maximoff (Scarlet Witch)",
  "Arthur Curry (Aquaman)",
  "Hal Jordan (Green Lantern)",
  "Selina Kyle (Catwoman)",
  "Miles Morales (Spider-Man)",
  "Victor Stone (Cyborg)",
  "Clint Barton (Hawkeye)",
  "Carol Danvers (Captain Marvel)",
  "Dick Grayson (Nightwing)",
  "Oliver Queen (Green Arrow)",
  "John Constantine (Hellblazer)",
];

async function startServer() {
  const app = express();

  // Parse JSON and large base64 image strings (up to 30mb)
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true, limit: "30mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Charamam Gazette Coroner API" });
  });

  // Object identification endpoint using Gemini Vision
  app.post("/api/identify-object", async (req, res) => {
    try {
      const { image, mode } = req.body;

      if (!image || typeof image !== "string") {
        return res.status(400).json({
          error: "No image payload provided. Please supply base64 photographic data.",
        });
      }

      // Extract MIME type and base64 bytes
      let mimeType = "image/jpeg";
      let base64Data = image;

      const dataUriMatch = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (dataUriMatch) {
        mimeType = dataUriMatch[1];
        base64Data = dataUriMatch[2];
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not set. Using forensic gazette fallback.");
        return res.json(generateLocalFallback(mode));
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
          {
            text: `You are the Chief Coroner & Chief Registrar of 'Charamam: The Object Funeral Service & Gazette', a publication dedicating solemn, poignant, and satirical Victorian-modern obituaries to departed everyday objects.

CRITICAL INSTRUCTIONS (MUST FOLLOW STRICTLY):
1. HUMAN DETECTION RULE:
   Examine the picture carefully. If ANY HUMAN, person, face, selfie, arm, hand, or human silhouette is present in the frame:
   - YOU MUST elevate them as a famous MARVEL or DC SUPERHERO (choose a random famous hero: e.g. Tony Stark / Iron Man, Bruce Wayne / Batman, Peter Parker / Spider-Man, Clark Kent / Superman, Diana Prince / Wonder Woman, Logan / Wolverine, Natasha Romanoff / Black Widow, Stephen Strange / Doctor Strange, Wade Wilson / Deadpool, Thor Odinson, Barry Allen / The Flash, Steve Rogers / Captain America, Bruce Banner / Hulk, Matt Murdock / Daredevil, etc.).
   - Set "isHuman" to true.
   - Set "heroName" to the selected superhero name.
   - Set "name" to the superhero's formal title (e.g., "Tony Stark (Iron Man)" or "Bruce Wayne (The Batman)").
   - Set "category" to "Miscellaneous" or "Household".
   - Write a hilarious, tragic broadsheet obituary treating them as a superhero who succumbed to an utterly mundane, everyday mortal struggle (e.g., "Overworked arc reactor caused by debugging at 3 AM", "Defeated by a rogue spreadsheet with 400 circular reference errors", "Fell into eternal slumber after assembling Swedish flat-pack furniture without the Allen wrench").

2. NON-HUMAN OBJECT IDENTIFICATION:
   If NO human is present:
   - Forensically identify what exact object is in the frame.
   - It can be ANY object in the world from food to stationery to household goods to tech, for example:
     * Food & Provisions: cold pizza slice, half-eaten sandwich, over-steeped tea bag, ancient banana, stale biscuit, apple core, coffee cup.
     * Stationery & Desk: chewed ballpoint pen, broken yellow HB pencil, dried-up highlighter, empty stapler, bent paperclip, erased eraser, spiral notebook, scissors, tape dispenser.
     * Electronics: frayed USB-C cable, silent earbud, scratched charger brick, dead remote, cracked phone, dusty keyboard, lifeless mouse.
     * Clothing & Textiles: solitary left sock, torn blue jeans, faded concert t-shirt, snapped hair tie, lone glove.
     * Household & Kitchen: chipped porcelain mug, scratched non-stick skillet, bent fork, squeaky kitchen sponge, cracked plate.
     * Furniture, Toys, Tools, or Packaging.
   - Set "isHuman" to false.
   - Set "name" to an evocative, descriptive object name (e.g. "Chewed Ballpoint Pen", "Over-Steeped Earl Grey Tea Bag", "Frayed Lightning Cable").
   - Set "category" to one of: "Electronics", "Stationery", "Clothing", "Furniture", "Toys", "Household", "Miscellaneous".
   - Set realistic bornYear (e.g. 2021, 2023) and departedYear ("2026").
   - Write an absurdly serious, poetic cause of demise (causeOfDeath).
   - Write an eyewitness account (story) of its noble service.
   - Write a full gazette obituary (obituaryText).
   - Fill the stats object with numerical and string metrics.`,
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "Name of deceased object or superhero name if human",
              },
              isHuman: {
                type: Type.BOOLEAN,
                description: "True if human/person was detected in the frame",
              },
              heroName: {
                type: Type.STRING,
                description: "Marvel or DC superhero identity if human",
              },
              category: {
                type: Type.STRING,
                enum: [
                  "Electronics",
                  "Stationery",
                  "Clothing",
                  "Furniture",
                  "Toys",
                  "Household",
                  "Miscellaneous",
                ],
              },
              bornYear: {
                type: Type.STRING,
                description: "Year born/manufactured",
              },
              departedYear: {
                type: Type.STRING,
                description: "Year departed (2026)",
              },
              causeOfDeath: {
                type: Type.STRING,
                description: "Comedic/poignant cause of demise",
              },
              story: {
                type: Type.STRING,
                description: "Eyewitness account of daily service",
              },
              obituaryText: {
                type: Type.STRING,
                description: "Full broadsheet memorial tribute",
              },
              detectedFeatures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Specific visual items or hallmarks detected",
              },
              stats: {
                type: Type.OBJECT,
                properties: {
                  yearsServed: { type: Type.INTEGER },
                  knownOwners: { type: Type.INTEGER },
                  majorIncidents: { type: Type.INTEGER },
                  successfulRepairs: { type: Type.INTEGER },
                  lastKnownLocation: { type: Type.STRING },
                  historicalImportance: { type: Type.STRING },
                },
                required: [
                  "yearsServed",
                  "knownOwners",
                  "majorIncidents",
                  "successfulRepairs",
                  "lastKnownLocation",
                  "historicalImportance",
                ],
              },
            },
            required: [
              "name",
              "isHuman",
              "category",
              "bornYear",
              "departedYear",
              "causeOfDeath",
              "story",
              "obituaryText",
            ],
          },
        },
      });

      const rawText = response.text || "{}";
      const parsed = JSON.parse(rawText);

      return res.json({
        success: true,
        data: parsed,
      });
    } catch (err: unknown) {
      console.error("Gemini Vision analysis error:", err);
      // Fallback smoothly
      return res.json({
        success: true,
        fallback: true,
        data: generateLocalFallback(req.body?.mode),
      });
    }
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Charamam Gazette] Server running at http://0.0.0.0:${PORT}`);
  });
}

function generateLocalFallback(mode?: string) {
  const randomHero = SUPERHERO_POOL[Math.floor(Math.random() * SUPERHERO_POOL.length)];
  const isHumanSimulation = mode === "human" || Math.random() < 0.25;

  if (isHumanSimulation) {
    return {
      name: randomHero,
      isHuman: true,
      heroName: randomHero,
      category: "Miscellaneous",
      bornYear: "1974",
      departedYear: "2026",
      causeOfDeath: "Fell victim to an unresolvable git merge conflict and three missed alarms.",
      story:
        "They fought cosmic tyrants and galactic conquerors across multiple dimensions, only to be brought down by a modern ergonomic mouse without Bluetooth pairing.",
      obituaryText: `In honor of ${randomHero}, whose invincible will finally succumbed to the insurmountable friction of domestic everyday existence. Survived by a towering stack of unread correspondence and an unwashed protein shaker.`,
      detectedFeatures: ["Biological Human Form", "Superhero Aura Detected", "Mortal Weariness"],
      stats: {
        yearsServed: 52,
        knownOwners: 1,
        majorIncidents: 99,
        successfulRepairs: 4,
        lastKnownLocation: "In front of the gazette inspection glass",
        historicalImportance: "Legendary among mortals and gods",
      },
    };
  }

  const objects = [
    {
      name: "The Chewed Ballpoint Pen",
      category: "Stationery",
      bornYear: "2023",
      causeOfDeath: "Terminal mastication during an unannounced team brainstorm.",
      story:
        "It was purchased in a pack of twelve; it was the only one to survive the drawer wars.",
      obituaryText:
        "A faithful dispenser of blue paste. It bore the teeth marks of three distinct anxieties before its cap departed for parts unknown.",
    },
    {
      name: "Cold Half-Eaten Croissant",
      category: "Household",
      bornYear: "2026",
      causeOfDeath: "Abandoned mid-bite following an urgent calendar invitation.",
      story:
        "Flaky in spirit and buttered by optimism, it sat untouched on the saucer until moisture departed completely.",
      obituaryText:
        "Born in pastry perfection at 8:15 AM; declared legally deceased by refrigeration at 3:45 PM.",
    },
    {
      name: "The Frayed USB-C Cable",
      category: "Electronics",
      bornYear: "2022",
      causeOfDeath: "Bent at an illegal 90-degree angle for twenty-two consecutive months.",
      story: "It only charged when tilted slightly to the northeast and held with an eraser.",
      obituaryText: "Survived by an ancient wall adapter and a phone at 1% battery.",
    },
  ];

  const chosen = objects[Math.floor(Math.random() * objects.length)];
  return {
    ...chosen,
    isHuman: false,
    heroName: "",
    departedYear: "2026",
    detectedFeatures: [chosen.name, "Archival Plate Examination Complete"],
    stats: {
      yearsServed: 2,
      knownOwners: 1,
      majorIncidents: 14,
      successfulRepairs: 1,
      lastKnownLocation: "Desk specimen sector 4",
      historicalImportance: "Moderate broadsheet tribute",
    },
  };
}

startServer();
