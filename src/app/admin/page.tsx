import type { Metadata } from "next";
import { getClubs, getStadiums } from "@/lib/content";
import { readOverrides } from "@/lib/overrides";
import { AdminEditor } from "@/components/AdminEditor";
import { SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Administration du contenu",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Administration"
        title="Éditer le contenu."
        lede="Les corrections sont enregistrées dans content/overrides.json et fusionnées par-dessus les données du dépôt. Aucun redéploiement de code n'est nécessaire."
      />
      <div style={{ marginTop: "2.5rem" }}>
        <AdminEditor
          stadiums={getStadiums().map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
          clubs={getClubs().map((c) => ({ id: c.id, name: c.name }))}
          overrides={readOverrides()}
        />
      </div>
    </section>
  );
}
