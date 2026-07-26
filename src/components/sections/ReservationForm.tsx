"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Button } from "@/components/ui/Button";
import { PACKS, getPackPrice, isWeekendDay } from "@/lib/data";
import { SITE, whatsappHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FormValues = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  days: string;
  packId: string;
  comment: string;
};

const INITIAL_VALUES: FormValues = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  date: "",
  days: "1",
  packId: PACKS[1]?.id ?? PACKS[0].id,
  comment: "",
};

type Errors = Partial<Record<keyof FormValues, string>>;

const PHONE_REGEX = /^(?:\+212|0)[5-7]\d{8}$/;

function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Merci d'indiquer votre nom complet.";
  }
  if (!PHONE_REGEX.test(values.phone.replace(/\s/g, ""))) {
    errors.phone = "Numéro invalide. Exemple : 06 12 34 56 78";
  }
  if (values.city.trim().length < 2) {
    errors.city = "Merci d'indiquer votre ville.";
  }
  if (values.address.trim().length < 5) {
    errors.address = "Merci de préciser votre adresse complète.";
  }
  if (!values.date) {
    errors.date = "Merci de choisir une date.";
  } else {
    const chosen = new Date(values.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      errors.date = "La date doit être aujourd'hui ou dans le futur.";
    }
  }
  const daysNumber = Number(values.days);
  if (!values.days || !Number.isInteger(daysNumber) || daysNumber < 1) {
    errors.days = "Merci d'indiquer un nombre de jours valide.";
  } else if (daysNumber > 30) {
    errors.days = "Pour plus de 30 jours, contactez-nous directement sur WhatsApp.";
  }
  if (!values.packId) {
    errors.packId = "Merci de choisir un pack.";
  }

  return errors;
}

const FIELD_REFS_ORDER: (keyof FormValues)[] = [
  "fullName",
  "phone",
  "city",
  "address",
  "date",
  "days",
  "packId",
];

