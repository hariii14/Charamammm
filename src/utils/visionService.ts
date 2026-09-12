import { Category } from "../types";

export interface VisionAnalysisResult {
  name: string;
  isHuman: boolean;
  heroName?: string;
  category: Category;
  bornYear: string;
  departedYear: string;
  causeOfDeath: string;
  story: string;
  obituaryText: string;
  detectedFeatures?: string[];
  stats?: {
    yearsServed: number | string;
    knownOwners: number | string;
    majorIncidents: number | string;
    successfulRepairs: number | string;
    lastKnownLocation: string;
    historicalImportance: string;
  };
}

export const FAMOUS_SUPERHEROES = [
  // Marvel Superheroes
  "Tony Stark (Iron Man)",
  "Peter Parker (Spider-Man)",
  "Logan (Wolverine)",
  "Steve Rogers (Captain America)",
  "Natasha Romanoff (Black Widow)",
  "Stephen Strange (Doctor Strange)",
  "Thor Odinson (God of Thunder)",
  "Bruce Banner (The Incredible Hulk)",
  "Wade Wilson (Deadpool)",
  "Matt Murdock (Daredevil)",
  "Wanda Maximoff (Scarlet Witch)",
  "Miles Morales (Spider-Man)",
  "Carol Danvers (Captain Marvel)",
  "Clint Barton (Hawkeye)",
  "Charles Xavier (Professor X)",
  "Erik Lehnsherr (Magneto)",
  // DC Superheroes
  "Bruce Wayne (The Batman)",
  "Clark Kent (Superman)",
  "Diana Prince (Wonder Woman)",
  "Barry Allen (The Flash)",
  "Arthur Curry (Aquaman)",
  "Hal Jordan (Green Lantern)",
  "Dick Grayson (Nightwing)",
  "Selina Kyle (Catwoman)",
  "Victor Stone (Cyborg)",
  "Oliver Queen (Green Arrow)",
  "John Constantine (Hellblazer)",
  "Billy Batson (Shazam)",
];

const HERO_DEMISE_STORIES = [
  {
    cause: "Overworked arc reactor caused by continuous debugging at 3:15 AM.",
    story:
      "Defended the multiverse from intergalactic warlords, yet succumbed to an unresolvable npm dependency conflict and three cold cups of instant coffee.",
    obituary:
      "A legend whose invincible fortitude withstood cosmic anomalies, but could not survive an 8-hour sprint retrospective.",
  },
  {
    cause: "Spinal collapse brought on by an un-ergonomic wooden office stool.",
    story:
      "Master of shadows and Gotham's terror. Found defeated in broad daylight by a lack of proper lumbar support and forgotten reading spectacles.",
    obituary:
      "They swore to protect the innocent from criminal cartels, only to be vanquished by a stubborn spreadsheet that refused to autosave.",
  },
  {
    cause: "Overcome by the existential dread of 4,000 unread promotional emails.",
    story:
      "Leaped tall buildings in a single bound, but could not leap past the daily onslaught of mandatory corporate quarterly updates.",
    obituary:
      "Survived radioactive spider venom and cosmic blasts; brought to permanent rest by an expired supermarket coupon.",
  },
  {
    cause: "Terminal boredom during a conference call that clearly should have been a memo.",
    story:
      "Possessed the wisdom of Athena and the strength of Hercules, yet fell victim to the muted audio chime of twenty executives arguing over calendar invites.",
    obituary:
      "Mortal existence was their final insurmountable challenge. May their cape rest upon the laundry pile in quiet honor.",
  },
  {
    cause: "Catastrophic stubbing of the left pinky toe on a solid oak coffee table.",
    story:
      "Healed from bullet wounds and cosmic radiation in seconds, yet took thirty minutes on the hallway rug questioning the very fabric of mortality.",
    obituary:
      "Invulnerable to adamantium and vibranium alike; humbled forever by Swedish flat-pack living room decor.",
  },
];

