export type FeedRole = "ورزشکار" | "مربی";

export type FeedComment = {
  id: string;
  author: string;
  role?: FeedRole;
  time: string;
  body: string;
  likes: number;
};

export type FeedPost = {
  id: string;
  author: string;
  role: FeedRole;
  time: string;
  body: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  videoDuration?: string;
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: "sohrab-1",
    author: "سهراب مرادی",
    role: "ورزشکار",
    time: "۲ ساعت پیش",
    body: "تمرینات سخت امروز برای آمادگی مسابقات کشوری. تمرکز روی افزایش استقامت و تکنیک‌های سرعتی. به امید موفقیت! 💪🏆",
    tags: ["وزنه‌برداری"],
    likes: 128,
    comments: 36,
    shares: 12,
  },
  {
    id: "asgharpour-1",
    author: "استاد اصغرپور",
    role: "مربی",
    time: "دیروز",
    body: "آنالیز حرکت ضربه چرخشی در تکواندو. نکات کلیدی برای حفظ تعادل و ضربه موثر. 🔥",
    tags: ["تکواندو"],
    likes: 412,
    comments: 89,
    shares: 54,
    videoDuration: "3:45",
  },
  {
    id: "ali-1",
    author: "علی کریمی",
    role: "ورزشکار",
    time: "۳ ساعت پیش",
    body: "کریمی پس از تمرینات فشرده امروز: تمام تمرکز روی استقامت و سرعت بالا در تکرارها بود. به امید خبرهای خوب برای فوتبال کشورمان!",
    tags: ["فوتبال"],
    likes: 252,
    comments: 45,
    shares: 18,
  },
];

export const FEED_COMMENTS: Record<string, FeedComment[]> = {
  "sohrab-1": [
    {
      id: "c1",
      author: "مهسا جاور",
      role: "ورزشکار",
      time: "۱ ساعت پیش",
      body: "دمت گرم سهراب، همین روحیه را برای قهرمانی کشور لازم داریم. ادامه بده 🔥",
      likes: 14,
    },
    {
      id: "c2",
      author: "امیر رضایی",
      role: "ورزشکار",
      time: "۴۵ دقیقه پیش",
      body: "برنامه تمرینی امروز را هم بگذار تا بقیه الگو بگیرند.",
      likes: 6,
    },
  ],
  "asgharpour-1": [
    {
      id: "c3",
      author: "علی کریمی",
      time: "دیروز",
      body: "توضیح تعادل روی پای تکی عالی بود استاد.",
      likes: 9,
    },
  ],
  "ali-1": [
    {
      id: "c4",
      author: "سهراب مرادی",
      time: "۲ ساعت پیش",
      body: "همین تمرکز را نگه دار، نتیجه می‌آید.",
      likes: 4,
    },
  ],
};

export function listFeedPosts() {
  return FEED_POSTS;
}

export function getFeedPost(id: string) {
  return FEED_POSTS.find((post) => post.id === id);
}

export function getFeedComments(postId: string) {
  return FEED_COMMENTS[postId] ?? [];
}

export function searchFeedPosts(query: string) {
  const term = query.trim();
  if (!term) return FEED_POSTS;
  return FEED_POSTS.filter((post) => `${post.author} ${post.body} ${post.tags.join(" ")}`.includes(term));
}
