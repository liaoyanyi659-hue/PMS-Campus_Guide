PMS Explore — frontend v1.8 / mobile component redesign

This ZIP is the complete frontend. No PHP or database migration is required.
Back up the current frontend, then replace the frontend files with this package.
Upload the contents of the folder to the same location as your existing index.html.
Do not upload this package over your Hostinger backend API directory.

Changes:
- Today at PMS: date pill, two timetable stats, separate updates and Lost & Found cards.
- Campus Life: three compact service tiles with consistent spacing and visual hierarchy.
- Updates / Forum: shared two-row mobile header with the existing language, account,
  forum shortcut and menu controls. Original event listeners are preserved.
- Notifications: compact preferences and buttons; existing subscription behavior unchanged.
- Forum category pills: readable inactive text and horizontal scrolling.
- Original four fixed bottom navigation items are unchanged.
- Existing Chinese copy and user-authored content are unchanged.
- New styles/scripts load after legacy styles with v1.8 asset URLs.

Checks completed:
JavaScript syntax, 12 page/language DOM checks (English, Malay, Chinese),
language switching, navigation drawer, service destinations and new card/header structure.
Real Safari visual rendering has not been verified in this environment.

After uploading, check at 320 / 390 / 430px widths on your phone. If a page still
looks old, reload the page and verify that mobile-layout.css?v=1.8 loads successfully.
The service worker in this package does not cache HTML or API responses.
