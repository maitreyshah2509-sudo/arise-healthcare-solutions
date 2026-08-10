# Make "Save Contact" open directly in the iPhone Contacts app

## The problem

On iPhone, tapping **Save Contact** currently builds the contact file inside the browser and hands it to Safari as a `data:` link. iOS Safari does not treat that as a real contact file — it either does nothing or shows raw text, so the native "Add Contact" screen never appears.

iOS only opens the Contacts sheet when the contact file arrives from a real web address with the proper file type attached to it.

## The fix

Serve the contact card from a real URL on the site instead of generating it in the browser.

1. Add a small endpoint at `/api/public/contact.vcf` that returns the vCard text with the correct headers (`text/vcard`, inline filename). It builds the card from the same company data the site already uses, so nothing goes out of sync.
2. On iPhone/iPad, **Save Contact** simply navigates to that URL. iOS recognises the file type and shows the native contact preview with "Add to Contacts".
3. On desktop and Android, keep the current behaviour: download the `.vcf` file, with the success toast.
4. "Download Contact" button keeps working exactly as it does today.

## Note on the preview window

File downloads are blocked inside the Lovable preview frame, so desktop testing should be done by opening the site in its own tab. iPhone behaviour should be tested on the published or preview URL directly in Safari.

## Technical detail

- New server route `src/routes/api/public/contact[.]vcf.ts` with a `GET` handler returning the vCard string, `Content-Type: text/vcard; charset=utf-8` and `Content-Disposition: inline; filename="ecliptix-solutions.vcf"`.
- Move `buildVCard` input to the shared company data so both the route and the client use one source.
- `saveContact` in `src/lib/card-utils.ts`: replace the `data:` URL branch with `window.location.href = "/api/public/contact.vcf"` for Apple mobile; leave the blob download path unchanged elsewhere.
