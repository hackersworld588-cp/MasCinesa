/**
 * Script to add Hollywood Hindi Dubbed movies from User Links & IOF Hindi
 */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hollywoodHindi = [
  {
    title: "Avengers: Infinity War (Hindi Dubbed)",
    originalTitle: "Avengers: Infinity War",
    tagline: "Where will you be when it all ends?",
    overview: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
    releaseYear: 2018,
    releaseDate: "2018-04-27",
    runtime: 149,
    fullMovieKey: "dd-afBC_FRI",
    voteAverage: 9.2,
    popularity: 99.7,
    genres: ["Action", "Sci-Fi", "Hollywood Hindi Dubbed"],
    director: "Anthony Russo, Joe Russo",
    actors: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson", "Josh Brolin"]
  },
  {
    title: "Avengers: Endgame (Hindi Dubbed)",
    originalTitle: "Avengers: Endgame",
    tagline: "Part of the journey is the end.",
    overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance.",
    releaseYear: 2019,
    releaseDate: "2019-04-26",
    runtime: 174,
    fullMovieKey: "JS5IaEb58sM",
    voteAverage: 9.4,
    popularity: 99.9,
    genres: ["Action", "Sci-Fi", "Hollywood Hindi Dubbed"],
    director: "Anthony Russo, Joe Russo",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner"]
  },
  {
    title: "Thor: Ragnarok (Hindi Dubbed)",
    originalTitle: "Thor: Ragnarok",
    tagline: "No Hammer. No Problem.",
    overview: "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarok, the destruction of his world, at the hands of the ruthless villain Hela.",
    releaseYear: 2017,
    releaseDate: "2017-11-03",
    runtime: 120,
    fullMovieKey: "4djKHB1oXCY",
    voteAverage: 8.9,
    popularity: 98.5,
    genres: ["Action", "Comedy", "Sci-Fi", "Hollywood Hindi Dubbed"],
    director: "Taika Waititi",
    actors: ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett", "Idris Elba", "Jeff Goldblum", "Tessa Thompson", "Mark Ruffalo"]
  },
  {
    title: "Lucy 2 (Hindi Dubbed)",
    originalTitle: "Lucy 2",
    tagline: "The Mind Reaches 100% Potential",
    overview: "A thrilling sci-fi spectacle following an extraordinary evolution of human consciousness and unstoppable telekinetic action.",
    releaseYear: 2025,
    releaseDate: "2025-01-15",
    runtime: 76,
    fullMovieKey: "xA8g9B9iorU",
    voteAverage: 8.1,
    popularity: 92.4,
    genres: ["Sci-Fi", "Action", "Hollywood Hindi Dubbed"],
    director: "Luc Besson",
    actors: ["Scarlett Johansson", "Morgan Freeman", "Choi Min-sik"]
  },
  {
    title: "The Wandering Earth (Hindi Dubbed)",
    originalTitle: "The Wandering Earth",
    tagline: "Moving Planet Earth to a New Galaxy",
    overview: "As the sun is dying out, people all around the world build giant planet thrusters to move Earth out of its orbit and sail Earth to a new star system.",
    releaseYear: 2019,
    releaseDate: "2019-02-05",
    runtime: 125,
    fullMovieKey: "BSG7AWOQk_4",
    voteAverage: 8.3,
    popularity: 94.0,
    genres: ["Sci-Fi", "Action", "Hollywood Hindi Dubbed"],
    director: "Frant Gwo",
    actors: ["Wu Jing", "Qu Chuxiao", "Li Guangjie", "Ng Man-tat"]
  },
  {
    title: "Crossfire (Hindi Dubbed)",
    originalTitle: "Crossfire",
    tagline: "High Stakes Tactical Survival",
    overview: "An elite operative finds himself in the crosshairs of a ruthless international mercenary squad and must fight his way out through pure skill and lethal precision.",
    releaseYear: 2023,
    releaseDate: "2023-08-10",
    runtime: 95,
    fullMovieKey: "pnBPXVJgw3Q",
    voteAverage: 7.9,
    popularity: 90.5,
    genres: ["Action", "Thriller", "Hollywood Hindi Dubbed"],
    director: "Brian Skiba",
    actors: ["Louis Mandylor", "Costas Mandylor", "Samm Wiebe"]
  },
  {
    title: "Everest: Mountain of Death (Hindi Dubbed)",
    originalTitle: "Everest: Mountain of Death",
    tagline: "Survival at 29,000 Feet",
    overview: "A team of daring mountaineers face catastrophic blizzards and unimaginable freezing conditions during an emergency high-altitude rescue on Mount Everest.",
    releaseYear: 2024,
    releaseDate: "2024-03-20",
    runtime: 90,
    fullMovieKey: "ddqQyuxh0ME",
    voteAverage: 8.0,
    popularity: 91.8,
    genres: ["Action", "Thriller", "Hollywood Hindi Dubbed"],
    director: "Daniel Espinosa",
    actors: ["Jason Clarke", "Josh Brolin", "John Hawkes", "Robin Wright"]
  },
  {
    title: "Project Gemini (Hindi Dubbed)",
    originalTitle: "Project Gemini",
    tagline: "Deep Space Mystery on a New World",
    overview: "In the future, Earth's ecological crisis forces scientists to use a mysterious alien artifact to travel across space and terraform a new habitable planet.",
    releaseYear: 2022,
    releaseDate: "2022-01-06",
    runtime: 100,
    fullMovieKey: "VSq0R8UTE7g",
    voteAverage: 7.8,
    popularity: 89.2,
    genres: ["Sci-Fi", "Thriller", "Hollywood Hindi Dubbed"],
    director: "Serik Beyseu",
    actors: ["Egor Koreshkov", "Alyona Konstantinova", "Katerina Shpitsa"]
  }
];

