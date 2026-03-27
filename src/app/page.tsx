import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
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
  { src: "/program-unggulan-assets/eureka.avif", alt: "Kegiatan HIMAFI ITB" },
  {
    src: "/program-unggulan-assets/hlkk.avif",
    alt: "Dinamika kepengurusan HIMAFI ITB",
  },
  {
    src: "/program-unggulan-assets/is.avif",
    alt: "Kolaborasi antar elemen HIMAFI ITB",
  },
  {
    src: "/program-unggulan-assets/reactor.avif",
    alt: "Dokumentasi kegiatan massa HIMAFI ITB",
  },
];

export default async function HomePage() {
  return (
    <HydrateClient>
      <main className="bg-background text-foreground">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80 md:text-base">
              Gruss Gott!
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Selamat Datang di
              <br />
              Himpunan Mahasiswa Fisika ITB
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Sejak 1967 hingga konsep ruang dan waktu tak lagi berlaku.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <Link href="/about">Tentang HIMAFI</Link>
              </Button>
              <Button asChild variant="outline">
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
        </section>

        <section className="px-6 py-16 md:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Tentang HIMAFI ITB
            </h2>
            <p className="mt-6 text-justify text-muted-foreground md:text-lg">
              HIMAFI ITB yang eksis sejak 6 Mei 1967 merupakan organisasi
              kemahasiswaan berupa himpunan mahasiswa jurusan di lingkup
              Institut Teknologi Bandung yang, secara lebih khusus,
              dilatarbelakangi oleh bidang keilmuan fisika, yang bertujuan ikut
              membantu dan membina terbentuknya sarjana fisika yang jujur,
              pandai, berharga diri, dan mempunyai integritas terhadap bangsa
              dan negara Indonesia.
            </p>
          </div>
        </section>

        <section className="bg-muted/30 px-6 py-16 md:px-20">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Badan Pengurus HIMAFI ITB 2025/2026
              </h2>
              <p className="mt-3 text-xl font-semibold text-primary">
                &ldquo;NAKAMA&rdquo;
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  &ldquo;HIMAFI ITB yang terus belajar dan berdampak dengan
                  pergerakan kolektif-integratif&rdquo;
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
                  {misiList.map((misi) => (
                    <li key={misi}>{misi}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Value</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {valuesList.map((value) => (
                  <Card key={value.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{value.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Gallery
            </h2>
            <p className="mt-3 text-center text-muted-foreground">
              Kegiatan-kegiatan HIMAFI (foto-foto)
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {galleryImages.map((image) => (
                <Card key={image.src} className="overflow-hidden">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 10}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-4 py-16 md:px-20">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>Apa itu HIMAFI ITB?</AccordionTrigger>
              <AccordionContent>
                HIMAFI ITB adalah himpunan mahasiswa jurusan di lingkup Institut
                Teknologi Bandung dengan bidang keilmuan fisika.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Sejak kapan HIMAFI ITB berdiri?
              </AccordionTrigger>
              <AccordionContent>
                HIMAFI ITB telah eksis sejak 6 Mei 1967.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Di mana sekretariat HIMAFI ITB?
              </AccordionTrigger>
              <AccordionContent>
                Sisi Timur Gedung Fisika ITB, Jl. Ganesa No. 10 Coblong, Kota
                Bandung, Jawa Barat, Indonesia 40132.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="px-6 py-16 md:px-20">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Let&apos;s Connect!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  himafi_itb@km.itb.ac.id
                </p>
                <p>
                  <span className="font-medium text-foreground">
                    Instagram:
                  </span>{" "}
                  @himafi.itb
                </p>
                <p>
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

            <Card>
              <CardHeader>
                <CardTitle>Lokasi Sekretariat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>Sisi Timur Gedung Fisika ITB</p>
                <p>Jl. Ganesa No. 10 Coblong</p>
                <p>Kota Bandung, Jawa Barat, Indonesia 40132</p>
                <Button asChild variant="outline">
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

        <section className="bg-muted/20 px-6 py-10 md:px-20">
          <div className="mx-auto max-w-6xl">
            <h3 className="text-lg font-semibold">Referensi</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://www.mtiitb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  [1] https://www.mtiitb.com
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.suaragea.org/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  [2] https://www.suaragea.org/index.html
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <footer className="border-t bg-background">
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-20">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold">HIMAFI ITB</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gedung Fisika, Jl. Ganesha No. 10, Bandung
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tautan</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Tentang
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Kabar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Media Sosial</h3>
                <div className="mt-2 flex space-x-4">
                  <Link
                    href="https://www.instagram.com/himafi.itb"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://x.com/HIMAFI_ITB"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} HIMAFI ITB. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </HydrateClient>
  );
}
