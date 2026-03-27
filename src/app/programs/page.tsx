import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Award02Icon,
  Book02Icon,
  Group01Icon,
  Rocket01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "EUREKA! ITB",
    subtitle: null as string | null,
    description:
      "EUREKA! ITB merupakan parade fisika nasional yang berisikan olimpiade fisika tingkat SMA/MA dan diseminasi fisika kepada khalayak umum khususnya para pelajar. Kegiatan ini bertujuan untuk mencerdaskan dan menggugah masyarakat Indonesia akan besarnya aplikasi ilmu fisika pada kehidupan.",
    image: "/program-unggulan-assets/eureka.avif",
    color: "from-amber-500/20 to-orange-600/20",
    badgeLabel: "Parade Fisika Nasional",
  },
  {
    title: "REACTOR",
    subtitle: "Roadmap to Exploring Advance Career Tracks in Physics",
    description:
      "Kegiatan keprofesian bagi massa HIMAFI berupa kunjungan ke suatu lembaga industri dan kegiatan lokakarya (workshop) untuk mempersiapkan peserta menuju dunia karir setelah lulus dari tahap sarjana. Pelatihan personal branding, building CV hingga company visit dan kolaborasi bersama alumni menjadi kegiatan utama dari rangkaian acara ini.",
    image: "/program-unggulan-assets/reactor.avif",
    color: "from-cyan-500/20 to-blue-600/20",
    badgeLabel: "Keprofesian & Karir",
  },
  {
    title: "HLKK",
    subtitle: "HIMAFI Lungsur ka Kampung",
    description:
      "Manifestasi bakti HIMAFI ITB kepada masyarakat melalui program pengabdian masyarakat, khususnya daerah sekitar Jawa Barat. Implementasi program ini terdiri dari beberapa tahap, yaitu survey dan social mapping, perancangan program/solusi, implementasi, evaluasi, publikasi, serta terminasi berupa laporan dan keberlanjutan.",
    image: "/program-unggulan-assets/hlkk.avif",
    color: "from-emerald-500/20 to-green-600/20",
    badgeLabel: "Pengabdian Masyarakat",
  },
  {
    title: "Intellektuelle Schule",
    subtitle: "Proses Penerimaan Anggota Baru",
    description:
      "Proses regenerasi anggota untuk menjamin keberlanjutan dan keberdampakan HIMAFI ITB. Anggota Muda HIMAFI ITB akan dididik dan dibina agar menjadi mahasiswa Fisika yang sesuai dengan nilai-nilai program studi Fisika ITB dan juga HIMAFI ITB. Kegiatan ini mengedepankan asas kebenaran ilmiah, berpikir kritis, dan kebersamaan dalam membangun suatu komunitas yang solid dan progresif.",
    image: "/program-unggulan-assets/is.avif",
    color: "from-violet-500/20 to-purple-600/20",
    badgeLabel: "Regenerasi Anggota",
  },
];

export default function ProgramsPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_75%_at_10%_0%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(110%_70%_at_90%_20%,hsl(var(--accent)/0.5),transparent_48%)]" />
        <div className="mx-auto  max-w-6xl gap-10 px-6 py-16 md:px-10 md:py-24  lg:items-center">
          <div className="space-y-6">
            <Badge className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Program Unggulan
            </Badge>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Program-Program HIMAFI ITB
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-9 text-foreground/85 md:text-xl">
              Pilar kegiatan yang memperkuat akademik, kesiapan karir,
              pengabdian masyarakat, dan regenerasi organisasi.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="group rounded-full px-6 text-base font-bold"
              >
                <Link href="/about" className="inline-flex items-center gap-2">
                  Tentang HIMAFI
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 text-base font-bold"
              >
                <Link href="/faq">Buka FAQ</Link>
              </Button>
            </div>
          </div>

          
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Card
                key={program.title}
                className="group overflow-hidden border-border/60 bg-card/90 p-0"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-base font-bold text-white">
                        {program.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {programs.map((program, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={program.title}
            className={`px-6 py-14 md:px-10 md:py-20 ${!isEven ? "bg-muted/25" : ""}`}
          >
            <div className="mx-auto max-w-6xl">
              <div
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  !isEven
                    ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                    : ""
                }`}
              >
                <Card className="group overflow-hidden border-border/60 bg-card/90 p-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-35`}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-5">
                  <Badge
                    variant="outline"
                    className="border-primary/40 text-sm font-semibold text-primary"
                  >
                    {program.badgeLabel}
                  </Badge>

                  <div>
                    <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                      {program.title}
                    </h2>
                    {program.subtitle && (
                      <p className="mt-2 text-lg font-semibold leading-8 text-primary/90">
                        {program.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-lg font-medium leading-9 text-foreground/85">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-muted/30 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/25 bg-card/90 p-8 text-center md:p-10">
          
          <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Program kuat lahir dari komunitas yang kuat
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-lg font-medium leading-9 text-foreground/85">
            Kenali lebih dekat nilai, struktur, dan arah gerak HIMAFI ITB untuk
            memahami bagaimana setiap program dirancang agar berdampak nyata.
          </p>
          <Button
            asChild
            className="group mt-6 rounded-full px-6 text-base font-bold"
          >
            <Link href="/about" className="inline-flex items-center gap-2">
              Lihat Profil Lengkap
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
