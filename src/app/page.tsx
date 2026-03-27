import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { HydrateClient } from "~/trpc/server";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Book02Icon,
  Calendar03Icon,
  MapPinHouseIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const misiList = [
  "Meningkatkan efisiensi dan efektivitas pemenuhan kebutuhan akademik massa dan menginisiasi pengintegrasian sistem dengan pemenuhan kebutuhan dasar lainnya.",
  "Menciptakan lingkungan sosial yang positif dan suportif untuk mendorong peningkatan kesehatan mental massa.",
  "Mewadahi pemenuhan dan penyaluran kebutuhan finansial secara tepat.",
  "Menyediakan wadah pengembangan massa, baik keprofesian, maupun kepribadian, dengan menciptakan lingkungan yang memiliki budaya belajar.",
  "Mengefektifkan dan merelevansikan keorganisasian HIMAFI ITB dengan menginisiasi perubahan hukum dasar dan mewujudkan birokrasi kepengurusan yang lebih optimal, partisipatif-inklusif, akuntabel, dan transparan.",
  "Meningkatkan keberdampakan HIMAFI ITB dengan koordinasi antar badan dalam HIMAFI ITB serta kolaborasi dengan lembaga eksternal.",
  "Memulihkan citra HIMAFI ITB dengan optimalisasi strategi branding digital dan branding non-digital.",
  "Mewadahi pengimplementasian kemampuan dan ilmu massa HIMAFI ITB melalui penelitian, pengabdian masyarakat, dan kewirausahaan.",
];

const valuesList = [
  {
    name: "Normatif",
    description:
      "Berpegang teguh pada norma dan adab sebagai fondasi setiap gerak dan pembelajaran.",
  },
  {
    name: "Apresiatif",
    description:
      "Keluarga yang saling menghargai dan menguatkan setiap proses bertumbuh.",
  },
  {
    name: "Kolektif",
    description:
      "Keluarga yang bersinergi dalam keberagaman untuk tujuan bersama.",
  },
  {
    name: "Adaptif",
    description:
      "Responsif dan inovatif dalam menghadapi perubahan agar tetap relevan dan berkelanjutan.",
  },
  {
    name: "Mandiri",
    description:
      "Berdiri tegak dengan daya tahan dan kemandirian di tengah dinamika.",
  },
  {
    name: "Akuntabel",
    description:
      "Transparan dan bertanggung jawab dalam setiap keputusan dan tindakan.",
  },
];

