const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const YOUTUBE_FULL_MOVIES = [
  {
    tmdbId: 21614,
    imdbId: "tt0242519",
    title: "Hera Pheri",
    originalTitle: "Hera Pheri",
    tagline: "A hilarious comedy of errors and ransom.",
    overview:
      "Two tenants (Raju and Shyam) and an eccentric, kind-hearted garage owner Baburao in deep financial debt inadvertently intercept a ransom phone call intended for a wealthy industrialist. They devise an audacious plan to claim the ransom money themselves, triggering legendary comic mayhem.",
    releaseDate: "2000-03-31",
    releaseYear: 2000,
    runtime: 156,
    posterUrl: "https://image.tmdb.org/t/p/w780/AkfqKaD1KqfIqytxLvWlyKJRlEi.jpg",
    backdropUrl: "https://i.ytimg.com/vi/TIQ5hrfermg/maxresdefault.jpg",
    trailerKey: "TIQ5hrfermg",
    trailerUrl: "https://www.youtube.com/watch?v=TIQ5hrfermg",
    fullMovieKey: "TIQ5hrfermg",
    isFreeWatch: true,
    voteAverage: 8.2,
    voteCount: 89000,
    popularity: 195.5,
    language: "hi",
    originCountry: "IN",
    budget: 75000000,
    revenue: 240000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "JioCinema", "Prime Video"]),
    genres: ["Comedy", "Crime"],
    directors: [{ name: "Priyadarshan", profileUrl: "https://image.tmdb.org/t/p/w300/o0yWj9X2m2kU9D2P7w5eP2xW6q.jpg" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Raju", profileUrl: "https://image.tmdb.org/t/p/w300/clRrVn7Pz5q4qWp72B88iL8aE2E.jpg" },
      { name: "Suniel Shetty", characterName: "Ghyanshyam (Shyam)", profileUrl: "https://image.tmdb.org/t/p/w300/cWw5F81xL88F5yT338L1v4bK.jpg" },
      { name: "Paresh Rawal", characterName: "Baburao Ganpatrao Apte", profileUrl: "https://image.tmdb.org/t/p/w300/3r2P0zP0v7QkR0V7.jpg" },
      { name: "Tabu", characterName: "Anuradha Shivshankar Panikar", profileUrl: "https://image.tmdb.org/t/p/w300/1X0r7X4r8V0y.jpg" }
    ]
  },
  {
    tmdbId: 196370,
    imdbId: "tt0995031",
    title: "Bhool Bhulaiyaa",
    originalTitle: "Bhool Bhulaiyaa",
    tagline: "It's all in the mind... or is it?",
    overview:
      "When newly married NRI Siddharth and his wife Avni move into their ancestral palace despite villagers warning of malevolent supernatural spirits, eerie events unfold. An eccentric, genius psychiatrist Dr. Aditya Shrivastav is summoned to unravel the haunting enigma of dancer Manjulika.",
    releaseDate: "2007-10-12",
    releaseYear: 2007,
    runtime: 159,
    posterUrl: "https://i.ytimg.com/vi/GGzSId0_qJc/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/GGzSId0_qJc/maxresdefault.jpg",
    trailerKey: "GGzSId0_qJc",
    trailerUrl: "https://www.youtube.com/watch?v=GGzSId0_qJc",
    fullMovieKey: "GGzSId0_qJc",
    isFreeWatch: true,
    voteAverage: 7.4,
    voteCount: 62000,
    popularity: 182.0,
    language: "hi",
    originCountry: "IN",
    budget: 320000000,
    revenue: 840000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Disney+ Hotstar"]),
    genres: ["Comedy", "Horror", "Mystery"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Dr. Aditya Shrivastav" },
      { name: "Vidya Balan", characterName: "Avni / Manjulika" },
      { name: "Shiney Ahuja", characterName: "Siddharth Chaturvedi" },
      { name: "Paresh Rawal", characterName: "Batukshankar Upadhyay" }
    ]
  },
  {
    tmdbId: 19637,
    imdbId: "tt0464016",
    title: "Chup Chup Ke",
    originalTitle: "Chup Chup Ke",
    tagline: "A comedy of silence and mistaken identities.",
    overview:
      "Drowning under heavy debt and hounded by relentless creditors, Jeetu jumps into the sea hoping his family can claim life insurance. Rescued by two fishermen who mistakenly believe he is mute and wealthy, Jeetu is pawned to a strict Gujarati merchant family where hilarious confusions multiply.",
    releaseDate: "2006-06-09",
    releaseYear: 2006,
    runtime: 164,
    posterUrl: "https://i.ytimg.com/vi/kargzSqQS3A/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/kargzSqQS3A/maxresdefault.jpg",
    trailerKey: "kargzSqQS3A",
    trailerUrl: "https://www.youtube.com/watch?v=kargzSqQS3A",
    fullMovieKey: "kargzSqQS3A",
    isFreeWatch: true,
    voteAverage: 7.0,
    voteCount: 48000,
    popularity: 165.0,
    language: "hi",
    originCountry: "IN",
    budget: 150000000,
    revenue: 260000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Netflix"]),
    genres: ["Comedy", "Romance", "Drama"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Shahid Kapoor", characterName: "Jeetu" },
      { name: "Kareena Kapoor Khan", characterName: "Shruti" },
      { name: "Paresh Rawal", characterName: "Gundya" },
      { name: "Rajpal Yadav", characterName: "Bandya" }
    ]
  },
  {
    tmdbId: 28331,
    imdbId: "tt0273872",
    title: "Nayak: The Real Hero",
    originalTitle: "Nayak",
    tagline: "One man against corruption. One day to change history.",
    overview:
      "During an aggressive, hard-hitting live television interview, honest TV cameraman Shivaji Rao corners the corrupt state Chief Minister Balraj Chauhan on his failures. The enraged CM challenges Shivaji to take his seat for just a single day. Accepting the dare, Shivaji transforms governance in 24 hours.",
    releaseDate: "2001-09-07",
    releaseYear: 2001,
    runtime: 184,
    posterUrl: "https://i.ytimg.com/vi/MY4seAQgzW8/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/MY4seAQgzW8/hqdefault.jpg",
    trailerKey: "MY4seAQgzW8",
    trailerUrl: "https://www.youtube.com/watch?v=MY4seAQgzW8",
    fullMovieKey: "MY4seAQgzW8",
    isFreeWatch: true,
    voteAverage: 7.8,
    voteCount: 75000,
    popularity: 174.0,
    language: "hi",
    originCountry: "IN",
    budget: 210000000,
    revenue: 350000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Disney+ Hotstar"]),
    genres: ["Action", "Drama", "Thriller"],
    directors: [{ name: "S. Shankar" }],
    cast: [
      { name: "Anil Kapoor", characterName: "Shivaji Rao" },
      { name: "Rani Mukerji", characterName: "Manjari" },
      { name: "Amrish Puri", characterName: "Chief Minister Balraj Chauhan" },
      { name: "Paresh Rawal", characterName: "Bansal" }
    ]
  },
  {
    tmdbId: 8687,
    imdbId: "tt1080016",
    title: "Dhamaal",
    originalTitle: "Dhamaal",
    tagline: "Double the confusion, double the fun!",
    overview:
      "Four lazy, unemployed slackers (Roy, Adi, Manav, and Boman) accidentally discover a dying underworld thief who confesses that 10 crore rupees of loot is buried under a giant 'W' in St. Sebastian Garden, Goa. Their chaotic cross-country race begins while dogged Police Inspector Kabir Nayak pursues them.",
    releaseDate: "2007-09-07",
    releaseYear: 2007,
    runtime: 137,
    posterUrl: "https://i.ytimg.com/vi/BWED8Gz4JvQ/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/BWED8Gz4JvQ/maxresdefault.jpg",
    trailerKey: "BWED8Gz4JvQ",
    trailerUrl: "https://www.youtube.com/watch?v=BWED8Gz4JvQ",
    fullMovieKey: "BWED8Gz4JvQ",
    isFreeWatch: true,
    voteAverage: 7.4,
    voteCount: 58000,
    popularity: 168.0,
    language: "hi",
    originCountry: "IN",
    budget: 190000000,
    revenue: 500000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Netflix"]),
    genres: ["Comedy", "Adventure"],
    directors: [{ name: "Indra Kumar" }],
    cast: [
      { name: "Sanjay Dutt", characterName: "Inspector Kabir Nayak" },
      { name: "Riteish Deshmukh", characterName: "Deshbandhu Roy" },
      { name: "Arshad Warsi", characterName: "Aditya (Adi) Srivastav" },
      { name: "Jaaved Jaaferi", characterName: "Manav Srivastav" }
    ]
  },
  {
    tmdbId: 14194,
    imdbId: "tt0495034",
    title: "Golmaal: Fun Unlimited",
    originalTitle: "Golmaal",
    tagline: "No logic, only magic!",
    overview:
      "Expelled from their college hostel, four mischievous deadbeats—Gopal, Lucky, Madhav, and Laxman—take refuge in a grand bungalow owned by an elderly, blind couple. Posing one of them as their grandson Sameer from the US, they soon get tangled up with an intimidating local gangster named Vasooli.",
    releaseDate: "2006-07-14",
    releaseYear: 2006,
    runtime: 150,
    posterUrl: "https://i.ytimg.com/vi/ZmE6TN9bYQg/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/ZmE6TN9bYQg/hqdefault.jpg",
    trailerKey: "ZmE6TN9bYQg",
    trailerUrl: "https://www.youtube.com/watch?v=ZmE6TN9bYQg",
    fullMovieKey: "ZmE6TN9bYQg",
    isFreeWatch: true,
    voteAverage: 7.5,
    voteCount: 65000,
    popularity: 170.0,
    language: "hi",
    originCountry: "IN",
    budget: 120000000,
    revenue: 460000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Disney+ Hotstar"]),
    genres: ["Comedy", "Action"],
    directors: [{ name: "Rohit Shetty" }],
    cast: [
      { name: "Ajay Devgn", characterName: "Gopal" },
      { name: "Arshad Warsi", characterName: "Madhav" },
      { name: "Sharman Joshi", characterName: "Laxman" },
      { name: "Tusshar Kapoor", characterName: "Lucky" }
    ]
  },
  {
    tmdbId: 11544,
    imdbId: "tt1078940",
    title: "Welcome",
    originalTitle: "Welcome",
    tagline: "A comedy with a punch.",
    overview:
      "Dr. Ghungroo is desperate to find an innocent, respectable bride for his nephew Rajiv from an honorable family with no criminal history. But Rajiv falls head over heels for Sanjana, unaware that she is the beloved sister of two feared Mumbai underworld mob bosses, Uday Shetty and Majnu Bhai.",
    releaseDate: "2007-12-21",
    releaseYear: 2007,
    runtime: 159,
    posterUrl: "https://i.ytimg.com/vi/s044Cs0gTJQ/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/s044Cs0gTJQ/maxresdefault.jpg",
    trailerKey: "s044Cs0gTJQ",
    trailerUrl: "https://www.youtube.com/watch?v=s044Cs0gTJQ",
    fullMovieKey: "s044Cs0gTJQ",
    isFreeWatch: true,
    voteAverage: 7.0,
    voteCount: 72000,
    popularity: 188.0,
    language: "hi",
    originCountry: "IN",
    budget: 320000000,
    revenue: 1200000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "JioCinema", "Prime Video"]),
    genres: ["Comedy", "Crime", "Romance"],
    directors: [{ name: "Anees Bazmee" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Rajiv Saini" },
      { name: "Nana Patekar", characterName: "Uday Shetty" },
      { name: "Anil Kapoor", characterName: "Majnu Bhai" },
      { name: "Katrina Kaif", characterName: "Sanjana Shetty" }
    ]
  },
  {
    tmdbId: 16388,
    imdbId: "tt0374887",
    title: "Munna Bhai M.B.B.S.",
    originalTitle: "Munna Bhai M.B.B.S.",
    tagline: "Laughter is the best medicine.",
    overview:
      "Murli Prasad Sharma ('Munna Bhai') is a warm-hearted underworld don who pretends to run a genuine hospital to please his righteous father. When his deception is exposed by Dr. Asthana, Munna vows to legitimately become an M.B.B.S doctor, shaking up medical bureaucracy with his infectious empathy and 'Jaadu Ki Jhappi'.",
    releaseDate: "2003-12-19",
    releaseYear: 2003,
    runtime: 156,
    posterUrl: "https://i.ytimg.com/vi/GG7RtioOpF8/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/GG7RtioOpF8/maxresdefault.jpg",
    trailerKey: "GG7RtioOpF8",
    trailerUrl: "https://www.youtube.com/watch?v=GG7RtioOpF8",
    fullMovieKey: "GG7RtioOpF8",
    isFreeWatch: true,
    voteAverage: 8.1,
    voteCount: 94000,
    popularity: 190.0,
    language: "hi",
    originCountry: "IN",
    budget: 100000000,
    revenue: 360000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Prime Video", "SonyLIV"]),
    genres: ["Comedy", "Drama"],
    directors: [{ name: "Rajkumar Hirani" }],
    cast: [
      { name: "Sanjay Dutt", characterName: "Munna Bhai" },
      { name: "Arshad Warsi", characterName: "Circuit" },
      { name: "Boman Irani", characterName: "Dr. J. C. Asthana" },
      { name: "Gracy Singh", characterName: "Dr. Suman Asthana (Chinki)" }
    ]
  },
  {
    tmdbId: 89330,
    imdbId: "tt1954470",
    title: "Gangs of Wasseypur",
    originalTitle: "Gangs of Wasseypur",
    tagline: "Blood flows like water in Wasseypur.",
    overview:
      "Spanning six decades of ruthless coal-mafia history in Dhanbad, this gritty epic tracks the fiery intergenerational feud between Shahid Khan's bloodline and the criminal politician Ramadhir Singh. Sardar Khan swears vengeance for his father's murder, sparking a devastating war.",
    releaseDate: "2012-06-22",
    releaseYear: 2012,
    runtime: 321,
    posterUrl: "https://i.ytimg.com/vi/5hrIdP05Pew/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/5hrIdP05Pew/maxresdefault.jpg",
    trailerKey: "5hrIdP05Pew",
    trailerUrl: "https://www.youtube.com/watch?v=5hrIdP05Pew",
    fullMovieKey: "5hrIdP05Pew",
    isFreeWatch: true,
    voteAverage: 8.2,
    voteCount: 98000,
    popularity: 185.0,
    language: "hi",
    originCountry: "IN",
    budget: 185000000,
    revenue: 510000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Netflix"]),
    genres: ["Crime", "Action", "Drama"],
    directors: [{ name: "Anurag Kashyap" }],
    cast: [
      { name: "Manoj Bajpayee", characterName: "Sardar Khan" },
      { name: "Nawazuddin Siddiqui", characterName: "Faizal Khan" },
      { name: "Richa Chadha", characterName: "Nagma Khatun" },
      { name: "Pankaj Tripathi", characterName: "Sultan Qureshi" }
    ]
  },
  {
    tmdbId: 19898,
    imdbId: "tt0479751",
    title: "Sivaji: The Boss",
    originalTitle: "Sivaji",
    tagline: "His style is his weapon.",
    overview:
      "Sivaji, a prosperous NRI computer software systems architect, returns home to India determined to establish high-standard, free universities and hospitals for the underprivileged. Crushed by bureaucratic extortion and malicious political rivalry, Sivaji is forced onto the street—until he rises back with unstoppable flair to reclaim illicit black money.",
    releaseDate: "2007-06-15",
    releaseYear: 2007,
    runtime: 188,
    posterUrl: "https://i.ytimg.com/vi/NenlQz-FkLY/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/NenlQz-FkLY/maxresdefault.jpg",
    trailerKey: "NenlQz-FkLY",
    trailerUrl: "https://www.youtube.com/watch?v=NenlQz-FkLY",
    fullMovieKey: "NenlQz-FkLY",
    isFreeWatch: true,
    voteAverage: 7.6,
    voteCount: 82000,
    popularity: 178.0,
    language: "hi",
    originCountry: "IN",
    budget: 600000000,
    revenue: 1520000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Prime Video"]),
    genres: ["Action", "Drama", "Thriller"],
    directors: [{ name: "S. Shankar" }],
    cast: [
      { name: "Rajinikanth", characterName: "Sivaji Arumugam" },
      { name: "Shriya Saran", characterName: "Tamizhselvi" },
      { name: "Suman", characterName: "Adiseshan" },
      { name: "Vivek", characterName: "Arivu" }
    ]
  },
  {
    tmdbId: 21919,
    imdbId: "tt0374718",
    title: "Hungama",
    originalTitle: "Hungama",
    tagline: "An endless comedy of mistaken identities.",
    overview:
      "Radheshyam Tiwari, a wealthy village merchant who moves to Mumbai, finds his suspicious wife convinced he has fathered an illegitimate daughter with a local woman named Anjali. Meanwhile, two innocent job seekers also named Jeetu and Nandu get caught in a mad vortex of misunderstandings.",
    releaseDate: "2003-08-01",
    releaseYear: 2003,
    runtime: 153,
    posterUrl: "https://i.ytimg.com/vi/55sUfITkuVY/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/55sUfITkuVY/maxresdefault.jpg",
    trailerKey: "55sUfITkuVY",
    trailerUrl: "https://www.youtube.com/watch?v=55sUfITkuVY",
    fullMovieKey: "55sUfITkuVY",
    isFreeWatch: true,
    voteAverage: 7.6,
    voteCount: 52000,
    popularity: 162.0,
    language: "hi",
    originCountry: "IN",
    budget: 60000000,
    revenue: 200000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Disney+ Hotstar"]),
    genres: ["Comedy", "Romance"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Akshaye Khanna", characterName: "Jeetu" },
      { name: "Aftab Shivdasani", characterName: "Nandu" },
      { name: "Rimi Sen", characterName: "Anjali" },
      { name: "Paresh Rawal", characterName: "Radheshyam Tiwari" }
    ]
  },
  {
    tmdbId: 10331,
    imdbId: "tt0063350",
    title: "Night of the Living Dead",
    originalTitle: "Night of the Living Dead",
    tagline: "They keep coming back in a bloodthirsty lust for human flesh!",
    overview:
      "A sudden, unexplained radiation fallout brings the dead back to life as relentless flesh-eating zombies. A disparate group of survivors seek refuge in an isolated rural farmhouse, battling both terrifying hordes outside and fracturing psychological paranoia inside.",
    releaseDate: "1968-10-01",
    releaseYear: 1968,
    runtime: 96,
    posterUrl: "https://i.ytimg.com/vi/OlsFIc2laCk/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/OlsFIc2laCk/maxresdefault.jpg",
    trailerKey: "OlsFIc2laCk",
    trailerUrl: "https://www.youtube.com/watch?v=OlsFIc2laCk",
    fullMovieKey: "OlsFIc2laCk",
    isFreeWatch: true,
    voteAverage: 7.9,
    voteCount: 95000,
    popularity: 155.0,
    language: "en",
    originCountry: "US",
    budget: 114000,
    revenue: 30000000,
    streamingPlatforms: JSON.stringify(["YouTube (Free)", "Public Domain Cinema"]),
    genres: ["Horror", "Thriller", "Mystery"],
    directors: [{ name: "George A. Romero" }],
    cast: [
      { name: "Duane Jones", characterName: "Ben" },
      { name: "Judith O'Dea", characterName: "Barbra" },
      { name: "Karl Hardman", characterName: "Harry Cooper" },
      { name: "Marilyn Eastman", characterName: "Helen Cooper" }
    ]
  }
];

