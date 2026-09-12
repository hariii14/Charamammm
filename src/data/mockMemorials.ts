import { Memorial } from "../types";

export const INITIAL_MEMORIALS: Memorial[] = [
  {
    id: "left-sock-01",
    name: "The Left Sock",
    category: "Clothing",
    bornYear: "2018",
    departedYear: "2026",
    causeOfDeath: "Separated from its partner under mysterious circumstances in the dryer vortex.",
    obituary:
      "A solitary thread in the fabric of existence. It traversed countless linoleum floors only to be abandoned in the cold steel purgatory of cycle 4. Its partner survives, languishing in the bottom drawer, unwearable and bereft of meaning.",
    story:
      "Bought in a festive 3-pack during the holidays of 2018. Outlasted the sneakers it accompanied, but succumbed to the dimensional anomaly between the agitator and the drum.",
    imageUrl:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80",
    candleCount: 231,
    rotationDeg: -1.2,
    isObjectOfTheDay: true,
    stats: {
      yearsServed: 8,
      knownOwners: 1,
      majorIncidents: 42,
      successfulRepairs: 0,
      lastKnownLocation: "Behind the washing machine or another dimension",
      historicalImportance: "Monumental to one foot",
    },
    comments: [
      {
        id: "c1",
        author: "A Sympathetic Dryer",
        text: "Gone too soon. The lint trap mourns you.",
        createdAt: "10 minutes ago",
      },
      {
        id: "c2",
        author: "The Right Sock",
        text: "I cannot go out alone. Where are you?",
        createdAt: "1 hour ago",
      },
      {
        id: "c3",
        author: "Harold P.",
        text: "F. May you find warm woolly meadows.",
        createdAt: "3 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: "usb-cable-02",
    name: "Old USB Cable",
    category: "Electronics",
    bornYear: "2017",
    departedYear: "2026",
    causeOfDeath: "Chronic connectivity failure & severe neck twist at 45 degrees.",
    obituary:
      "Connected to everyone. Worked with nobody. It spent six agonizing years searching for the correct orientation. It never found it. Only charging when bent at a precise 37-degree obtuse angle under a paperback novel.",
    story:
      "Came bundled with a budget Android phone in 2017. Outlived 4 phones, 2 laptops, and the patience of 7 different humans.",
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    candleCount: 184,
    rotationDeg: 1.4,
    stats: {
      yearsServed: 9,
      knownOwners: 3,
      majorIncidents: 112,
      successfulRepairs: 0,
      lastKnownLocation: "Tangled in a bedside snake pit",
      historicalImportance: "Questionable",
    },
    comments: [
      {
        id: "c4",
        author: "Anker Enthusiast",
        text: "Thank you for your intermittent service.",
        createdAt: "25 minutes ago",
      },
      {
        id: "c5",
        author: "Sarah M.",
        text: "I held it at that angle for 40 minutes once.",
        createdAt: "4 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    id: "blue-pen-03",
    name: "The Bic Blue Pen",
    category: "Stationery",
    bornYear: "2024",
    departedYear: "2026",
    causeOfDeath: "Sudden ink stroke during the signing of a crucial document.",
    obituary:
      "Wrote flawlessly on random margins, scrap envelopes, and telephone books. Yet when summoned to ink the final signature on a lease agreement, it simply scratched into the pulp and vanished into eternal dryness.",
    story:
      "Acquired illicitly from the reception desk of a dental clinic. Never chew-capped. Pure blue barrel dignity.",
    imageUrl:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
    candleCount: 97,
    rotationDeg: -0.8,
    stats: {
      yearsServed: "1.5",
      knownOwners: "At least 5 borrowers",
      majorIncidents: 8,
      successfulRepairs: "Scribbling violently on paper (failed)",
      lastKnownLocation: "Bottom of a canvas tote bag",
      historicalImportance: "Negligible",
    },
    comments: [
      {
        id: "c6",
        author: "Notary Public",
        text: "It hesitated at the worst possible second.",
        createdAt: "30 minutes ago",
      },
      {
        id: "c7",
        author: "Clerk #4",
        text: "Did you try licking the ballpoint tip?",
        createdAt: "5 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
  },
  {
    id: "teflon-pan-04",
    name: "Non-Stick Frying Pan",
    category: "Household",
    bornYear: "2020",
    departedYear: "2026",
    causeOfDeath: "Fatal metal fork scrape followed by stubborn burnt omelette bonding.",
    obituary:
      "Guaranteed non-stick for eternity by the packaging. Began welding organic matter to its dark center on week two. Passed peacefully after a roommate tried to flip bacon with a stainless steel butter knife.",
    story:
      "Promised sunny mornings with easy sliding eggs. In reality, required 20 minutes of soaking in lukewarm dawn dish soap after every single toast.",
    imageUrl:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80",
    candleCount: 142,
    rotationDeg: 1.1,
    stats: {
      yearsServed: 6,
      knownOwners: 2,
      majorIncidents: 74,
      successfulRepairs: 0,
      lastKnownLocation: "Drying rack graveyard",
      historicalImportance: "Tragic breakfast symbol",
    },
    comments: [
      {
        id: "c8",
        author: "The Fork",
        text: "I regret nothing.",
        createdAt: "2 hours ago",
      },
      {
        id: "c9",
        author: "Chef Gordon",
        text: "It is sticking! May it rest in peace.",
        createdAt: "6 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 36,
  },
  {
    id: "wireless-earbud-05",
    name: "Right Earbud #1",
    category: "Electronics",
    bornYear: "2023",
    departedYear: "2026",
    causeOfDeath: "Fell directly into a municipal storm drain while adjusting sunglasses.",
    obituary:
      "Loved bass, hated ear canals. Escaped its charging cradle at 8:14 AM on a crisp Tuesday. Its sister earbud continues to play true-crime audiobooks with zero stereo balance.",
    story:
      "Spent its short existence falling onto subway platforms and beneath airplane seats before making its final subterranean descent.",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    candleCount: 119,
    rotationDeg: -1.6,
    stats: {
      yearsServed: 3,
      knownOwners: 1,
      majorIncidents: 29,
      successfulRepairs: 0,
      lastKnownLocation: "City sewer beneath 4th and Elm",
      historicalImportance: "80% volume forever",
    },
    comments: [
      {
        id: "c10",
        author: "Left Earbud",
        text: "The case feels so empty on the right side.",
        createdAt: "45 minutes ago",
      },
      {
        id: "c11",
        author: "Pigeon",
        text: "Co-o-o (we inspected it, it is not bread).",
        createdAt: "1 day ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
  },
  {
    id: "plastic-plant-06",
    name: "Polyurethane Ficus",
    category: "Household",
    bornYear: "2019",
    departedYear: "2026",
    causeOfDeath: "Overwatered by well-meaning houseguests who failed to touch the leaves.",
    obituary:
      "It never asked for sunshine. It never required chlorophyl. Yet year after year, guests dumped their dregs of chamomile tea into its styrofoam base until the synthetic trunk warped in pure despair.",
    story:
      "Manufactured in Dongguan with high hopes of decorating an upscale dentistry lounge, it ended up on a dusty corner shelf in Apartment 3B.",
    imageUrl:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    candleCount: 64,
    rotationDeg: 0.9,
    stats: {
      yearsServed: 7,
      knownOwners: 1,
      majorIncidents: 16,
      successfulRepairs: 0,
      lastKnownLocation: "Living room corner",
      historicalImportance: "Immaculate fake botanic",
    },
    comments: [
      {
        id: "c12",
        author: "Botanist",
        text: "Rest well, eternal chloroplastic friend.",
        createdAt: "3 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 70,
  },
  {
    id: "tupperware-lid-07",
    name: "Orphaned Tupperware Lid",
    category: "Household",
    bornYear: "2016",
    departedYear: "2026",
    causeOfDeath: "Existential mismatch. Outlived every container in the cabinet.",
    obituary:
      "A rectangular sealing ring in an increasingly circular world. It stood by silently while twenty-seven glass bowls arrived, none of which matched its grooves.",
    story:
      "Lost its base during the Thanksgiving potluck of 2017. Kept inside the drawer just in case.",
    imageUrl:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    candleCount: 78,
    rotationDeg: -1.0,
    stats: {
      yearsServed: 10,
      knownOwners: 1,
      majorIncidents: 50,
      successfulRepairs: 0,
      lastKnownLocation: "Top shelf behind the blender pitcher",
      historicalImportance: "Forever unclicked",
    },
    comments: [
      {
        id: "c13",
        author: "Tupperware Base (Lost in Ohio)",
        text: "I miss our airtight seal.",
        createdAt: "8 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 95,
  },
  {
    id: "birthday-candle-08",
    name: 'The Number "7" Candle',
    category: "Miscellaneous",
    bornYear: "2025",
    departedYear: "2025",
    causeOfDeath: "Violent hurricane of toddler saliva and cake frosting immersion.",
    obituary:
      "It gave everything for forty-two seconds of illumination. Melted down its back into a chocolate sponge cake, never to spell another age again.",
    story:
      "Purchased at Party City for $1.99. Carried the immense weight of turning seven years old.",
    imageUrl:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    candleCount: 52,
    rotationDeg: 1.3,
    stats: {
      yearsServed: "42 seconds",
      knownOwners: 1,
      majorIncidents: 1,
      successfulRepairs: 0,
      lastKnownLocation: "Trash bin with paper plates",
      historicalImportance: "Briefly incandescent",
    },
    comments: [
      {
        id: "c14",
        author: "The Cake",
        text: "The wax added character.",
        createdAt: "12 hours ago",
      },
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 120,
  },
];