const galleryImages = [
  { src: "/program-unggulan-assets/eureka.avif", alt: "Eureka HIMAFI ITB" },
  {
    src: "/program-unggulan-assets/hlkk.avif",
    alt: "Pengabdian Masyarakat",
  },
  {
    src: "/program-unggulan-assets/is.avif",
    alt: "Intellektuelle Schule",
  },
  {
    src: "/program-unggulan-assets/reactor.avif",
    alt: "Kunjugan Baker Hughes",
  },
];
export default async function HomePage() {
  return (
    <HydrateClient>
      <main className="bg-background text-foreground">
        <section className="relative isolate overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(140%_80%_at_10%_0%,hsl(var(--primary)/0.2),transparent_55%),radial-gradient(120%_80%_at_90%_20%,hsl(var(--accent)/0.5),transparent_50%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-primary/10 to-transparent" />

          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="animate-fade-up space-y-8">
              <Badge className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-lg font-semibold tracking-[0.16em] text-primary md:text-xl">
                Gruß Gott!
              </Badge>

              <div className="space-y-4">
                <div className="space-y-2 pb-16 md:pb-32">
                  <p className="text-2xl font-bold uppercase tracking-[0.14em] text-primary/85">
                    Selamat Datang di
                  </p>
                  <p className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                    HIMPUNAN MAHASISWA FISIKA ITB
                  </p>
                  <p className="max-w-2xl text-xl font-semibold leading-7 text-foreground/75 md:text-2xl">
                    Sejak 1967 hingga konsep ruang dan waktu tak lagi berlaku
                  </p>
                </div>
                <h1 className="max-w-3xl text-2xl font-extrabold leading-[1.08] tracking-tight md:text-3xl lg:text-4xl">
                  Ruang belajar, ruang bertumbuh, ruang berdampak.
                </h1>
                <p className="max-w-2xl text-lg font-semibold leading-9 text-foreground/85 md:text-xl">
                  Himpunan Mahasiswa Fisika ITB hadir sebagai rumah kolektif
                  bagi mahasiswa untuk berkembang secara akademik, sosial, dan
                  keorganisasian sejak 1967.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="group rounded-full px-6 text-base font-bold"
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2"
                  >
                    Tentang HIMAFI
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={18}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-primary/40 px-6 text-base font-bold"
                >
                  <Link
                    href="https://maps.app.goo.gl/pokbnABzUvbYWMtt6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kunjungi Sekretariat
                  </Link>
                </Button>
              </div>

              
            </div>

            <div className="animate-fade-up rounded-3xl border border-primary/30 bg-card/90 p-6 shadow-xl shadow-primary/10 backdrop-blur-sm [animation-delay:180ms]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Badan Pengurus 2025/2026
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                NAKAMA
              </h2>
              <p className="mt-3 text-lg font-semibold leading-8 text-foreground/85">
                HIMAFI ITB yang terus belajar dan berdampak dengan pergerakan
                kolektif-integratif.
              </p>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/75">
                  Fokus Utama
                </p>
                <ul className="space-y-2 text-base font-medium text-foreground/85">
                  <li className="rounded-xl bg-muted/50 px-3 py-2.5">
                    Ekosistem akademik yang makin relevan dan suportif
                  </li>
                  <li className="rounded-xl bg-muted/50 px-3 py-2.5">
                    Kesehatan mental, finansial, dan budaya belajar massa
                  </li>
                  <li className="rounded-xl bg-muted/50 px-3 py-2.5">
                    Dampak eksternal melalui riset, pengmas, dan kolaborasi
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Tentang
              </p>
              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                Komunitas fisika yang menghidupkan ilmu melalui karya dan aksi.
              </h2>
              <Button
                asChild
                variant="ghost"
                className="w-fit rounded-full px-0 text-base font-bold text-primary hover:bg-transparent hover:text-primary/80"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  Lihat profil lengkap
                  <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                </Link>
              </Button>
            </div>

            <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/35 p-6">
              <p className="text-lg font-medium leading-9 text-foreground/85">
                HIMAFI ITB yang eksis sejak 6 Mei 1967 merupakan organisasi
                kemahasiswaan berupa himpunan mahasiswa jurusan di lingkup
                Institut Teknologi Bandung yang, secara lebih khusus,
                dilatarbelakangi oleh bidang keilmuan fisika, yang bertujuan
                ikut membantu dan membina terbentuknya sarjana fisika yang
                jujur, pandai, berharga diri, dan mempunyai integritas terhadap
                bangsa dan negara Indonesia.
              </p>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
                    Nilai Dasar
                  </p>
                  <p className="mt-2 text-lg font-bold leading-8">
                    Normatif dan Apresiatif
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
                    Gerak Organisasi
                  </p>
                  <p className="mt-2 text-lg font-bold leading-8">
                    Kolektif, Adaptif, Akuntabel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/25 px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="flex sm:flex-col justify-between gap-5 border-b border-border/50 pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  BP 2025/2026
                </p>
                <h2 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
                  Arah kolektif NAKAMA
                </h2>
              </div>
              <p className="max-w-xl text-lg font-medium leading-9 text-foreground/85">
                Menjaga semangat belajar berkelanjutan dan memperluas
                keberdampakan HIMAFI ITB melalui sinergi internal dan eksternal.
              </p>
            </div>

            <Card className="border-primary/20 bg-card/90">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium leading-9 text-foreground/85">
                  &ldquo;HIMAFI ITB yang terus belajar dan berdampak dengan
                  pergerakan kolektif-integratif&rdquo;
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/90">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-3 text-foreground/85 md:grid-cols-2">
                  {misiList.map((misi, index) => (
                    <li
                      key={misi}
                      className="rounded-xl flex flex-row  bg-background/70  text-base font-medium leading-8"
                    >
                      <div className=" p-4 flex items-center justify-center rounded-l-xl bg-primary/15 text-lg font-extrabold text-primary">
                        {index + 1}
                      </div>
                      <div className="p-4">
                      {misi}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <div>
              <h3 className="mb-4 text-5xl font-bold">Nilai-Nilai Kami</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {valuesList.map((value, index) => (
                  <Card key={value.name} className="bg-muted/60">
                    <CardHeader
                      className={cn(
                        index % 2 === 0 ? "bg-primary/[0.2]" : "bg-muted",
                        "rounded-t-xl",
                      )}
                    >
                      <CardTitle className="text-xl font-bold">
                        {value.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent >
                      <p className=" pt-4 text-base font-medium leading-8 text-foreground/85 ">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex sm:flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                  Galeri
                </p>
                <h2 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
                  Potret perjalanan HIMAFI ITB
                </h2>
              </div>
              <p className="max-w-md text-lg font-medium leading-8 text-foreground/85">
                Dokumentasi kegiatan yang merepresentasikan semangat belajar,
                kolaborasi, dan kontribusi HIMAFI ITB.
              </p>
            </div>

            <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
              {galleryImages.map((image, index) => (
                <article
                  key={image.src}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-primary/20 shadow-sm transition-all duration-500 hover:-translate-y-1 ",
                    index === 0 && "md:col-span-2 md:row-span-2",
                    index === 3 && "md:col-span-2",
                  )}
                >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-base font-bold text-white">
                        {image.alt}
                      </p>
                    </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-14 md:px-10 md:py-20">
          <h2 className="mb-8 text-center text-4xl font-bold leading-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-card/75 p-3"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-bold leading-8">
                Apa itu HIMAFI ITB?
              </AccordionTrigger>
              <AccordionContent className="text-base font-medium leading-8 text-foreground/85">
                HIMAFI ITB adalah himpunan mahasiswa jurusan di lingkup Institut
                Teknologi Bandung dengan bidang keilmuan fisika.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-bold leading-8">
                Sejak kapan HIMAFI ITB berdiri?
              </AccordionTrigger>
              <AccordionContent className="text-base font-medium leading-8 text-foreground/85">
                HIMAFI ITB telah eksis sejak 6 Mei 1967.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-bold leading-8">
                Di mana sekretariat HIMAFI ITB?
              </AccordionTrigger>
              <AccordionContent className="text-base font-medium leading-8 text-foreground/85">
                Sisi Timur Gedung Fisika ITB, Jl. Ganesa No. 10 Coblong, Kota
                Bandung, Jawa Barat, Indonesia 40132.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Let&apos;s Connect!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-lg font-medium leading-8 text-foreground/85">
                <p className="leading-8">
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  himafi_itb@km.itb.ac.id
                </p>
                <p className="leading-8">
                  <span className="font-medium text-foreground">
                    Instagram:
                  </span>{" "}
                  @himafi.itb
                </p>
                <p className="leading-8">
                  <span className="font-medium text-foreground">X:</span>{" "}
                  @HIMAFI_ITB
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="https://www.instagram.com/himafi.itb"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram HIMAFI ITB"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://x.com/HIMAFI_ITB"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X HIMAFI ITB"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Lokasi Sekretariat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg font-medium leading-8 text-foreground/85">
                <p className="leading-8">Sisi Timur Gedung Fisika ITB</p>
                <p className="leading-8">Jl. Ganesa No. 10 Coblong</p>
                <p className="leading-8">
                  Kota Bandung, Jawa Barat, Indonesia 40132
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-base font-bold"
                >
                  <Link
                    href="https://maps.app.goo.gl/pokbnABzUvbYWMtt6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka di Google Maps
                  </Link>
                </Button>
              </CardContent>
            </Card>            
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
