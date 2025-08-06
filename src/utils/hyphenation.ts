/**
 * Utility functions for text hyphenation
 */

/**
 * Add soft hyphens to long words for better text wrapping
 * This provides a fallback when CSS hyphens don't work
 */
export function addSoftHyphens(text: string): string {
  // Add soft hyphen (&shy;) after every 4-6 characters in long words
  return text.replace(/(\w{4,})/g, (word) => {
    if (word.length <= 8) return word;

    // For words longer than 8 characters, add soft hyphens
    const chars = word.split("");
    const result: string[] = [];

    for (let i = 0; i < chars.length; i++) {
      result.push(chars[i]!);
      // Add soft hyphen every 4-5 characters, but not at the end
      if ((i + 1) % 4 === 0 && i < chars.length - 3) {
        result.push("&shy;");
      }
    }

    return result.join("");
  });
}

/**
 * Common Indonesian long words with pre-defined hyphenation points
 */
export const indonesianHyphenation: Record<string, string> = {
  pembelajaran: "pem&shy;bel&shy;aj&shy;ar&shy;an",
  pembangunan: "pem&shy;bang&shy;un&shy;an",
  keberhasilan: "ke&shy;ber&shy;ha&shy;sil&shy;an",
  pertumbuhan: "per&shy;tum&shy;buh&shy;an",
  pengembangan: "peng&shy;em&shy;bang&shy;an",
  pemrograman: "pem&shy;prog&shy;ram&shy;an",
  komputer: "kom&shy;pu&shy;ter",
  universitas: "uni&shy;ver&shy;si&shy;tas",
  mahasiswa: "ma&shy;ha&shy;sis&shy;wa",
  kemampuan: "ke&shy;mam&shy;pu&shy;an",
  organisasi: "or&shy;ga&shy;ni&shy;sa&shy;si",
  komunikasi: "ko&shy;mu&shy;ni&shy;ka&shy;si",
  information: "in&shy;for&shy;ma&shy;tion",
  technology: "tech&shy;nol&shy;o&shy;gy",
  management: "man&shy;age&shy;ment",
  development: "de&shy;vel&shy;op&shy;ment",
  programming: "pro&shy;gram&shy;ming",
  application: "ap&shy;pli&shy;ca&shy;tion",
  documentation: "doc&shy;u&shy;men&shy;ta&shy;tion",
};

/**
 * Process text content to add hyphenation
 */
export function processTextForHyphenation(html: string): string {
  let processed = html;

  // First, try to replace known words with hyphenated versions
  Object.entries(indonesianHyphenation).forEach(([word, hyphenated]) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    processed = processed.replace(regex, hyphenated);
  });

  // Then add soft hyphens to remaining long words
  // Only process text nodes, not HTML tags
  processed = processed.replace(/>([^<]+)</g, (match, text) => {
    return `>${addSoftHyphens(String(text))}<`;
  });

  return processed;
}
