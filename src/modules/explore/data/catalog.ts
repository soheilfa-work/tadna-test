export const EXPLORE_FILTERS = [
  { id: "all", label: "همه" },
  { id: "athletes", label: "ورزشکاران" },
  { id: "clubs", label: "باشگاه‌ها" },
  { id: "events", label: "رویدادها" },
  { id: "competitions", label: "مسابقات" },
] as const;

export type ExploreFilterId = (typeof EXPLORE_FILTERS)[number]["id"];

export type ExploreAthlete = {
  id: string;
  name: string;
  sport: string;
  role: string;
  rating?: number;
  snippet?: string;
};

export type ExploreClub = {
  id: string;
  name: string;
  sports: string;
  distanceKm: number;
  members: number;
  nearby: boolean;
};

export type ExploreHighlight = {
  id: string;
  title: string;
  subtitle: string;
  kind: "events" | "competitions";
  featured: boolean;
};

export const EXPLORE_ATHLETES: ExploreAthlete[] = [
  {
    id: "ath-ali",
    name: "علی کریمی",
    sport: "فوتبال",
    role: "ورزشکار",
    snippet: "کریمی پس از تمرینات فشرده امروز روی استقامت و سرعت کار کرد.",
  },
  { id: "ath-amir", name: "امیر رضایی", sport: "تکواندو", role: "ورزشکار" },
  { id: "ath-mahsa", name: "مهسا جاور", sport: "رویینگ", role: "ورزشکار" },
  { id: "ath-sohrab", name: "سهراب مرادی", sport: "وزنه‌برداری", role: "ورزشکار" },
  {
    id: "ath-asgharpour",
    name: "استاد حسن اصغرپور",
    sport: "تکواندو",
    role: "مربی",
    rating: 5,
    snippet: "مربی تکواندو با تمرکز روی تکنیک و تعادل.",
  },
];

export const EXPLORE_CLUBS: ExploreClub[] = [
  {
    id: "club-olympic-west",
    name: "باشگاه المپیک غرب",
    sports: "بدنسازی و رزمی",
    distanceKm: 2.5,
    members: 1200,
    nearby: true,
  },
  {
    id: "club-kia",
    name: "آکادمی فوتبال کیا",
    sports: "فوتبال پایه",
    distanceKm: 4,
    members: 3500,
    nearby: true,
  },
  {
    id: "club-arad",
    name: "مجموعه فرهنگی ورزشی آراد",
    sports: "کاراته و کاردیو",
    distanceKm: 8,
    members: 980,
    nearby: false,
  },
];

export const EXPLORE_HIGHLIGHTS: ExploreHighlight[] = [
  {
    id: "event-arad",
    title: "همایش بزرگ رزمی آراد",
    subtitle: "جمعه ساعت ۸ صبح، پارک لاله",
    kind: "events",
    featured: true,
  },
  {
    id: "comp-volleyball",
    title: "لیگ والیبال محلات تهران",
    subtitle: "۴۵ تیم ثبت‌نام کردند",
    kind: "competitions",
    featured: true,
  },
  {
    id: "event-park",
    title: "تمرین گروهی پارک لاله",
    subtitle: "سه‌شنبه ۱۸ عصر، زمین چمن",
    kind: "events",
    featured: false,
  },
  {
    id: "comp-nationals",
    title: "مسابقات قهرمانی کشور",
    subtitle: "ثبت‌نام تا پایان ماه جاری",
    kind: "competitions",
    featured: false,
  },
];

function includesQuery(value: string, query: string) {
  return query.length === 0 || value.includes(query);
}

export function filterExploreCatalog(category: ExploreFilterId, rawQuery: string) {
  const query = rawQuery.trim();
  const athletes = EXPLORE_ATHLETES.filter((item) =>
    includesQuery(`${item.name} ${item.sport} ${item.role} ${item.snippet ?? ""}`, query),
  );
  const clubs = EXPLORE_CLUBS.filter((item) => includesQuery(`${item.name} ${item.sports}`, query));
  const highlights = EXPLORE_HIGHLIGHTS.filter((item) => includesQuery(`${item.title} ${item.subtitle}`, query));
  const events = highlights.filter((item) => item.kind === "events");
  const competitions = highlights.filter((item) => item.kind === "competitions");

  return {
    athletes: category === "all" || category === "athletes" ? athletes : [],
    clubs: category === "all" || category === "clubs" ? clubs : [],
    events: category === "all" || category === "events" ? events : [],
    competitions: category === "all" || category === "competitions" ? competitions : [],
  };
}
