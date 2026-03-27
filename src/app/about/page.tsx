import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Award02Icon,
  Crown02Icon,
  Globe02Icon,
  Group01Icon,
  Heart,
  Idea01Icon,
  Shield01Icon,
  SparklesIcon,
  Target03Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";

const visionMission = {
  visions: [
    "Civil society; tatanan masyarakat yang memiliki nilai aspiratif, partisipatif, mandiri, non-hegemoni dan beretika",
    "Demokrasi dan hukum diatas kekuasaan politik",
    "Kemampuan berkompetisi dan berkeadilan sosial",
  ],
  missions: [
    "Menciptakan sarjana Fisika ITB yang jujur, profesional, berdedikasi dan berintegritas terhadap bangsa dan negara.",
    "Turut membangun civitas akademika ITB sebagai institusi pendidikan dan sosial budaya.",
    "Berkontribusi dalam pemberdayaan masyarakat menuju masyarakat madani yang berkesejahteraan sosial.",
  ],
};

const visionMissionBP = {
  vision:
    "HIMAFI ITB yang terus belajar dan berdampak dengan pergerakan kolektif-integratif",
  missions: [
    "Meningkatkan efisiensi dan efektivitas pemenuhan kebutuhan akademik massa dan menginisiasi pengintegrasian sistem dengan pemenuhan kebutuhan dasar lainnya.",
    "Menciptakan lingkungan sosial yang positif dan suportif untuk mendorong peningkatan kesehatan mental massa.",
    "Mewadahi pemenuhan dan penyaluran kebutuhan finansial secara tepat.",
    "Menyediakan wadah pengembangan massa, baik keprofesian, maupun kepribadian, dengan menciptakan lingkungan yang memiliki budaya belajar.",
    "Mengefektifkan dan merelevansikan keorganisasian HIMAFI ITB dengan menginisiasi perubahan hukum dasar dan mewujudkan birokrasi kepengurusan yang lebih optimal, partisipatif-inklusif, akuntabel, dan transparan.",
    "Meningkatkan keberdampakan HIMAFI ITB dengan koordinasi antar badan dalam HIMAFI ITB serta kolaborasi dengan lembaga eksternal.",
    "Memulihkan citra HIMAFI ITB dengan optimalisasi strategi branding digital dan branding non-digital.",
    "Mewadahi pegimplementasian kemampuan dan ilmu massa HIMAFI ITB melalui penelitian, pengabdian masyarakat, dan kewirausahaan.",
  ],
};

const values: Array<{
  icon: IconSvgElement;
  title: string;
  description: string;
}> = [
  {
    icon: Heart,
    title: "Kekeluargaan",
    description:
      "Membangun ikatan yang kuat dan saling mendukung antar anggota.",
  },
  {
    icon: Idea01Icon,
    title: "Inovasi",
    description:
      "Mendorong kreativitas dan pemikiran out-of-the-box dalam setiap kegiatan.",
  },
  {
    icon: Award02Icon,
    title: "Prestasi",
    description:
      "Berusaha mencapai excellence dalam bidang akademik dan non-akademik.",
  },
  {
    icon: Globe02Icon,
    title: "Kontribusi",
    description:
      "Memberikan dampak positif bagi lingkungan dan masyarakat sekitar.",
  },
];

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

