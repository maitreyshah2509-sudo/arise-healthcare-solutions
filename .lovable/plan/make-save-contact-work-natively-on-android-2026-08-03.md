# Make "Save Contact" work natively on Android

Today the card detects iPhone/iPad and sends those users to the server-served
`/api/public/contact.vcf` URL, which opens the native Add Contact sheet. Every
other device (including Android) falls back to an in-browser blob download,
which Android Chrome often saves silently as a file that never reaches Contacts.

## What changes

- Route Android (and by default all mobile browsers) through the same real
  server URL instead of the blob download, so the phone receives a proper
  `text/vcard` response it can hand to the Contacts app.
- Serve the vCard with a filename and disposition Android honors, so Chrome
  shows a "Open with Contacts" download action rather than a silent save.
- Keep iOS behaviour exactly as it is now, and keep the desktop blob download
  for laptops.
- Update the toast wording so mobile users get a hint ("Open the downloaded
  card to add the contact") instead of "saved to your downloads".
- Leave the separate "Download Contact" button as the plain file download for
  people who explicitly want the .vcf file.

## Technical notes

- `src/lib/card-utils.ts` → `saveContact`: replace the Apple-only check with a
  general mobile check (iOS/iPadOS as today, plus `/Android/i` on the user
  agent). Both navigate to `/api/public/contact.vcf`. Desktop keeps
  `downloadFile`. Return value gains an `android` variant so the UI can pick
  the right toast.
- `src/routes/api/public/contact[.]vcf.ts`: keep `Content-Type:
  text/vcard; charset=utf-8`; switch `Content-Disposition` to `attachment`
  when the request comes from Android (user-agent sniff in the handler),
  `inline` otherwise, so iOS still opens the sheet directly. Also add
  `X-Content-Type-Options` off the response so the type isn't rewritten.
- `src/components/card/QuickActions.tsx`: map the new result value to its toast
  message.
- Verification: this behaviour can only be fully confirmed on a real Android
  phone against the published URL, so publishing and a quick device test is the
  last step.
