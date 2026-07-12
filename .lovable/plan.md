## Refresh Baggage Policies for All 42 Airlines + Add "Last Updated" Badges

### Scope confirmed
- **42 airlines** in `airlines_data`
- Refresh **carry-on** and **checked baggage** size + weight
- Method: web search + manual cross-check per airline
- Homepage global badge + per-airline card date

---

### Part 1 — Database change

Add an `updated_at` column so we can drive both the homepage badge and per-airline badges from real data.

```sql
ALTER TABLE public.airlines_data
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
```

(RLS/grants unchanged — column is publicly readable via existing SELECT policy.)

### Part 2 — Verify + update baggage policies (all 42 airlines)

Because there are 42 carriers and each needs 2 policies (carry-on + checked) cross-checked against the airline's official page, I'll run this in **6 batches of ~7 airlines**. For each airline I will:

1. Web-search the airline's official baggage page (e.g. `ryanair.com/baggage`).
2. Extract carry-on size (LxWxD cm), carry-on weight (kg), checked size (linear cm or LxWxD), checked weight (kg).
3. Compare to the current DB row.
4. If different → include in a batched `UPDATE` via the insert tool, setting `updated_at = now()`.
5. If unchanged → still bump `updated_at` so the "verified on" date reflects today's check.

After each batch I'll report: airlines checked, values changed, values verified as still correct, and any where the official source was ambiguous (I'll leave those unchanged and flag them for you).

**Format kept identical to existing DB values** (e.g. `"55 x 40 x 20 cm"`, `"10 kg"`) — no schema/format churn on the frontend.

### Part 3 — Homepage "Last Updated" badge

Add a small badge under the Hero on `src/pages/Index.tsx`:

> ✓ Baggage policies last verified: **12 July 2026**

Data source: `SELECT MAX(updated_at) FROM airlines_data` on mount, formatted as "12 July 2026". Styled to match the existing amber/teal palette (soft amber pill with a check icon), placed just above the "Popular Airlines" section.

### Part 4 — Per-airline "updated" chip on airline cards

In `src/components/AirlineCard.tsx`, add a small muted line:
> *Updated 3 days ago*

Uses `date-fns` `formatDistanceToNow(airline.updated_at)`. The `Airline` TypeScript type in `src/utils/types.ts` and the mapper in `src/utils/airlineData.ts` will get `updatedAt: string` added so the field flows from Supabase → UI.

---

### Files touched
- **Migration** — add `updated_at` column (via migration tool)
- **Data updates** — 6 batches of `UPDATE` statements (via insert tool)
- `src/utils/types.ts` — add `updatedAt` to `Airline` type
- `src/utils/airlineData.ts` — map `updated_at` → `updatedAt`
- `src/components/AirlineCard.tsx` — render "Updated X ago" chip
- `src/pages/Index.tsx` — render homepage "last verified" badge

### What I need from you before starting
Nothing — I'll proceed batch-by-batch and report progress. Because manual verification of 42 airlines is time-consuming, expect this to run across several agent turns. I'll stop and check in with you after batch 1 (~7 airlines) so you can sanity-check my sourcing before I burn through the rest.