async function addHollywood() {
  console.log("Adding Hollywood Hindi Dubbed blockbusters...");
  for (const m of hollywoodHindi) {
    const existing = await prisma.movie.findFirst({
      where: { fullMovieKey: m.fullMovieKey }
    });
    if (existing) {
      console.log(`Already exists: ${m.title}`);
      continue;
    }

    const posterUrl = `https://i.ytimg.com/vi/${m.fullMovieKey}/hqdefault.jpg`;
    const backdropUrl = `https://i.ytimg.com/vi/${m.fullMovieKey}/maxresdefault.jpg`;

    const movie = await prisma.movie.create({
      data: {
        title: m.title,
        originalTitle: m.originalTitle || m.title,
        tagline: m.tagline,
        overview: m.overview,
        releaseYear: m.releaseYear,
        releaseDate: m.releaseDate,
        runtime: m.runtime,
        posterUrl: posterUrl,
        backdropUrl: backdropUrl,
        trailerKey: m.fullMovieKey,
        fullMovieKey: m.fullMovieKey,
        isFreeWatch: true,
        voteAverage: m.voteAverage,
        popularity: m.popularity,
        language: "hi",
        originCountry: "US",
        streamingPlatforms: JSON.stringify(["YouTube", "Indo Overseas Films", "Marvel"]),
      }
    });

    for (const gName of m.genres) {
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

    if (m.director) {
      let director = await prisma.director.findFirst({ where: { name: m.director } });
      if (!director) {
        director = await prisma.director.create({
          data: { name: m.director, popularity: 95.0 }
        });
      }
      await prisma.movieDirector.create({
        data: { movieId: movie.id, directorId: director.id }
      });
    }

    if (m.actors) {
      for (let i = 0; i < m.actors.length; i++) {
        const aName = m.actors[i];
        let actor = await prisma.actor.findFirst({ where: { name: aName } });
        if (!actor) {
          actor = await prisma.actor.create({
            data: { name: aName, popularity: 95.0 }
          });
        }
        await prisma.movieCast.create({
          data: {
            movieId: movie.id,
            actorId: actor.id,
            characterName: aName,
            orderIndex: i
          }
        });
      }
    }

    console.log(`✓ Added Hollywood Hindi Movie: ${m.title} (${m.fullMovieKey})`);
  }
  const total = await prisma.movie.count();
  console.log(`Done! Total movies now in DB: ${total}`);
}

addHollywood().finally(() => prisma.$disconnect());
