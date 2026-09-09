const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const MOVIES = [
  // ===================== COMEDY DHAMAAL =====================
  {
    tmdbId: 21614,
    imdbId: "tt0242519",
    title: "Hera Pheri",
    originalTitle: "Hera Pheri",
    tagline: "Ye Baburao ka style hai!",
    overview: "Two tenants Raju and Shyam and eccentric garage owner Baburao in financial distress intercept a kidnapper ransom call. They devise an audacious scheme to claim the ransom money themselves, sparking legendary comic mayhem.",
    releaseDate: "2000-03-31",
    releaseYear: 2000,
    runtime: 156,
    posterUrl: "https://image.tmdb.org/t/p/w500/AkfqKaD1KqfIqytxLvWlyKJRlEi.jpg",
    backdropUrl: "https://i.ytimg.com/vi/TIQ5hrfermg/maxresdefault.jpg",
    fullMovieKey: "TIQ5hrfermg",
    isFreeWatch: true,
    voteAverage: 8.2,
    voteCount: 89000,
    popularity: 210.0,
    language: "hi",
    originCountry: "IN",
    budget: 75000000,
    revenue: 240000000,
    streamingPlatforms: JSON.stringify(["Goldmines / Shemaroo (Free)", "JioCinema", "Prime Video"]),
    genres: ["Comedy", "Crime"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Raju" },
      { name: "Suniel Shetty", characterName: "Shyam" },
      { name: "Paresh Rawal", characterName: "Baburao Ganpatrao Apte" },
      { name: "Tabu", characterName: "Anuradha" }
    ]
  },
  {
    tmdbId: 196370,
    imdbId: "tt0995031",
    title: "Bhool Bhulaiyaa",
    originalTitle: "Bhool Bhulaiyaa",
    tagline: "It is all in the mind... or is it?",
    overview: "When newlyweds move into their ancestral royal palace, strange occurrences terrify the family. Eccentric psychiatrist Dr. Aditya Shrivastav arrives to solve the ghostly puzzle of dancer Manjulika.",
    releaseDate: "2007-10-12",
    releaseYear: 2007,
    runtime: 159,
    posterUrl: "https://i.ytimg.com/vi/GGzSId0_qJc/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/GGzSId0_qJc/maxresdefault.jpg",
    fullMovieKey: "GGzSId0_qJc",
    isFreeWatch: true,
    voteAverage: 7.4,
    voteCount: 62000,
    popularity: 190.0,
    language: "hi",
    originCountry: "IN",
    budget: 320000000,
    revenue: 840000000,
    streamingPlatforms: JSON.stringify(["T-Series (Free)", "Disney+ Hotstar"]),
    genres: ["Comedy", "Horror", "Mystery"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Dr. Aditya Shrivastav" },
      { name: "Vidya Balan", characterName: "Avni / Manjulika" },
      { name: "Shiney Ahuja", characterName: "Siddharth" },
      { name: "Paresh Rawal", characterName: "Batukshankar" }
    ]
  },
  {
    tmdbId: 44023,
    imdbId: "tt0496319",
    title: "Chup Chup Ke",
    originalTitle: "Chup Chup Ke",
    tagline: "He cannot speak. She cannot hear. Love makes them shout!",
    overview: "A debt-ridden young man Jeetu attempts suicide to let his family claim insurance, but is rescued by fishermen and pawned off to a wealthy Gujarati household under the guise of being mute and deaf.",
    releaseDate: "2006-06-09",
    releaseYear: 2006,
    runtime: 164,
    posterUrl: "https://i.ytimg.com/vi/kargzSqQS3A/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/kargzSqQS3A/maxresdefault.jpg",
    fullMovieKey: "kargzSqQS3A",
    isFreeWatch: true,
    voteAverage: 6.9,
    voteCount: 41000,
    popularity: 175.0,
    language: "hi",
    originCountry: "IN",
    budget: 180000000,
    revenue: 410000000,
    streamingPlatforms: JSON.stringify(["Shemaroo (Free)", "Netflix"]),
    genres: ["Comedy", "Drama", "Romance"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Shahid Kapoor", characterName: "Jeetu" },
      { name: "Kareena Kapoor", characterName: "Shruti" },
      { name: "Rajpal Yadav", characterName: "Bandya" },
      { name: "Paresh Rawal", characterName: "Gundya" }
    ]
  },
  {
    tmdbId: 21852,
    imdbId: "tt1078580",
    title: "Dhamaal",
    originalTitle: "Dhamaal",
    tagline: "Double Dhamaal, Double Fun!",
    overview: "Four lazy, jobless friends encounter a dying underworld don who confesses he hid 10 crore rupees in Goa under a big W. A manic cross-country race against police inspector Kabir begins!",
    releaseDate: "2007-09-07",
    releaseYear: 2007,
    runtime: 137,
    posterUrl: "https://i.ytimg.com/vi/BWED8Gz4JvQ/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/BWED8Gz4JvQ/maxresdefault.jpg",
    fullMovieKey: "BWED8Gz4JvQ",
    isFreeWatch: true,
    voteAverage: 7.4,
    voteCount: 48000,
    popularity: 185.0,
    language: "hi",
    originCountry: "IN",
    budget: 190000000,
    revenue: 500000000,
    streamingPlatforms: JSON.stringify(["Shemaroo (Free)", "Zee5"]),
    genres: ["Comedy", "Adventure"],
    directors: [{ name: "Indra Kumar" }],
    cast: [
      { name: "Sanjay Dutt", characterName: "Inspector Kabir Nayak" },
      { name: "Arshad Warsi", characterName: "Aditya Shrivastav" },
      { name: "Riteish Deshmukh", characterName: "Deshbandhu Roy" },
      { name: "Javed Jaffrey", characterName: "Manav Shrivastav" }
    ]
  },
  {
    tmdbId: 22822,
    imdbId: "tt0843283",
    title: "Golmaal: Fun Unlimited",
    originalTitle: "Golmaal: Fun Unlimited",
    tagline: "No logic, only magic!",
    overview: "Four runaway college slackers take shelter in the bungalow of a blind elderly couple by making Gopal pretend to be their NRI grandson Sameer, leading to uproarious confusions.",
    releaseDate: "2006-07-14",
    releaseYear: 2006,
    runtime: 150,
    posterUrl: "https://i.ytimg.com/vi/ZmE6TN9bYQg/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/ZmE6TN9bYQg/maxresdefault.jpg",
    fullMovieKey: "ZmE6TN9bYQg",
    isFreeWatch: true,
    voteAverage: 7.5,
    voteCount: 52000,
    popularity: 180.0,
    language: "hi",
    originCountry: "IN",
    budget: 150000000,
    revenue: 460000000,
    streamingPlatforms: JSON.stringify(["Shemaroo (Free)", "JioCinema"]),
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
    tmdbId: 10784,
    imdbId: "tt1078588",
    title: "Welcome",
    originalTitle: "Welcome",
    tagline: "Majnu Bhai aur Uday Shetty ki family!",
    overview: "Underworld kingpin brothers Uday and Majnu want to marry their innocent sister Sanjana into a respectable family. They target bachelor Rajiv, whose uncle Dr. Ghungroo is terrified of criminal connections.",
    releaseDate: "2007-12-21",
    releaseYear: 2007,
    runtime: 159,
    posterUrl: "https://i.ytimg.com/vi/s044Cs0gTJQ/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/s044Cs0gTJQ/maxresdefault.jpg",
    fullMovieKey: "s044Cs0gTJQ",
    isFreeWatch: true,
    voteAverage: 7.1,
    voteCount: 58000,
    popularity: 198.0,
    language: "hi",
    originCountry: "IN",
    budget: 350000000,
    revenue: 1190000000,
    streamingPlatforms: JSON.stringify(["Base Movies (Free)", "JioCinema"]),
    genres: ["Comedy", "Crime", "Romance"],
    directors: [{ name: "Anees Bazmee" }],
    cast: [
      { name: "Akshay Kumar", characterName: "Rajiv" },
      { name: "Katrina Kaif", characterName: "Sanjana" },
      { name: "Nana Patekar", characterName: "Uday Shetty" },
      { name: "Anil Kapoor", characterName: "Majnu Bhai" }
    ]
  },
  {
    tmdbId: 24707,
    imdbId: "tt0371735",
    title: "Hungama",
    originalTitle: "Hungama",
    tagline: "Confusion unlimited, laughter guaranteed!",
    overview: "A hilarious series of misunderstandings begins when an innocent village girl and an ambitious city boy pretend to be married to rent a room, entangling an insecure millionaire businessman and his glamorous wife.",
    releaseDate: "2003-08-01",
    releaseYear: 2003,
    runtime: 153,
    posterUrl: "https://i.ytimg.com/vi/55sUfITkuVY/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/55sUfITkuVY/maxresdefault.jpg",
    fullMovieKey: "55sUfITkuVY",
    isFreeWatch: true,
    voteAverage: 7.6,
    voteCount: 42000,
    popularity: 170.0,
    language: "hi",
    originCountry: "IN",
    budget: 60000000,
    revenue: 200000000,
    streamingPlatforms: JSON.stringify(["Hungama (Free)", "Disney+ Hotstar"]),
    genres: ["Comedy", "Romance"],
    directors: [{ name: "Priyadarshan" }],
    cast: [
      { name: "Akshaye Khanna", characterName: "Jeetu" },
      { name: "Aftab Shivdasani", characterName: "Nandu" },
      { name: "Rimi Sen", characterName: "Anjali" },
      { name: "Paresh Rawal", characterName: "Radheshyam Tiwari" }
    ]
  },

  // ===================== SOUTH INDIAN HINDI DUBBED (GOLDMINES ACTION / MASS) =====================
  {
    tmdbId: 693134,
    imdbId: "tt9389998",
    title: "Pushpa: The Rise (Hindi Dubbed)",
    originalTitle: "Pushpa: The Rise",
    tagline: "Pushpa naam sunke flower samjhe kya? Fire hai main!",
    overview: "Pushpa Raj, a fearless coolie in the Seshachalam forests of Andhra Pradesh, rises rapidly through the syndicate of red sandalwood smuggling, clashing with relentless SP Bhanwar Singh Shekhawat.",
    releaseDate: "2021-12-17",
    releaseYear: 2021,
    runtime: 179,
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "pKctjlpbqpA",
    isFreeWatch: true,
    voteAverage: 8.0,
    voteCount: 95000,
    popularity: 280.0,
    language: "hi",
    originCountry: "IN",
    budget: 2000000000,
    revenue: 3750000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Prime Video"]),
    genres: ["Action", "Crime", "Drama"],
    directors: [{ name: "Sukumar" }],
    cast: [
      { name: "Allu Arjun", characterName: "Pushpa Raj" },
      { name: "Rashmika Mandanna", characterName: "Srivalli" },
      { name: "Fahadh Faasil", characterName: "SP Bhanwar Singh Shekhawat" },
      { name: "Sunil", characterName: "Mangalam Srinu" }
    ]
  },
  {
    tmdbId: 569094,
    imdbId: "tt7899452",
    title: "K.G.F: Chapter 1 (Hindi Dubbed)",
    originalTitle: "K.G.F: Chapter 1",
    tagline: "Salaam Rocky Bhai!",
    overview: "Rocky, a ruthless Mumbai gangster born into desperate poverty, arrives at the brutal, enslaved Kolar Gold Fields disguised as a slave laborer to assassinate the tyrannical overlord Garuda.",
    releaseDate: "2018-12-21",
    releaseYear: 2018,
    runtime: 156,
    posterUrl: "https://image.tmdb.org/t/p/w500/ltH7TbLKrPezv1ndPz6vU9m4c7o.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/5n3X0C0K5Y9L0W8v1m2q.jpg",
    fullMovieKey: "e_WqPxbT6n4",
    isFreeWatch: true,
    voteAverage: 8.2,
    voteCount: 110000,
    popularity: 260.0,
    language: "hi",
    originCountry: "IN",
    budget: 800000000,
    revenue: 2500000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Prime Video"]),
    genres: ["Action", "Crime", "Drama"],
    directors: [{ name: "Prashanth Neel" }],
    cast: [
      { name: "Yash", characterName: "Raja Krishnappa Bairya (Rocky)" },
      { name: "Srinidhi Shetty", characterName: "Reena Desai" },
      { name: "Ramachandra Raju", characterName: "Garuda" },
      { name: "Anant Nag", characterName: "Anand Ingalagi" }
    ]
  },
  {
    tmdbId: 10787,
    imdbId: "tt0479751",
    title: "Sivaji: The Boss (Hindi Dubbed)",
    originalTitle: "Sivaji",
    tagline: "Jhund mein toh suar aate hain, sher akela hi aata hai!",
    overview: "A patriotic software systems architect Sivaji returns from America to establish free medical universities and hospitals in India. When corrupt politician Adiseshan sabotages him, Sivaji transforms into The Boss.",
    releaseDate: "2007-06-15",
    releaseYear: 2007,
    runtime: 188,
    posterUrl: "https://i.ytimg.com/vi/NenlQz-FkLY/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/NenlQz-FkLY/maxresdefault.jpg",
    fullMovieKey: "NenlQz-FkLY",
    isFreeWatch: true,
    voteAverage: 7.7,
    voteCount: 75000,
    popularity: 220.0,
    language: "hi",
    originCountry: "IN",
    budget: 600000000,
    revenue: 1520000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Sun NXT"]),
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
    tmdbId: 385383,
    imdbId: "tt5242742",
    title: "Sarrainodu (Hindi Dubbed)",
    originalTitle: "Sarrainodu",
    tagline: "Mass power at its absolute peak!",
    overview: "Gana, an ex-military soldier with an unyielding moral compass, doles out brutal street justice to criminals escaped by the law. His path collides with Dhanush, the psychopathic son of the Chief Minister.",
    releaseDate: "2016-04-22",
    releaseYear: 2016,
    runtime: 159,
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "Nfvy7_5JrxY",
    isFreeWatch: true,
    voteAverage: 7.2,
    voteCount: 45000,
    popularity: 205.0,
    language: "hi",
    originCountry: "IN",
    budget: 500000000,
    revenue: 1270000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)"]),
    genres: ["Action", "Drama"],
    directors: [{ name: "Boyapati Srinu" }],
    cast: [
      { name: "Allu Arjun", characterName: "Gana" },
      { name: "Rakul Preet Singh", characterName: "Jaanu" },
      { name: "Catherine Tresa", characterName: "MLA Hansitha Reddy" },
      { name: "Aadhi Pinisetty", characterName: "Vairam Dhanush" }
    ]
  },
  {
    tmdbId: 615658,
    imdbId: "tt10366206",
    title: "Ala Vaikunthapurramuloo (Hindi Dubbed)",
    originalTitle: "Ala Vaikunthapurramuloo",
    tagline: "The mega blockbuster family mass entertainer!",
    overview: "Bantu grows up enduring constant humiliation from his cynical father Valmiki. He later uncovers that he was swapped at birth with a millionaire scion and must step up to save his real family.",
    releaseDate: "2020-01-12",
    releaseYear: 2020,
    runtime: 165,
    posterUrl: "https://image.tmdb.org/t/p/w500/1X0r7X4r8V0y.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "W1p4G5oM9m8",
    isFreeWatch: true,
    voteAverage: 7.6,
    voteCount: 65000,
    popularity: 215.0,
    language: "hi",
    originCountry: "IN",
    budget: 1000000000,
    revenue: 2800000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Netflix"]),
    genres: ["Action", "Comedy", "Drama"],
    directors: [{ name: "Trivikram Srinivas" }],
    cast: [
      { name: "Allu Arjun", characterName: "Bantu" },
      { name: "Pooja Hegde", characterName: "Amulya" },
      { name: "Tabu", characterName: "Yashoda" },
      { name: "Murali Sharma", characterName: "Valmiki" }
    ]
  },
  {
    tmdbId: 440071,
    imdbId: "tt6013974",
    title: "DJ: Duvvada Jagannadham (Hindi Dubbed)",
    originalTitle: "DJ: Duvvada Jagannadham",
    tagline: "Sanskaari cook by day, deadly vigilante by night!",
    overview: "Duvvada Jagannadham is an orthodox Brahmin chef in Hyderabad who secretly moonlights as DJ, an undercover vigilante assassin eliminating criminals protected by political power.",
    releaseDate: "2017-06-23",
    releaseYear: 2017,
    runtime: 156,
    posterUrl: "https://image.tmdb.org/t/p/w500/AkfqKaD1KqfIqytxLvWlyKJRlEi.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/5n3X0C0K5Y9L0W8v1m2q.jpg",
    fullMovieKey: "Q2rD5p1Zp1w",
    isFreeWatch: true,
    voteAverage: 7.0,
    voteCount: 39000,
    popularity: 195.0,
    language: "hi",
    originCountry: "IN",
    budget: 500000000,
    revenue: 1150000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)"]),
    genres: ["Action", "Comedy", "Thriller"],
    directors: [{ name: "Harish Shankar" }],
    cast: [
      { name: "Allu Arjun", characterName: "Duvvada Jagannadham / DJ" },
      { name: "Pooja Hegde", characterName: "Pooja" },
      { name: "Rao Ramesh", characterName: "Royyala Naidu" },
      { name: "Murali Sharma", characterName: "Purushottam" }
    ]
  },
  {
    tmdbId: 25776,
    imdbId: "tt1447500",
    title: "Magadheera (Hindi Dubbed)",
    originalTitle: "Magadheera",
    tagline: "400 years of immortal love and reincarnation vengeance!",
    overview: "A motorcycle stuntman Harsha recalls his previous life as Kala Bhairava, an indomitable warrior in 17th century kingdom sworn to protect princess Mithravinda from evil commander Ranadev.",
    releaseDate: "2009-07-31",
    releaseYear: 2009,
    runtime: 166,
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "pU3_UfCg7O8",
    isFreeWatch: true,
    voteAverage: 7.8,
    voteCount: 52000,
    popularity: 210.0,
    language: "hi",
    originCountry: "IN",
    budget: 400000000,
    revenue: 1500000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)"]),
    genres: ["Action", "Fantasy", "Romance"],
    directors: [{ name: "S.S. Rajamouli" }],
    cast: [
      { name: "Ram Charan", characterName: "Kala Bhairava / Harsha" },
      { name: "Kajal Aggarwal", characterName: "Mithravinda Devi / Indu" },
      { name: "Dev Gill", characterName: "Ranadev Billa / Raghuveer" },
      { name: "Srihari", characterName: "Sher Khan / Solomon" }
    ]
  },
  {
    tmdbId: 633802,
    imdbId: "tt9900782",
    title: "Kaithi (Hindi Dubbed - Dilli)",
    originalTitle: "Kaithi",
    tagline: "One brave father. One night. Unstoppable fury.",
    overview: "Dilli, a recently released prisoner desperate to meet his daughter for the very first time, is coerced by an injured police officer to drive a truck full of poisoned cops through a deadly drug cartel siege.",
    releaseDate: "2019-10-25",
    releaseYear: 2019,
    runtime: 145,
    posterUrl: "https://image.tmdb.org/t/p/w500/ltH7TbLKrPezv1ndPz6vU9m4c7o.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/5n3X0C0K5Y9L0W8v1m2q.jpg",
    fullMovieKey: "Vn_Vb2W6x8E",
    isFreeWatch: true,
    voteAverage: 8.4,
    voteCount: 68000,
    popularity: 225.0,
    language: "hi",
    originCountry: "IN",
    budget: 250000000,
    revenue: 1050000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Hotstar"]),
    genres: ["Action", "Thriller", "Crime"],
    directors: [{ name: "Lokesh Kanagaraj" }],
    cast: [
      { name: "Karthi", characterName: "Dilli" },
      { name: "Narain", characterName: "Inspector Bejoy" },
      { name: "Arjun Das", characterName: "Anbu" },
      { name: "George Maryan", characterName: "Napoleon" }
    ]
  },
  {
    tmdbId: 440307,
    imdbId: "tt6148156",
    title: "Vikram Vedha (South Hindi Dubbed)",
    originalTitle: "Vikram Vedha",
    tagline: "Who is good? Who is bad? You decide!",
    overview: "Vikram, a strictly upright encounter police specialist, hunts feared gangster Vedha. When Vedha voluntarily surrenders and begins narrating three riddle-like stories, Vikram worldview on good and evil is shattered.",
    releaseDate: "2017-07-21",
    releaseYear: 2017,
    runtime: 147,
    posterUrl: "https://image.tmdb.org/t/p/w500/AkfqKaD1KqfIqytxLvWlyKJRlEi.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "i4xJ6nUf1l4",
    isFreeWatch: true,
    voteAverage: 8.3,
    voteCount: 71000,
    popularity: 200.0,
    language: "hi",
    originCountry: "IN",
    budget: 110000000,
    revenue: 600000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Zee5"]),
    genres: ["Action", "Crime", "Thriller"],
    directors: [{ name: "Pushkar-Gayathri" }],
    cast: [
      { name: "Vijay Sethupathi", characterName: "Vedha" },
      { name: "R. Madhavan", characterName: "Vikram" },
      { name: "Shraddha Srinath", characterName: "Priya" },
      { name: "Varalaxmi Sarathkumar", characterName: "Chandra" }
    ]
  },

  // ===================== HORROR & MYSTERY SUPERNATURAL =====================
  {
    tmdbId: 537996,
    imdbId: "tt8239946",
    title: "Tumbbad",
    originalTitle: "Tumbbad",
    tagline: "Lalach ka koi ant nahi hota.",
    overview: "In 1920s rural Maharashtra, Vinayak seeks the forbidden cursed gold of Hastar, the demonic first-born son of the Goddess of Prosperity, defying ancient ancestral curses with chilling consequences.",
    releaseDate: "2018-10-12",
    releaseYear: 2018,
    runtime: 104,
    posterUrl: "https://image.tmdb.org/t/p/w500/8qNkWaY6n3x4j4qFq8zY4Z3Y9W7.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    fullMovieKey: "TIQ5hrfermg",
    isFreeWatch: true,
    voteAverage: 8.3,
    voteCount: 65000,
    popularity: 215.0,
    language: "hi",
    originCountry: "IN",
    budget: 50000000,
    revenue: 320000000,
    streamingPlatforms: JSON.stringify(["Prime Video", "JioCinema"]),
    genres: ["Horror", "Fantasy", "Drama"],
    directors: [{ name: "Rahi Anil Barve" }],
    cast: [
      { name: "Sohum Shah", characterName: "Vinayak Rao" },
      { name: "Jyoti Malshe", characterName: "Vinayak's Mother" },
      { name: "Mohammad Samad", characterName: "Pandurang" }
    ]
  },
  {
    tmdbId: 70829,
    imdbId: "tt2012011",
    title: "Kanchana (Muni 2 - Hindi Dubbed)",
    originalTitle: "Kanchana",
    tagline: "The ghost that shook entire India!",
    overview: "Raghava, a timid young man terrified of ghosts, is possessed by a vengeful transgender ghost named Kanchana who seeks retribution against the ruthless politicians who wronged her community.",
    releaseDate: "2011-07-15",
    releaseYear: 2011,
    runtime: 165,
    posterUrl: "https://image.tmdb.org/t/p/w500/1X0r7X4r8V0y.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "NenlQz-FkLY",
    isFreeWatch: true,
    voteAverage: 6.9,
    voteCount: 42000,
    popularity: 190.0,
    language: "hi",
    originCountry: "IN",
    budget: 70000000,
    revenue: 350000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Sun NXT"]),
    genres: ["Horror", "Comedy", "Action"],
    directors: [{ name: "Raghava Lawrence" }],
    cast: [
      { name: "Raghava Lawrence", characterName: "Raghava" },
      { name: "Sarath Kumar", characterName: "Kanchana" },
      { name: "Raai Laxmi", characterName: "Priya" },
      { name: "Kovai Sarala", characterName: "Sarala" }
    ]
  },

  // ===================== ROMANTIC & FAMILY HITS =====================
  {
    tmdbId: 8649,
    imdbId: "tt1093370",
    title: "Jab We Met",
    originalTitle: "Jab We Met",
    tagline: "When life gives you Geet, sorrow vanishes!",
    overview: "A depressed wealthy Mumbai businessman Aditya boards a train without a destination and encounters bubbly, irrepressible Punjabi girl Geet, embarking on a life-altering journey across India.",
    releaseDate: "2007-10-26",
    releaseYear: 2007,
    runtime: 142,
    posterUrl: "https://image.tmdb.org/t/p/w500/m5x6Y7P0K1L2M3N4O5P.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/5n3X0C0K5Y9L0W8v1m2q.jpg",
    fullMovieKey: "ZmE6TN9bYQg",
    isFreeWatch: true,
    voteAverage: 7.9,
    voteCount: 88000,
    popularity: 210.0,
    language: "hi",
    originCountry: "IN",
    budget: 150000000,
    revenue: 510000000,
    streamingPlatforms: JSON.stringify(["Shemaroo (Free)", "JioCinema"]),
    genres: ["Romance", "Comedy", "Drama"],
    directors: [{ name: "Imtiaz Ali" }],
    cast: [
      { name: "Shahid Kapoor", characterName: "Aditya Kashyap" },
      { name: "Kareena Kapoor", characterName: "Geet Dhillon" },
      { name: "Tarun Arora", characterName: "Anshuman" }
    ]
  },
  {
    tmdbId: 872954,
    imdbId: "tt13927994",
    title: "Sita Ramam (Hindi Dubbed)",
    originalTitle: "Sita Ramam",
    tagline: "An immortal love letter beyond borders and time!",
    overview: "In 1965, Lieutenant Ram, an orphaned Indian soldier serving in Kashmir, receives mysterious love letters from a girl named Sita Mahalakshmi. Twenty years later, a young Pakistani woman must deliver Ram final letter.",
    releaseDate: "2022-08-05",
    releaseYear: 2022,
    runtime: 163,
    posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/70AV2Xx5FQYj20labp0EGdbGd9E.jpg",
    fullMovieKey: "pKctjlpbqpA",
    isFreeWatch: true,
    voteAverage: 8.6,
    voteCount: 78000,
    popularity: 240.0,
    language: "hi",
    originCountry: "IN",
    budget: 300000000,
    revenue: 1050000000,
    streamingPlatforms: JSON.stringify(["Pen Movies (Free)", "Disney+ Hotstar"]),
    genres: ["Romance", "Drama", "Mystery"],
    directors: [{ name: "Hanu Raghavapudi" }],
    cast: [
      { name: "Dulquer Salmaan", characterName: "Lieutenant Ram" },
      { name: "Mrunal Thakur", characterName: "Sita Mahalakshmi" },
      { name: "Rashmika Mandanna", characterName: "Afreen" }
    ]
  },
  {
    tmdbId: 541134,
    imdbId: "tt8820464",
    title: "Geetha Govindam (Hindi Dubbed)",
    originalTitle: "Geetha Govindam",
    tagline: "A super cute romantic family entertainer!",
    overview: "Vijay Govind, an innocent college lecturer who dreams of marriage, is mistakenly branded as a pervert by independent woman Geetha on a bus. Fate forces them together as her brother marries his sister.",
    releaseDate: "2018-08-15",
    releaseYear: 2018,
    runtime: 142,
    posterUrl: "https://image.tmdb.org/t/p/w500/AkfqKaD1KqfIqytxLvWlyKJRlEi.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w780/5n3X0C0K5Y9L0W8v1m2q.jpg",
    fullMovieKey: "e_WqPxbT6n4",
    isFreeWatch: true,
    voteAverage: 7.6,
    voteCount: 51000,
    popularity: 195.0,
    language: "hi",
    originCountry: "IN",
    budget: 80000000,
    revenue: 1300000000,
    streamingPlatforms: JSON.stringify(["Goldmines Telefilms (Free)", "Zee5"]),
    genres: ["Romance", "Comedy"],
    directors: [{ name: "Parasuram" }],
    cast: [
      { name: "Vijay Deverakonda", characterName: "Vijay Govind" },
      { name: "Rashmika Mandanna", characterName: "Geetha" }
    ]
  },

  // ===================== ACTION, CRIME & MASS HITS =====================
  {
    tmdbId: 36727,
    imdbId: "tt0294791",
    title: "Nayak: The Real Hero",
    originalTitle: "Nayak: The Real Hero",
    tagline: "Ek din ka Chief Minister!",
    overview: "TV television reporter Shivaji Rao challenges corrupt Maharashtra CM Balraj Chauhan during a live interview. Challenged to run the state for just 24 hours, Shivaji transforms the system, making deadly enemies.",
    releaseDate: "2001-09-07",
    releaseYear: 2001,
    runtime: 183,
    posterUrl: "https://i.ytimg.com/vi/MY4seAQgzW8/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/MY4seAQgzW8/maxresdefault.jpg",
    fullMovieKey: "MY4seAQgzW8",
    isFreeWatch: true,
    voteAverage: 8.0,
    voteCount: 68000,
    popularity: 195.0,
    language: "hi",
    originCountry: "IN",
    budget: 210000000,
    revenue: 350000000,
    streamingPlatforms: JSON.stringify(["Ultra Movie Parlour (Free)", "Disney+ Hotstar"]),
    genres: ["Action", "Drama", "Thriller"],
    directors: [{ name: "S. Shankar" }],
    cast: [
      { name: "Anil Kapoor", characterName: "Shivaji Rao Gaekwad" },
      { name: "Rani Mukerji", characterName: "Manjari" },
      { name: "Amrish Puri", characterName: "Chief Minister Balraj Chauhan" },
      { name: "Paresh Rawal", characterName: "Bansal" }
    ]
  },
  {
    tmdbId: 84083,
    imdbId: "tt1954470",
    title: "Gangs of Wasseypur",
    originalTitle: "Gangs of Wasseypur",
    tagline: "Baap ka, dada ka, bhai ka... sabka badla lega re tera Faizal!",
    overview: "Spanning six decades in the coal mafia heartland of Dhanbad, a murderous generational feud between Shahid Khan family and local tyrant Ramadhir Singh explodes into bloody vendettas.",
    releaseDate: "2012-06-22",
    releaseYear: 2012,
    runtime: 321,
    posterUrl: "https://i.ytimg.com/vi/5hrIdP05Pew/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/5hrIdP05Pew/maxresdefault.jpg",
    fullMovieKey: "5hrIdP05Pew",
    isFreeWatch: true,
    voteAverage: 8.2,
    voteCount: 92000,
    popularity: 205.0,
    language: "hi",
    originCountry: "IN",
    budget: 185000000,
    revenue: 510000000,
    streamingPlatforms: JSON.stringify(["Viacom18 (Free)", "Netflix", "JioCinema"]),
    genres: ["Crime", "Action", "Drama"],
    directors: [{ name: "Anurag Kashyap" }],
    cast: [
      { name: "Manoj Bajpayee", characterName: "Sardar Khan" },
      { name: "Nawazuddin Siddiqui", characterName: "Faizal Khan" },
      { name: "Tigmanshu Dhulia", characterName: "Ramadhir Singh" },
      { name: "Richa Chadha", characterName: "Nagma Khatoon" }
    ]
  },
  {
    tmdbId: 19688,
    imdbId: "tt0374887",
    title: "Munna Bhai M.B.B.S.",
    originalTitle: "Munna Bhai M.B.B.S.",
    tagline: "Jadu ki Jhappi solves everything!",
    overview: "To appease his strict, proud father, local Mumbai street don Murli Prasad Sharma (Munna Bhai) enrols in medical college, challenging rigid dean Dr. Asthana with radical empathy and hugs.",
    releaseDate: "2003-12-19",
    releaseYear: 2003,
    runtime: 156,
    posterUrl: "https://i.ytimg.com/vi/GG7RtioOpF8/hqdefault.jpg",
    backdropUrl: "https://i.ytimg.com/vi/GG7RtioOpF8/maxresdefault.jpg",
    fullMovieKey: "GG7RtioOpF8",
    isFreeWatch: true,
    voteAverage: 8.1,
    voteCount: 84000,
    popularity: 200.0,
    language: "hi",
    originCountry: "IN",
    budget: 100000000,
    revenue: 360000000,
    streamingPlatforms: JSON.stringify(["Vidhu Vinod Chopra Films (Free)", "SonyLIV"]),
    genres: ["Comedy", "Drama"],
    directors: [{ name: "Rajkumar Hirani" }],
    cast: [
      { name: "Sanjay Dutt", characterName: "Murli Prasad Sharma (Munna Bhai)" },
      { name: "Arshad Warsi", characterName: "Circuit" },
      { name: "Boman Irani", characterName: "Dr. J. C. Asthana" },
      { name: "Sunil Dutt", characterName: "Hari Prasad Sharma" }
    ]
  }
];

