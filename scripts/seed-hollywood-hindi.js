const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const HOLLYWOOD_HINDI_MOVIES = [
  // 1. Avengers Series
  {
    tmdbId: 299534,
    imdbId: "tt4154796",
    title: "Avengers: Endgame",
    originalTitle: "Avengers: Endgame",
    tagline: "Part of the journey is the end. (Hindi Dubbed)",
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and restore order to the universe. Available in Hindi Dubbed & English.",
    releaseDate: "2019-04-24",
    releaseYear: 2019,
    runtime: 181,
    posterUrl: "https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    trailerKey: "TcMBFSGVi1c",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    voteAverage: 8.3,
    voteCount: 154000,
    popularity: 285.4,
    language: "hi",
    originCountry: "US",
    budget: 356000000,
    revenue: 2797800564,
    streamingPlatforms: JSON.stringify(["Disney+ Hotstar (Hindi)", "JioCinema (Hindi)", "Prime Video"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Anthony Russo" }, { name: "Joe Russo" }],
    cast: [
      { name: "Robert Downey Jr.", characterName: "Tony Stark / Iron Man" },
      { name: "Chris Evans", characterName: "Steve Rogers / Captain America" },
      { name: "Mark Ruffalo", characterName: "Bruce Banner / Hulk" },
      { name: "Chris Hemsworth", characterName: "Thor" },
      { name: "Scarlett Johansson", characterName: "Natasha Romanoff / Black Widow" }
    ]
  },
  {
    tmdbId: 299536,
    imdbId: "tt4154756",
    title: "Avengers: Infinity War",
    originalTitle: "Avengers: Infinity War",
    tagline: "An entire universe. Once and for all. (Hindi Dubbed)",
    overview:
      "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones. Available in Hindi Dubbed & English.",
    releaseDate: "2018-04-25",
    releaseYear: 2018,
    runtime: 149,
    posterUrl: "https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    trailerKey: "6ZfuNTqbHE8",
    trailerUrl: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    voteAverage: 8.2,
    voteCount: 142000,
    popularity: 240.2,
    language: "hi",
    originCountry: "US",
    budget: 316000000,
    revenue: 2048359754,
    streamingPlatforms: JSON.stringify(["Disney+ Hotstar (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Anthony Russo" }, { name: "Joe Russo" }],
    cast: [
      { name: "Robert Downey Jr.", characterName: "Tony Stark / Iron Man" },
      { name: "Chris Hemsworth", characterName: "Thor" },
      { name: "Mark Ruffalo", characterName: "Bruce Banner / Hulk" },
      { name: "Josh Brolin", characterName: "Thanos" }
    ]
  },
  {
    tmdbId: 24428,
    imdbId: "tt0848228",
    title: "The Avengers",
    originalTitle: "The Avengers",
    tagline: "Some assembly required. (Hindi Dubbed)",
    overview:
      "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Available in Hindi Dubbed & English.",
    releaseDate: "2012-04-25",
    releaseYear: 2012,
    runtime: 143,
    posterUrl: "https://image.tmdb.org/t/p/w780/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    trailerKey: "eOrNdBpGMv8",
    trailerUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    voteAverage: 7.7,
    voteCount: 110000,
    popularity: 210.0,
    language: "hi",
    originCountry: "US",
    budget: 220000000,
    revenue: 1518815515,
    streamingPlatforms: JSON.stringify(["Disney+ Hotstar (Hindi)", "JioCinema (Hindi)"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Joss Whedon" }],
    cast: [
      { name: "Robert Downey Jr.", characterName: "Tony Stark / Iron Man" },
      { name: "Chris Evans", characterName: "Steve Rogers / Captain America" },
      { name: "Tom Hiddleston", characterName: "Loki" }
    ]
  },

  // 2. Spider-Man Series
  {
    tmdbId: 634649,
    imdbId: "tt10872600",
    title: "Spider-Man: No Way Home",
    originalTitle: "Spider-Man: No Way Home",
    tagline: "The Multiverse unleashed. (Hindi Dubbed)",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man. Available in Hindi Dubbed & English.",
    releaseDate: "2021-12-15",
    releaseYear: 2021,
    runtime: 148,
    posterUrl: "https://image.tmdb.org/t/p/w780/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
    trailerKey: "JfVOs4VSpmA",
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    voteAverage: 8.0,
    voteCount: 135000,
    popularity: 260.5,
    language: "hi",
    originCountry: "US",
    budget: 200000000,
    revenue: 1921847111,
    streamingPlatforms: JSON.stringify(["SonyLIV (Hindi)", "Netflix (Hindi)", "Prime Video"]),
    genres: ["Action", "Adventure", "Science Fiction"],
    directors: [{ name: "Jon Watts" }],
    cast: [
      { name: "Tom Holland", characterName: "Peter Parker / Spider-Man" },
      { name: "Zendaya", characterName: "MJ" },
      { name: "Benedict Cumberbatch", characterName: "Doctor Strange" },
      { name: "Willem Dafoe", characterName: "Norman Osborn / Green Goblin" }
    ]
  },
  {
    tmdbId: 557,
    imdbId: "tt0145487",
    title: "Spider-Man (2002)",
    originalTitle: "Spider-Man",
    tagline: "With great power comes great responsibility. (Hindi Dubbed)",
    overview:
      "After being bitten by a genetically altered spider at Oscorp, nerdy high school student Peter Parker gains spider-like superhuman abilities and embarks on a mission to fight crime as Spider-Man in New York City. Tobey Maguire's legendary classic, available in Hindi Dubbed & English.",
    releaseDate: "2002-05-01",
    releaseYear: 2002,
    runtime: 121,
    posterUrl: "https://image.tmdb.org/t/p/w780/gh4c2Fr07jhYW0pviUQzmpHnoMi.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/sWvxBXviCOmDNBQpAsqAcUe944W.jpg",
    trailerKey: "t06RUxPbp_c",
    trailerUrl: "https://www.youtube.com/watch?v=t06RUxPbp_c",
    voteAverage: 7.3,
    voteCount: 95000,
    popularity: 180.0,
    language: "hi",
    originCountry: "US",
    budget: 139000000,
    revenue: 825025036,
    streamingPlatforms: JSON.stringify(["SonyLIV (Hindi)", "Netflix (Hindi)"]),
    genres: ["Action", "Science Fiction"],
    directors: [{ name: "Sam Raimi" }],
    cast: [
      { name: "Tobey Maguire", characterName: "Peter Parker / Spider-Man" },
      { name: "Willem Dafoe", characterName: "Norman Osborn / Green Goblin" },
      { name: "Kirsten Dunst", characterName: "Mary Jane Watson" }
    ]
  },

  // 3. Fast & Furious Series
  {
    tmdbId: 168259,
    imdbId: "tt2820852",
    title: "Furious 7",
    originalTitle: "Furious 7",
    tagline: "Vengeance hits home. (Hindi Dubbed)",
    overview:
      "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother. An exhilarating global chase takes the crew from Abu Dhabi skyscrapers to the streets of Los Angeles. Paul Walker's emotional farewell tribute, available in Hindi Dubbed & English.",
    releaseDate: "2015-04-01",
    releaseYear: 2015,
    runtime: 137,
    posterUrl: "https://image.tmdb.org/t/p/w780/ktoppZ4q3qF6f0Ogt1d0pP4M6q7.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/jG2X4xXnFj72v27bQ2hW8Z6pZ4Z.jpg",
    trailerKey: "Skpu5HaVkOc",
    trailerUrl: "https://www.youtube.com/watch?v=Skpu5HaVkOc",
    voteAverage: 7.3,
    voteCount: 88000,
    popularity: 195.0,
    language: "hi",
    originCountry: "US",
    budget: 190000000,
    revenue: 1515341399,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)", "Prime Video"]),
    genres: ["Action", "Crime", "Thriller"],
    directors: [{ name: "James Wan" }],
    cast: [
      { name: "Vin Diesel", characterName: "Dominic Toretto" },
      { name: "Paul Walker", characterName: "Brian O'Conner" },
      { name: "Dwayne Johnson", characterName: "Luke Hobbs" },
      { name: "Jason Statham", characterName: "Deckard Shaw" }
    ]
  },
  {
    tmdbId: 87101,
    imdbId: "tt1905041",
    title: "Fast & Furious 6",
    originalTitle: "Fast & Furious 6",
    tagline: "All roads lead to this. (Hindi Dubbed)",
    overview:
      "Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets sidetracked with facing his presumed-deceased former flame, Letty. Available in Hindi Dubbed & English.",
    releaseDate: "2013-05-21",
    releaseYear: 2013,
    runtime: 130,
    posterUrl: "https://image.tmdb.org/t/p/w780/n31vR2VoAcN9M9vcvk06cQ00q1g.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/b9hPj79V6n19z3p2kM4N8mQ1rS.jpg",
    trailerKey: "dKi5XoeTN0k",
    trailerUrl: "https://www.youtube.com/watch?v=dKi5XoeTN0k",
    voteAverage: 6.8,
    voteCount: 68000,
    popularity: 165.0,
    language: "hi",
    originCountry: "US",
    budget: 160000000,
    revenue: 788679850,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Action", "Crime", "Thriller"],
    directors: [{ name: "Justin Lin" }],
    cast: [
      { name: "Vin Diesel", characterName: "Dominic Toretto" },
      { name: "Paul Walker", characterName: "Brian O'Conner" },
      { name: "Dwayne Johnson", characterName: "Luke Hobbs" },
      { name: "Michelle Rodriguez", characterName: "Letty Ortiz" }
    ]
  },

  // 4. Mission: Impossible Series
  {
    tmdbId: 353081,
    imdbId: "tt4649466",
    title: "Mission: Impossible – Fallout",
    originalTitle: "Mission: Impossible - Fallout",
    tagline: "Some missions are not a choice. (Hindi Dubbed)",
    overview:
      "When an IMF mission ends badly and plutonium is lost, the world is faced with grave consequences. Ethan Hunt and his team are forced to work alongside a CIA assassin to avert a global catastrophe. Featuring breathtaking Tom Cruise stunts, available in Hindi Dubbed & English.",
    releaseDate: "2018-07-13",
    releaseYear: 2018,
    runtime: 147,
    posterUrl: "https://image.tmdb.org/t/p/w780/AkJQvtR09N5VO896wN1Fv4iP9QZ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/aw4AUN5r8bVdGzWfB28M2h55S4Z.jpg",
    trailerKey: "wb49-oV0F78",
    trailerUrl: "https://www.youtube.com/watch?v=wb49-oV0F78",
    voteAverage: 7.4,
    voteCount: 78000,
    popularity: 205.0,
    language: "hi",
    originCountry: "US",
    budget: 178000000,
    revenue: 791657398,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video (Hindi)", "Netflix"]),
    genres: ["Action", "Adventure", "Thriller"],
    directors: [{ name: "Christopher McQuarrie" }],
    cast: [
      { name: "Tom Cruise", characterName: "Ethan Hunt" },
      { name: "Henry Cavill", characterName: "August Walker" },
      { name: "Rebecca Ferguson", characterName: "Ilsa Faust" },
      { name: "Simon Pegg", characterName: "Benji Dunn" }
    ]
  },
  {
    tmdbId: 575264,
    imdbId: "tt9603212",
    title: "Mission: Impossible – Dead Reckoning",
    originalTitle: "Mission: Impossible - Dead Reckoning Part One",
    tagline: "We all share the same fate. (Hindi Dubbed)",
    overview:
      "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new rogue AI weapon that threatens all of humanity before it falls into the wrong hands. Available in Hindi Dubbed & English.",
    releaseDate: "2023-07-08",
    releaseYear: 2023,
    runtime: 163,
    posterUrl: "https://image.tmdb.org/t/p/w780/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    trailerKey: "avz06PDqDbM",
    trailerUrl: "https://www.youtube.com/watch?v=avz06PDqDbM",
    voteAverage: 7.6,
    voteCount: 65000,
    popularity: 215.0,
    language: "hi",
    originCountry: "US",
    budget: 291000000,
    revenue: 567535383,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Action", "Thriller", "Adventure"],
    directors: [{ name: "Christopher McQuarrie" }],
    cast: [
      { name: "Tom Cruise", characterName: "Ethan Hunt" },
      { name: "Hayley Atwell", characterName: "Grace" },
      { name: "Rebecca Ferguson", characterName: "Ilsa Faust" }
    ]
  },

  // 5. Jurassic World & Park
  {
    tmdbId: 135397,
    imdbId: "tt0369610",
    title: "Jurassic World",
    originalTitle: "Jurassic World",
    tagline: "The park is open. (Hindi Dubbed)",
    overview:
      "Twenty-two years after the events of Jurassic Park, Isla Nublar now features a fully functioning dinosaur theme park. But chaos erupts when a genetically modified predatory dinosaur, the Indominus Rex, escapes containment. Starring Chris Pratt and Irrfan Khan, available in Hindi Dubbed & English.",
    releaseDate: "2015-06-06",
    releaseYear: 2015,
    runtime: 124,
    posterUrl: "https://image.tmdb.org/t/p/w780/A0LZH79vC2X6T4qWqXhR2F1qJ9P.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qRKEAcWmm.jpg",
    trailerKey: "RFinNxS5KN4",
    trailerUrl: "https://www.youtube.com/watch?v=RFinNxS5KN4",
    voteAverage: 6.7,
    voteCount: 79000,
    popularity: 185.0,
    language: "hi",
    originCountry: "US",
    budget: 150000000,
    revenue: 1671537444,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)", "Prime Video"]),
    genres: ["Action", "Adventure", "Science Fiction"],
    directors: [{ name: "Colin Trevorrow" }],
    cast: [
      { name: "Chris Pratt", characterName: "Owen Grady" },
      { name: "Bryce Dallas Howard", characterName: "Claire Dearing" },
      { name: "Irrfan Khan", characterName: "Simon Masrani" }
    ]
  },
  {
    tmdbId: 329,
    imdbId: "tt0107290",
    title: "Jurassic Park (1993)",
    originalTitle: "Jurassic Park",
    tagline: "An adventure 65 million years in the making. (Hindi Dubbed)",
    overview:
      "Steven Spielberg's ground-breaking cinematic triumph. A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs cloned from prehistoric DNA, but an industrial sabotage unleashes primal terror. Available in Hindi Dubbed & English.",
    releaseDate: "1993-06-11",
    releaseYear: 1993,
    runtime: 127,
    posterUrl: "https://image.tmdb.org/t/p/w780/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/5mzr6An4GQ2Z49T452wZJb6N2iM.jpg",
    trailerKey: "QWBKEmWWL38",
    trailerUrl: "https://www.youtube.com/watch?v=QWBKEmWWL38",
    voteAverage: 8.0,
    voteCount: 92000,
    popularity: 175.0,
    language: "hi",
    originCountry: "US",
    budget: 63000000,
    revenue: 1046487228,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Adventure", "Science Fiction"],
    directors: [{ name: "Steven Spielberg" }],
    cast: [
      { name: "Sam Neill", characterName: "Dr. Alan Grant" },
      { name: "Laura Dern", characterName: "Dr. Ellie Sattler" },
      { name: "Jeff Goldblum", characterName: "Dr. Ian Malcolm" }
    ]
  },

  // 6. Transformers Series
  {
    tmdbId: 1858,
    imdbId: "tt0418279",
    title: "Transformers (2007)",
    originalTitle: "Transformers",
    tagline: "Their war. Our world. (Hindi Dubbed)",
    overview:
      "Young Sam Witwicky holds the secret to the Allspark, a cosmic artifact capable of giving infinite life to machines. When the Autobots led by Optimus Prime clash against the ruthless Decepticons led by Megatron on Earth, humanity's fate hangs by a thread. Available in Hindi Dubbed & English.",
    releaseDate: "2007-06-27",
    releaseYear: 2007,
    runtime: 144,
    posterUrl: "https://image.tmdb.org/t/p/w780/1bzp3UkmGg3R2Y1Z0Wk59h6ZqgG.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/8t70fHjJ2d2t2k64Lw58fS2k9h0.jpg",
    trailerKey: "CbX_SIz_9fk",
    trailerUrl: "https://www.youtube.com/watch?v=CbX_SIz_9fk",
    voteAverage: 6.8,
    voteCount: 71000,
    popularity: 178.0,
    language: "hi",
    originCountry: "US",
    budget: 150000000,
    revenue: 709709780,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Michael Bay" }],
    cast: [
      { name: "Shia LaBeouf", characterName: "Sam Witwicky" },
      { name: "Megan Fox", characterName: "Mikaela Banes" },
      { name: "Josh Duhamel", characterName: "Captain William Lennox" }
    ]
  },
  {
    tmdbId: 38356,
    imdbId: "tt1564585",
    title: "Transformers: Dark of the Moon",
    originalTitle: "Transformers: Dark of the Moon",
    tagline: "Earth will never be the same. (Hindi Dubbed)",
    overview:
      "The Autobots learn of a Cybertronian spacecraft hidden on the Moon, and race against the Decepticons to reach it and learn its secrets, leading to a catastrophic battle in Chicago. Available in Hindi Dubbed & English.",
    releaseDate: "2011-06-28",
    releaseYear: 2011,
    runtime: 154,
    posterUrl: "https://image.tmdb.org/t/p/w780/x0hS4wS96fV6c5g2k0N9V6v0fN7.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1P3p870K4aGf62w8G9M2p9X3a4.jpg",
    trailerKey: "3H8bnKdf654",
    trailerUrl: "https://www.youtube.com/watch?v=3H8bnKdf654",
    voteAverage: 6.2,
    voteCount: 62000,
    popularity: 160.0,
    language: "hi",
    originCountry: "US",
    budget: 195000000,
    revenue: 1123794079,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Michael Bay" }],
    cast: [
      { name: "Shia LaBeouf", characterName: "Sam Witwicky" },
      { name: "Rosie Huntington-Whiteley", characterName: "Carly Spencer" },
      { name: "Josh Duhamel", characterName: "Major William Lennox" }
    ]
  },

  // 7. The Matrix Series
  {
    tmdbId: 603,
    imdbId: "tt0133093",
    title: "The Matrix (1999)",
    originalTitle: "The Matrix",
    tagline: "Free your mind. (Hindi Dubbed)",
    overview:
      "Set in the 22nd century, The Matrix tells the story of a computer hacker named Neo who joins a group of underground rebels fighting the vast, simulated machine reality known as the Matrix. Keanu Reeves' monumental sci-fi classic, available in Hindi Dubbed & English.",
    releaseDate: "1999-03-30",
    releaseYear: 1999,
    runtime: 136,
    posterUrl: "https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fNG7i7rqMErkcqhohV2a6JW9pqw.jpg",
    trailerKey: "vKQi3bBA1y8",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    voteAverage: 8.2,
    voteCount: 118000,
    popularity: 210.0,
    language: "hi",
    originCountry: "US",
    budget: 63000000,
    revenue: 463517383,
    streamingPlatforms: JSON.stringify(["Netflix (Hindi)", "JioCinema (Hindi)", "Prime Video"]),
    genres: ["Action", "Science Fiction"],
    directors: [{ name: "Lana Wachowski" }, { name: "Lilly Wachowski" }],
    cast: [
      { name: "Keanu Reeves", characterName: "Thomas A. Anderson / Neo" },
      { name: "Laurence Fishburne", characterName: "Morpheus" },
      { name: "Carrie-Anne Moss", characterName: "Trinity" },
      { name: "Hugo Weaving", characterName: "Agent Smith" }
    ]
  },
  {
    tmdbId: 604,
    imdbId: "tt0234215",
    title: "The Matrix Reloaded",
    originalTitle: "The Matrix Reloaded",
    tagline: "Free your mind. (Hindi Dubbed)",
    overview:
      "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans. He must use his extraordinary powers to stop an army of 250,000 sentinels programmed to destroy Zion. Available in Hindi Dubbed & English.",
    releaseDate: "2003-05-15",
    releaseYear: 2003,
    runtime: 138,
    posterUrl: "https://image.tmdb.org/t/p/w780/9TGHDvWr2KBzwDxDodHYXEmOE6J.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2UMG5r9YW.jpg",
    trailerKey: "kYzz0FSgpSU",
    trailerUrl: "https://www.youtube.com/watch?v=kYzz0FSgpSU",
    voteAverage: 7.0,
    voteCount: 75000,
    popularity: 168.0,
    language: "hi",
    originCountry: "US",
    budget: 150000000,
    revenue: 742128461,
    streamingPlatforms: JSON.stringify(["Netflix (Hindi)", "JioCinema (Hindi)"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Lana Wachowski" }, { name: "Lilly Wachowski" }],
    cast: [
      { name: "Keanu Reeves", characterName: "Neo" },
      { name: "Laurence Fishburne", characterName: "Morpheus" },
      { name: "Carrie-Anne Moss", characterName: "Trinity" }
    ]
  },

  // 8. John Wick Series
  {
    tmdbId: 603692,
    imdbId: "tt10366206",
    title: "John Wick: Chapter 4",
    originalTitle: "John Wick: Chapter 4",
    tagline: "No way back, one way out. (Hindi Dubbed)",
    overview:
      "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe. Masterpiece of modern action cinema, available in Hindi Dubbed & English.",
    releaseDate: "2023-03-22",
    releaseYear: 2023,
    runtime: 169,
    posterUrl: "https://image.tmdb.org/t/p/w780/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/h8gHn0OzBoaefW0zZwhqIHLgrvP.jpg",
    trailerKey: "qEVUtrk8_B4",
    trailerUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    voteAverage: 7.8,
    voteCount: 96000,
    popularity: 245.0,
    language: "hi",
    originCountry: "US",
    budget: 100000000,
    revenue: 440146694,
    streamingPlatforms: JSON.stringify(["Lionsgate Play (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Action", "Thriller", "Crime"],
    directors: [{ name: "Chad Stahelski" }],
    cast: [
      { name: "Keanu Reeves", characterName: "John Wick" },
      { name: "Donnie Yen", characterName: "Caine" },
      { name: "Bill Skarsgård", characterName: "Marquis Vincent de Gramont" },
      { name: "Laurence Fishburne", characterName: "Bowery King" }
    ]
  },
  {
    tmdbId: 245891,
    imdbId: "tt2911666",
    title: "John Wick (2014)",
    originalTitle: "John Wick",
    tagline: "Don't set him off. (Hindi Dubbed)",
    overview:
      "An ex-hitman comes out of retirement to track down the gangsters that took everything from him. With New York City as his bullet-riddled playground, John Wick delivers relentless stylized gun-fu. Available in Hindi Dubbed & English.",
    releaseDate: "2014-10-22",
    releaseYear: 2014,
    runtime: 101,
    posterUrl: "https://image.tmdb.org/t/p/w780/fZPS29VPZgu9vnnbPPF94iR7nhS.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/umC04Cozevu8nn3Jn5i6EvJW42l.jpg",
    trailerKey: "2AUmvWm5ZDQ",
    trailerUrl: "https://www.youtube.com/watch?v=2AUmvWm5ZDQ",
    voteAverage: 7.4,
    voteCount: 88000,
    popularity: 185.0,
    language: "hi",
    originCountry: "US",
    budget: 20000000,
    revenue: 86081850,
    streamingPlatforms: JSON.stringify(["Lionsgate Play (Hindi)", "Prime Video (Hindi)"]),
    genres: ["Action", "Thriller"],
    directors: [{ name: "Chad Stahelski" }],
    cast: [
      { name: "Keanu Reeves", characterName: "John Wick" },
      { name: "Michael Nyqvist", characterName: "Viggo Tarasov" },
      { name: "Willem Dafoe", characterName: "Marcus" }
    ]
  },

  // 9. The Dark Knight Trilogy (Completing with Batman Begins & TDKR)
  {
    tmdbId: 272,
    imdbId: "tt0372784",
    title: "Batman Begins",
    originalTitle: "Batman Begins",
    tagline: "Evil does not sleep. (Hindi Dubbed)",
    overview:
      "Driven by tragedy, billionaire Bruce Wayne travels the world seeking the means to fight injustice. Returning to Gotham City, he forges his alter ego Batman to dismantle the mafia and defeat Ra's al Ghul's League of Shadows. Christopher Nolan's legendary trilogy origin, available in Hindi Dubbed & English.",
    releaseDate: "2005-06-10",
    releaseYear: 2005,
    runtime: 140,
    posterUrl: "https://image.tmdb.org/t/p/w780/4MpN4CwhvuaYBu8L0r7E31W2Esm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/mod96W5rYd5f5r5iGZ7oP76mS9.jpg",
    trailerKey: "neY2xVmOfUM",
    trailerUrl: "https://www.youtube.com/watch?v=neY2xVmOfUM",
    voteAverage: 7.7,
    voteCount: 110000,
    popularity: 190.0,
    language: "hi",
    originCountry: "US",
    budget: 150000000,
    revenue: 374218673,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)", "Prime Video"]),
    genres: ["Action", "Crime", "Drama"],
    directors: [{ name: "Christopher Nolan" }],
    cast: [
      { name: "Christian Bale", characterName: "Bruce Wayne / Batman" },
      { name: "Michael Caine", characterName: "Alfred Pennyworth" },
      { name: "Liam Neeson", characterName: "Henri Ducard / Ra's al Ghul" },
      { name: "Gary Oldman", characterName: "Lt. James Gordon" }
    ]
  },
  {
    tmdbId: 49026,
    imdbId: "tt1345836",
    title: "The Dark Knight Rises",
    originalTitle: "The Dark Knight Rises",
    tagline: "A fire will rise. (Hindi Dubbed)",
    overview:
      "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Selina Kyle, is forced from his exile to save Gotham City from the brutal terrorist Bane. The thrilling conclusion to Christopher Nolan's epic trilogy, available in Hindi Dubbed & English.",
    releaseDate: "2012-07-16",
    releaseYear: 2012,
    runtime: 165,
    posterUrl: "https://image.tmdb.org/t/p/w780/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/3bgtU258H60aHw0hF6jV27b6.jpg",
    trailerKey: "GokKUqLcvD8",
    trailerUrl: "https://www.youtube.com/watch?v=GokKUqLcvD8",
    voteAverage: 7.8,
    voteCount: 125000,
    popularity: 205.0,
    language: "hi",
    originCountry: "US",
    budget: 250000000,
    revenue: 1084939099,
    streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)", "Prime Video"]),
    genres: ["Action", "Crime", "Drama", "Thriller"],
    directors: [{ name: "Christopher Nolan" }],
    cast: [
      { name: "Christian Bale", characterName: "Bruce Wayne / Batman" },
      { name: "Tom Hardy", characterName: "Bane" },
      { name: "Anne Hathaway", characterName: "Selina Kyle / Catwoman" },
      { name: "Michael Caine", characterName: "Alfred Pennyworth" }
    ]
  }
];

async function seed() {
  console.log("Seeding Hollywood Hindi Dubbed blockbusters...");

  // 1. Ensure all genres exist
  const genreSet = new Set();
  HOLLYWOOD_HINDI_MOVIES.forEach(m => m.genres.forEach(g => genreSet.add(g)));
  const genreMap = {};
  for (const gName of genreSet) {
    const slug = gName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const genre = await prisma.genre.upsert({
      where: { name: gName },
      update: {},
      create: { name: gName, slug }
    });
    genreMap[gName] = genre.id;
  }

  // 2. Insert or update each movie
  for (const item of HOLLYWOOD_HINDI_MOVIES) {
    const movie = await prisma.movie.upsert({
      where: { tmdbId: item.tmdbId },
      update: {
        trailerKey: item.trailerKey,
        trailerUrl: item.trailerUrl,
        posterUrl: item.posterUrl,
        backdropUrl: item.backdropUrl,
        streamingPlatforms: item.streamingPlatforms,
        voteAverage: item.voteAverage,
        voteCount: item.voteCount,
        popularity: item.popularity,
        tagline: item.tagline,
        overview: item.overview,
      },
      create: {
        tmdbId: item.tmdbId,
        imdbId: item.imdbId,
        title: item.title,
        originalTitle: item.originalTitle,
        tagline: item.tagline,
        overview: item.overview,
        releaseDate: item.releaseDate,
        releaseYear: item.releaseYear,
        runtime: item.runtime,
        posterUrl: item.posterUrl,
        backdropUrl: item.backdropUrl,
        trailerUrl: item.trailerUrl,
        trailerKey: item.trailerKey,
        voteAverage: item.voteAverage,
        voteCount: item.voteCount,
        popularity: item.popularity,
        language: item.language,
        originCountry: item.originCountry,
        budget: BigInt(item.budget || 0),
        revenue: BigInt(item.revenue || 0),
        streamingPlatforms: item.streamingPlatforms
      }
    });

    // Link Genres
    for (const gName of item.genres) {
      if (genreMap[gName]) {
        await prisma.movieGenre.upsert({
          where: { movieId_genreId: { movieId: movie.id, genreId: genreMap[gName] } },
          update: {},
          create: { movieId: movie.id, genreId: genreMap[gName] }
        });
      }
    }

    // Link Directors
    for (const dir of item.directors) {
      let director = await prisma.director.findFirst({ where: { name: dir.name } });
      if (!director) {
        director = await prisma.director.create({
          data: { name: dir.name, popularity: 40.0 }
        });
      }
      await prisma.movieDirector.upsert({
        where: { movieId_directorId: { movieId: movie.id, directorId: director.id } },
        update: {},
        create: { movieId: movie.id, directorId: director.id }
      });
    }

    // Link Cast
    let idx = 0;
    for (const actorData of item.cast) {
      let actor = await prisma.actor.findFirst({ where: { name: actorData.name } });
      if (!actor) {
        actor = await prisma.actor.create({
          data: { name: actorData.name, popularity: 45.0 }
        });
      }
      const existingCast = await prisma.movieCast.findFirst({
        where: { movieId: movie.id, actorId: actor.id }
      });
      if (!existingCast) {
        await prisma.movieCast.create({
          data: {
            movieId: movie.id,
            actorId: actor.id,
            characterName: actorData.characterName,
            orderIndex: idx++
          }
        });
      }
    }

    console.log(`✓ Seeded Hollywood Hindi film: ${movie.title} [Trailer: ${movie.trailerKey}]`);
  }

  // Also ensure Interstellar and Inception streaming platforms have Hindi dubbed indication
  const interstellar = await prisma.movie.findFirst({ where: { title: "Interstellar" } });
  if (interstellar) {
    await prisma.movie.update({
      where: { id: interstellar.id },
      data: {
        streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Prime Video (Hindi)", "Apple TV", "Max"])
      }
    });
    console.log("✓ Updated Interstellar with Hindi Dubbed streaming availability");
  }

  const inception = await prisma.movie.findFirst({ where: { title: "Inception" } });
  if (inception) {
    await prisma.movie.update({
      where: { id: inception.id },
      data: {
        streamingPlatforms: JSON.stringify(["Netflix (Hindi)", "JioCinema (Hindi)", "Prime Video"])
      }
    });
    console.log("✓ Updated Inception with Hindi Dubbed streaming availability");
  }

  const tdk = await prisma.movie.findFirst({ where: { title: "The Dark Knight" } });
  if (tdk) {
    await prisma.movie.update({
      where: { id: tdk.id },
      data: {
        streamingPlatforms: JSON.stringify(["JioCinema (Hindi)", "Netflix (Hindi)", "Prime Video"])
      }
    });
    console.log("✓ Updated The Dark Knight with Hindi Dubbed streaming availability");
  }

  console.log("All requested Hollywood Hindi Dubbed movies seeded successfully!");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
