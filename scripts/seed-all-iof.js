/**
 * Script to import all 84 full movies from @IndoOverseasFilms-Hindi
 */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const iofList = [
  { id: "BSG7AWOQk_4", title: "The Wandering Earth (Hindi Dubbed)", cleanTitle: "The Wandering Earth", mins: 177, genre: "Sci-Fi" },
  { id: "ddqQyuxh0ME", title: "Everest: Mountain of Death (Hindi Dubbed)", cleanTitle: "Everest: Mountain of Death", mins: 117, genre: "Action" },
  { id: "6RkeZNTe4NA", title: "The Great Flood (Hindi Dubbed)", cleanTitle: "The Great Flood", mins: 114, genre: "Action" },
  { id: "pnBPXVJgw3Q", title: "Crossfire (Hindi Dubbed)", cleanTitle: "Crossfire", mins: 97, genre: "Action" },
  { id: "nD-eAgX5el4", title: "Counter Attack (Hindi Dubbed)", cleanTitle: "Counter Attack", mins: 86, genre: "Action" },
  { id: "50QJ_UGzyL0", title: "Rebound (Hindi Dubbed)", cleanTitle: "Rebound", mins: 122, genre: "Drama" },
  { id: "i79fSO8zNQY", title: "35 Days in the Tunnel (Hindi Dubbed)", cleanTitle: "35 Days in the Tunnel", mins: 126, genre: "Thriller" },
  { id: "RwB5rjhgYbU", title: "The Reign of Chaos (Hindi Dubbed)", cleanTitle: "The Reign of Chaos", mins: 77, genre: "Horror" },
  { id: "q-SEs1Awnx0", title: "The Leopard: Zanjeero Mein Jakda Yodha (Hindi Dubbed)", cleanTitle: "The Leopard", mins: 82, genre: "Action" },
  { id: "hDfKWzTYTlQ", title: "Curse of the Giant Python (Hindi Dubbed)", cleanTitle: "Curse of the Giant Python", mins: 75, genre: "Action" },
  { id: "LXM6ET4_YtI", title: "The Deadly Demon Woman (Hindi Dubbed)", cleanTitle: "The Deadly Demon Woman", mins: 81, genre: "Horror" },
  { id: "Dk85WvXOYXI", title: "Speak No Evil (Hindi Dubbed)", cleanTitle: "Speak No Evil", mins: 88, genre: "Thriller" },
  { id: "vVjxkHux4Nk", title: "Southern Shaolin (Hindi Dubbed)", cleanTitle: "Southern Shaolin", mins: 71, genre: "Action" },
  { id: "fYniON2l4Bk", title: "Sniper (Hindi Dubbed)", cleanTitle: "Sniper", mins: 77, genre: "Action" },
  { id: "jCacdFMef1o", title: "Big Octopus (Hindi Dubbed)", cleanTitle: "Big Octopus", mins: 82, genre: "Action" },
  { id: "6W4JK2ccfq4", title: "Journey to Kailash 2 - Jackie Chan (Hindi Dubbed)", cleanTitle: "Journey to Kailash 2", mins: 122, genre: "Action" },
  { id: "knidXDjODVs", title: "Depths of Fury (Hindi Dubbed)", cleanTitle: "Depths of Fury", mins: 86, genre: "Thriller" },
  { id: "gKT9E_MXrBA", title: "Snow Kong (Hindi Dubbed)", cleanTitle: "Snow Kong", mins: 66, genre: "Action" },
  { id: "QhvjgNeR4ng", title: "Jackie Chan's Legend of Chan (Hindi Dubbed)", cleanTitle: "Legend of Chan", mins: 99, genre: "Action" },
  { id: "7o15lVUZScs", title: "Dragonslayer: Rise of the Warrior (Hindi Dubbed)", cleanTitle: "Dragonslayer", mins: 82, genre: "Fantasy" },
  { id: "jqcMbXKXnb4", title: "Megalodon: Deep Sea Terror (Hindi Dubbed)", cleanTitle: "Megalodon", mins: 68, genre: "Action" },
  { id: "tAtJn9A_-_o", title: "Black Myth: Wukong (Hindi Dubbed)", cleanTitle: "Black Myth: Wukong", mins: 82, genre: "Action" },
  { id: "K1Yxc0ZhvUs", title: "Speak No Evil: Terrifying Thriller (Hindi Dubbed)", cleanTitle: "Speak No Evil 2", mins: 86, genre: "Thriller" },
  { id: "PTxcWjPq3j0", title: "Heist: No Way Out (Hindi Dubbed)", cleanTitle: "Heist: No Way Out", mins: 96, genre: "Action" },
  { id: "MMSyRjy1hW0", title: "Kung Fu: Legend (Hindi Dubbed)", cleanTitle: "Kung Fu: Legend", mins: 74, genre: "Action" },
  { id: "r_zfiP-D5gY", title: "I Saw the Devil (Hindi Dubbed)", cleanTitle: "I Saw the Devil", mins: 137, genre: "Thriller" },
  { id: "8_XhfdY7S2E", title: "LEIO: Monster of the Desert (Hindi Dubbed)", cleanTitle: "LEIO", mins: 100, genre: "Sci-Fi" },
  { id: "y_h1ZutPArw", title: "Last Survivor (Hindi Dubbed)", cleanTitle: "Last Survivor", mins: 69, genre: "Action" },
  { id: "7YmyC-igc2I", title: "Giant Serpent (Hindi Dubbed)", cleanTitle: "Giant Serpent", mins: 87, genre: "Fantasy" },
  { id: "XVvi8Tlw-aE", title: "Monster Hunter (Hindi Dubbed)", cleanTitle: "Monster Hunter", mins: 79, genre: "Fantasy" },
  { id: "6C0Tb5Mo20E", title: "Alien vs. Predator 3 (Hindi Dubbed)", cleanTitle: "Alien vs. Predator 3", mins: 89, genre: "Sci-Fi" },
  { id: "mFbjPFO5gaU", title: "Land Shark (Hindi Dubbed)", cleanTitle: "Land Shark", mins: 73, genre: "Horror" },
  { id: "-gdF2KRapQk", title: "Call of Duty 2 (Hindi Dubbed)", cleanTitle: "Call of Duty 2", mins: 77, genre: "Action" },
  { id: "3NuCuq1K5lo", title: "Supercroc (Hindi Dubbed)", cleanTitle: "Supercroc", mins: 76, genre: "Action" },
  { id: "yIZVkk5NZ10", title: "Final Survivor (Hindi Dubbed)", cleanTitle: "Final Survivor", mins: 86, genre: "Action" },
  { id: "EzIQfXbYdSg", title: "Metro: Disaster in Tunnel (Hindi Dubbed)", cleanTitle: "Metro", mins: 85, genre: "Action" },
  { id: "tinvi37N9-A", title: "Croc Rampage (Hindi Dubbed)", cleanTitle: "Croc Rampage", mins: 82, genre: "Action" },
  { id: "ZiMCvKltSN8", title: "Megamaw (Hindi Dubbed)", cleanTitle: "Megamaw", mins: 71, genre: "Action" },
  { id: "5kJytbTjof8", title: "Naked Soldier: Sammo Hung (Hindi Dubbed)", cleanTitle: "Naked Soldier", mins: 88, genre: "Action" },
  { id: "ncRXivD3das", title: "Ruthless Killer - Don Lee (Hindi Dubbed)", cleanTitle: "Ruthless Killer", mins: 115, genre: "Action" },
  { id: "5sR0_PYFpUs", title: "Demon Mermaid (Hindi Dubbed)", cleanTitle: "Demon Mermaid", mins: 91, genre: "Fantasy" },
  { id: "zTRUlKM-n9Y", title: "Journey to Shushan (Hindi Dubbed)", cleanTitle: "Journey to Shushan", mins: 88, genre: "Fantasy" },
  { id: "xQHLr3VJVDA", title: "King Xian 2: Worm Valley (Hindi Dubbed)", cleanTitle: "King Xian 2", mins: 90, genre: "Action" },
  { id: "BzHi7UKQYLI", title: "Water Monster 3 (Hindi Dubbed)", cleanTitle: "Water Monster 3", mins: 84, genre: "Action" },
  { id: "yNxCqKebDOE", title: "Journey to Kailash (Jackie Chan) (Hindi Dubbed)", cleanTitle: "Journey to Kailash", mins: 122, genre: "Action" },
  { id: "2KSV1M1gzyE", title: "Top Gun 3 (Hindi Dubbed)", cleanTitle: "Top Gun 3", mins: 86, genre: "Action" },
  { id: "0BKvYuM2XBs", title: "Warborn: Epic Fantasy (Hindi Dubbed)", cleanTitle: "Warborn", mins: 66, genre: "Fantasy" },
  { id: "Qj-4JMOOq7Q", title: "Ocean Rescue (Hindi Dubbed)", cleanTitle: "Ocean Rescue", mins: 86, genre: "Action" },
  { id: "uuMWVWOBUmM", title: "Confession of Murder (Hindi Dubbed)", cleanTitle: "Confession of Murder", mins: 115, genre: "Thriller" },
  { id: "f3nFRq3zeXc", title: "Hwayi: A Monster Boy (Hindi Dubbed)", cleanTitle: "Hwayi: A Monster Boy", mins: 121, genre: "Thriller" },
  { id: "_72qcm_VEvQ", title: "King of Shark (Hindi Dubbed)", cleanTitle: "King of Shark", mins: 71, genre: "Horror" },
  { id: "cinQG56mkX4", title: "Anaconda: Rebirth (Hindi Dubbed)", cleanTitle: "Anaconda: Rebirth", mins: 86, genre: "Action" },
  { id: "Nabz0rOpyqw", title: "Devil's Doll (Hindi Dubbed)", cleanTitle: "Devil's Doll", mins: 91, genre: "Horror" },
  { id: "YH3sFfceuOI", title: "Queen of Blood (Hindi Dubbed)", cleanTitle: "Queen of Blood", mins: 114, genre: "Action" },
  { id: "k1gQMksJejo", title: "Jackie Chan Adventures (Hindi Dubbed)", cleanTitle: "Jackie Chan Adventures", mins: 92, genre: "Action" },
  { id: "SQxCEGRcIoA", title: "Anaconda: Reign of Terror (Hindi Dubbed)", cleanTitle: "Anaconda: Reign of Terror", mins: 86, genre: "Action" },
  { id: "2D5bajD_O3k", title: "Giant Fish (Hindi Dubbed)", cleanTitle: "Giant Fish", mins: 86, genre: "Fantasy" },
  { id: "kZaGkFLv0EE", title: "XiShi: The Royal Assassin (Hindi Dubbed)", cleanTitle: "XiShi", mins: 113, genre: "Drama" },
  { id: "zvPGysar6UI", title: "Virtual Killers Unleashed (Hindi Dubbed)", cleanTitle: "Virtual Killers Unleashed", mins: 91, genre: "Sci-Fi" },
  { id: "hnjY4EQXglw", title: "Jumanji: Lost in the Wild (Hindi Dubbed)", cleanTitle: "Jumanji: Lost in the Wild", mins: 92, genre: "Action" },
  { id: "S9erx1wp3Fg", title: "Snake Demon (Hindi Dubbed)", cleanTitle: "Snake Demon", mins: 83, genre: "Fantasy" },
  { id: "xHFZiqjhSs8", title: "Don Lee's The Bull (Hindi Dubbed)", cleanTitle: "The Bull", mins: 100, genre: "Action" },
  { id: "xsJZZJu2DxU", title: "Megalodan: Ocean Monster (Hindi Dubbed)", cleanTitle: "Megalodan", mins: 74, genre: "Action" },
  { id: "wiw0ytdjJVw", title: "Apocalypto 2: Tribe Wars (Hindi Dubbed)", cleanTitle: "Apocalypto 2", mins: 85, genre: "Action" },
  { id: "wABKA0BFmGs", title: "Detective Dee: Secrets of Changan (Hindi Dubbed)", cleanTitle: "Detective Dee", mins: 72, genre: "Mystery" },
  { id: "u7_d_UD2N0o", title: "Painted Skin: The Resurrection (Hindi Dubbed)", cleanTitle: "Painted Skin", mins: 81, genre: "Fantasy" },
  { id: "w0rJimApvzc", title: "The Dark Knight (Hindi Dubbed)", cleanTitle: "The Dark Knight", mins: 95, genre: "Action" },
  { id: "OLUeCaZI9bE", title: "Monster Hunt (Hindi Dubbed)", cleanTitle: "Monster Hunt", mins: 85, genre: "Fantasy" },
  { id: "UV0Cwm5mUNg", title: "Creature of the Mist (Hindi Dubbed)", cleanTitle: "Creature of the Mist", mins: 58, genre: "Fantasy" },
  { id: "SXiZYH4I0O0", title: "Beauty and the Demon (Hindi Dubbed)", cleanTitle: "Beauty and the Demon", mins: 81, genre: "Fantasy" },
  { id: "Ytqhj98Fms0", title: "Rise of Monkey King (Hindi Dubbed)", cleanTitle: "Rise of Monkey King", mins: 82, genre: "Fantasy" },
  { id: "VSq0R8UTE7g", title: "Project Gemini (Hindi Dubbed)", cleanTitle: "Project Gemini", mins: 94, genre: "Sci-Fi" },
  { id: "xA8g9B9iorU", title: "Lucy 2 (Hindi Dubbed)", cleanTitle: "Lucy 2", mins: 76, genre: "Sci-Fi" },
  { id: "ZBt52F_CEJo", title: "The Last 14 Minutes (Hindi Dubbed)", cleanTitle: "The Last 14 Minutes", mins: 124, genre: "Action" },
  { id: "QJ8bZXfSyWY", title: "The Labyrinth (Hindi Dubbed)", cleanTitle: "The Labyrinth", mins: 69, genre: "Fantasy" },
  { id: "yDf8bPsMkmM", title: "Matchless Mulan (Hindi Dubbed)", cleanTitle: "Matchless Mulan", mins: 80, genre: "Action" },
  { id: "Aj8gWhUQIZU", title: "Fire Mario: Animated Adventure (Hindi Dubbed)", cleanTitle: "Fire Mario", mins: 85, genre: "Animation" },
  { id: "QpoctMgzW28", title: "Fireheart 2: The Girl Who Saved the City (Hindi Dubbed)", cleanTitle: "Fireheart 2", mins: 86, genre: "Animation" },
  { id: "gAbhDuNzAAY", title: "Fireheart (Hindi Dubbed)", cleanTitle: "Fireheart", mins: 85, genre: "Animation" },
  { id: "CT0p4_ElBaw", title: "Pinocchio: A True Story (Hindi Dubbed)", cleanTitle: "Pinocchio: A True Story", mins: 89, genre: "Animation" },
  { id: "DOuecVexDsQ", title: "Pil’s Adventures (Hindi Dubbed)", cleanTitle: "Pil’s Adventures", mins: 86, genre: "Animation" },
  { id: "Dqt4cSsjYUk", title: "Quackerz: Family Fun (Hindi Dubbed)", cleanTitle: "Quackerz", mins: 80, genre: "Animation" }
];

