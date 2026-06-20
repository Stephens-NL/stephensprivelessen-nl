import {
    hboWoOnlinePackages,
    hboWoPhysicalPackages,
    voOnlinePackages,
    voPhysicalPackages,
} from './pricingData';

export interface SubjectNote {
    subject: string;
    noteUrl: string;
}

export interface PricingTier {
    level: string;
    prices: {
        duration: string;
        price: string;
    }[];
}

export interface GroupPricingTier {
    level: string;
    prices: {
        students: number;
        duration: string;
        price: string;
    }[];
}

// --- Helpers to derive display tiers from pricingData (single source of truth) ---

type PackageEntry = { students: number; packagePrice: number; pricePerPerson: number };

/** Format a single pricing tier entry for the pricingTiers display. */
function formatTierPrice(pkg: PackageEntry, studentLabel: string, studentsLabel: string): { duration: string; price: string } {
    const label = pkg.students === 1 ? studentLabel : studentsLabel;
    const price = pkg.students === 1
        ? `€${pkg.packagePrice}`
        : `€${pkg.packagePrice} (€${pkg.pricePerPerson} p.p.)`;
    return { duration: `4 uur · ${pkg.students} ${label}`, price };
}

function buildPricingTier(level: string, packages: PackageEntry[], studentLabel: string, studentsLabel: string): PricingTier {
    return {
        level,
        prices: packages.map(pkg => formatTierPrice(pkg, studentLabel, studentsLabel)),
    };
}

/** Build a group pricing tier showing per-person prices, with "—" for unavailable slots. */
function buildGroupPricingTier(level: string, packages: PackageEntry[], maxStudents: number): GroupPricingTier {
    return {
        level,
        prices: Array.from({ length: maxStudents }, (_, i) => {
            const pkg = packages.find(p => p.students === i + 1);
            return {
                students: i + 1,
                duration: "4 uur",
                price: pkg ? `€${pkg.pricePerPerson}` : "—",
            };
        }),
    };
}

function buildEmptyGroupTier(level: string, studentCount: number): GroupPricingTier {
    return {
        level,
        prices: Array.from({ length: studentCount }, (_, i) => ({
            students: i + 1,
            duration: "4 uur",
            price: "—",
        })),
    };
}

// Pricing tiers — derived from pricingData.ts package arrays.
// HBO/WO tiers show up to 3 students; VO tiers show up to 4 students.
export const pricingTiers: PricingTier[] = [
    buildPricingTier("Hoger Onderwijs — Online", hboWoOnlinePackages.slice(0, 3), "student", "studenten"),
    buildPricingTier("Hoger Onderwijs — Fysiek", hboWoPhysicalPackages.slice(0, 3), "student", "studenten"),
    buildPricingTier("Voortgezet Onderwijs — Online", voOnlinePackages, "leerling", "leerlingen"),
    buildPricingTier("Voortgezet Onderwijs — Fysiek", voPhysicalPackages, "leerling", "leerlingen"),
];

// Group pricing tiers — derived from pricingData.ts package arrays.
// "Losse sessie" tiers show "—" for all slots (no longer offered).
// "4-uurs pakket" tiers show per-person prices from the online packages.
// HBO/WO 4-student slot shows "—" (not offered for higher education).
export const groupPricingTiers: GroupPricingTier[] = [
    buildEmptyGroupTier("Hoger Onderwijs", 4),
    buildGroupPricingTier("Hoger Onderwijs 4-uurs pakket", hboWoOnlinePackages.slice(0, 3), 4),
    buildEmptyGroupTier("Voortgezet Onderwijs (20-)", 4),
    buildGroupPricingTier("Voortgezet Onderwijs (20-) 4-uurs pakket", voOnlinePackages, 4),
];

// Re-export structural/config values that were previously here.
// Source of truth is now data/config.ts; these re-exports ease future callers.
export { contactLinks, SHOW_NOTE_PREVIEWS } from './config';
