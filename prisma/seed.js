const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MOVIES_SEED = [
  {
    tmdbId: 157336,
    imdbId: "tt0816692",
    title: "Interstellar",
    originalTitle: "Interstellar",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    releaseDate: "2014-11-05",
    releaseYear: 2014,
    runtime: 169,
    posterUrl: "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    trailerKey: "zSWdZVtXT7E",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    voteAverage: 8.7,
    voteCount: 35000,
    popularity: 145.8,
    language: "en",
    originCountry: "US",
    budget: 165000000,
    revenue: 730000000,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV", "Max"]),
    genres: ["Science Fiction", "Drama", "Adventure"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Matthew McConaughey", characterName: "Joseph Cooper", profileUrl: "https://image.tmdb.org/t/p/w300/wDeLh9v8T05k4nI2Q44l5sV0qYn.jpg" },
      { name: "Anne Hathaway", characterName: "Dr. Amelia Brand", profileUrl: "https://image.tmdb.org/t/p/w300/tLelKoPNiyJCSEtQT8110x5bX5T.jpg" },
      { name: "Jessica Chastain", characterName: "Murphy Cooper", profileUrl: "https://image.tmdb.org/t/p/w300/lodMzLKSdrb1aGfa8p92sLd5U1g.jpg" },
      { name: "Michael Caine", characterName: "Professor John Brand", profileUrl: "https://image.tmdb.org/t/p/w300/klNxZ3x8i4aX9tP0eYg2S6G9c7.jpg" }
    ]
  },
  {
    tmdbId: 27205,
    imdbId: "tt1375666",
    title: "Inception",
    originalTitle: "Inception",
    tagline: "Your mind is the scene of the crime.",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    releaseDate: "2010-07-15",
    releaseYear: 2010,
    runtime: 148,
    posterUrl: "https://image.tmdb.org/t/p/w780/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    trailerKey: "YoHD9XEInc0",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    voteAverage: 8.8,
    voteCount: 36000,
    popularity: 130.4,
    language: "en",
    originCountry: "US",
    budget: 160000000,
    revenue: 836836967,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Apple TV"]),
    genres: ["Action", "Science Fiction", "Adventure"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Leonardo DiCaprio", characterName: "Dom Cobb", profileUrl: "https://image.tmdb.org/t/p/w300/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { name: "Joseph Gordon-Levitt", characterName: "Arthur", profileUrl: "https://image.tmdb.org/t/p/w300/dhv9eXf2Kj4P3rK14u6mR9hVbY.jpg" },
      { name: "Elliot Page", characterName: "Ariadne", profileUrl: "https://image.tmdb.org/t/p/w300/tp1n2B0o9N8v2l4E7l8mE1UfJ2.jpg" },
      { name: "Tom Hardy", characterName: "Eames", profileUrl: "https://image.tmdb.org/t/p/w300/d8joDsVIr75inY9v59b4T4yVv.jpg" }
    ]
  },
  {
    tmdbId: 872585,
    imdbId: "tt15398776",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    tagline: "The world forever changes.",
    overview:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, examining the moral compromises and catastrophic power that forever altered modern civilization.",
    releaseDate: "2023-07-19",
    releaseYear: 2023,
    runtime: 180,
    posterUrl: "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailerKey: "uYPbbksJxIg",
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    voteAverage: 8.9,
    voteCount: 15000,
    popularity: 180.2,
    language: "en",
    originCountry: "US",
    budget: 100000000,
    revenue: 957000000,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV", "JioCinema"]),
    genres: ["Drama", "History"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Cillian Murphy", characterName: "J. Robert Oppenheimer", profileUrl: "https://image.tmdb.org/t/p/w300/llk2Sm9Yf2S0eK5p4X5bX9pLpY.jpg" },
      { name: "Emily Blunt", characterName: "Katherine Oppenheimer", profileUrl: "https://image.tmdb.org/t/p/w300/nPJXaRMQg00hSpZfLbmk5QJpZ1.jpg" },
      { name: "Robert Downey Jr.", characterName: "Lewis Strauss", profileUrl: "https://image.tmdb.org/t/p/w300/im9SAqJPZKEbVZG4lEGJuAJmEZ.jpg" }
    ]
  },
  {
    tmdbId: 155,
    imdbId: "tt0468569",
    title: "The Dark Knight",
    originalTitle: "The Dark Knight",
    tagline: "Why so serious?",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known as the Joker.",
    releaseDate: "2008-07-16",
    releaseYear: 2008,
    runtime: 152,
    posterUrl: "https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    trailerKey: "EXeTwQWrcwY",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    voteAverage: 9.0,
    voteCount: 32000,
    popularity: 115.6,
    language: "en",
    originCountry: "US",
    budget: 185000000,
    revenue: 1004558444,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Max"]),
    genres: ["Action", "Crime", "Drama"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Christian Bale", characterName: "Bruce Wayne / Batman", profileUrl: "https://image.tmdb.org/t/p/w300/b7fTC9WFuvqOi2YIPw0ZgqVzT9.jpg" },
      { name: "Heath Ledger", characterName: "Joker", profileUrl: "https://image.tmdb.org/t/p/w300/5Y9HnYYa9jF4D3J0V0gQ.jpg" },
      { name: "Michael Caine", characterName: "Alfred Pennyworth", profileUrl: "https://image.tmdb.org/t/p/w300/klNxZ3x8i4aX9tP0eYg2S6G9c7.jpg" }
    ]
  },
  {
    tmdbId: 335984,
    imdbId: "tt1856101",
    title: "Blade Runner 2049",
    originalTitle: "Blade Runner 2049",
    tagline: "There's still a page left.",
    overview:
      "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
    releaseDate: "2017-10-04",
    releaseYear: 2017,
    runtime: 164,
    posterUrl: "https://image.tmdb.org/t/p/w780/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    trailerKey: "gCcx85zbxz4",
    trailerUrl: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    voteAverage: 8.5,
    voteCount: 14000,
    popularity: 98.4,
    language: "en",
    originCountry: "US",
    budget: 150000000,
    revenue: 259239658,
    streamingPlatforms: JSON.stringify(["Netflix", "Apple TV", "Max"]),
    genres: ["Science Fiction", "Mystery", "Drama"],
    directors: [{ name: "Denis Villeneuve", profileUrl: "https://image.tmdb.org/t/p/w300/zdDxMoFcl0L1fd6zpU1u675K9yA.jpg" }],
    cast: [
      { name: "Ryan Gosling", characterName: "Officer K", profileUrl: "https://image.tmdb.org/t/p/w300/lyUyVARlaPrTQaxyq4Np829FIHX.jpg" },
      { name: "Harrison Ford", characterName: "Rick Deckard", profileUrl: "https://image.tmdb.org/t/p/w300/5mFn3W8Q9v5s7u9eK14u6mR9h.jpg" },
      { name: "Ana de Armas", characterName: "Joi", profileUrl: "https://image.tmdb.org/t/p/w300/vkoea4bL45rP0s2l6fW3eK1.jpg" }
    ]
  },
  {
    tmdbId: 329865,
    imdbId: "tt2543164",
    title: "Arrival",
    originalTitle: "Arrival",
    tagline: "Why are they here?",
    overview:
      "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
    releaseDate: "2016-11-10",
    releaseYear: 2016,
    runtime: 116,
    posterUrl: "https://image.tmdb.org/t/p/w780/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tiAZ3Wskf30444r4eO44wB1uA1U.jpg",
    trailerKey: "tFMo3UJ4B4g",
    trailerUrl: "https://www.youtube.com/watch?v=tFMo3UJ4B4g",
    voteAverage: 8.3,
    voteCount: 17500,
    popularity: 88.7,
    language: "en",
    originCountry: "US",
    budget: 47000000,
    revenue: 203388186,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV", "Paramount+"]),
    genres: ["Science Fiction", "Mystery", "Drama"],
    directors: [{ name: "Denis Villeneuve", profileUrl: "https://image.tmdb.org/t/p/w300/zdDxMoFcl0L1fd6zpU1u675K9yA.jpg" }],
    cast: [
      { name: "Amy Adams", characterName: "Dr. Louise Banks", profileUrl: "https://image.tmdb.org/t/p/w300/tk5uV9X1t0pW1eU9p0s2l6f.jpg" },
      { name: "Jeremy Renner", characterName: "Ian Donnelly", profileUrl: "https://image.tmdb.org/t/p/w300/yB84A0ZqX8h1Y2k5p4X5bX9.jpg" },
      { name: "Forest Whitaker", characterName: "Colonel Weber", profileUrl: "https://image.tmdb.org/t/p/w300/8qB8V1t0pW1eU9p0s2l6.jpg" }
    ]
  },
  {
    tmdbId: 693134,
    imdbId: "tt15239678",
    title: "Dune: Part Two",
    originalTitle: "Dune: Part Two",
    tagline: "Long live the fighters.",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    releaseDate: "2024-02-27",
    releaseYear: 2024,
    runtime: 166,
    posterUrl: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0x2.jpg",
    trailerKey: "Way9Dexny3w",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    voteAverage: 8.7,
    voteCount: 6500,
    popularity: 210.5,
    language: "en",
    originCountry: "US",
    budget: 190000000,
    revenue: 711844358,
    streamingPlatforms: JSON.stringify(["Max", "Apple TV", "Prime Video"]),
    genres: ["Science Fiction", "Adventure"],
    directors: [{ name: "Denis Villeneuve", profileUrl: "https://image.tmdb.org/t/p/w300/zdDxMoFcl0L1fd6zpU1u675K9yA.jpg" }],
    cast: [
      { name: "Timothée Chalamet", characterName: "Paul Atreides", profileUrl: "https://image.tmdb.org/t/p/w300/BE2sdjpgsa2rNTFa66f7ikNV.jpg" },
      { name: "Zendaya", characterName: "Chani", profileUrl: "https://image.tmdb.org/t/p/w300/r3A7evXYGEAoBHQ9Z.jpg" },
      { name: "Rebecca Ferguson", characterName: "Lady Jessica", profileUrl: "https://image.tmdb.org/t/p/w300/6NRUknbVn.jpg" }
    ]
  },
  {
    tmdbId: 496243,
    imdbId: "tt6751668",
    title: "Parasite",
    originalTitle: "기생충",
    tagline: "Act like you own the place.",
    overview:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident that spirals out of control.",
    releaseDate: "2019-05-30",
    releaseYear: 2019,
    runtime: 132,
    posterUrl: "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
    trailerKey: "isOGD_7hNIY",
    trailerUrl: "https://www.youtube.com/watch?v=isOGD_7hNIY",
    voteAverage: 8.9,
    voteCount: 18000,
    popularity: 92.3,
    language: "ko",
    originCountry: "KR",
    budget: 11400000,
    revenue: 258704850,
    streamingPlatforms: JSON.stringify(["Max", "Prime Video", "Apple TV"]),
    genres: ["Thriller", "Comedy", "Drama"],
    directors: [{ name: "Bong Joon-ho", profileUrl: "https://image.tmdb.org/t/p/w300/961s2lP0sW1.jpg" }],
    cast: [
      { name: "Song Kang-ho", characterName: "Kim Ki-taek", profileUrl: "https://image.tmdb.org/t/p/w300/mXpL9k0s2l6.jpg" },
      { name: "Lee Sun-kyun", characterName: "Park Dong-ik", profileUrl: "https://image.tmdb.org/t/p/w300/7aL2k5p4X5b.jpg" },
      { name: "Cho Yeo-jeong", characterName: "Park Yeon-gyo", profileUrl: "https://image.tmdb.org/t/p/w300/b8mE1UfJ2.jpg" }
    ]
  },
  {
    tmdbId: 11324,
    imdbId: "tt1130884",
    title: "Shutter Island",
    originalTitle: "Shutter Island",
    tagline: "Someone is missing.",
    overview:
      "World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from Boston's Shutter Island Ashecliffe Hospital for the criminally insane, only to encounter terrifying mind games and a conspiracy that hits close to home.",
    releaseDate: "2010-02-18",
    releaseYear: 2010,
    runtime: 138,
    posterUrl: "https://image.tmdb.org/t/p/w780/4GDy0PHYX3VRXUtwK5ysagvk2Te.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/c4r4kZ602vV5Y9xW1.jpg",
    trailerKey: "5iaYLCiq5RM",
    trailerUrl: "https://www.youtube.com/watch?v=5iaYLCiq5RM",
    voteAverage: 8.6,
    voteCount: 23000,
    popularity: 95.1,
    language: "en",
    originCountry: "US",
    budget: 80000000,
    revenue: 294804195,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Apple TV"]),
    genres: ["Thriller", "Mystery", "Drama"],
    directors: [{ name: "Martin Scorsese", profileUrl: "https://image.tmdb.org/t/p/w300/scorsese.jpg" }],
    cast: [
      { name: "Leonardo DiCaprio", characterName: "Teddy Daniels", profileUrl: "https://image.tmdb.org/t/p/w300/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg" },
      { name: "Mark Ruffalo", characterName: "Chuck Aule", profileUrl: "https://image.tmdb.org/t/p/w300/z3XF.jpg" },
      { name: "Ben Kingsley", characterName: "Dr. John Cawley", profileUrl: "https://image.tmdb.org/t/p/w300/kingsley.jpg" }
    ]
  },
  {
    tmdbId: 324857,
    imdbId: "tt3501632",
    title: "Spider-Man: Into the Spider-Verse",
    originalTitle: "Spider-Man: Into the Spider-Verse",
    tagline: "More than one wears the mask.",
    overview:
      "Teenager Miles Morales struggles to live up to expectations. But when he is bitten by a radioactive spider, he gains powers and must team up with five alternate spider-heroes to stop a threat to all reality.",
    releaseDate: "2018-12-06",
    releaseYear: 2018,
    runtime: 117,
    posterUrl: "https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/uUiId6cG32JSRjT6X9.jpg",
    trailerKey: "tg52up16eq0",
    trailerUrl: "https://www.youtube.com/watch?v=tg52up16eq0",
    voteAverage: 8.4,
    voteCount: 15000,
    popularity: 110.2,
    language: "en",
    originCountry: "US",
    budget: 90000000,
    revenue: 375540831,
    streamingPlatforms: JSON.stringify(["Disney+", "Apple TV", "Prime Video"]),
    genres: ["Animation", "Action", "Adventure", "Family"],
    directors: [{ name: "Bob Persichetti", profileUrl: null }, { name: "Peter Ramsey", profileUrl: null }],
    cast: [
      { name: "Shameik Moore", characterName: "Miles Morales / Spider-Man", profileUrl: null },
      { name: "Jake Johnson", characterName: "Peter B. Parker", profileUrl: null },
      { name: "Hailee Steinfeld", characterName: "Gwen Stacy / Spider-Woman", profileUrl: null }
    ]
  },
  {
    tmdbId: 129,
    imdbId: "tt0245429",
    title: "Spirited Away",
    originalTitle: "千と千尋の神隠し",
    tagline: "The tunnel led Chihiro to a mysterious town...",
    overview:
      "A young girl, Chihiro, becomes trapped in a strange world of spirits. After her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
    releaseDate: "2001-07-20",
    releaseYear: 2001,
    runtime: 125,
    posterUrl: "https://image.tmdb.org/t/p/w780/393mhqrL0TJsknplv3l5y5I6.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wio7ia9UyID.jpg",
    trailerKey: "ByXuk9QqQkk",
    trailerUrl: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    voteAverage: 8.8,
    voteCount: 16000,
    popularity: 105.8,
    language: "ja",
    originCountry: "JP",
    budget: 19000000,
    revenue: 395580000,
    streamingPlatforms: JSON.stringify(["Netflix", "Apple TV", "Max"]),
    genres: ["Animation", "Family", "Fantasy"],
    directors: [{ name: "Hayao Miyazaki", profileUrl: "https://image.tmdb.org/t/p/w300/miyazaki.jpg" }],
    cast: [
      { name: "Rumi Hiiragi", characterName: "Chihiro Ogino", profileUrl: null },
      { name: "Miyu Irino", characterName: "Haku", profileUrl: null }
    ]
  },
  {
    tmdbId: 354912,
    imdbId: "tt2380307",
    title: "Coco",
    originalTitle: "Coco",
    tagline: "The celebration of a lifetime.",
    overview:
      "Despite his family's baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events.",
    releaseDate: "2017-10-27",
    releaseYear: 2017,
    runtime: 105,
    posterUrl: "https://image.tmdb.org/t/p/w780/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/askg3SMvhqEl4OL52YuvdtQw40.jpg",
    trailerKey: "Rvr68u6k5sI",
    trailerUrl: "https://www.youtube.com/watch?v=Rvr68u6k5sI",
    voteAverage: 8.2,
    voteCount: 19000,
    popularity: 99.4,
    language: "en",
    originCountry: "US",
    budget: 175000000,
    revenue: 807817888,
    streamingPlatforms: JSON.stringify(["Disney+", "Apple TV"]),
    genres: ["Family", "Animation", "Music", "Adventure"],
    directors: [{ name: "Lee Unkrich", profileUrl: null }],
    cast: [
      { name: "Anthony Gonzalez", characterName: "Miguel", profileUrl: null },
      { name: "Gael García Bernal", characterName: "Héctor", profileUrl: null }
    ]
  },
  {
    tmdbId: 20453,
    imdbId: "tt1187043",
    title: "3 Idiots",
    originalTitle: "3 Idiots",
    tagline: "Chase excellence, and success will follow.",
    overview:
      "Two friends search for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them idiots.",
    releaseDate: "2009-12-25",
    releaseYear: 2009,
    runtime: 170,
    posterUrl: "https://image.tmdb.org/t/p/w780/7H2b8d0c2sL3.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/uP2023.jpg",
    trailerKey: "K0eDlFX9GMc",
    trailerUrl: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
    voteAverage: 8.5,
    voteCount: 2200,
    popularity: 65.4,
    language: "hi",
    originCountry: "IN",
    budget: 7700000,
    revenue: 65000000,
    streamingPlatforms: JSON.stringify(["Prime Video", "Netflix", "YouTube"]),
    genres: ["Comedy", "Drama"],
    directors: [{ name: "Rajkumar Hirani", profileUrl: null }],
    cast: [
      { name: "Aamir Khan", characterName: "Rancho / Phunsukh Wangdu", profileUrl: "https://image.tmdb.org/t/p/w300/aamir.jpg" },
      { name: "R. Madhavan", characterName: "Farhan Qureshi", profileUrl: null },
      { name: "Sharman Joshi", characterName: "Raju Rastogi", profileUrl: null },
      { name: "Kareena Kapoor Khan", characterName: "Pia Sahastrabuddhe", profileUrl: null }
    ]
  },
  {
    tmdbId: 534780,
    imdbId: "tt8108198",
    title: "Andhadhun",
    originalTitle: "Andhadhun",
    tagline: "He stumbled upon the crime. Now he can't look away.",
    overview:
      "A series of mysterious events changes the life of a blind pianist who now must report a crime that was actually never witnessed by him, leading to unexpected twists and pitch-black comedic turns.",
    releaseDate: "2018-10-05",
    releaseYear: 2018,
    runtime: 139,
    posterUrl: "https://image.tmdb.org/t/p/w780/dy3BCjlQI9vUQI.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/andhadhun_bg.jpg",
    trailerKey: "2iVYI99VGaw",
    trailerUrl: "https://www.youtube.com/watch?v=2iVYI99VGaw",
    voteAverage: 8.3,
    voteCount: 1600,
    popularity: 58.2,
    language: "hi",
    originCountry: "IN",
    budget: 4500000,
    revenue: 64000000,
    streamingPlatforms: JSON.stringify(["Netflix", "JioCinema"]),
    genres: ["Thriller", "Crime", "Mystery", "Comedy"],
    directors: [{ name: "Sriram Raghavan", profileUrl: null }],
    cast: [
      { name: "Ayushmann Khurrana", characterName: "Akash", profileUrl: null },
      { name: "Tabu", characterName: "Simi", profileUrl: null },
      { name: "Radhika Apte", characterName: "Sophie", profileUrl: null }
    ]
  },
  {
    tmdbId: 538858,
    imdbId: "tt8239946",
    title: "Tumbbad",
    originalTitle: "Tumbbad",
    tagline: "A mythological horror about human greed.",
    overview:
      "A mythological story about a goddess who created the entire universe. The plot revolves around the consequences when humans build a temple for her first-born monster Hastar, driven by boundless avarice.",
    releaseDate: "2018-10-12",
    releaseYear: 2018,
    runtime: 104,
    posterUrl: "https://image.tmdb.org/t/p/w780/tumbbad_poster.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tumbbad_bg.jpg",
    trailerKey: "O9CaB4J4VEI",
    trailerUrl: "https://www.youtube.com/watch?v=O9CaB4J4VEI",
    voteAverage: 8.2,
    voteCount: 1400,
    popularity: 54.6,
    language: "hi",
    originCountry: "IN",
    budget: 1500000,
    revenue: 5500000,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV"]),
    genres: ["Fantasy", "Horror", "Drama"],
    directors: [{ name: "Rahi Anil Barve", profileUrl: null }],
    cast: [{ name: "Sohum Shah", characterName: "Vinayak Rao", profileUrl: null }]
  },
  {
    tmdbId: 77,
    imdbId: "tt0110413",
    title: "Memento",
    originalTitle: "Memento",
    tagline: "Some memories are best forgotten.",
    overview:
      "Leonard Shelby is tracking down the man who raped and murdered his wife. The difficulty of locating his wife's killer, however, is compounded by the fact that he suffers from a rare, untreatable form of short-term memory loss.",
    releaseDate: "2000-10-11",
    releaseYear: 2000,
    runtime: 113,
    posterUrl: "https://image.tmdb.org/t/p/w780/uipQJ7SNW144.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/memento_bg.jpg",
    trailerKey: "4CV41hoyS8A",
    trailerUrl: "https://www.youtube.com/watch?v=4CV41hoyS8A",
    voteAverage: 8.4,
    voteCount: 14500,
    popularity: 64.7,
    language: "en",
    originCountry: "US",
    budget: 9000000,
    revenue: 40000000,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV"]),
    genres: ["Mystery", "Thriller"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Guy Pearce", characterName: "Leonard Shelby", profileUrl: null },
      { name: "Carrie-Anne Moss", characterName: "Natalie", profileUrl: null }
    ]
  },
  {
    tmdbId: 1124,
    imdbId: "tt0482571",
    title: "The Prestige",
    originalTitle: "The Prestige",
    tagline: "Are you watching closely?",
    overview:
      "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit, and jealousy with dangerous and deadly consequences.",
    releaseDate: "2006-10-19",
    releaseYear: 2006,
    runtime: 130,
    posterUrl: "https://image.tmdb.org/t/p/w780/bdN3gEYLpcsmvm5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/prestige_bg.jpg",
    trailerKey: "o4gHCmTQDVI",
    trailerUrl: "https://www.youtube.com/watch?v=o4gHCmTQDVI",
    voteAverage: 8.5,
    voteCount: 16000,
    popularity: 76.5,
    language: "en",
    originCountry: "US",
    budget: 40000000,
    revenue: 109676311,
    streamingPlatforms: JSON.stringify(["Apple TV", "Prime Video"]),
    genres: ["Drama", "Mystery", "Thriller", "Science Fiction"],
    directors: [{ name: "Christopher Nolan", profileUrl: "https://image.tmdb.org/t/p/w300/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" }],
    cast: [
      { name: "Hugh Jackman", characterName: "Robert Angier", profileUrl: null },
      { name: "Christian Bale", characterName: "Alfred Borden", profileUrl: null },
      { name: "Michael Caine", characterName: "Cutter", profileUrl: null },
      { name: "Scarlett Johansson", characterName: "Olivia Wenscombe", profileUrl: null }
    ]
  },
  {
    tmdbId: 807,
    imdbId: "tt0114369",
    title: "Se7en",
    originalTitle: "Se7en",
    tagline: "Seven deadly sins. Seven ways to die.",
    overview:
      "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the 'seven deadly sins' in this dark and haunting film that takes viewers from the tortured remains of one victim to the next.",
    releaseDate: "1995-09-22",
    releaseYear: 1995,
    runtime: 127,
    posterUrl: "https://image.tmdb.org/t/p/w780/6yoghtyTBoP.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/se7en_bg.jpg",
    trailerKey: "znmZoVkCjpI",
    trailerUrl: "https://www.youtube.com/watch?v=znmZoVkCjpI",
    voteAverage: 8.6,
    voteCount: 20000,
    popularity: 84.2,
    language: "en",
    originCountry: "US",
    budget: 33000000,
    revenue: 327311859,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Apple TV"]),
    genres: ["Crime", "Mystery", "Thriller"],
    directors: [{ name: "David Fincher", profileUrl: null }],
    cast: [
      { name: "Brad Pitt", characterName: "Detective David Mills", profileUrl: null },
      { name: "Morgan Freeman", characterName: "Detective Lt. William Somerset", profileUrl: null },
      { name: "Kevin Spacey", characterName: "John Doe", profileUrl: null }
    ]
  },
  {
    tmdbId: 550,
    imdbId: "tt0137523",
    title: "Fight Club",
    originalTitle: "Fight Club",
    tagline: "Mischief. Mayhem. Soap.",
    overview:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    releaseDate: "1999-10-15",
    releaseYear: 1999,
    runtime: 139,
    posterUrl: "https://image.tmdb.org/t/p/w780/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    trailerKey: "BdJKm16Co6M",
    trailerUrl: "https://www.youtube.com/watch?v=BdJKm16Co6M",
    voteAverage: 8.4,
    voteCount: 28000,
    popularity: 91.8,
    language: "en",
    originCountry: "US",
    budget: 63000000,
    revenue: 100853753,
    streamingPlatforms: JSON.stringify(["Prime Video", "Apple TV", "Disney+"]),
    genres: ["Drama", "Thriller"],
    directors: [{ name: "David Fincher", profileUrl: null }],
    cast: [
      { name: "Edward Norton", characterName: "The Narrator", profileUrl: null },
      { name: "Brad Pitt", characterName: "Tyler Durden", profileUrl: null },
      { name: "Helena Bonham Carter", characterName: "Marla Singer", profileUrl: null }
    ]
  },
  {
    tmdbId: 210577,
    imdbId: "tt2267998",
    title: "Gone Girl",
    originalTitle: "Gone Girl",
    tagline: "You don't know what you've got 'til it's...",
    overview:
      "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    releaseDate: "2014-10-01",
    releaseYear: 2014,
    runtime: 149,
    posterUrl: "https://image.tmdb.org/t/p/w780/qymaJhucKGn.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/gonegirl_bg.jpg",
    trailerKey: "2-_-1nJf8Vg",
    trailerUrl: "https://www.youtube.com/watch?v=2-_-1nJf8Vg",
    voteAverage: 8.1,
    voteCount: 18000,
    popularity: 73.4,
    language: "en",
    originCountry: "US",
    budget: 61000000,
    revenue: 369330363,
    streamingPlatforms: JSON.stringify(["Disney+", "Apple TV", "Prime Video"]),
    genres: ["Mystery", "Thriller", "Drama"],
    directors: [{ name: "David Fincher", profileUrl: null }],
    cast: [
      { name: "Ben Affleck", characterName: "Nick Dunne", profileUrl: null },
      { name: "Rosamund Pike", characterName: "Amy Elliott Dunne", profileUrl: null },
      { name: "Neil Patrick Harris", characterName: "Desi Collings", profileUrl: null }
    ]
  },
  {
    tmdbId: 244786,
    imdbId: "tt2582802",
    title: "Whiplash",
    originalTitle: "Whiplash",
    tagline: "The road to greatness can take you to the edge.",
    overview:
      "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, testing the boundaries of passion and sanity.",
    releaseDate: "2014-10-10",
    releaseYear: 2014,
    runtime: 107,
    posterUrl: "https://image.tmdb.org/t/p/w780/7fn624j5lj3x.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/whiplash_bg.jpg",
    trailerKey: "7d_jQycdQGo",
    trailerUrl: "https://www.youtube.com/watch?v=7d_jQycdQGo",
    voteAverage: 8.5,
    voteCount: 14000,
    popularity: 81.2,
    language: "en",
    originCountry: "US",
    budget: 3300000,
    revenue: 49000000,
    streamingPlatforms: JSON.stringify(["Netflix", "Apple TV", "Prime Video"]),
    genres: ["Drama", "Music"],
    directors: [{ name: "Damien Chazelle", profileUrl: null }],
    cast: [
      { name: "Miles Teller", characterName: "Andrew Neiman", profileUrl: null },
      { name: "J.K. Simmons", characterName: "Terence Fletcher", profileUrl: null }
    ]
  },
  {
    tmdbId: 313369,
    imdbId: "tt3783958",
    title: "La La Land",
    originalTitle: "La La Land",
    tagline: "Here's to the fools who dream.",
    overview:
      "Mia, an aspiring actress, and Sebastian, a dedicated jazz musician, are struggling to make ends meet in a city known for crushing hopes and breaking hearts. Set in modern-day Los Angeles, this original musical about everyday life explores the joy and pain of pursuing your dreams.",
    releaseDate: "2016-11-29",
    releaseYear: 2016,
    runtime: 128,
    posterUrl: "https://image.tmdb.org/t/p/w780/uDO8zWD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/lalaland_bg.jpg",
    trailerKey: "0pdqf4P9MB8",
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    voteAverage: 8.0,
    voteCount: 16000,
    popularity: 70.1,
    language: "en",
    originCountry: "US",
    budget: 30000000,
    revenue: 447407695,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Apple TV"]),
    genres: ["Comedy", "Drama", "Romance", "Music"],
    directors: [{ name: "Damien Chazelle", profileUrl: null }],
    cast: [
      { name: "Ryan Gosling", characterName: "Sebastian Wilder", profileUrl: null },
      { name: "Emma Stone", characterName: "Mia Dolan", profileUrl: null },
      { name: "John Legend", characterName: "Keith", profileUrl: null }
    ]
  },
  {
    tmdbId: 278,
    imdbId: "tt0111161",
    title: "The Shawshank Redemption",
    originalTitle: "The Shawshank Redemption",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    overview:
      "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    releaseDate: "1994-09-23",
    releaseYear: 1994,
    runtime: 142,
    posterUrl: "https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    trailerKey: "PLl99DlL6b4",
    trailerUrl: "https://www.youtube.com/watch?v=PLl99DlL6b4",
    voteAverage: 8.7,
    voteCount: 26000,
    popularity: 135.2,
    language: "en",
    originCountry: "US",
    budget: 25000000,
    revenue: 28884504,
    streamingPlatforms: JSON.stringify(["Netflix", "Prime Video", "Apple TV"]),
    genres: ["Drama", "Crime"],
    directors: [{ name: "Frank Darabont", profileUrl: null }],
    cast: [
      { name: "Tim Robbins", characterName: "Andy Dufresne", profileUrl: null },
      { name: "Morgan Freeman", characterName: "Ellis Boyd 'Red' Redding", profileUrl: null }
    ]
  }
];

