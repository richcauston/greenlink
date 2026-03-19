import { TeeTime } from "@/types";
import { courses } from "./courses";

// Seeded PRNG to avoid hydration mismatches (server and client produce same values)
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateTeeTimes(): TeeTime[] {
  const teeTimes: TeeTime[] = [];
  const today = new Date();
  const rand = createSeededRandom(42);

  for (const course of courses) {
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(today);
      date.setDate(date.getDate() + dayOffset);
      const dateStr = date.toISOString().split("T")[0];

      // Generate tee times from 6:00 to 18:00
      const startHour = 6;
      const endHour = 18;
      const intervalMinutes = 8 + Math.floor(rand() * 5); // 8-12 min intervals

      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += intervalMinutes) {
          const timeStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

          // Random availability - some slots full, most available
          const spotsRemaining = rand() > 0.3 ? Math.floor(rand() * 4) + 1 : 0;

          // Price varies by time of day
          const [minPrice, maxPrice] = course.priceRange;
          let price: number;
          if (hour < 8) {
            price = minPrice + Math.floor((maxPrice - minPrice) * 0.4);
          } else if (hour < 12) {
            price = maxPrice - Math.floor(rand() * 15);
          } else if (hour < 15) {
            price = minPrice + Math.floor((maxPrice - minPrice) * 0.7);
          } else {
            price = minPrice + Math.floor(rand() * 20);
          }

          teeTimes.push({
            id: `${course.id}-${dateStr}-${timeStr}`,
            courseId: course.id,
            date: dateStr,
            time: timeStr,
            price,
            spotsRemaining,
            maxPlayers: 4,
            cartIncluded: course.amenities.includes("cart_included"),
          });
        }
      }
    }
  }

  return teeTimes;
}

// Generate once and cache
let _teeTimes: TeeTime[] | null = null;

export function getTeeTimes(): TeeTime[] {
  if (!_teeTimes) {
    _teeTimes = generateTeeTimes();
  }
  return _teeTimes;
}

export function getTeeTimesForCourse(courseId: string, date?: string): TeeTime[] {
  return getTeeTimes().filter(
    (tt) => tt.courseId === courseId && (!date || tt.date === date) && tt.spotsRemaining > 0
  );
}

export function searchTeeTimes(params: {
  date: string;
  timeOfDay: string;
  location: string;
  players: number;
}): { courseId: string; teeTimes: TeeTime[] }[] {
  const allTeeTimes = getTeeTimes();

  const timeRanges: Record<string, [number, number]> = {
    early_morning: [6, 8],
    morning: [8, 11],
    afternoon: [11, 15],
    evening: [15, 20],
    any: [6, 20],
  };

  const [startHour, endHour] = timeRanges[params.timeOfDay] || [6, 20];

  const filtered = allTeeTimes.filter((tt) => {
    if (tt.date !== params.date) return false;
    if (tt.spotsRemaining < params.players) return false;
    const hour = parseInt(tt.time.split(":")[0]);
    if (hour < startHour || hour >= endHour) return false;
    return true;
  });

  // Group by course and filter by location
  const byCourse = new Map<string, TeeTime[]>();
  for (const tt of filtered) {
    const course = courses.find((c) => c.id === tt.courseId);
    if (!course) continue;

    if (
      params.location &&
      params.location !== "All Provinces" &&
      course.province !== params.location &&
      !course.city.toLowerCase().includes(params.location.toLowerCase())
    ) {
      continue;
    }

    if (!byCourse.has(tt.courseId)) byCourse.set(tt.courseId, []);
    byCourse.get(tt.courseId)!.push(tt);
  }

  return Array.from(byCourse.entries()).map(([courseId, teeTimes]) => ({
    courseId,
    teeTimes: teeTimes.sort((a, b) => a.time.localeCompare(b.time)),
  }));
}
