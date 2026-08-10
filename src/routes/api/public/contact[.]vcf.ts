import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/data/company";
import { buildVCard } from "@/lib/card-utils";

export const Route = createFileRoute("/api/public/contact.vcf")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const ua = request.headers.get("user-agent") ?? "";
        const isAndroid = /Android/i.test(ua);
        // Android Chrome needs an attachment disposition to surface the
        // "Open with Contacts" download action; iOS needs inline so Safari
        // opens the native Add Contact sheet directly.
        const disposition = isAndroid ? "attachment" : "inline";

        return new Response(buildVCard(COMPANY), {
          headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": `${disposition}; filename="arise-healthcare-solutions.vcf"`,
            "Cache-Control": "public, max-age=300",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
