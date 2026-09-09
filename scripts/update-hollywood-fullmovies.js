const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FULL_HINDI_MOVIES = [
  { title: "Avengers: Endgame", fullMovieKey: "K_Lh4D7GzHQ" },
  { title: "Avengers: Infinity War", fullMovieKey: "QwievZ1Tx-8" },
  { title: "The Avengers", fullMovieKey: "b-kTeih2E8g" },
  { title: "Spider-Man: No Way Home", fullMovieKey: "ZYzbalQ6Lg8" },
  { title: "Spider-Man (2002)", fullMovieKey: "O7zvehDxttM" },
  { title: "Furious 7", fullMovieKey: "yISKeT6sDOg" },
  { title: "Fast & Furious 6", fullMovieKey: "p1QgNF6AC10" },
  { title: "Mission: Impossible – Fallout", fullMovieKey: "UMbg1yP9hWc" },
  { title: "Mission: Impossible – Dead Reckoning", fullMovieKey: "2m1drlOZSDw" },
  { title: "Jurassic World", fullMovieKey: "vn9mMeHYcHQ" },
  { title: "Jurassic Park (1993)", fullMovieKey: "lc0UehYemQA" },
  { title: "Transformers (2007)", fullMovieKey: "gAkeJpeTPv8" },
  { title: "Transformers: Dark of the Moon", fullMovieKey: "kHRf01Gjosk" },
  { title: "The Matrix (1999)", fullMovieKey: "m8e-FF8MsqU" },
  { title: "The Matrix Reloaded", fullMovieKey: "zE7PKRjrid4" },
  { title: "John Wick: Chapter 4", fullMovieKey: "yjRHZEUamSE" },
  { title: "John Wick (2014)", fullMovieKey: "C0BMx-qxsP4" },
  { title: "Batman Begins", fullMovieKey: "vak9ZLfhGNQ" },
  { title: "The Dark Knight", fullMovieKey: "kmJLuwP3MbY" },
  { title: "The Dark Knight Rises", fullMovieKey: "g8evyE9TuYk" },
  { title: "Interstellar", fullMovieKey: "2LqzF5WauAw" },
  { title: "Inception", fullMovieKey: "8hP9D6kZseM" },
];

async function main() {
  console.log("Setting real long-form Hindi full movie streams for Hollywood blockbusters...");
  let count = 0;
  for (const item of FULL_HINDI_MOVIES) {
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
  console.log("Successfully updated " + count + " Hollywood movies with distinct Hindi full movie streams!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
