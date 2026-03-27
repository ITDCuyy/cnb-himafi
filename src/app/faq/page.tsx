"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiSettingIcon,
  ArrowRight01Icon,
  Cancel01Icon,
  CreditCard,
  DatabaseZap,
  HelpCircleIcon,
  Instagram,
  Mail01Icon,
  Message01Icon,
  Search01Icon,
  SparklesIcon,
  Twitter,
} from "@hugeicons/core-free-icons";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  title: string;
  faqs: FaqItem[];
};

export default function FAQPage() {
  const faqCategories = useMemo<FaqCategory[]>(
    () => [
      {
        title: "HIMAFI ITB",
        faqs: [
          {
            question: "Apa itu HIMAFI ITB?",
            answer:
              "HIMAFI ITB adalah Himpunan Mahasiswa Fisika Institut Teknologi Bandung, organisasi kemahasiswaan yang mewadahi seluruh mahasiswa Program Studi Fisika ITB sebagai keluarga besar.",
          },
          {
            question: "Siapa saja yang dapat menjadi anggota HIMAFI ITB?",
            answer:
              "Semua mahasiswa aktif Program Studi Fisika ITB secara otomatis menjadi anggota HIMAFI ITB.",
          },
          {
            question: "Apa saja kegiatan rutin HIMAFI ITB?",
            answer:
              "HIMAFI ITB mengadakan berbagai kegiatan rutin seperti tutorial akademik (TUBAY), workshop, seminar, dan kegiatan sosial untuk mempererat hubungan antar mahasiswa.",
          },
        ],
      },
      {
        title: "Keanggotaan & Partisipasi",
        faqs: [
          {
            question:
              "Bagaimana cara bergabung dengan kepengurusan HIMAFI ITB?",
            answer:
              "Anda dapat bergabung melalui proses rekrutmen yang biasanya diadakan setiap tahun. Pantau pengumuman resmi di media sosial HIMAFI ITB.",
          },
          {
            question: "Apa keuntungan menjadi bagian dari HIMAFI ITB?",
            answer:
              "Anda dapat bertemu dan belajar dari senior-senior berprestasi, mengembangkan soft skill melalui berbagai kegiatan, dan memperluas jaringan di bidang fisika.",
          },
          {
            question: "Bagaimana cara mengetahui agenda HIMAFI ITB terbaru?",
            answer:
              "Ikuti media sosial resmi HIMAFI ITB atau hubungi mahasiswa senior terdekat untuk informasi terkini mengenai agenda dan kegiatan.",
          },
        ],
      },
      {
        title: "Kegiatan Akademik & Non-Akademik",
        faqs: [
          {
            question:
              "Apakah HIMAFI ITB menyelenggarakan kegiatan akademik seperti tutoring atau diskusi ilmiah?",
            answer:
              "Ya, HIMAFI ITB menyelenggarakan program TUBAY (Tutorial Bayar) dan berbagai diskusi ilmiah untuk membantu mahasiswa dalam bidang akademik.",
          },
          {
            question: "Apa saja acara yang diadakan HIMAFI ITB?",
            answer:
              "HIMAFI ITB mengadakan berbagai acara seperti EUREKA (event tahunan terbesar), workshop, seminar, kompetisi fisika, dan kegiatan sosial lainnya.",
          },
          {
            question:
              "Apakah HIMAFI ITB bekerja sama dengan himpunan atau institusi lain?",
            answer:
              "Ya, HIMAFI ITB aktif berkolaborasi dengan himpunan mahasiswa lain di ITB maupun institusi eksternal untuk berbagai kegiatan dan program.",
          },
          {
            question:
              "Bagaimana saya bisa ikut serta dalam lomba atau seminar yang diadakan HIMAFI ITB?",
            answer:
              "Informasi pendaftaran biasanya diumumkan melalui media sosial resmi HIMAFI ITB. Pantau terus untuk mendapatkan informasi terbaru.",
          },
        ],
      },
      {
        title: "Administratif & Layanan",
        faqs: [
          {
            question:
              "Bagaimana cara meminjam barang atau ruangan melalui HIMAFI?",
            answer:
              "Hubungi pengurus HIMAFI ITB terkait dan ajukan permohonan peminjaman sesuai dengan prosedur yang berlaku.",
          },
          {
            question:
              "Apakah HIMAFI menyediakan dokumen atau arsip kegiatan terdahulu?",
            answer:
              "HIMAFI ITB menyimpan arsip kegiatan. Untuk mengakses dokumen tertentu, silakan hubungi bagian kesekretariatan.",
          },
          {
            question:
              "Apakah HIMAFI menyediakan bantuan akademik atau advokasi mahasiswa?",
            answer:
              "Ya, HIMAFI ITB menyediakan berbagai bentuk bantuan akademik dan dapat membantu dalam hal advokasi mahasiswa jika diperlukan.",
          },
        ],
      },
    ],
    [],
  );

  const allQuestions = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => faq.question),
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (allQuestions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % allQuestions.length,
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [allQuestions.length]);

  const filteredCategories = useMemo(() => {
    if (!inputValue.trim()) return faqCategories;

    const searchTerm = inputValue.toLowerCase().trim();

    return faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm),
        ),
      }))
      .filter((category) => category.faqs.length > 0);
  }, [inputValue, faqCategories]);

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    const highlightedText = text.replace(
      regex,
      '<mark class="rounded bg-primary/25 px-1 text-primary">$1</mark>',
    );

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const isSearching = inputValue.trim().length > 0;
  const hasResults = filteredCategories.length > 0;

  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_75%_at_10%_0%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(110%_70%_at_90%_20%,hsl(var(--accent)/0.5),transparent_48%)]" />
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="space-y-6 text-center">
            <Badge className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Pusat Bantuan HIMAFI
            </Badge>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-9 text-foreground/85 md:text-xl">
              Jawaban cepat untuk pertanyaan paling umum tentang keanggotaan,
              kegiatan, dan layanan HIMAFI ITB.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                size={20}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-foreground/60"
              />

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  isFocused || inputValue ? "Cari pertanyaan..." : ""
                }
                className="h-14 rounded-2xl border-border/70 bg-card/90 pl-12 pr-12 text-base font-medium"
              />

              {inputValue && (
                <button
                  onClick={() => setInputValue("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/55 transition-colors hover:text-foreground"
                  aria-label="Hapus pencarian"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </button>
              )}

              {!isFocused && !inputValue && allQuestions.length > 0 && (
                <div className="pointer-events-none absolute left-12 right-4 top-1/2 h-6 -translate-y-1/2 overflow-hidden">
                  <div
                    className="transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateY(-${currentQuestionIndex * 24}px)`,
                    }}
                  >
                    {allQuestions.map((question, index) => (
                      <div
                        key={index}
                        className="flex h-6 items-center overflow-hidden text-sm font-medium text-foreground/60"
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {`Cari: \"${question}\"`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isSearching && (
              <p className="mt-4 text-center text-base font-medium leading-8 text-foreground/75">
                {hasResults ? (
                  <>
                    Ditemukan{" "}
                    {filteredCategories.reduce(
                      (total, category) => total + category.faqs.length,
                      0,
                    )}{" "}
                    hasil untuk{" "}
                    <span className="font-bold">&quot;{inputValue}&quot;</span>
                  </>
                ) : (
                  <>
                    Tidak ada hasil untuk{" "}
                    <span className="font-bold">&quot;{inputValue}&quot;</span>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl space-y-6">
          {!hasResults && isSearching ? (
            <Card className="border-primary/20 bg-card/90">
              <CardContent className="space-y-4 p-10 text-center">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={28}
                  className="mx-auto text-primary"
                />
                <h3 className="text-3xl font-bold">Tidak ada hasil</h3>
                <p className="mx-auto max-w-2xl text-lg font-medium leading-9 text-foreground/80">
                  Kami belum menemukan FAQ yang cocok dengan pencarian Anda.
                  Coba kata kunci lain atau kembali ke semua kategori.
                </p>
                <Button
                  onClick={() => setInputValue("")}
                  variant="outline"
                  className="rounded-full px-6 text-base font-bold"
                >
                  Hapus pencarian
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                className="border-primary/20 bg-card/90"
              >
                <CardHeader>
                  <CardTitle className="text-3xl font-bold leading-tight md:text-4xl">
                    {category.title}
                  </CardTitle>
                  <p className="text-base font-medium leading-8 text-foreground/75">
                    {isSearching
                      ? `${category.faqs.length} pertanyaan yang cocok`
                      : `Pertanyaan umum tentang ${category.title.toLowerCase()}`}
                  </p>
                </CardHeader>

                <CardContent>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`item-${categoryIndex}-${faqIndex}`}
                        className="rounded-xl border border-border/70 bg-background/75 px-4"
                      >
                        <AccordionTrigger className="py-4 text-left text-lg font-bold leading-8 hover:no-underline">
                          {isSearching
                            ? highlightText(faq.question, inputValue)
                            : faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-base font-medium leading-8 text-foreground/80">
                          {isSearching
                            ? highlightText(faq.answer, inputValue)
                            : faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      <section className="bg-muted/30 px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-primary/25 bg-card/90 p-8 text-center md:p-10">
          <HugeiconsIcon
            icon={Message01Icon}
            size={26}
            className="mx-auto text-primary"
          />
          <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Masih ada pertanyaan?
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-lg font-medium leading-9 text-foreground/85">
            Kalau belum menemukan jawaban yang dicari, kami siap membantu lewat
            media sosial atau email resmi HIMAFI ITB.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-6 text-base font-bold">
              <Link
                href="https://www.instagram.com/himafi.itb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <HugeiconsIcon icon={Instagram} size={18} />
                Follow Instagram
              </Link>
            </Button>

            <Button asChild className="rounded-full px-6 text-base font-bold">
              <Link
                href="https://x.com/HIMAFI_ITB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <HugeiconsIcon icon={Twitter} size={18} />
                Follow X
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 text-base font-bold"
            >
              <Link
                href="mailto:himafi_itb@km.itb.ac.id"
                className="inline-flex items-center gap-2"
              >
                <HugeiconsIcon icon={Mail01Icon} size={18} />
                Email Support
              </Link>
            </Button>
          </div>

          <Button
            asChild
            variant="ghost"
            className="mt-4 text-base font-bold text-primary hover:bg-transparent"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              Kembali ke Beranda
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
