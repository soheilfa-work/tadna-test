"use client";

import { cn } from "@/src/shared/lib/cn";
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_BYTES } from "@/src/shared/lib/uploads";

type FileDropProps = {
  id: string;
  label: string;
  hint?: string;
  accept?: string[];
  valueName?: string;
  previewUrl?: string;
  error?: string;
  onFile: (file: File, dataUrl: string) => void;
  onClear?: () => void;
  portrait?: boolean;
};

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("خواندن فایل ناموفق بود."));
    reader.readAsDataURL(file);
  });
}

export function FileDrop({
  id,
  label,
  hint = "JPG، PNG، WEBP یا PDF تا ۲ مگابایت",
  accept = [...ALLOWED_DOCUMENT_TYPES],
  valueName,
  previewUrl,
  error,
  onFile,
  onClear,
  portrait,
}: FileDropProps) {
  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!accept.includes(file.type)) {
      onFile(new File([], file.name), "");
      return;
    }
    if (file.size > MAX_DOCUMENT_BYTES) {
      onFile(file, "");
      return;
    }
    const dataUrl = await readFile(file);
    onFile(file, dataUrl);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <label
        htmlFor={id}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-sand/60 text-center transition-colors hover:border-ember hover:bg-sand",
          portrait ? "mx-auto aspect-[3/4] min-h-[220px] w-full max-w-[180px] lg:mx-0" : "min-h-[132px] w-full px-4 py-6",
          error && "border-danger",
        )}
      >
        {previewUrl && previewUrl.startsWith("data:image") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <>
            <span className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-white text-ember shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 16V8m0 0l-3 3m3-3l3 3M6 20h12a2 2 0 002-2V9.5L16.5 4H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink">بارگذاری فایل</span>
            <span className="mt-1 max-w-[16rem] text-xs text-muted">{hint}</span>
          </>
        )}
        <input
          id={id}
          type="file"
          className="sr-only"
          accept={accept.join(",")}
          onChange={(event) => {
            void handleFiles(event.target.files);
            event.currentTarget.value = "";
          }}
        />
      </label>
      {valueName ? (
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span className="truncate">{valueName}</span>
          {onClear ? (
            <button type="button" className="text-danger" onClick={onClear}>
              حذف
            </button>
          ) : null}
        </div>
      ) : null}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

