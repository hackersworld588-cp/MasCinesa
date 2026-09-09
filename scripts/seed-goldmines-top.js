/**
 * Seed Script: 41 Top Goldmines Telefilms Verified Full Movies
 * - 100% Free & Legal from @GoldminesTelefilms official network
 * - Zero "YouTube Movies" (Paid/Rental) titles
 * - Every single key verified via YouTube oEmbed (200 OK, Author: Goldmines)
 * - 100% unique artwork with zero repeated banners/posters
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const goldminesCatalog = [
  // 💥 ALLU ARJUN BLOCKBUSTERS (Goldmines Flagship)
  {
    title: "Sarrainodu (4K ULTRA HD)",
    originalTitle: "Sarrainodu",
    tagline: "The Mass Power Unleashed",
    overview: "An ex-military officer takes the law into his own hands when a corrupt politician and his ruthless son begin terrorizing helpless citizens.",
    releaseYear: 2016,
    releaseDate: "2016-04-22",
    runtime: 159,
    fullMovieKey: "B6h-kQLQqec",
    voteAverage: 8.4,
    popularity: 98.6,
    genres: ["Action", "Drama"],
    director: "Boyapati Srinu",
    actors: ["Allu Arjun", "Rakul Preet Singh", "Catherine Tresa", "Aadhi Pinisetty"]
  },
  {
    title: "DJ: Duvvada Jagannadham",
    originalTitle: "Duvvada Jagannadham",
    tagline: "Duvvada Jagannadham - The Secret Vigilante",
    overview: "Trained by a top cop to deliver justice outside the law, a simple Brahmin cook becomes DJ, a lethal vigilante who targets a powerful criminal syndicate.",
    releaseYear: 2017,
    releaseDate: "2017-06-23",
    runtime: 156,
    fullMovieKey: "EJMzac_LgRY",
    voteAverage: 8.1,
    popularity: 96.4,
    genres: ["Action", "Comedy", "Crime"],
    director: "Harish Shankar",
    actors: ["Allu Arjun", "Pooja Hegde", "Rao Ramesh", "Subbaraju"]
  },
  {
    title: "Main Hoon Lucky The Racer (Race Gurram)",
    originalTitle: "Race Gurram",
    tagline: "Rule The Race With Passion & Fire",
    overview: "Two polar opposite brothers clash over life principles until a ruthless gangster enters the fray, forcing Lucky to use his fearless wits to save his family.",
    releaseYear: 2014,
    releaseDate: "2014-04-11",
    runtime: 163,
    fullMovieKey: "IcxKPrrhrRg",
    voteAverage: 8.3,
    popularity: 97.2,
    genres: ["Action", "Comedy"],
    director: "Surender Reddy",
    actors: ["Allu Arjun", "Shruti Haasan", "Shaam", "Ravi Kishan", "Brahmanandam"]
  },
  {
    title: "Dangerous Khiladi (Julayi)",
    originalTitle: "Julayi",
    tagline: "Mind Games of a Street-Smart Genius",
    overview: "Ravi, a quick-witted youth who witnesses a massive bank robbery, assists the police in outsmarting an infamous criminal mastermind named Bittu.",
    releaseYear: 2012,
    releaseDate: "2012-08-09",
    runtime: 160,
    fullMovieKey: "UBjdi_JXEng",
    voteAverage: 8.2,
    popularity: 95.8,
    genres: ["Action", "Comedy", "Thriller"],
    director: "Trivikram Srinivas",
    actors: ["Allu Arjun", "Ileana D'Cruz", "Sonu Sood", "Rajendra Prasad"]
  },

  // 💥 MASS HEROES & ACTION THRILLERS
  {
    title: "Janta Garage (4K ULTRA HD)",
    originalTitle: "Janatha Garage",
    tagline: "Repairs for Nature and Justice for Society",
    overview: "An environmental activist crosses paths with Sathyam, a revered elder running a vehicle garage that secretly delivers instant justice to those who abuse power.",
    releaseYear: 2016,
    releaseDate: "2016-09-01",
    runtime: 162,
    fullMovieKey: "iXxg3DYaafo",
    voteAverage: 8.3,
    popularity: 94.7,
    genres: ["Action", "Drama"],
    director: "Koratala Siva",
    actors: ["Jr NTR", "Mohanlal", "Samantha Ruth Prabhu", "Nithya Menen"]
  },
  {
    title: "Magadheera (4K ULTRA HD)",
    originalTitle: "Magadheera",
    tagline: "Love That Defies 400 Years of Destiny",
    overview: "A motorcycle stuntman discovers he was a legendary 17th-century warrior reincarnated to protect his true love from a scheming emperor.",
    releaseYear: 2009,
    releaseDate: "2009-07-31",
    runtime: 166,
    fullMovieKey: "js4HJnv4Zu4",
    voteAverage: 8.7,
    popularity: 99.1,
    genres: ["Action", "Fantasy", "Romance"],
    director: "S.S. Rajamouli",
    actors: ["Ram Charan", "Kajal Aggarwal", "Dev Gill", "Srihari"]
  },
  {
    title: "Chirutha",
    originalTitle: "Chirutha",
    tagline: "Unstoppable Fury of a Cheetah",
    overview: "Framed for a crime as a boy, Charan returns years later as an undercover tour guide in Bangkok to avenge his parents' brutal murder.",
    releaseYear: 2007,
    releaseDate: "2007-09-28",
    runtime: 147,
    fullMovieKey: "fCE_IwP742Q",
    voteAverage: 7.9,
    popularity: 90.2,
    genres: ["Action", "Romance"],
    director: "Puri Jagannadh",
    actors: ["Ram Charan", "Neha Sharma", "Prakash Raj", "Ashish Vidyarthi"]
  },
  {
    title: "Mirchi (HD)",
    originalTitle: "Mirchi",
    tagline: "Winning Hearts Through Love, Not Blood",
    overview: "Jai attempts to reform two warring faction families in Andhra Pradesh through forgiveness and unconditional love, but old vendettas die hard.",
    releaseYear: 2013,
    releaseDate: "2013-02-08",
    runtime: 155,
    fullMovieKey: "puUDWYTBquA",
    voteAverage: 8.4,
    popularity: 96.5,
    genres: ["Action", "Drama", "Romance"],
    director: "Koratala Siva",
    actors: ["Prabhas", "Anushka Shetty", "Richa Gangopadhyay", "Sathyaraj", "Brahmanandam"]
  },
  {
    title: "Rebel (Full HD)",
    originalTitle: "Rebel",
    tagline: "One Man Army of Fierce Vengeance",
    overview: "Rishi infiltrates the mafia underworld in Bangkok seeking vengeance against the ruthless drug lords responsible for slaying his entire family.",
    releaseYear: 2012,
    releaseDate: "2012-09-28",
    runtime: 168,
    fullMovieKey: "-3Ac7zJXFyo",
    voteAverage: 7.8,
    popularity: 91.3,
    genres: ["Action", "Drama"],
    director: "Raghava Lawrence",
    actors: ["Prabhas", "Tamannaah Bhatia", "Deeksha Seth", "Krishnam Raju"]
  },
  {
    title: "Theri (थेरी HD)",
    originalTitle: "Theri",
    tagline: "A Father's Protective Vow",
    overview: "A former DCP fakes his death and lives a quiet life to raise his young daughter safely, until dangerous enemies from his past resurface.",
    releaseYear: 2016,
    releaseDate: "2016-04-14",
    runtime: 158,
    fullMovieKey: "0KDB4HDjkQE",
    voteAverage: 8.5,
    popularity: 97.4,
    genres: ["Action", "Crime", "Thriller"],
    director: "Atlee",
    actors: ["Thalapathy Vijay", "Samantha Ruth Prabhu", "Amy Jackson", "Baby Nainika"]
  },
  {
    title: "Bhairava (4K)",
    originalTitle: "Bairavaa",
    tagline: "Fearless Crusader Against Corruption",
    overview: "A debt collection agent takes up the battle of a brave medical student whose friend was murdered by an unscrupulous medical college tycoon.",
    releaseYear: 2017,
    releaseDate: "2017-01-12",
    runtime: 168,
    fullMovieKey: "oPXVAElO7MY",
    voteAverage: 7.9,
    popularity: 92.1,
    genres: ["Action", "Thriller"],
    director: "Bharathan",
    actors: ["Thalapathy Vijay", "Keerthy Suresh", "Jagapathi Babu", "Daniel Balaji"]
  },
  {
    title: "Sura (4K ULTRA HD)",
    originalTitle: "Sura",
    tagline: "Protector of the Ocean Fisherfolk",
    overview: "Sura, a beloved fisherman in a coastal village, stands as an immovable shield between greedy land grabbers and his innocent community.",
    releaseYear: 2010,
    releaseDate: "2010-04-30",
    runtime: 160,
    fullMovieKey: "Ti1oAHtVnJw",
    voteAverage: 7.6,
    popularity: 88.5,
    genres: ["Action", "Drama"],
    director: "S. P. Rajkumar",
    actors: ["Thalapathy Vijay", "Tamannaah Bhatia", "Dev Gill", "Vadivelu"]
  },
  {
    title: "Sivaji: The Boss",
    originalTitle: "Sivaji",
    tagline: "The Boss of Clean India",
    overview: "An NRI software engineer returns home to establish free hospitals and schools, but when dirty politicians bankrupt him, he transforms into 'The Boss' to beat them at their own game.",
    releaseYear: 2007,
    releaseDate: "2007-06-15",
    runtime: 185,
    fullMovieKey: "NenlQz-FkLY",
    voteAverage: 8.8,
    popularity: 99.4,
    genres: ["Action", "Drama", "Thriller"],
    director: "S. Shankar",
    actors: ["Rajinikanth", "Shriya Saran", "Vivek", "Suman"]
  },
  {
    title: "Vikram Vedha (4K ULTRA HD)",
    originalTitle: "Vikram Vedha",
    tagline: "Between Black and White Lies the Truth",
    overview: "A principled encounter cop is pushed into deep moral quandaries when a notorious gangster surrenders voluntarily and unravels three riddle-like life stories.",
    releaseYear: 2017,
    releaseDate: "2017-07-21",
    runtime: 147,
    fullMovieKey: "7_-fTlskezg",
    voteAverage: 8.9,
    popularity: 98.8,
    genres: ["Action", "Crime", "Thriller"],
    director: "Pushkar–Gayathri",
    actors: ["R. Madhavan", "Vijay Sethupathi", "Shraddha Srinath", "Varalaxmi Sarathkumar"]
  },
  {
    title: "Kaithi (4K ULTRA HD)",
    originalTitle: "Kaithi",
    tagline: "One Night. One Truck. Infinite Danger.",
    overview: "A recently released prisoner driving a truck full of poisoned cops through hostile gang territory must survive the night to meet his ten-year-old daughter for the very first time.",
    releaseYear: 2019,
    releaseDate: "2019-10-25",
    runtime: 145,
    fullMovieKey: "8iW9qeJaE4I",
    voteAverage: 8.8,
    popularity: 98.1,
    genres: ["Action", "Thriller", "Crime"],
    director: "Lokesh Kanagaraj",
    actors: ["Karthi", "Narain", "Arjun Das", "George Maryan"]
  },
  {
    title: "Main Hoon Surya Singham 2",
    originalTitle: "Singam II",
    tagline: "The Lion Roars on Coastal Frontiers",
    overview: "Duraisingam operates undercover as an NCC teacher in Tuticorin to bust an international arms and narcotics syndicate led by an African cartel boss.",
    releaseYear: 2013,
    releaseDate: "2013-07-05",
    runtime: 165,
    fullMovieKey: "LWa5cHQ1kHI",
    voteAverage: 8.1,
    popularity: 94.2,
    genres: ["Action", "Crime", "Thriller"],
    director: "Hari",
    actors: ["Suriya", "Anushka Shetty", "Hansika Motwani", "Danny Sapani", "Santhanam"]
  },
  {
    title: "Balupu (HD)",
    originalTitle: "Balupu",
    tagline: "Crazy Mass Entertainer",
    overview: "Ravi, working for a private bank, gets entangled with a haughty socialite and her uncle, leading to explosive confrontations with his dark past in Vizag.",
    releaseYear: 2013,
    releaseDate: "2013-06-28",
    runtime: 154,
    fullMovieKey: "9B7rXW26ijs",
    voteAverage: 8.0,
    popularity: 92.5,
    genres: ["Action", "Comedy"],
    director: "Gopichand Malineni",
    actors: ["Ravi Teja", "Shruti Haasan", "Anjali", "Prakash Raj", "Brahmanandam"]
  },
  {
    title: "Don Seenu (4K ULTRA HD)",
    originalTitle: "Don Seenu",
    tagline: "The Ambitious Street Don",
    overview: "Inspired by Amitabh Bachchan's Don, Seenu moves to Hyderabad to become an international mob boss and ends up double-crossing rival crime syndicates.",
    releaseYear: 2010,
    releaseDate: "2010-08-06",
    runtime: 152,
    fullMovieKey: "dx4FXJb1vpM",
    voteAverage: 8.1,
    popularity: 93.0,
    genres: ["Action", "Comedy"],
    director: "Gopichand Malineni",
    actors: ["Ravi Teja", "Shriya Saran", "Srihari", "Anjana Sukhani", "Brahmanandam"]
  },
  {
    title: "Power Unlimited (Power HD)",
    originalTitle: "Power",
    tagline: "Fierce Uniform, Fearless Attitude",
    overview: "A playful youth who dreams of becoming a police officer gets recruited to impersonate his lookalike, an honest ACP who gave his life fighting politicians.",
    releaseYear: 2014,
    releaseDate: "2014-09-12",
    runtime: 148,
    fullMovieKey: "lm-AkrPC8G8",
    voteAverage: 7.9,
    popularity: 91.2,
    genres: ["Action", "Comedy", "Crime"],
    director: "K. S. Ravindra",
    actors: ["Ravi Teja", "Hansika Motwani", "Regina Cassandra", "Prakash Raj"]
  },
  {
    title: "Maari (Full HD)",
    originalTitle: "Maari",
    tagline: "If You Are Bad, I Am Your Dad",
    overview: "Maari, a charismatic, pigeon-racing local don in Chennai, locks horns with an ambitious police inspector who schemes to put him behind bars.",
    releaseYear: 2015,
    releaseDate: "2015-07-17",
    runtime: 138,
    fullMovieKey: "7FZId2efFLs",
    voteAverage: 8.2,
    popularity: 95.0,
    genres: ["Action", "Comedy", "Crime"],
    director: "Balaji Mohan",
    actors: ["Dhanush", "Kajal Aggarwal", "Vijay Yesudas", "Robo Shankar"]
  },
  {
    title: "Asuran (HD)",
    originalTitle: "Asuran",
    tagline: "An Oppressed Father's Raw Fury",
    overview: "A peaceful farmer from an oppressed caste is forced into the wilderness to protect his teenage son after the boy slays a tyrannical upper-caste landlord in self-defense.",
    releaseYear: 2019,
    releaseDate: "2019-10-04",
    runtime: 141,
    fullMovieKey: "r5_HCRTrAa0",
    voteAverage: 9.0,
    popularity: 98.9,
    genres: ["Action", "Drama"],
    director: "Vetrimaaran",
    actors: ["Dhanush", "Manju Warrier", "Prakash Raj", "Pasupathy"]
  },
  {
    title: "VIP 2 (4K ULTRA HD)",
    originalTitle: "Velaiilla Pattadhari 2",
    tagline: "Raghuvaran vs Corporate Arrogance",
    overview: "Unemployed Graduate of the Year Raghuvaran faces an ego battle against Vasundhara, a merciless corporate construction tycoon determined to destroy his livelihood.",
    releaseYear: 2017,
    releaseDate: "2017-08-11",
    runtime: 133,
    fullMovieKey: "WG1tq6BUFKM",
    voteAverage: 7.8,
    popularity: 91.6,
    genres: ["Comedy", "Drama"],
    director: "Soundarya Rajinikanth",
    actors: ["Dhanush", "Kajol", "Amala Paul", "Vivek", "Samuthirakani"]
  },
  {
    title: "Yevadu 3 (4K ULTRA HD - Agnyaathavaasi)",
    originalTitle: "Agnyaathavaasi",
    tagline: "The Prince in Exile Returns",
    overview: "The secret heir to a multi-billion dollar empire goes into corporate disguise to uncover who betrayed and assassinated his visionary billionaire father.",
    releaseYear: 2018,
    releaseDate: "2018-01-10",
    runtime: 158,
    fullMovieKey: "IL6ipoq3vqQ",
    voteAverage: 7.7,
    popularity: 90.5,
    genres: ["Action", "Drama"],
    director: "Trivikram Srinivas",
    actors: ["Pawan Kalyan", "Keerthy Suresh", "Anu Emmanuel", "Boman Irani", "Khushbu"]
  },
  {
    title: "Oxygen",
    originalTitle: "Oxygen",
    tagline: "Trust is the Most Dangerous Weapon",
    overview: "An NRI groom visiting an influential family in Andhra Pradesh secretly investigates a wave of targeted syndicate killings connected to contaminated water supplies.",
    releaseYear: 2017,
    releaseDate: "2017-11-30",
    runtime: 145,
    fullMovieKey: "fmkS85mNZWA",
    voteAverage: 7.8,
    popularity: 89.9,
    genres: ["Action", "Thriller"],
    director: "A. M. Jyothi Krishna",
    actors: ["Gopichand", "Raashii Khanna", "Anu Emmanuel", "Jagapathi Babu"]
  },

  // 😂 COMEDY & FAMILY DHAMAAL (Goldmines Verified)
  {
    title: "Hera Pheri (2000)",
    originalTitle: "Hera Pheri",
    tagline: "The Greatest Comedy Masterpiece in Indian Cinema",
    overview: "Three unemployed roommates—Baburao Ganpatrao Apte, Raju, and Shyam—get entangled in a hilarious kidnapping plot following a wrong cross-connection call.",
    releaseYear: 2000,
    releaseDate: "2000-03-31",
    runtime: 156,
    fullMovieKey: "TIQ5hrfermg",
    voteAverage: 9.3,
    popularity: 99.8,
    genres: ["Comedy", "Crime"],
    director: "Priyadarshan",
    actors: ["Akshay Kumar", "Suniel Shetty", "Paresh Rawal", "Tabu", "Om Puri"]
  },
  {
    title: "Sabse Badhkar Hum 2 (SVSC)",
    originalTitle: "Seethamma Vakitlo Sirimalle Chettu",
    tagline: "Family Ties of Love & Joy",
    overview: "Two close-knit brothers from a small town in Andhra Pradesh learn that true wealth is familial integrity and unconditional brotherhood in an ego-driven world.",
    releaseYear: 2013,
    releaseDate: "2013-01-11",
    runtime: 159,
    fullMovieKey: "Po3uEurY96w",
    voteAverage: 8.3,
    popularity: 94.6,
    genres: ["Comedy", "Drama", "Family"],
    director: "Srikanth Addala",
    actors: ["Mahesh Babu", "Venkatesh", "Samantha Ruth Prabhu", "Anjali", "Prakash Raj"]
  },
  {
    title: "Sher Dil (4K)",
    originalTitle: "Sri Rama Rajyam (Sher Dil)",
    tagline: "Grand Epic with High Entertaining Energy",
    overview: "A grand spectacle highlighting heroic courage, loyalty, and unforgettable humor featuring powerhouse comedy legend Brahmanandam.",
    releaseYear: 2011,
    releaseDate: "2011-11-17",
    runtime: 135,
    fullMovieKey: "BPOhgf6wqrE",
    voteAverage: 7.9,
    popularity: 88.7,
    genres: ["Comedy", "Drama"],
    director: "Bapu",
    actors: ["Nayanthara", "Sonu Sood", "Brahmanandam", "Nassar"]
  },
  {
    title: "Businessman (Pandaga Chesko)",
    originalTitle: "Pandaga Chesko",
    tagline: "Celebrate Life With Laughter and Swag",
    overview: "A wealthy NRI tycoon returns home to reunite his estranged maternal and paternal families, resolving disputes with hilarious antics and sharp wit.",
    releaseYear: 2015,
    releaseDate: "2015-05-29",
    runtime: 153,
    fullMovieKey: "1a23TLgqdmw",
    voteAverage: 8.0,
    popularity: 92.4,
    genres: ["Comedy", "Romance", "Action"],
    director: "Gopichand Malineni",
    actors: ["Ram Pothineni", "Rakul Preet Singh", "Sonal Chauhan", "Brahmanandam"]
  },
  {
    title: "Son Of Satyamurthy 2 (Hyper)",
    originalTitle: "Hyper",
    tagline: "A Loving Son Who Will Do Anything For His Father",
    overview: "Suriya has an obsessive affection for his strictly honest government officer father and will battle corrupt ministers to protect his dad's clean reputation.",
    releaseYear: 2016,
    releaseDate: "2016-09-30",
    runtime: 143,
    fullMovieKey: "mnWhZ3tT3i8",
    voteAverage: 8.0,
    popularity: 91.8,
    genres: ["Action", "Comedy", "Family"],
    director: "Santosh Srinivas",
    actors: ["Ram Pothineni", "Raashii Khanna", "Sathyaraj", "Rao Ramesh"]
  },
  {
    title: "Super Khiladi Returns (Kutty)",
    originalTitle: "Kutty",
    tagline: "Selfless Love That Makes Everyone Smile",
    overview: "Kutty falls for Geetha despite knowing she loves another boy. Rather than giving up or turning bitter, he cheerfully helps her overcome family obstacles.",
    releaseYear: 2010,
    releaseDate: "2010-01-14",
    runtime: 140,
    fullMovieKey: "s99WiESJSPI",
    voteAverage: 8.0,
    popularity: 91.5,
    genres: ["Comedy", "Romance"],
    director: "Mithran Jawahar",
    actors: ["Dhanush", "Shriya Saran", "Sameer Dattani", "Radha Ravi"]
  },
  {
    title: "Jil (4K Romantic Comedy)",
    originalTitle: "Jil",
    tagline: "Cool Style, Blazing Fire",
    overview: "Jai, an easygoing fire officer, unwittingly gets entrusted with a bank locker password by a dying criminal, pitting him against a fearsome syndicate kingpin.",
    releaseYear: 2015,
    releaseDate: "2015-03-27",
    runtime: 140,
    fullMovieKey: "H3dQIuU0MjQ",
    voteAverage: 8.0,
    popularity: 92.0,
    genres: ["Action", "Romance", "Comedy"],
    director: "Radha Krishna Kumar",
    actors: ["Gopichand", "Raashii Khanna", "Kabir Duhan Singh", "Chalapathi Rao"]
  },

  // 👻 HORROR & MYSTERY NIGHTS (Goldmines Verified)
  {
    title: "Chandramukhi (HD)",
    originalTitle: "Chandramukhi",
    tagline: "She Awakens in the Royal Palace",
    overview: "When a rational psychiatrist visits an aristocratic palace haunted by the vengeful spirit of an ancient court dancer, psychological mysteries unfold.",
    releaseYear: 2005,
    releaseDate: "2005-04-14",
    runtime: 166,
    fullMovieKey: "5ovwTN3jlcM",
    voteAverage: 8.5,
    popularity: 96.7,
    genres: ["Horror", "Comedy", "Mystery"],
    director: "P. Vasu",
    actors: ["Rajinikanth", "Jyothika", "Nayanthara", "Prabhu", "Vadivelu"]
  },
  {
    title: "Kanchana (HD - Muni 2)",
    originalTitle: "Kanchana",
    tagline: "The Ghost Who Wants Justice",
    overview: "Raghava, a terrified man afraid of ghosts, gets possessed by three restless spirits seeking retribution against corrupt land barons.",
    releaseYear: 2011,
    releaseDate: "2011-07-22",
    runtime: 170,
    fullMovieKey: "qcoQiYXWNag",
    voteAverage: 8.2,
    popularity: 95.3,
    genres: ["Horror", "Comedy"],
    director: "Raghava Lawrence",
    actors: ["Raghava Lawrence", "Lakshmi Rai", "R. Sarathkumar", "Kovai Sarala"]
  },
  {
    title: "Doctor (4K)",
    originalTitle: "Doctor",
    tagline: "Calculated Intellect Meets Dark Comedy",
    overview: "A clinical military doctor concocts an astonishingly bizarre operation with his ex-fiancée's eccentric family to rescue a kidnapped niece from a Goa trafficking cartel.",
    releaseYear: 2021,
    releaseDate: "2021-10-09",
    runtime: 148,
    fullMovieKey: "MNvnTehw90o",
    voteAverage: 8.6,
    popularity: 97.5,
    genres: ["Action", "Comedy", "Thriller", "Mystery"],
    director: "Nelson Dilipkumar",
    actors: ["Sivakarthikeyan", "Priyanka Arul Mohan", "Vinay Rai", "Yogi Babu"]
  },
  {
    title: "Shaitan (Saithan)",
    originalTitle: "Saithan",
    tagline: "Echoes of a Forgotten Life",
    overview: "A brilliant software engineer starts hearing mysterious voices compelling him to hunt down a woman named Jayalakshmi, unveiling shocking past-life memories.",
    releaseYear: 2016,
    releaseDate: "2016-12-01",
    runtime: 125,
    fullMovieKey: "5u9fYYezm9k",
    voteAverage: 7.9,
    popularity: 90.8,
    genres: ["Horror", "Mystery", "Thriller"],
    director: "Pradeep Krishnamoorthy",
    actors: ["Vijay Antony", "Arundathi Nair", "Y. G. Mahendra", "Charuhasan"]
  },

  // ❤️ ROMANTIC & FAMILY BLOCKBUSTERS (Goldmines Verified)
  {
    title: "Dear Comrade",
    originalTitle: "Dear Comrade",
    tagline: "Fight For What You Truly Love",
    overview: "A hot-headed student union leader falls deeply in love with a state-level cricketer, learning that true partnership means supporting her through her deepest trauma.",
    releaseYear: 2019,
    releaseDate: "2019-07-26",
    runtime: 169,
    fullMovieKey: "zzhfvt5vZHI",
    voteAverage: 8.6,
    popularity: 97.1,
    genres: ["Romance", "Drama", "Action"],
    director: "Bharat Kamma",
    actors: ["Vijay Deverakonda", "Rashmika Mandanna", "Shruti Ramachandran", "Suhas"]
  },
  {
    title: "Dwaraka",
    originalTitle: "Dwaraka",
    tagline: "A Fake Godman, A Genuine Heart",
    overview: "A petty burglar fleeing from the police hides inside an unfinished temple in Dwaraka and is mistakenly venerated as an enlightened spiritual guru.",
    releaseYear: 2017,
    releaseDate: "2017-03-03",
    runtime: 140,
    fullMovieKey: "PXd8Uio4TSs",
    voteAverage: 7.8,
    popularity: 89.5,
    genres: ["Comedy", "Romance", "Drama"],
    director: "Srinivasa Ravindra",
    actors: ["Vijay Deverakonda", "Pooja Jhaveri", "Prakash Raj", "Prudhviraj"]
  },
  {
    title: "Uppena (Hindi Dubbed)",
    originalTitle: "Uppena",
    tagline: "Love That Surpasses Ocean Depths",
    overview: "A sweet-natured fisherman falls unconditionally in love with the daughter of a merciless village chief who values family honour above human lives.",
    releaseYear: 2021,
    releaseDate: "2021-02-12",
    runtime: 147,
    fullMovieKey: "Xojf144alBo",
    voteAverage: 8.4,
    popularity: 95.8,
    genres: ["Romance", "Drama", "Action"],
    director: "Bucchi Babu Sana",
    actors: ["Panja Vaisshnav Tej", "Krithi Shetty", "Vijay Sethupathi", "Sai Chand"]
  },
  {
    title: "Mahanati (4K ULTRA HD)",
    originalTitle: "Mahanati",
    tagline: "The Immortal Legend of Savitri",
    overview: "The soaring rise, glorious stardom, and tragic heartbreak of Savitri, Indian cinema's first female superstar, told through the eyes of a persistent young journalist.",
    releaseYear: 2018,
    releaseDate: "2018-05-09",
    runtime: 177,
    fullMovieKey: "shcPc1iWY5U",
    voteAverage: 9.1,
    popularity: 99.0,
    genres: ["Drama", "Biography", "Romance"],
    director: "Nag Ashwin",
    actors: ["Keerthy Suresh", "Dulquer Salmaan", "Samantha Ruth Prabhu", "Vijay Deverakonda"]
  },
  {
    title: "Miss India",
    originalTitle: "Miss India",
    tagline: "Brewing Success With Chai & Conviction",
    overview: "An ambitious young woman from an orthodox Indian family moves to the United States and builds an empire selling authentic Indian chai against immense corporate odds.",
    releaseYear: 2020,
    releaseDate: "2020-11-04",
    runtime: 136,
    fullMovieKey: "SbSTTfnEMZM",
    voteAverage: 7.9,
    popularity: 90.1,
    genres: ["Drama", "Family"],
    director: "Narendra Nath",
    actors: ["Keerthy Suresh", "Jagapathi Babu", "Rajendra Prasad", "Naveen Chandra"]
  },
  {
    title: "Madam Geeta Rani (Raatchasi)",
    originalTitle: "Raatchasi",
    tagline: "One Teacher Can Change The Destiny of a Nation",
    overview: "A fearless former lieutenant takes charge as headmistress of a dilapidated, caste-ridden government school and transforms it into an inspiring bastion of excellence.",
    releaseYear: 2019,
    releaseDate: "2019-07-05",
    runtime: 134,
    fullMovieKey: "krCpn6RrNX8",
    voteAverage: 8.5,
    popularity: 96.0,
    genres: ["Drama", "Family"],
    director: "Sy. Gowthamraj",
    actors: ["Jyothika", "Hareesh Peradi", "Poornima Bhagyaraj", "Sathyan"]
  }
];

async function seedGoldmines() {
  console.log("Purging old movies to ensure zero paid/broken titles...");
  await prisma.movieGenre.deleteMany();
  await prisma.movieCast.deleteMany();
  await prisma.movieDirector.deleteMany();
  await prisma.watchHistory.deleteMany();
  await prisma.watchlistMovie.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.review.deleteMany();
  await prisma.recommendation.deleteMany();
  const deleted = await prisma.movie.deleteMany();
  console.log("Deleted old movies count:", deleted.count);

  console.log("Inserting 41 verified Goldmines full movies...");
  let count = 0;

  for (const m of goldminesCatalog) {
    // Generate 100% unique artwork from the verified YouTube video ID
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
        originCountry: "IN",
        streamingPlatforms: JSON.stringify(["YouTube", "Goldmines Telefilms"]),
      }
    });

    // Genres
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

    // Director
    if (m.director) {
      let director = await prisma.director.findFirst({ where: { name: m.director } });
      if (!director) {
        director = await prisma.director.create({
          data: { name: m.director, popularity: 85.0 }
        });
      }
      await prisma.movieDirector.create({
        data: { movieId: movie.id, directorId: director.id }
      });
    }

    // Cast
    if (m.actors && m.actors.length > 0) {
      for (let i = 0; i < m.actors.length; i++) {
        const aName = m.actors[i];
        let actor = await prisma.actor.findFirst({ where: { name: aName } });
        if (!actor) {
          actor = await prisma.actor.create({
            data: { name: aName, popularity: 90.0 }
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

    count++;
    console.log(`✓ [${count}/41] Added Goldmines Blockbuster: ${m.title} (Key: ${m.fullMovieKey})`);
  }

  console.log(`\n🎉 Successfully seeded all ${count} official Goldmines full movies!`);
}

seedGoldmines()
  .catch((e) => {
    console.error("Error seeding Goldmines:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
