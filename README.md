# Stadia Belgica

Plateforme d'exploration et d'expérience des stades de la Jupiler Pro League.

> Le stade n'est pas seulement l'endroit où se joue le match. C'est une expérience.

---

## 1. Le nom

Cinq pistes ont été évaluées avant de trancher :

| Nom | Mémorisation | Dimension belge | Potentiel international | Verdict |
|---|---|---|---|---|
| **Stadia Belgica** | forte, latine, courte | explicite | fonctionne en FR, NL et EN | **retenu** |
| Tribune Nord | bonne | faible | faible hors francophonie | écarté |
| Kop & Terril | originale | très forte | illisible à l'étranger | écarté |
| Matchday Belgium | claire | explicite | déjà très générique, difficile à protéger | écarté |
| Onze Stades | jeu de mots FR/NL | forte | ambigu (« onze » = 11 en FR, « nos » en NL) | écarté |

**Stadia Belgica** a été retenu : latin neutre entre les trois langues nationales, un seul concept
(les stades belges), aucune collision avec une marque existante du secteur, et un potentiel
d'extension évident (*Stadia* comme faîtière, un pays par déclinaison).

Identité : logo « arche de tribune » (SVG, `src/components/Logo.tsx` et `public/icon.svg`),
typographie Archivo (titres) + Inter (texte), accent terracotta `#9a3b1e`, fond ivoire en mode clair
et encre en mode sombre. Tous les jetons sont dans `src/app/globals.css`.

---

## 2. Stack et pourquoi

- **Next.js 15 (App Router) + TypeScript** — rendu statique des 18 fiches, SEO natif (metadata,
  sitemap, JSON-LD, images Open Graph générées), et une seule base de code.
- **Tailwind CSS v4 + design system maison** — les jetons de couleur, d'espacement et de rayon sont
  définis une fois dans `globals.css` ; les composants n'inventent pas de valeurs.
- **Leaflet + OpenStreetMap** — carte interactive open source, sans clé d'API ni coût.
- **Données typées dans le dépôt** (pas de base de données en V1) — le contenu est versionné,
  relisible en revue de code, et le site reste entièrement statique. La couche `src/lib/content.ts`
  isole totalement les pages de la source de données : basculer vers Supabase plus tard ne touche
  que ce fichier.

Pas de librairie d'animation, pas de state manager, pas de composants UI tiers : ~102 kB de
JavaScript partagé, 48 pages prérendues.

---

## 3. Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run typecheck
```

Variables d'environnement (toutes optionnelles) :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (sitemap, Open Graph) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | active les analytics (aucun script chargé sans elle) |
| `ADMIN_TOKEN` | autorise l'écriture depuis `/admin` ; sans elle, l'écriture est refusée |

---

## 4. Modèle de données

Tout part de `src/data/` :

```
types.ts              Club, Stadium, Section, Fact<T>, Image, Video…
sources.ts            hiérarchie des sources (club > Pro League > autorités > opérateurs)
clubs.ts              les 18 clubs de la saison
stadiumBase.ts        socle par défaut d'une fiche + helpers (tribunes, accès)
stadiums/*.ts         une fiche par enceinte (17 fichiers)
```

**La règle centrale : `Fact<T>`.** Toute donnée susceptible de changer est encapsulée avec son
statut, sa source et sa date de vérification.

```ts
capacity: v(27670, STADIUMDB, "2026-09-21", "Jauge exploitée variable selon la rencontre")
address:  tbc("Adresse exacte à confirmer auprès du club")
```

Une donnée `tbc` s'affiche « Information à confirmer » — jamais une estimation présentée comme un
fait. Une donnée vérifiée affiche systématiquement sa source et sa date.

**Changer de saison** : éditer `clubs.ts` (et ajouter/retirer un fichier dans `stadiums/`). Aucun
composant ne code un club en dur.

---

## 5. Administration

`/admin` édite le contenu sans toucher au code. Les corrections sont écrites dans
`content/overrides.json` et fusionnées par-dessus les données du dépôt (`src/lib/overrides.ts`).
L'écriture passe par `PUT /api/admin/content`, protégée par `ADMIN_TOKEN` — sans jeton configuré
côté serveur, aucun point d'entrée n'est ouvert.

Sur un hébergement au système de fichiers éphémère (Vercel), brancher un stockage durable
(Supabase, ou écriture Git via API) à la place de `fs` : c'est le seul fichier à remplacer.

---

## 6. Monétisation

Câblée dès l'architecture, désactivée par défaut (`src/lib/monetization.ts`) :

- **Emplacements partenaires** — `<PartnerSlot slot="…" />` ne rend *rien* tant qu'aucun partenaire
  n'est configuré. Pas de cadre vide.
- **Sponsoring de section** — formulation « Expérience présentée par … ».
- **Affiliation** — `<AffiliateLink>` ajoute toujours la mention « lien affilié ».
- **Stadium Pass** — offre préparée (4,99 €/mois, 29,99 €/an), non commercialisée, prête à recevoir
  Stripe.
- **Offre B2B clubs** — page `/clubs`, sans back-office B2B en V1.

---

## 7. Charte de fiabilité

1. Priorité aux sites officiels des clubs, puis Pro League, autorités locales, opérateurs de transport.
2. Aucune information inventée pour compléter une fiche : « Information à confirmer ».
3. Aucun prix publié sans vérification ; renvoi systématique vers la billetterie officielle.
4. Aucune image ou vidéo protégée publiée sans licence vérifiée — d'où les visuels génératifs
   (`StadiumVisual`) construits à partir des couleurs du club.
5. Les contenus commerciaux sont identifiés et ne modifient jamais une information pratique.

La page `/a-propos` expose cette charte aux lecteurs.

---

## 8. État de la V1 et suite

Fait : design system, homepage, 17 fiches stades complètes, carte, recherche globale, favoris,
partage + images Open Graph générées, planificateur jour de match, admin léger, SEO technique,
analytics, architecture de monétisation, mode clair/sombre, mobile first.

À faire ensuite, par ordre de valeur :

1. **Campagne de vérification terrain** — remplacer les `tbc()` par des données sourcées auprès des
   clubs (accès, parkings, règlement, tribunes). C'est le vrai travail éditorial restant.
2. **Médias** — photos sous licence validée et captations verticales maison.
3. **Matchday réel** — brancher le calendrier officiel pour partir d'un match plutôt que d'une heure.
4. **Comptes** — synchroniser les favoris entre appareils (aujourd'hui en stockage local).
5. **Supabase** — si l'édition à plusieurs devient nécessaire.