async function main() {
  console.log("🌱 Seeding CineMate Database...");

  // 1. Create Default Genres
  const genreMap = {};
  const allGenres = [
    "Science Fiction",
    "Drama",
    "Adventure",
    "Action",
    "Mystery",
    "Thriller",
    "Crime",
    "Comedy",
    "Animation",
    "Family",
    "Fantasy",
    "Horror",
    "Music",
    "Romance",
    "History"
  ];

  for (const g of allGenres) {
    const slug = g.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const genre = await prisma.genre.upsert({
      where: { name: g },
      update: {},
      create: { name: g, slug }
    });
    genreMap[g] = genre.id;
  }

  // 2. Create Default Users (Demo User & Admin)
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@cinemate.io" },
    update: {},
    create: {
      id: "user-demo-123",
      name: "Cinephile Alex",
      email: "demo@cinemate.io",
      passwordHash: "hash_cinemate_demo_2025",
      role: "user",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Sci-fi nerd, Nolan fanatic, and lover of mind-bending thrillers."
    }
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@cinemate.io" },
    update: {},
    create: {
      id: "user-admin-999",
      name: "CineMate Admin",
      email: "admin@cinemate.io",
      passwordHash: "hash_cinemate_admin_2025",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "CineMate platform moderator and film curator."
    }
  });

  // 3. Seed Movies, Directors, Cast
  for (const item of MOVIES_SEED) {
    const movie = await prisma.movie.upsert({
      update: {
        fullMovieKey: item.fullMovieKey || null,
        isFreeWatch: item.isFreeWatch || false,
        trailerKey: item.trailerKey || undefined,
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
        fullMovieKey: item.fullMovieKey || null,
        isFreeWatch: item.isFreeWatch || false,
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
          data: { name: dir.name, profileUrl: dir.profileUrl, popularity: 25.0 }
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
          data: { name: actorData.name, profileUrl: actorData.profileUrl, popularity: 30.0 }
        });
      }
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

  // 4. Create User Preferences & Taste Profile for Demo User
  await prisma.userPreference.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      favoriteGenres: JSON.stringify(["Science Fiction", "Thriller", "Mystery"]),
      favoriteActors: JSON.stringify(["Matthew McConaughey", "Leonardo DiCaprio", "Christian Bale"]),
      favoriteDirectors: JSON.stringify(["Christopher Nolan", "Denis Villeneuve", "David Fincher"]),
      preferredLanguages: JSON.stringify(["en", "hi"]),
      maxDuration: 180,
      tasteWeights: JSON.stringify({
        "Science Fiction": 92,
        "Thriller": 84,
        "Mystery": 78,
        "Drama": 65,
        "Action": 58,
        "Comedy": 42,
        "Romance": 25
      })
    }
  });

  // 5. Default Watchlist & Custom Lists
  const defaultList = await prisma.watchlist.create({
    data: {
      userId: demoUser.id,
      title: "My Watchlist",
      description: "Must-watch cinematic masterpieces queue.",
      isDefault: true,
      isPrivate: false
    }
  });

  const weekendList = await prisma.watchlist.create({
    data: {
      userId: demoUser.id,
      title: "Weekend Mind-Benders",
      description: "Complex plots, twists, and high-IQ storylines for Saturday night.",
      isDefault: false,
      isPrivate: false
    }
  });

  // Add movies to watchlists
  const interstellar = await prisma.movie.findFirst({ where: { title: "Interstellar" } });
  const inception = await prisma.movie.findFirst({ where: { title: "Inception" } });
  const arrival = await prisma.movie.findFirst({ where: { title: "Arrival" } });
  const shutterIsland = await prisma.movie.findFirst({ where: { title: "Shutter Island" } });

  if (interstellar && inception) {
    await prisma.watchlistMovie.create({
      data: {
        watchlistId: defaultList.id,
        movieId: interstellar.id,
        personalNotes: "Rewatch in IMAX or with good headphones for Hans Zimmer soundtrack.",
        userRating: 10.0,
        isWatched: true
      }
    });

    await prisma.watchlistMovie.create({
      data: {
        watchlistId: weekendList.id,
        movieId: inception.id,
        personalNotes: "Notice the spinning totem at the end.",
        userRating: 9.5,
        isWatched: true
      }
    });
  }

  if (arrival) {
    await prisma.watchlistMovie.create({
      data: {
        watchlistId: defaultList.id,
        movieId: arrival.id,
        personalNotes: "Deep philosophical take on language and non-linear time.",
        userRating: 9.0,
        isWatched: true
      }
    });
  }

  // 6. Watch History & Ratings
  if (interstellar) {
    await prisma.watchHistory.create({
      data: {
        userId: demoUser.id,
        movieId: interstellar.id,
        watchDuration: 169,
        completed: true
      }
    });

    await prisma.rating.create({
      data: {
        userId: demoUser.id,
        movieId: interstellar.id,
        score: 10
      }
    });

    await prisma.review.create({
      data: {
        userId: demoUser.id,
        movieId: interstellar.id,
        rating: 10,
        title: "Transcendent masterpiece of modern science fiction",
        content:
          "Interstellar is more than a sci-fi film; it is an emotional voyage exploring love, gravity, and the survival of the human species. Hans Zimmer's pipe organ score sends shivers down the spine every single time.",
        containsSpoilers: false,
        helpfulUpvotes: 42,
        status: "approved"
      }
    });
  }

  if (shutterIsland) {
    await prisma.watchHistory.create({
      data: {
        userId: demoUser.id,
        movieId: shutterIsland.id,
        watchDuration: 138,
        completed: true
      }
    });

    await prisma.rating.create({
      data: {
        userId: demoUser.id,
        movieId: shutterIsland.id,
        score: 9
      }
    });

    await prisma.review.create({
      data: {
        userId: demoUser.id,
        movieId: shutterIsland.id,
        rating: 9,
        title: "Which would be worse: To live as a monster, or to die as a good man?",
        content:
          "DiCaprio delivers one of the most intense psychological performances in cinema history. The ending leaves you questioning everything you watched for two hours.",
        containsSpoilers: true,
        helpfulUpvotes: 28,
        status: "approved"
      }
    });
  }

  console.log("✅ CineMate Database seeded successfully with 20+ movies, cast, genres, reviews, and demo user!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
