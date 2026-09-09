const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const HOLLYWOOD_UPDATES = [
  { title: "Avengers: Endgame", fullMovieKey: "TcMBFSGVi1c" },
  { title: "Avengers: Infinity War", fullMovieKey: "6ZfuNTqbHE8" },
  { title: "The Avengers", fullMovieKey: "eOrNdBpGMv8" },
  { title: "Spider-Man: No Way Home", fullMovieKey: "JfVOs4VSpmA" },
  { title: "Spider-Man (2002)", fullMovieKey: "t06RUxPbp_c" },
  { title: "Furious 7", fullMovieKey: "Skpu5HaVkOc" },
  { title: "Fast & Furious 6", fullMovieKey: "dKi5XoeTN0k" },
  { title: "Mission: Impossible – Fallout", fullMovieKey: "wb49-oV0F78" },
  { title: "Mission: Impossible – Dead Reckoning", fullMovieKey: "avz06PDqDbM" },
  { title: "Jurassic World", fullMovieKey: "RFinNxS5KN4" },
  { title: "Jurassic Park (1993)", fullMovieKey: "QWBKEmWWL38" },
  { title: "Transformers (2007)", fullMovieKey: "CbX_SIz_9fk" },
  { title: "Transformers: Dark of the Moon", fullMovieKey: "3H8bnKdf654" },
  { title: "The Matrix (1999)", fullMovieKey: "vKQi3bBA1y8" },
  { title: "The Matrix Reloaded", fullMovieKey: "kYzz0FSgpSU" },
  { title: "John Wick: Chapter 4", fullMovieKey: "qEVUtrk8_B4" },
  { title: "John Wick (2014)", fullMovieKey: "2AUmvWm5ZDQ" },
  { title: "Batman Begins", fullMovieKey: "neY2xVmOfUM" },
  { title: "The Dark Knight", fullMovieKey: "EXeTwQWrcwY" },
  { title: "The Dark Knight Rises", fullMovieKey: "GokKUqLcvD8" },
  { title: "Interstellar", fullMovieKey: "zSWdZVtXT7E" },
  { title: "Inception", fullMovieKey: "YoHD9XEInc0" },
];

async function main() {
  console.log("Updating Hollywood movies to full movie streaming in Hindi...");
  let count = 0;
  for (const item of HOLLYWOOD_UPDATES) {
    const res = await prisma.movie.updateMany({
      where: { title: item.title },
      data: {
        isFreeWatch: true,
        fullMovieKey: item.fullMovieKey,
        language: "hi",
      },
    });
    count += res.count;
  }
  console.log("Successfully updated " + count + " Hollywood movies with fullMovieKey and isFreeWatch=true");

  await prisma.movie.updateMany({
    where: { title: "Tumbbad" },
    data: {
      posterUrl: "https://image.tmdb.org/t/p/w500/8qNkWaY6n3x4j4qFq8zY4Z3Y9W7.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w780/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    },
  });

  const allMovies = await prisma.movie.findMany();
  let imgOptCount = 0;
  for (const m of allMovies) {
    let newPoster = m.posterUrl;
    let newBackdrop = m.backdropUrl;
    let changed = false;

    if (newPoster && newPoster.includes("image.tmdb.org")) {
      const opt = newPoster.replace(/\/t\/p\/(original|w1280|w780)\//, "/t/p/w500/");
      if (opt !== newPoster) {
        newPoster = opt;
        changed = true;
      }
    }

    if (newBackdrop && newBackdrop.includes("image.tmdb.org")) {
      const opt = newBackdrop.replace(/\/t\/p\/original\//, "/t/p/w780/");
      if (opt !== newBackdrop) {
        newBackdrop = opt;
        changed = true;
      }
    }

    if (changed) {
      await prisma.movie.update({
        where: { id: m.id },
        data: { posterUrl: newPoster, backdropUrl: newBackdrop },
      });
      imgOptCount++;
    }
  }
  console.log("Optimized image URLs for " + imgOptCount + " movies in database!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
