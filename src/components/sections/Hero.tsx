const BANNER_SRC =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1784752581/Gemini_Generated_Image_qogombqogombqogo_xqpcfk.png";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Invisible heading kept for SEO/accessibility — visual title removed per design. */}
      <h1 className="sr-only">
        Transformez votre journée en expérience gaming ultime — Location PlayStation 5 à domicile
        au Maroc
      </h1>

      {/* Banner: full width, natural aspect ratio, never cropped, starts below the fixed header. */}
      <div className="relative pt-[85px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER_SRC}
          alt="PlayStation 5 et manette DualSense — location à domicile au Maroc"
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
