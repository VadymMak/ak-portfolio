// ========== BOOK GALLERY DATA ==========

export interface GalleryItem {
  type: 'image' | 'video';
  thumb: string;
  full: string;
  webm?: string;
  mp4?: string;
  alt: string;
}

export interface BookData {
  id: string;
  titleKey: string;
  gridLayout: 'default' | 'winter' | 'sigurd';
  items: GalleryItem[];
}

// Helper: single image
function img(folder: string, num: string, label: string, flat = false): GalleryItem {
  const base = `/gallery/books/${folder}`;
  return {
    type: 'image',
    thumb: flat ? `${base}/thumb_${num}.webp` : `${base}/thumb/thumb_${num}.webp`,
    full: flat ? `${base}/full_${num}.webp` : `${base}/full/full_${num}.webp`,
    alt: `${label} - ${num}`,
  };
}

// Helper: single video
function vid(folder: string, num: string, label: string): GalleryItem {
  const base = `/gallery/books/${folder}`;
  return {
    type: 'video',
    thumb: `${base}/thumb/thumb_${num}.webp`,
    full: `${base}/full/full_${num}.webp`,
    webm: `${base}/video/video_${num}.webm`,
    mp4: `${base}/video/video_${num}.mp4`,
    alt: `${label} - Video ${num}`,
  };
}

// Helper: range of images
function imgs(folder: string, count: number, label: string, flat = false): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => img(folder, String(i + 1).padStart(2, '0'), label, flat));
}

export const booksData: BookData[] = [
  {
    id: 'nutcracker',
    titleKey: 'nutcracker',
    gridLayout: 'default',
    items: imgs('nutcracker', 6, 'Nutcracker', true),
  },
  {
    id: 'wild-swans',
    titleKey: 'wildSwans',
    gridLayout: 'default',
    items: imgs('swans', 6, 'Wild Swans'),
  },
  {
    id: 'winter-adventures',
    titleKey: 'winterAdventures',
    gridLayout: 'winter',
    items: imgs('winter-adventures', 10, 'Winter Adventures'),
  },
  {
    id: 'magic-world',
    titleKey: 'magicWorld',
    gridLayout: 'default',
    items: imgs('magic-world', 6, 'Magic World'),
  },
  {
    id: 'sigurd',
    titleKey: 'sigurd',
    gridLayout: 'sigurd',
    // 6 images + 2 videos = 8 items, videos interleaved
    items: [
      img('sigurd', '01', 'Sigurd'),
      img('sigurd', '03', 'Sigurd'),
      vid('sigurd', '02', 'Sigurd'),
      img('sigurd', '04', 'Sigurd'),
      img('sigurd', '05', 'Sigurd'),
      vid('sigurd', '06', 'Sigurd'),
      img('sigurd', '02', 'Sigurd'),
      img('sigurd', '06', 'Sigurd'),
    ],
  },
  {
    id: 'sea-secrets',
    titleKey: 'seaSecrets',
    gridLayout: 'default',
    // 9 items: 6 images + 3 videos (matching v1)
    items: [
      vid('sea-secrets', '01', 'Sea creatures sketches'),
      img('sea-secrets', '02', 'Whale and octopus spread'),
      img('sea-secrets', '03', 'Turtle and starfish spread'),
      img('sea-secrets', '10', 'Book mockup'),
      vid('sea-secrets', '05', 'Book mockup angle'),
      img('sea-secrets', '06', 'Hammerhead and rays'),
      img('sea-secrets', '07', 'Pufferfish and eel'),
      img('sea-secrets', '08', 'Turtle and pearl'),
      vid('sea-secrets', '09', 'Starfish spread'),
    ],
  },
];