async function seed() {
  console.log("Seeding YouTube Full Movies...");

  // 1. Ensure all genres exist
  const genreSet = new Set();
  YOUTUBE_FULL_MOVIES.forEach(m => m.genres.forEach(g => genreSet.add(g)));
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
  for (const item of YOUTUBE_FULL_MOVIES) {
    const movie = await prisma.movie.upsert({
      where: { tmdbId: item.tmdbId },
      update: {
        fullMovieKey: item.fullMovieKey,
        isFreeWatch: item.isFreeWatch,
        trailerKey: item.trailerKey,
        trailerUrl: item.trailerUrl,
        posterUrl: item.posterUrl,
        backdropUrl: item.backdropUrl,
        streamingPlatforms: item.streamingPlatforms,
        voteAverage: item.voteAverage,
        voteCount: item.voteCount,
        popularity: item.popularity,
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
        fullMovieKey: item.fullMovieKey,
        isFreeWatch: item.isFreeWatch,
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
          data: { name: dir.name, profileUrl: dir.profileUrl || null, popularity: 30.0 }
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
          data: { name: actorData.name, profileUrl: actorData.profileUrl || null, popularity: 35.0 }
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

    console.log(`✓ Seeded movie: ${movie.title} [Full Stream Key: ${movie.fullMovieKey}]`);
  }

  console.log("All YouTube full movies seeded successfully!");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
