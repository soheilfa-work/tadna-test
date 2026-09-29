"use client";

import { useMemo, useState } from "react";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AthleteDesktopSidebar, AthleteTabBar } from "@/src/shared/ui/athlete-chrome";
import { searchFeedPosts } from "@/src/modules/feed/data/catalog";
import { PostCard } from "@/src/modules/feed/ui/post-card";
import {
  EXPLORE_FILTERS,
  filterExploreCatalog,
  type ExploreAthlete,
  type ExploreClub,
  type ExploreFilterId,
  type ExploreHighlight,
} from "../data/catalog";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.2 16.2 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HighlightCard({ item }: { item: ExploreHighlight }) {
  return (
    <article className="overflow-hidden rounded-[22px] bg-white p-2 shadow-[0_1px_4px_rgba(16,52,60,0.06)]">
      <div className="flex min-h-[168px] flex-col justify-end rounded-[18px] border border-[#eef1f3] bg-[#f7f8f9] px-3 pb-4 pt-16">
        <h3 className="text-[13px] font-bold leading-6 text-ink">{item.title}</h3>
        <p className="mt-0.5 text-[11px] leading-5 text-muted">{item.subtitle}</p>
      </div>
    </article>
  );
}

function ClubCard({ club }: { club: ExploreClub }) {
  return (
    <article className="flex min-h-[92px] max-w-full overflow-hidden rounded-[22px] bg-white shadow-[0_1px_4px_rgba(16,52,60,0.06)]">
      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
        <h3 className="text-[15px] font-bold text-ink">{club.name}</h3>
        <p className="mt-1 text-[12px] text-muted">{club.sports}</p>
        <p className="mt-2 text-[12px]">
          <span className="font-semibold text-teal">{toPersianDigits(club.distanceKm)} کیلومتر</span>
          <span className="mx-1.5 text-[#c5d0d4]">·</span>
          <span className="text-muted">{toPersianDigits(club.members)} عضو</span>
        </p>
      </div>
      <div className="w-[38%] min-w-[6.5rem] max-w-[9.5rem] shrink-0 bg-[#f4f6f7]" />
    </article>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 text-[#e7b008]" aria-label={`${value} ستاره`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} width="12" height="12" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 3l2.4 6.3L21 10l-5 3.6 1.7 6.4L12 16.5 6.3 20 8 13.6 3 10l6.6-.7L12 3Z"
            fill={index < value ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ))}
    </span>
  );
}

