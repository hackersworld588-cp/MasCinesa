import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Film } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMovieWithRelations } from "@/lib/ai-engine";
import { getAllMovies, getFeaturedMovie } from "@/lib/movie-service";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const user = await getCurrentUser();

  // 1. Fetch Featured Hero Movie (Sarrainodu or Hera Pheri or DJ)
  const featuredMovie = await getFeaturedMovie();

  // 2. Fetch All Movies from Database or Static dataset
  const formattedAll = await getAllMovies();

  // 💥 Category 1: Goldmines Mass & Action Blockbusters
  const massActionMovies = formattedAll.filter((m) =>
    m.genres?.some((g) => ["Action", "Crime"].includes(g.name)) &&
    !m.genres?.some((g) => ["Horror"].includes(g.name))
  );

  // 😂 Category 2: Comedy Dhamaal & Family Laughs
  const comedyMovies = formattedAll.filter((m) =>
    m.genres?.some((g) => ["Comedy"].includes(g.name))
  );

  // 👻 Category 3: Horror, Thriller & Mystery Nights
  const horrorMovies = formattedAll.filter((m) =>
    m.genres?.some((g) => ["Horror", "Mystery"].includes(g.name))
  );

  // ❤️ Category 4: Romantic & Emotion-Packed Blockbusters
  const romanceMovies = formattedAll.filter((m) =>
    m.genres?.some((g) => ["Romance", "Drama", "Biography"].includes(g.name)) &&
    !m.genres?.some((g) => ["Horror", "Crime"].includes(g.name))
  );

  // 🎬 Category 5: Marvel & Hollywood Hindi Dubbed Hits
  const hollywoodMovies = formattedAll.filter((m) =>
    m.title.includes("Avengers") ||
    m.title.includes("Thor")
  );

  // 🌐 Category 6: Indo Overseas Films (@IndoOverseasFilms-Hindi Official Catalog)
  const iofMovies = formattedAll.filter((m) =>
    m.genres?.some((g) => g.name === "Indo Overseas Films") ||
    m.streamingPlatforms?.includes("Indo Overseas Films")
  );

  // 🌟 Trending / Most Popular
  const trendingMovies = [...formattedAll].sort((a, b) => b.popularity - a.popularity).slice(0, 10);

  // Continue Watching (if user logged in)
  let continueWatchingMovies: any[] = [];
  if (user) {
    try {
      const history = await db.watchHistory.findMany({
        where: { userId: user.id },
        take: 6,
        orderBy: { watchedAt: "desc" },
        include: {
          movie: {
            include: {
              movieGenres: { include: { genre: true } },
              movieDirectors: { include: { director: true } },
              movieCast: { include: { actor: true } },
            },
          },
        },
      });
      continueWatchingMovies = history.map((h) => formatMovieWithRelations(h.movie));
    } catch (e) {
      continueWatchingMovies = [];
    }
  }

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* 1. Cinematic Hero Section */}
      {featuredMovie && <HeroSection movie={featuredMovie} />}

      {/* 2. Ad-Free Streaming Banner */}
      <section className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-surface-muted to-brand-crimson/20 border border-emerald-500/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-white flex items-center gap-2">
                100% Ad-Free Cinema Streaming
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                  Zero Ads
                </span>
              </h3>
              <p className="text-sm text-gray-300 mt-0.5">
                Bollywood classics aur South Indian Hindi dubbed blockbusters bina kisi pop-up ya ad ke dekhein!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/search"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/40 transition hover:scale-[1.02]"
            >
              <span>Explore All Movies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chat"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition"
            >
              <span>Ask CineMate</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Continue Watching (if available) */}
      {continueWatchingMovies.length > 0 && (
        <div className="mt-6">
          <MovieRow
            title="Continue Watching"
            subtitle="Resume where you left off"
            movies={continueWatchingMovies}
            badge="History"
          />
        </div>
      )}

      {/* 4. 💥 South Indian Hindi Dubbed Blockbusters (Goldmines Mass) */}
      {massActionMovies.length > 0 && (
        <div className="mt-4">
          <MovieRow
            title="💥 Goldmines Mass & Action Blockbusters"
            subtitle="Sarrainodu, DJ, Race Gurram, Vikram Vedha, Kaithi, Magadheera, Theri aur all-time mass hits"
            movies={massActionMovies}
            badge="Goldmines Blockbuster"
          />
        </div>
      )}

      {/* 5. 😂 Comedy Dhamaal & Family Laughs */}
      {comedyMovies.length > 0 && (
        <MovieRow
          title="😂 Comedy Dhamaal & Family Laughs"
          subtitle="Hera Pheri, Sabse Badhkar Hum 2, Sher Dil, Businessman, Super Khiladi Returns aur non-stop hasi"
          movies={comedyMovies}
          badge="Superhit Comedy"
        />
      )}

      {/* 6. 👻 Horror, Thriller & Mystery Nights */}
      {horrorMovies.length > 0 && (
        <MovieRow
          title="👻 Horror, Thriller & Mystery Nights"
          subtitle="Chandramukhi, Kanchana, Doctor (4K), Shaitan aur rooh kaanp dene wali suspense filmein"
          movies={horrorMovies}
          badge="Supernatural & Thrills"
        />
      )}

      {/* 7. ❤️ Romantic & Emotion-Packed Blockbusters */}
      {romanceMovies.length > 0 && (
        <MovieRow
          title="❤️ Romantic & Emotional Blockbusters"
          subtitle="Dear Comrade, Uppena, Mahanati (4K), Dwaraka, Madam Geeta Rani aur dil chhu lene wali kahaniyan"
          movies={romanceMovies}
          badge="Romance & Heartfelt"
        />
      )}

      {/* 8. 🎬 Marvel Blockbusters (Hindi Dubbed) */}
      {hollywoodMovies.length > 0 && (
        <MovieRow
          title="🎬 Marvel Blockbusters (Hindi Dubbed)"
          subtitle="Avengers: Infinity War, Avengers: Endgame, Thor: Ragnarok aur Marvel ke iconic superhero hits"
          movies={hollywoodMovies}
          badge="Marvel Hindi HD"
        />
      )}

      {/* 9. 🌐 Indo Overseas Films (Official Hollywood Hindi Dubbed) */}
      {iofMovies.length > 0 && (
        <MovieRow
          title="🌐 Indo Overseas Films (Official Hindi Dubbed)"
          subtitle="Jackie Chan, Don Lee, The Wandering Earth, Everest, Anaconda, Lucy 2, Demon Mermaid aur 80+ official IOF hits"
          movies={iofMovies}
          badge="IOF Hindi Official"
        />
      )}

      {/* 9. 🌟 Trending Movies */}
      <MovieRow
        title="🌟 Most Popular This Week"
        subtitle="Audience ke sabse pasandeeda aur sabse zyada dekhe gaye movies"
        movies={trendingMovies}
        badge="Trending"
      />
    </div>
  );
}
