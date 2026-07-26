const BANNER_SRC_DESKTOP =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1784752581/Gemini_Generated_Image_qogombqogombqogo_xqpcfk.png";

const BANNER_SRC_MOBILE =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1785066329/Gemini_Generated_Image_rt9xtrt9xtrt9xtr_dqrb99.png";

const BANNER_ALT = "PlayStation 5 et manette DualSense — location à domicile au Maroc";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Invisible heading kept for SEO/accessibility — visual title removed per design. */}
      <h1 className="sr-only">
        Transformez votre journée en expérience gaming ultime — Location PlayStation 5 à domicile
        au Maroc
      </h1>

      {/* Banner: full width, natural aspect ratio, never cropped, starts below the fixed header.
          A dedicated crop is used on mobile. */}
      <div className="relative pt-[85px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BANNER_SRC_MOBILE} alt={BANNER_ALT} className="block h-auto w-full sm:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER_SRC_DESKTOP}
          alt={BANNER_ALT}
          className="hidden h-auto w-full sm:block"
        />
      </div>
    </section>
  );
}