export function ReservationForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const fieldRefs = useRef<Partial<Record<keyof FormValues, HTMLElement | null>>>({});

  const selectedPack = PACKS.find((p) => p.id === values.packId);
  const selectedDate = values.date ? new Date(`${values.date}T00:00:00`) : undefined;
  const selectedDays = Math.max(1, Number(values.days) || 1);
  const estimatedPrice = selectedPack ? getPackPrice(selectedPack, selectedDate) : undefined;
  const estimatedTotal = estimatedPrice !== undefined ? estimatedPrice * selectedDays : undefined;

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      phone: true,
      city: true,
      address: true,
      date: true,
      days: true,
      packId: true,
      comment: true,
    });

    const firstInvalid = FIELD_REFS_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    const pack = PACKS.find((p) => p.id === values.packId);
    const chosenDate = values.date ? new Date(`${values.date}T00:00:00`) : undefined;
    const days = Math.max(1, Number(values.days) || 1);
    const pricePerDay = pack && chosenDate ? getPackPrice(pack, chosenDate) : undefined;
    const total = pricePerDay !== undefined ? pricePerDay * days : undefined;
    const rateLabel = chosenDate && isWeekendDay(chosenDate) ? "tarif weekend" : "tarif semaine";
    const message = [
      `Bonjour ${SITE.name}, je souhaite réserver une PS5 :`,
      `Nom : ${values.fullName}`,
      `Téléphone : ${values.phone}`,
      `Ville : ${values.city}`,
      `Adresse : ${values.address}`,
      `Date souhaitée : ${values.date}`,
      `Nombre de jours : ${days}`,
      `Pack : ${pack?.name ?? ""} — ${pricePerDay ?? ""} MAD/jour (${rateLabel})`,
      days > 1
        ? `Total estimé : ${total} MAD pour ${days} jours (tarif dégressif à confirmer par votre équipe)`
        : `Total estimé : ${total} MAD`,
      values.comment ? `Commentaire : ${values.comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.setTimeout(() => {
      setStatus("success");
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    }, 700);
  };

  if (status === "success") {
    return (
      <section id="reservation" className="relative scroll-mt-24 py-24 sm:py-32">
        <Container className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex flex-col items-center gap-4 rounded-[2rem] p-10 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle2 className="size-7 text-primary-light" aria-hidden />
            </span>
            <h3 className="text-2xl font-semibold text-white">Demande envoyée !</h3>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Votre demande de réservation a bien été préparée. Confirmez-la sur WhatsApp pour
              que notre équipe puisse la valider rapidement.
            </p>
            <Button
              href={whatsappHref()}
              variant="primary"
              size="lg"
              icon={MessageSquare}
              className="mt-2"
            >
              Ouvrir WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => {
                setValues(INITIAL_VALUES);
                setTouched({});
                setErrors({});
                setStatus("idle");
              }}
              className="cursor-pointer text-sm font-medium text-foreground-subtle underline-offset-4 hover:text-white hover:underline"
            >
              Faire une nouvelle réservation
            </button>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="reservation" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Réservation"
          title="Réservez votre PS5 en 2 minutes"
          description="Remplissez le formulaire ci-dessous, nous confirmons votre créneau dans les plus brefs délais."
        />

        <AnimateIn className="mx-auto w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass flex flex-col gap-6 rounded-[2rem] p-6 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Nom complet"
                htmlFor="fullName"
                error={touched.fullName ? errors.fullName : undefined}
              >
                <InputIcon icon={User} />
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  required
                  ref={(el) => {
                    fieldRefs.current.fullName = el;
                  }}
                  value={values.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  onBlur={() => handleBlur("fullName")}
                  className={inputClasses(Boolean(touched.fullName && errors.fullName))}
                  placeholder="Votre nom et prénom"
                />
              </Field>

              <Field
                label="Téléphone"
                htmlFor="phone"
                error={touched.phone ? errors.phone : undefined}
              >
                <InputIcon icon={Phone} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  ref={(el) => {
                    fieldRefs.current.phone = el;
                  }}
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={inputClasses(Boolean(touched.phone && errors.phone))}
                  placeholder="06 12 34 56 78"
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Ville" htmlFor="city" error={touched.city ? errors.city : undefined}>
                <InputIcon icon={MapPin} />
                <input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  ref={(el) => {
                    fieldRefs.current.city = el;
                  }}
                  value={values.city}
                  onChange={(e) => setField("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  className={inputClasses(Boolean(touched.city && errors.city))}
                  placeholder="Casablanca, Rabat…"
                />
              </Field>

              <Field
                label="Adresse complète"
                htmlFor="address"
                error={touched.address ? errors.address : undefined}
              >
                <InputIcon icon={MapPin} />
                <input
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                  ref={(el) => {
                    fieldRefs.current.address = el;
                  }}
                  value={values.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                  className={inputClasses(Boolean(touched.address && errors.address))}
                  placeholder="Rue, quartier, numéro…"
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Date souhaitée"
                htmlFor="date"
                error={touched.date ? errors.date : undefined}
              >
                <InputIcon icon={CalendarDays} />
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  ref={(el) => {
                    fieldRefs.current.date = el;
                  }}
                  value={values.date}
                  onChange={(e) => setField("date", e.target.value)}
                  onBlur={() => handleBlur("date")}
                  className={inputClasses(Boolean(touched.date && errors.date))}
                />
              </Field>

              <Field
                label="Nombre de jours"
                htmlFor="days"
                error={touched.days ? errors.days : undefined}
              >
                <InputIcon icon={CalendarRange} />
                <input
                  id="days"
                  name="days"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  step={1}
                  required
                  ref={(el) => {
                    fieldRefs.current.days = el;
                  }}
                  value={values.days}
                  onChange={(e) => setField("days", e.target.value)}
                  onBlur={() => handleBlur("days")}
                  className={inputClasses(Boolean(touched.days && errors.days))}
                  placeholder="1"
                />
              </Field>
            </div>

            <Field
              label="Pack choisi"
              htmlFor="packId"
              error={touched.packId ? errors.packId : undefined}
            >
              <select
                id="packId"
                name="packId"
                required
                ref={(el) => {
                  fieldRefs.current.packId = el;
                }}
                value={values.packId}
                onChange={(e) => setField("packId", e.target.value)}
                onBlur={() => handleBlur("packId")}
                className={cn(inputClasses(Boolean(touched.packId && errors.packId)), "pl-4 appearance-none")}
              >
                {PACKS.map((pack) => (
                  <option key={pack.id} value={pack.id} className="bg-background-elevated">
                    {pack.name} — {pack.weekdayPrice} MAD (Lun-Jeu) / {pack.weekendPrice} MAD
                    (Ven-Dim)
                  </option>
                ))}
              </select>
            </Field>

            {selectedPack && (
              <div className="-mt-2 flex flex-col gap-1.5 rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-foreground-muted">Prix estimé :</span>
                  <span className="font-semibold text-white">{estimatedPrice} MAD/jour</span>
                  {selectedDate ? (
                    <span className="text-xs text-foreground-subtle">
                      ({isWeekendDay(selectedDate) ? "tarif weekend" : "tarif semaine"})
                    </span>
                  ) : (
                    <span className="text-xs text-foreground-subtle">
                      (tarif semaine, choisissez une date pour confirmer)
                    </span>
                  )}
                </div>
                {selectedDays > 1 && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-foreground-muted">
                      Total pour {selectedDays} jours :
                    </span>
                    <span className="font-semibold text-primary-light">{estimatedTotal} MAD</span>
                    <span className="text-xs text-foreground-subtle">
                      (tarif dégressif possible, confirmé par notre équipe)
                    </span>
                  </div>
                )}
              </div>
            )}

            <Field label="Commentaire (optionnel)" htmlFor="comment">
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={values.comment}
                onChange={(e) => setField("comment", e.target.value)}
                className="w-full min-w-0 max-w-full box-border rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-foreground-subtle focus:border-primary-light/60 focus:bg-white/[0.05] focus:outline-none"
                placeholder="Jeux préférés, étage, code d'accès…"
              />
            </Field>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              className={cn("w-full", status === "submitting" && "opacity-80")}
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Envoi en cours…
                </span>
              ) : (
                "Réserver maintenant"
              )}
            </Button>
            <p className="text-center text-xs text-foreground-subtle">
              En réservant, votre demande sera transmise à notre équipe via WhatsApp pour
              confirmation.
            </p>
          </form>
        </AnimateIn>
      </Container>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative min-w-0">{children}</div>
      {error && (
        <p role="alert" aria-live="polite" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function InputIcon({ icon: Icon }: { icon: typeof User }) {
  return (
    <Icon
      className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground-subtle"
      aria-hidden
    />
  );
}

function inputClasses(hasError: boolean) {
  return cn(
    "h-12 w-full min-w-0 max-w-full box-border rounded-2xl border bg-white/[0.03] pl-11 pr-4 text-sm text-white placeholder:text-foreground-subtle transition-colors focus:outline-none",
    hasError
      ? "border-danger/70 focus:border-danger"
      : "border-border focus:border-primary-light/60 focus:bg-white/[0.05]",
  );
}