const COMMON_OBJECT_TEMPLATES = [
  // Stationery
  {
    name: "Chewed Ballpoint Pen",
    category: "Stationery" as Category,
    bornYear: "2024",
    cause: "Vicious molar mastication during an unannounced mathematics pop-quiz.",
    story:
      "Purchased in a humble pack of twelve. Survived the dark depths of the backpack pencil pouch only to meet teeth with no regard for plastic integrity.",
    obituary:
      "A stalwart dispenser of tungsten-carbide ink. May its splintered casing find rest where no molars may ever reach it again.",
  },
  {
    name: "Dry Dry-Erase Whiteboard Marker",
    category: "Stationery" as Category,
    bornYear: "2023",
    cause: "Cap left unseated on a conference room rail for seventy-two straight hours.",
    story:
      "Attempted to sketch one final quarterly sales trajectory; produced only faint, screeching squeaks and pale grey sadness.",
    obituary:
      "It gave its life so that diagrams might briefly confuse employees. Survived by a filthy felt eraser and an empty recycling bin.",
  },
  {
    name: "The Snapped HB Pencil",
    category: "Stationery" as Category,
    bornYear: "2024",
    cause: "Snapped clean in two under excessive exam anxiety.",
    story:
      "Sharpened diligently down to four inches. Snapped with the resonant crack of a tragic oak under the pressure of essay question number four.",
    obituary:
      "Graphite in its veins, cedar on its sleeve. Leaves behind two stubby fragments that refuse to fit in any sharpener.",
  },
  // Food & Kitchen
  {
    name: "Cold Half-Eaten Croissant",
    category: "Household" as Category,
    bornYear: "2026",
    cause: "Abandoned mid-pastry following an urgent Teams notification.",
    story:
      "Golden, buttery, and brimming with morning optimism. Consigned to an office napkin until moisture departed into the ether.",
    obituary:
      "Born in baking glory at 7:30 AM; certified deceased at 3:15 PM. Survived by a dozen buttery crumbs on the spacebar.",
  },
  {
    name: "Over-Steeped Earl Grey Tea Bag",
    category: "Household" as Category,
    bornYear: "2026",
    cause: "Forgotten in boiling water until tannins achieved weaponized bitterness.",
    story:
      "Intended for a three-minute steep. Found floating forty-five minutes later with the consistency of swamp foliage.",
    obituary:
      "Its aromatic bergamot vanished into a pitch-black abyss. A quiet martyr of distraction.",
  },
  // Electronics
  {
    name: "Frayed Braided USB-C Cable",
    category: "Electronics" as Category,
    bornYear: "2022",
    cause: "Crimped into an impossible 120-degree hairpin angle behind the nightstand.",
    story:
      "Only delivered power when bent slightly to the northeast and weighted down by a hardcover dictionary.",
    obituary:
      "Faithfully charged three generations of phones before copper fatigue severed its noble electron stream.",
  },
  {
    name: "Sole Disconnected Earbud",
    category: "Electronics" as Category,
    bornYear: "2023",
    cause: "Fell down the crack between the sofa cushion and the chassis of oblivion.",
    story:
      "Its partner remains in the charging cradle, forever broadcasting Bluetooth despair into the void.",
    obituary:
      "It played podcast episodes with unmatched clarity until carpet gravity claimed its tiny plastic shell.",
  },
  // Clothing
  {
    name: "The Unpaired Left Sock",
    category: "Clothing" as Category,
    bornYear: "2021",
    cause: "Swallowed whole by an enigmatic industrial tumble dryer vortex.",
    story:
      "Entered the wash as a loving pair. Emerged alone, facing an uncertain existence in the back of the sock drawer.",
    obituary:
      "Warm, elastic, and doomed to solitude. May it reunite with its right counterpart in the great laundry basket beyond.",
  },
];

/**
 * Call the server-side Gemini Vision endpoint to analyze the photo.
 */
export async function analyzeImageSpecimen(
  imageBase64OrUrl: string,
): Promise<VisionAnalysisResult> {
  try {
    const response = await fetch("/api/identify-object", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageBase64OrUrl }),
    });

    if (response.ok) {
      const json = await response.json();
      if (json.data && json.data.name) {
        return json.data as VisionAnalysisResult;
      }
    }
  } catch (err) {
    console.warn("Server-side vision call failed, using client-side specimen analyzer:", err);
  }

  // Fallback client-side analysis
  return generateClientAnalysisFallback(imageBase64OrUrl);
}

/**
 * Robust client-side fallback if network or server is unreachable.
 * Checks simple image properties and randomly selects either a superhero or common everyday object.
 */
export function generateClientAnalysisFallback(
  imageBase64OrUrl: string,
  forcedHuman?: boolean,
): VisionAnalysisResult {
  // Check if likely human based on heuristic or flag
  const isHuman = forcedHuman ?? (Math.random() < 0.28 || imageBase64OrUrl.length % 7 === 0);

  if (isHuman) {
    const randomHero = FAMOUS_SUPERHEROES[Math.floor(Math.random() * FAMOUS_SUPERHEROES.length)];
    const demise = HERO_DEMISE_STORIES[Math.floor(Math.random() * HERO_DEMISE_STORIES.length)];

    return {
      name: randomHero,
      isHuman: true,
      heroName: randomHero,
      category: "Miscellaneous",
      bornYear: "1978",
      departedYear: "2026",
      causeOfDeath: demise.cause,
      story: demise.story,
      obituaryText: demise.obituary,
      detectedFeatures: ["Biological Human Form", "Superhero Energy Matrix", "Mortal Exhaustion"],
      stats: {
        yearsServed: 48,
        knownOwners: 1,
        majorIncidents: 108,
        successfulRepairs: 7,
        lastKnownLocation: "Captured on Archival Camera Plate",
        historicalImportance: "Cosmic stature fallen to domestic reality",
      },
    };
  }

  const template =
    COMMON_OBJECT_TEMPLATES[Math.floor(Math.random() * COMMON_OBJECT_TEMPLATES.length)];

  return {
    name: template.name,
    isHuman: false,
    heroName: "",
    category: template.category,
    bornYear: template.bornYear,
    departedYear: "2026",
    causeOfDeath: template.cause,
    story: template.story,
    obituaryText: template.obituary,
    detectedFeatures: [template.name, "Archival Plate Specimen"],
    stats: {
      yearsServed: Math.max(1, 2026 - parseInt(template.bornYear)),
      knownOwners: 1,
      majorIncidents: 12,
      successfulRepairs: 0,
      lastKnownLocation: "Upon the registrar desk",
      historicalImportance: "A precious artifact of mortal daily toil",
    },
  };
}
