# Trajectory website content guide

## Pages
- `/`: Home
- `/about`: Brand story and approach
- `/services`: Four capabilities, each with a deep link
- `/work`: Filterable project index
- `/work/:slug`: Individual project/client pages
- `/contact`: Database-backed inquiry form

## Add projects or repeat-client pages
Edit `packages/web/src/web/lib/content.ts`. Add an entry to `projects` with a unique `slug`. The Work card and dedicated `/work/your-slug` page appear automatically. A repeat client can have its own entry describing the partnership and multiple deliverables. Store images in `packages/web/public/images/` and reference `/images/filename.jpg`.

Current entries are illustrative samples, not client claims. Sample disclosures are intentional. When real work is added, replace concept-specific labels in `ProjectCard`, `Work`, and `CaseStudy` in `packages/web/src/web/pages/site.tsx`, and only publish outcomes you can substantiate. Update the Work intro's project count as needed.

## Service content
Edit the `services` array in the same file. Services have section anchors and CTAs that preselect the contact form's service.

## Contact inquiries
Form submissions are validated and saved to the managed database in the `inquiries` table. Fields: name, email, company, phone, service, message, created_at. There is no public endpoint exposing submissions. This version does not include an admin inbox, CMS, or automatic email notifications. Those can be added as a separate feature. Do not publish database credentials.

Public email and telephone links are in `components/layout.tsx` and `pages/site.tsx`.

## Images and branding
Photography is illustrative stock imagery sourced from Unsplash via image search. The site uses a typographic brand treatment and custom directional mark, not a provided official logo. Replace with approved brand assets when ready.

## Validation
Production build and lint pass. Desktop/mobile routes, Work filters, case-study navigation, mobile menu, service preselection, and successful database-backed form submission verified in Chrome.
