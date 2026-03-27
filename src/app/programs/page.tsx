import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Sparkles,
  Rocket,
  Heart,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-transparent px-6 py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Program Unggulan</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Program-Program
            <span className="block text-primary">HIMAFI ITB</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Berbagai program andalan yang telah kami kembangkan untuk mendukung
            pengembangan akademik, keprofesian, dan pengabdian masyarakat
          </p>
        </div>
      </section>

      {/* Image Grid Teaser */}
      <section className="px-6 pb-12 md:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Card
                key={program.title}
                className="group overflow-hidden border-border/50 p-0"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-sm font-semibold text-white">
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

      {/* Program Sections - Alternating Layout */}
      {programs.map((program, index) => {
        const isEven = index % 2 === 0;

        return (
          <section
            key={program.title}
            className={`px-6 py-16 md:px-20 ${!isEven ? "bg-muted/30" : ""}`}
          >
            <div className="mx-auto max-w-6xl">
              <div
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  !isEven ? "md:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <div className={`${!isEven ? "md:order-2" : ""}`}>
                  <Card className="group overflow-hidden border-border/50 p-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-30`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Content */}
                <div className={`space-y-5 ${!isEven ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-xs text-primary"
                    >
                      {program.badgeLabel}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">{program.title}</h2>
                    {program.subtitle && (
                      <p className="mt-1.5 text-sm font-medium text-primary">
                        {program.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