const board = {
  president: { name: "Rafiq Althaf R. Harjadinata", nim: "10222055" },
  secretariat: {
    generalSecretary: { name: "Huwaida Badia Abidin", nim: "10222062" },
    headOfSecretary: { name: "Sekar Ayu Widhastri", nim: "10222020" },
    headOfTreasurer: { name: "Nasya Nabila", nim: "10222112" },
    headOfHE: { name: "Fauzan Akbar Ramadhan", nim: "10222114" },
    headOfOC: { name: "Al Farabi Haikal", nim: "10222086" },
  },
  ministries: [
    {
      name: "Kementerian Human Capital",
      minister: { name: "Alfatchurrachman", nim: "10222092" },
      roles: [
        {
          title: "Kepala Regenerasi",
          name: "Arya Abhyasa Wicaksana",
          nim: "10222061",
        },
        {
          title: "Wakil Kepala Regenerasi",
          name: "Rizanti Heningtyas",
          nim: "10222097",
        },
        {
          title: "Kepala Manajemen SDM",
          name: "Melinda Alberta",
          nim: "10222066",
        },
        {
          title: "Kepala Pengembangan SDM",
          name: "M. Nauval Ar-Rauf",
          nim: "10222035",
        },
        {
          title: "Direktur Kreatif & Branding",
          name: "Muhammad Kamal",
          nim: "10222087",
        },
      ],
    },
    {
      name: "Kementerian Kesejahteraan Mahasiswa",
      minister: { name: "Afrah Damara Yani", nim: "10222049" },
      roles: [
        {
          title: "Kepala Kebutuhan Dasar",
          name: "Mulyadi Prasojo",
          nim: "10222053",
        },
        {
          title: "Kepala Akademik",
          name: "Nadhim Muqsith Rabbani",
          nim: "10222079",
        },
        {
          title: "Wakil Kepala Akademik",
          name: "Muhammad Syamsuddiin",
          nim: "10223075",
        },
        {
          title: "Kepala KAE",
          name: "Kansha Ghaffaru Firmansyah",
          nim: "10222017",
        },
      ],
    },
    {
      name: "Kementerian Hubungan Masyarakat",
      minister: { name: "Misbahullaila", nim: "10222008" },
      roles: [
        {
          title: "Kepala Intrakampus",
          name: "Rafa Zahira Suhaila",
          nim: "10222107",
        },
        {
          title: "Kepala Ekstrakampus",
          name: "Raden Vio Brahmantyo",
          nim: "10223058",
        },
        {
          title: "Kepala Pengabdian Masyarakat",
          name: "Anggrita Naya Maulidina",
          nim: "10222047",
        },
      ],
    },
    {
      name: "Kementerian Karya dan Pengetahuan",
      minister: { name: "Elang Aditya Putra", nim: "10222006" },
      roles: [
        {
          title: "Kepala ARCADE",
          name: "Dietrich Pepalem Tarigan",
          nim: "10223037",
        },
        {
          title: "Kepala Riset & Kajian",
          name: "Ahmad Alfian Tri Saputro",
          nim: "10222050",
        },
        {
          title: "Kepala Kreasi & Inovasi",
          name: "Muhammad Fakhri Najmi",
          nim: "10222010",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_10%_0%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(100%_70%_at_90%_20%,hsl(var(--accent)/0.5),transparent_50%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Profil HIMAFI ITB
            </Badge>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Tentang HIMAFI ITB
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-9 text-foreground/85 md:text-xl">
              Wadah belajar dan berdampak bagi mahasiswa Fisika ITB dengan arah
              gerak akademik, sosial, dan organisasi yang kolektif.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="group rounded-full px-6 text-base font-bold"
              >
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2"
                >
                  Lihat Program Unggulan
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

          <Card className="border-primary/20 bg-card/90">
            <CardHeader>
              <CardTitle className="flex-row flex items-center gap-2 text-md">
                <div>
                <HugeiconsIcon
                  icon={Group01Icon}
                  size={50}
                  className="text-primary"
                /></div>
                HIMAFI ITB berdiri sejak 6 Mei 1967 sebagai rumah bersama
                mahasiswa fisika yang tumbuh dengan semangat akademik dan
                pengabdian.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base font-medium leading-8 text-foreground/85">
              <p>
                Orientasi geraknya mengacu pada Tri Dharma Perguruan Tinggi,
                dengan penekanan pada karakter anggota yang jujur, profesional,
                dan berdampak.
              </p>
              <p className="rounded-xl bg-muted/60 p-3 text-foreground/80">
                Basis nilai: aspiratif, partisipatif, mandiri, beretika, dan
                berkeadilan sosial.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Apa itu HIMAFI
            </p>
            <h2 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
              Organisasi mahasiswa fisika yang fokus pada kebutuhan dasar massa.
            </h2>
          </div>

          <Card className="border-primary/20 bg-card/90">
            <CardContent className="space-y-5 p-6 text-lg font-medium leading-9 text-foreground/85">
              <p>
                HIMAFI ITB dibentuk untuk membantu dan membina terbentuknya
                sarjana fisika yang jujur, pandai, berharga diri, dan memiliki
                integritas terhadap bangsa dan negara Indonesia.
              </p>
              <p>
                Sebagai organisasi sektoral di tingkat program studi, HIMAFI
                berfokus pada pemenuhan kebutuhan akademik, finansial,
                pengembangan diri, lingkungan sosial, dan aktualisasi keilmuan.
              </p>
              <ul className="space-y-2 rounded-xl border border-border/60 bg-muted/40 p-4 text-base font-semibold leading-8 text-foreground/80">
                <li>Pendidikan akademik fisika yang relevan bagi massa.</li>
                <li>Penyaluran dukungan finansial yang tepat sasaran.</li>
                <li>Wadah pengembangan diri sesuai profil mahasiswa ideal.</li>
                <li>Lingkungan sosial suportif untuk tumbuh bersama.</li>
                <li>Ruang aktualisasi diri berbasis keilmuan fisika.</li>
              </ul>
              <p className="text-sm font-medium leading-7 text-foreground/70">
                Referensi: AD/ART HIMAFI ITB (1981), Konsepsi KM ITB (2020), dan
                artikel Die&apos;s HIMAFI ITB ke-49.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Card className="border-primary/20 bg-card/90">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-3xl font-bold">
                <HugeiconsIcon
                  icon={Target03Icon}
                  size={24}
                  className="text-primary"
                />
                Visi & Misi HIMAFI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-2xl font-bold">Visi</h3>
                <div className="space-y-3">
                  {visionMission.visions.map((vision, index) => (
                    <div
                      key={vision}
                      className="grid grid-cols-[36px_1fr] items-start gap-3"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
                        {index + 1}
                      </span>
                      <p className="rounded-xl border border-border/60 bg-background/70 p-3 text-base font-medium leading-8 text-foreground/85">
                        {vision}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-bold">Misi</h3>
                <div className="space-y-3">
                  {visionMission.missions.map((mission, index) => (
                    <div
                      key={mission}
                      className="grid grid-cols-[36px_1fr] items-start gap-3"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
                        {index + 1}
                      </span>
                      <p className="rounded-xl border border-border/60 bg-background/70 p-3 text-base font-medium leading-8 text-foreground/85">
                        {mission}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                className="inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                href="https://medium.com/@himafiitb/die-s-himafi-itb-ke-49-6c876ceebacd"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sumber:
                medium.com/@himafiitb/die-s-himafi-itb-ke-49-6c876ceebacd
              </a>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/90">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-3xl font-bold">
                NAKAMA 2025/2026
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                  Visi Badan Pengurus
                </p>
                <p className="mt-2 rounded-xl border border-primary/30 bg-primary/[0.06] p-4 text-lg font-semibold leading-8 text-foreground/85">
                  &ldquo;{visionMissionBP.vision}&rdquo;
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-bold">Misi</h3>
                <ol className="space-y-2">
                  {visionMissionBP.missions.map((mission, index) => (
                    <li
                      key={mission}
                      className="grid grid-cols-[36px_1fr] items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-3"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-extrabold text-primary">
                        {index + 1}
                      </span>
                      <p className="text-base font-medium leading-8 text-foreground/85">
                        {mission}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Pondasi Kultural
            </p>
            <h2 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
              Nilai dan Program HIMAFI ITB
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-3xl font-bold">Nilai-Nilai Kami</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value) => (
                  <Card
                    key={value.title}
                    className="border-border/60 bg-card/90"
                  >
                    <CardContent className="space-y-3 p-5">
                      <HugeiconsIcon
                        icon={value.icon}
                        size={22}
                        className="text-primary"
                      />
                      <h4 className="text-xl font-bold">{value.title}</h4>
                      <p className="text-base font-medium leading-8 text-foreground/85">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-3xl font-bold">Program Kami</h3>
              <div className="space-y-3 overflow-y-scroll max-h-[70vh]">
                {programs.map((program) => (
                  <Card
                    key={program.title}
                    className="border-border/60 bg-card/90"
                  >
                    <CardContent className="space-y-4 p-5">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-50`}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xl font-bold">{program.title}</h4>
                          {program.subtitle && (
                            <p className="text-sm font-semibold leading-7 text-primary/90">
                              {program.subtitle}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className="border-primary/40 text-xs font-semibold text-primary"
                        >
                          {program.badgeLabel}
                        </Badge>
                      </div>
                      <p className="text-base font-medium leading-8 text-foreground/85">
                        {program.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Struktur Organisasi
            </p>
            <h2 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
              BP &ldquo;NAKAMA&rdquo; HIMAFI ITB 2025/2026
            </h2>
          </div>

          <Card className="border-primary/20 bg-card/90">
            <CardContent className="space-y-8 p-6">
              <div className="mx-auto max-w-md rounded-2xl border border-primary/30 bg-primary/[0.08] p-5 text-center">
                <HugeiconsIcon
                  icon={Crown02Icon}
                  size={24}
                  className="mx-auto text-primary"
                />
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-primary">
                  Presiden
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {board.president.name}
                </p>
                <p className="text-sm font-medium text-foreground/70">
                  {board.president.nim}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-bold">Sekretariat</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    {
                      title: "Sekretaris Jenderal",
                      ...board.secretariat.generalSecretary,
                    },
                    {
                      title: "Kepala Sekretariat",
                      ...board.secretariat.headOfSecretary,
                    },
                    {
                      title: "Kepala Bendahara",
                      ...board.secretariat.headOfTreasurer,
                    },
                    {
                      title: "Kepala Rumah Tangga & Kewirausahaan",
                      ...board.secretariat.headOfHE,
                    },
                    {
                      title: "Kepala Pengawas Organisasi",
                      ...board.secretariat.headOfOC,
                    },
                  ].map((person) => (
                    <Card
                      key={person.nim}
                      className="border-border/60 bg-background/80"
                    >
                      <CardContent className="space-y-1 p-4 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                          {person.title}
                        </p>
                        <p className="text-base font-bold leading-7">
                          {person.name}
                        </p>
                        <p className="text-sm font-medium text-foreground/70">
                          {person.nim}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-bold">Kementerian</h3>
                <div className="grid gap-5 lg:grid-cols-2">
                  {board.ministries.map((ministry) => (
                    <Card
                      key={ministry.name}
                      className="border-border/60 bg-background/80"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="inline-flex items-start gap-3 text-xl font-bold leading-8">
                          
                          <span>{ministry.name}</span>
                        </CardTitle>
                        <p className="text-sm font-medium text-foreground/75">
                          {ministry.minister.name} ({ministry.minister.nim})
                        </p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {ministry.roles.map((role) => (
                            <li
                              key={role.nim}
                              className="flex flex-col gap-1 rounded-xl border border-border/50 bg-muted/30 px-3 py-2"
                            >
                              <span className="text-sm font-semibold text-primary">
                                {role.title}
                              </span>
                              <span className="text-base font-medium leading-7 text-foreground/85">
                                {role.name} ({role.nim})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70">
                <img
                  src="/organogram-dark.png"
                  alt="Organogram HIMAFI ITB"
                  className="h-auto w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