function AthleteCard({ athlete }: { athlete: ExploreAthlete }) {
  const [following, setFollowing] = useState(false);

  return (
    <article className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3 shadow-[0_1px_4px_rgba(16,52,60,0.06)]">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#eef2f4] text-sm font-bold text-heading">
        {athlete.name.split(" ")[0]?.[0]}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-ink">{athlete.name}</h3>
        <p className="mt-1 text-xs text-muted">
          {athlete.sport} · {athlete.role}
        </p>
        {athlete.snippet ? <p className="mt-1 truncate text-[11px] text-muted">{athlete.snippet}</p> : null}
        {athlete.rating ? <div className="mt-1"><Stars value={athlete.rating} /></div> : null}
      </div>
      <button
        type="button"
        onClick={() => setFollowing((value) => !value)}
        className={cn(
          "h-8 shrink-0 rounded-full px-3 text-[11px] font-semibold",
          following ? "bg-teal text-white" : "border border-teal text-teal",
        )}
      >
        {following ? "دنبال می‌کنید" : "دنبال کردن"}
      </button>
    </article>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[16px] font-bold text-ink">{title}</h2>
      {action ? (
        <button type="button" onClick={onAction} className="text-[13px] font-semibold text-teal">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[22px] bg-white px-6 py-12 text-center text-sm text-muted">
      موردی مطابق جستجوی شما پیدا نشد.
    </div>
  );
}

function ExploreResults({
  category,
  query,
  onSeeAllClubs,
}: {
  category: ExploreFilterId;
  query: string;
  onSeeAllClubs: () => void;
}) {
  const results = useMemo(() => filterExploreCatalog(category, query), [category, query]);
  const posts = useMemo(
    () => (query.trim() && (category === "all" || category === "athletes") ? searchFeedPosts(query) : []),
    [category, query],
  );
  const showDefaultAll = category === "all" && query.trim().length === 0;
  const featured = results.events.concat(results.competitions).filter((item) => item.featured);
  const nearbyClubs = results.clubs.filter((club) => club.nearby);
  const clubs = showDefaultAll ? nearbyClubs : results.clubs;

  if (showDefaultAll) {
    return (
      <>
        <section className="mb-6">
          <SectionTitle title="محبوب‌ترین‌های هفته" />
          <div className="grid grid-cols-2 gap-3">
            {featured.map((item) => (
              <HighlightCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        <section>
          <SectionTitle title="باشگاه‌های نزدیک شما" action="مشاهده همه" onAction={onSeeAllClubs} />
          <div className="space-y-3">
            {nearbyClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      </>
    );
  }

  const showAthletes = category === "all" || category === "athletes";
  const showClubs = category === "all" || category === "clubs";
  const showEvents = category === "all" || category === "events";
  const showCompetitions = category === "all" || category === "competitions";
  const isEmpty =
    (showAthletes ? results.athletes.length === 0 : true) &&
    (showClubs ? clubs.length === 0 : true) &&
    (showEvents ? results.events.length === 0 : true) &&
    (showCompetitions ? results.competitions.length === 0 : true) &&
    posts.length === 0;

  if (isEmpty) return <EmptyState />;

  return (
    <div className="space-y-6">
      {showAthletes && results.athletes.length > 0 ? (
        <section>
          {category === "all" ? <SectionTitle title="ورزشکاران" /> : null}
          <div className="space-y-3">
            {results.athletes.map((athlete) => (
              <AthleteCard key={athlete.id} athlete={athlete} />
            ))}
          </div>
        </section>
      ) : null}
      {posts.length > 0 ? (
        <section>
          <SectionTitle title="پست‌ها" />
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} href={`/posts/${post.id}`} />
            ))}
          </div>
        </section>
      ) : null}
      {showEvents && results.events.length > 0 ? (
        <section>
          {category === "all" ? <SectionTitle title="رویدادها" /> : null}
          <div className={cn("grid gap-3", results.events.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
            {results.events.map((item) => (
              <HighlightCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
      {showCompetitions && results.competitions.length > 0 ? (
        <section>
          {category === "all" ? <SectionTitle title="مسابقات" /> : null}
          <div className={cn("grid gap-3", results.competitions.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
            {results.competitions.map((item) => (
              <HighlightCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}
      {showClubs && clubs.length > 0 ? (
        <section>
          {category === "all" ? <SectionTitle title="باشگاه‌ها" /> : null}
          <div className="space-y-3">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ExploreHeader({
  query,
  category,
  onQuery,
  onCategory,
}: {
  query: string;
  category: ExploreFilterId;
  onQuery: (value: string) => void;
  onCategory: (value: ExploreFilterId) => void;
}) {
  return (
    <header className="sticky top-0 z-20 min-w-0 bg-ocean text-white">
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="min-w-0 px-4 pb-4 pt-2">
        <label className="flex h-11 min-w-0 items-center gap-2 rounded-full bg-[#0c4b57] px-4">
          <input
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="جستجوی ورزشکار، باشگاه، رویداد..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/55"
            aria-label="جستجو"
            autoComplete="off"
          />
          <span className="text-white/80">
            <SearchIcon />
          </span>
        </label>
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto scrollbar-none">
          {EXPLORE_FILTERS.map((filter) => {
            const active = filter.id === category;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onCategory(filter.id)}
                aria-pressed={active}
                className={cn(
                  "h-9 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium",
                  active ? "bg-teal text-white" : "bg-[#0c4b57] text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function MobileExplore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ExploreFilterId>("all");

  return (
    <div className="flex min-h-dvh w-full max-w-[100vw] min-w-0 flex-col overflow-x-hidden bg-[#f3f5f6] text-ink lg:hidden">
      <ExploreHeader query={query} category={category} onQuery={setQuery} onCategory={setCategory} />
      <main className="min-w-0 flex-1 px-4 pb-28 pt-5">
        <ExploreResults
          category={category}
          query={query}
          onSeeAllClubs={() => {
            setQuery("");
            setCategory("clubs");
          }}
        />
      </main>
      <AthleteTabBar active="search" />
    </div>
  );
}

function DesktopExplore({ name }: { name: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ExploreFilterId>("all");

  return (
    <div className="hidden min-h-dvh bg-[#f3f4f6] text-ink lg:block">
      <div className="mx-auto grid min-h-dvh max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <AthleteDesktopSidebar name={name} active="explore" />
        <main className="px-4 py-5 sm:px-8">
          <header className="mb-5">
            <h1 className="text-lg font-bold">کاوش و جستجو</h1>
            <div className="mt-4 flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جستجوی ورزشکار، باشگاه، رویداد..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                aria-label="جستجو"
                autoComplete="off"
              />
              <span className="text-muted">
                <SearchIcon />
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {EXPLORE_FILTERS.map((filter) => {
                const active = filter.id === category;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setCategory(filter.id)}
                    aria-pressed={active}
                    className={cn(
                      "h-9 rounded-full px-4 text-sm",
                      active ? "bg-teal text-white" : "border border-line bg-white text-ink",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </header>
          <div className="max-w-3xl">
            <ExploreResults
              category={category}
              query={query}
              onSeeAllClubs={() => {
                setQuery("");
                setCategory("clubs");
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export function ExplorePage() {
  const name = useAthleteName();
  return (
    <>
      <MobileExplore />
      <DesktopExplore name={name} />
    </>
  );
}
