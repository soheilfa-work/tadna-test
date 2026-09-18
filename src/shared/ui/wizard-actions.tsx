import { Button } from "@/src/shared/ui/button";

type Props = {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  hideBack?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export function WizardActions({
  onBack,
  onNext,
  nextLabel = "ادامه مسیر",
  backLabel = "قبلی",
  nextDisabled,
  hideBack,
  secondaryLabel,
  onSecondary,
}: Props) {
  return (
    <div className="mt-8 flex items-center gap-3">
      {secondaryLabel && onSecondary ? (
        <Button variant="navy" className="min-w-24 px-6 lg:hidden" onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      ) : null}
      {hideBack ? null : (
        <Button variant="navy" className="hidden min-w-28 px-8 lg:inline-flex" onClick={onBack}>
          {backLabel}
        </Button>
      )}
      <Button className="flex-1" disabled={nextDisabled} onClick={onNext}>
        {nextLabel}
      </Button>
    </div>
  );
}
