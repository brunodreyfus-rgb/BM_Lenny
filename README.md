# Lenny · Bar Mitsvah 2027

Site Next.js trilingue (FR/EN/HE), identification par prénom/nom, invitation familiale, RSVP individuel par événement, administration Supabase Auth, import CSV et export des réponses.

## Installation

1. Décompresser le ZIP et mettre les **fichiers à la racine** d'un dépôt GitHub privé. Connecter le dépôt au projet Vercel existant avec preset **Next.js**.
2. Dans le projet Supabase `https://rkknttzzrrjavbyymvws.supabase.co`, exécuter `supabase/schema.sql` dans **SQL Editor**. Les trois tables `lenny_` sont indépendantes de vos autres projets.
3. Dans **Supabase > Authentication > Users**, créer/inviter les comptes administrateurs Bruno et Malorie. Ajouter leurs emails à `ADMIN_EMAILS` séparés par une virgule.
4. Dans Vercel > Settings > Environment Variables, renseigner les 5 variables listées dans `.env.example`. Les valeurs `SUPABASE_SERVICE_ROLE_KEY` et `SESSION_SECRET` sont **secrètes**, jamais dans GitHub ni dans une capture d'écran. Générer `SESSION_SECRET` avec une valeur aléatoire de 32 octets minimum. La clé publique Supabase `anon` est utilisée seulement pour l'authentification admin.
5. Déployer. Se connecter sur `/admin` puis exporter l'onglet **Invites** depuis Google Sheets en **CSV** et l'importer. Le fichier Excel entier n'est pas accepté, uniquement le CSV de l'onglet Invites.
6. Tester avec une famille, puis avec une seconde. Vérifier les réponses dans `/admin` avant d'envoyer le lien aux invités.

## Colonnes CSV attendues

`Famille_ID,Famille,Prenom,Nom,Formule,Message_Perso,Jeudi_Matin,Jeudi_Soiree,Vendredi_Repas,Samedi_ApresMidi`

Formules `FULL`, `SOIREE`, `OFFICES` (insensible à la casse). Une ligne par personne. Les colonnes événement vides héritent de la formule ; `OUI` et `NON` servent d'exception. Les messages sont communs à la famille. Une personne avec un prénom et un nom identiques dans deux familles différentes ne pourra pas être identifiée sans arbitrage.

**Attention :** l'import ajoute les nouveaux invités et met à jour les familles, mais ne supprime pas les invités absents du nouveau CSV, afin de préserver les RSVP. Pour renommer une personne déjà importée, utiliser une migration contrôlée plutôt que de créer un doublon.

## RSVP

- Jeudi matin : oui
- Jeudi soir à Shenkin : oui
- Vendredi soir, dîner : oui
- Samedi matin : affiché pour tous, **sans RSVP**
- Samedi après-midi : oui, uniquement si inclus dans la formule

Les réponses sont conservées dans `lenny_rsvps` et peuvent être modifiées. Les statuts sont `yes`, `no`, `pending`.

## Sécurité et limites à connaître avant diffusion

- L'administration est protégée par Supabase Auth et une liste blanche d'emails ; les tables ont RLS activée sans accès public.
- L'accès invité par prénom et nom est **une identification légère, pas une protection forte**. Une personne connaissant les noms d'un invité peut potentiellement accéder à sa famille et modifier ses RSVP. À envisager avant diffusion : code famille ou lien privé.
- Le limiteur de tentatives fourni est en mémoire, **insuffisant en production serverless**. Ajouter un rate limiting persistant (Upstash Redis ou équivalent) et un contrôle anti-bot avant ouverture publique.
- Les 9 photos sont dans `public/photos` : elles sont **publiques pour quiconque connaît l'URL**. Si la confidentialité des photos est importante, déplacer les fichiers dans un bucket Supabase privé et servir les images via une route authentifiée.
- Les messages personnalisés sont affichés tels quels dans la langue d'origine ; seuls les textes de l'interface sont traduits.
- L'adresse exacte de la synagogue et de la maison reste à ajouter lorsque confirmée.
- Ne pas rendre le dépôt public si vous y ajoutez ultérieurement des données privées. Aucun fichier d'invités n'est inclus dans ce ZIP.

## Démarrage local

`npm install` puis `npm run dev`. Pour tester les API, créer `.env.local` avec les variables de `.env.example`.