async function seed() {
  console.log("1. Purging foreign/Hollywood titles...");

  const allMovies = await prisma.movie.findMany({ select: { id: true, title: true, originCountry: true, language: true } });
  const toDelete = allMovies.filter(m => m.originCountry !== "IN" || m.language !== "hi");
  
  for (const m of toDelete) {
    await prisma.movie.delete({ where: { id: m.id } });
  }
  console.log("Deleted foreign movies count:", toDelete.length);

  console.log("2. Upserting curated Bollywood & South Indian (Hindi Dubbed) movies...");
  for (const item of MOVIES) {
    const movie = await prisma.movie.upsert({
      where: { tmdbId: item.tmdbId },
      update: {
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
        trailerKey: item.fullMovieKey,
        trailerUrl: "https://www.youtube.com/watch?v=" + item.fullMovieKey,
        fullMovieKey: item.fullMovieKey,
        isFreeWatch: true,
        voteAverage: item.voteAverage,
        voteCount: item.voteCount,
        popularity: item.popularity,
        language: item.language,
        originCountry: item.originCountry,
        budget: item.budget ? BigInt(item.budget) : null,
        revenue: item.revenue ? BigInt(item.revenue) : null,
        streamingPlatforms: item.streamingPlatforms
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
        trailerKey: item.fullMovieKey,
        trailerUrl: "https://www.youtube.com/watch?v=" + item.fullMovieKey,
        fullMovieKey: item.fullMovieKey,
        isFreeWatch: true,
        voteAverage: item.voteAverage,
        voteCount: item.voteCount,
        popularity: item.popularity,
        language: item.language,
        originCountry: item.originCountry,
        budget: item.budget ? BigInt(item.budget) : null,
        revenue: item.revenue ? BigInt(item.revenue) : null,
        streamingPlatforms: item.streamingPlatforms
      }
    });

    // Link Genres
    for (const genreName of item.genres) {
      const slug = genreName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const genre = await prisma.genre.upsert({
        where: { name: genreName },
        update: {},
        create: { name: genreName, slug }
      });

      const existingMapping = await prisma.movieGenre.findFirst({
        where: { movieId: movie.id, genreId: genre.id }
      });
      if (!existingMapping) {
        await prisma.movieGenre.create({
          data: { movieId: movie.id, genreId: genre.id }
        });
      }
    }

    // Link Directors
    for (const dirData of item.directors) {
      let director = await prisma.director.findFirst({ where: { name: dirData.name } });
      if (!director) {
        director = await prisma.director.create({
          data: { name: dirData.name, popularity: 50.0 }
        });
      }
      const existingMapping = await prisma.movieDirector.findFirst({
        where: { movieId: movie.id, directorId: director.id }
      });
      if (!existingMapping) {
        await prisma.movieDirector.create({
          data: { movieId: movie.id, directorId: director.id }
        });
      }
    }

    // Link Cast
    let idx = 0;
    for (const actorData of item.cast) {
      let actor = await prisma.actor.findFirst({ where: { name: actorData.name } });
      if (!actor) {
        actor = await prisma.actor.create({
          data: { name: actorData.name, popularity: 60.0 }
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

    console.log("✓ Added: " + movie.title);
  }

  const remaining = await prisma.movie.findMany({ select: { title: true, originCountry: true, language: true } });
  console.log("Seed complete! Total movies remaining in database:", remaining.length);
}

seed()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