async function seedIOF() {
  console.log(`Starting insertion of ${iofList.length} movies from Indo Overseas Films...`);
  let added = 0;
  for (const m of iofList) {
    const existing = await prisma.movie.findFirst({
      where: { fullMovieKey: m.id }
    });
    if (existing) {
      continue;
    }

    const posterUrl = `https://i.ytimg.com/vi/${m.id}/hqdefault.jpg`;
    const backdropUrl = `https://i.ytimg.com/vi/${m.id}/maxresdefault.jpg`;

    const movie = await prisma.movie.create({
      data: {
        title: m.title,
        originalTitle: m.cleanTitle,
        tagline: `Official Indo Overseas Films Release`,
        overview: `${m.cleanTitle} in full Hindi dubbed audio. High-stakes entertainment, full HD streaming straight from Indo Overseas Films.`,
        releaseYear: 2024,
        releaseDate: "2024-01-01",
        runtime: m.mins,
        posterUrl: posterUrl,
        backdropUrl: backdropUrl,
        trailerKey: m.id,
        fullMovieKey: m.id,
        isFreeWatch: true,
        voteAverage: 8.0,
        popularity: 88.0,
        language: "hi",
        originCountry: "US",
        streamingPlatforms: JSON.stringify(["YouTube", "Indo Overseas Films"]),
      }
    });

    const genres = [m.genre, "Indo Overseas Films", "Hollywood Hindi Dubbed"];
    for (const gName of genres) {
      let genre = await prisma.genre.findFirst({ where: { name: gName } });
      if (!genre) {
        genre = await prisma.genre.create({
          data: { name: gName, slug: gName.toLowerCase().replace(/\s+/g, "-") }
        });
      }
      await prisma.movieGenre.create({
        data: { movieId: movie.id, genreId: genre.id }
      });
    }

    added++;
    console.log(`✓ Added [${added}] ${m.title} (${m.id})`);
  }

  const total = await prisma.movie.count();
  console.log(`\n🎉 Successfully added ${added} movies from @IndoOverseasFilms-Hindi! Total movies in DB: ${total}`);
}

seedIOF().finally(() => prisma.$disconnect());
