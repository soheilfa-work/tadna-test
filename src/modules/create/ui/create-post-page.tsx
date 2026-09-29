"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/shared/lib/cn";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const SPORT_TAGS = ["تکواندو", "فوتبال", "والیبال", "شنا", "بدنسازی"];
const MEDIA = [
  { id: "photo", label: "تصویر" },
  { id: "video", label: "ویدیو" },
  { id: "location", label: "موقعیت" },
] as const;

export function CreatePostPage() {
  const name = useAthleteName();
  const router = useRouter();
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>(["تکواندو"]);
  const [media, setMedia] = useState<string>("photo");

  function toggleTag(tag: string) {
    setTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  }

  function publish() {
    router.push("/home");
  }

  const form = (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e8f6f7] text-sm font-bold text-heading">
            {name.split(" ")[0]?.[0]}
          </span>
          <div>
            <p className="font-bold">{name}</p>
            <p className="mt-0.5 text-xs text-muted">عضو باشگاه المپیک</p>
          </div>
        </div>
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={5}
          placeholder="چه خبر تازه‌ای از تمرینات داری؟"
          className="mt-4 w-full resize-none bg-transparent text-sm leading-7 outline-none placeholder:text-muted"
        />
      </section>

      <div className="flex gap-2">
        {MEDIA.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMedia(item.id)}
            className={cn(
              "h-10 flex-1 rounded-2xl text-sm",
              media === item.id ? "bg-teal text-white" : "border border-line bg-white text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section>
        <p className="mb-3 text-sm font-bold">برچسب‌های ورزشی</p>
        <div className="flex flex-wrap gap-2">
          {SPORT_TAGS.map((tag) => {
            const active = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "h-9 rounded-full px-4 text-sm",
                  active ? "bg-teal text-white" : "border border-line bg-white text-ink",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={publish}
        className="h-12 w-full rounded-full bg-teal text-sm font-semibold text-white"
      >
        انتشار
      </button>
    </div>
  );

  return (
    <>
      <MobilePanel tab="create">
        <AppHeader title="ایجاد پست جدید" closeHref="/home" />
        <main className="flex-1 px-4 pb-28 pt-4">{form}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="create" title="ایجاد پست جدید">
        <div className="max-w-2xl">{form}</div>
      </DesktopPanel>
    </>
  );
}
