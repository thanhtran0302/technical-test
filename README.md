# Wyylde Technical Test

Exercice technique pour les candidats frontend, basé sur le projet Wyylde.

## 🎯 Objectif

Cet exercice évalue tes compétences en **vibe coding** : la capacité à utiliser efficacement des outils d'IA pour développer.

**Ce qu'on évalue :**

- 🥇 **Qualité de l'outillage** (Exercice 0) - Savoir structurer la connaissance pour les autres
- 🥈 **Qualité des prompts** - Clarté, précision, contextualisation
- 🥉 **Capacité à itérer** - Raffiner efficacement si nécessaire
- 🏅 **Compréhension du code** - Savoir ce que l'IA génère

**Ce qu'on NE juge PAS :**

- ❌ Le nombre de prompts
- ❌ Le temps passé
- ❌ La mémorisation de syntaxe

---

## 📋 Structure de l'exercice

```
┌─────────────────────────────────────────────┐
│  EXERCICE 0 : Onboarding & Outillage        │
│  "Préparer le terrain pour les autres"      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  EXERCICE 1 : Statut abonnement             │
│  Améliorer l'affichage du statut            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  EXERCICE 2 : Modal changement offre        │
│  Créer un flow de changement d'offre        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  EXERCICE 3 : Code promo                    │
│  Ajouter un système de code promotionnel    │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Setup

### Prérequis

- Node.js 22+
- npm ou yarn
- Un outil d'IA de ton choix (IDE, CLI, ou chat)

### Installation

```bash
cd technical-test
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Structure du projet

```
src/
├── app/                    # Next.js App Router
│   ├── api/account/       # Mock API endpoint
│   └── page.tsx           # Page principale
├── components/
│   ├── ui/                # Composants UI de base (shadcn-style)
│   └── subscription/      # Composants métier (à enrichir)
├── lib/
│   ├── mock-data.ts       # Données mock
│   └── utils.ts
├── types/
│   └── account.ts         # Types TypeScript (basés sur l'API réelle)
├── api/
│   └── client.ts          # API client
└── queries/
    └── account.ts         # React Query hooks
```

---

## 📝 Les exercices

### Exercice 0 : Onboarding & Outillage

**Situation :** Tu arrives sur ce projet pour la première fois. Tu vas devoir travailler dessus, et d'autres devs vont arriver après toi.

**Mission :**

1. **Lire et comprendre** le projet (types, hooks, composants existants, données mock)
2. **Outiller le projet** pour que tu (et les autres) puissiez vibe coder efficacement
3. **Documenter ta méthode** : comment et pourquoi tu as créé l'outillage

**Liberté totale :** Utilise l'outil IA de ton choix (Cursor, Claude Code, Windsurf, Copilot, Aider, etc.) et crée l'outillage que tu juges pertinent.

**Format des logs :** Pour chaque exercice, crée un fichier `.md` dans `ai-journal/exercice-X/` contenant tes prompts et une brève note sur le résultat obtenu. Pas besoin de tout copier-coller, juste les interactions clés.

**Important :** Ne SAUTE pas cette étape. Elle est cruciale pour la suite.

**📁 Fournir :** Tes logs dans `ai-journal/exercice-0/`

---

### Exercice 1 : Statut abonnement

L'utilisateur ne comprend pas bien son statut d'abonnement actuel.

**Problèmes identifiés :**
- Un membre Gold ne voit pas combien de jours il lui reste
- Aucun indicateur visuel de l'état de l'abonnement (actif, expire bientôt, expiré)
- Un non-abonné voit juste un bouton sans comprendre ce qu'il rate

**Attendu :**
- [ ] Afficher le nombre de jours restants avant expiration
- [ ] Indicateur visuel différent selon l'état (vert > 30j, orange < 30j, rouge < 7j)
- [ ] Pour les non-abonnés : mettre en avant les avantages Gold

**Bonus :** Propose une amélioration UX de ton choix

**📁 Fournir :** Tes logs dans `ai-journal/exercice-1/`

---

### Exercice 2 : Modal changement d'offre

Actuellement, le bouton "Choisir" sur les offres ne fait rien.

**Attendu :**
- [ ] Cliquer sur "Choisir" ouvre une modal de confirmation
- [ ] La modal affiche le récapitulatif de l'offre sélectionnée
- [ ] L'utilisateur peut sélectionner son moyen de paiement (cartes enregistrées)
- [ ] Feedback approprié : loading, succès, erreur

**📁 Fournir :** Tes logs dans `ai-journal/exercice-2/`

---

### Exercice 3 : Code promo

L'entreprise veut proposer des codes promotionnels pour inciter les utilisateurs à souscrire.

**Attendu :**
- [ ] Champ de saisie pour entrer un code promo
- [ ] Validation du code (mock : `WELCOME20` = -20%, `GOLD50` = -50%, autres = invalide)
- [ ] Affichage du prix réduit sur les offres si code valide
- [ ] Gestion des erreurs (code invalide, expiré)

**📁 Fournir :** Tes logs dans `ai-journal/exercice-3/`

---

**💡 Note :** Tu es libre d'améliorer l'UX comme tu le souhaites. Sois créatif !

---

## ✅ Critères d'acceptation (tous exercices)

| Critère | Description |
|---------|-------------|
| Fonctionnel | Le code compile et la feature marche |
| Cas limites | Les edge cases sont gérés (erreurs, loading, données vides) |
| UX cohérente | Style cohérent avec l'existant (shadcn, Tailwind) |
| TypeScript | Pas de `any`, types corrects |
| Compréhension | Tu peux expliquer ce que fait le code généré |

---

## 🐛 Tickets en cours

> **[JIRA-4521]** Un utilisateur signale qu'il arrive à sélectionner une carte expirée (MasterCard •••• 5678, expirée 01/2024) lors du changement d'offre, ce qui entraîne un échec de paiement. Le hook `useCards()` semble avoir une logique de filtrage mais les cartes expirées apparaissent quand même dans la liste.

---

## 📚 Ressources

### Types disponibles

Voir `src/types/account.ts` pour la liste complète.

Types clés :

- `UserAccount` - Données du compte utilisateur
- `Subscription` - Infos d'abonnement
- `Offer` - Une offre tarifaire
- `PaymentSource` - Carte ou SEPA

### Hooks React Query

Voir `src/queries/account.ts` :

```typescript
useAccount()       // Récupère les données du compte
useSubscription()  // Extrait les infos d'abonnement
useCards()         // Extrait les cartes de paiement
useOffers()        // Récupère les offres
useToggleRebill()  // Mutation pour toggle le rebill
useSubscribe()     // Mutation pour souscrire
```

### Scénarios de mock

L'API mock supporte différents scénarios. Modifie le paramètre `scenario` dans `src/api/client.ts` :

| Scénario         | Description                        |
| ---------------- | ---------------------------------- |
| `default`        | Utilisateur Gold avec rebill actif |
| `rebill_failed`  | Dernier prélèvement échoué         |
| `not_subscribed` | Utilisateur non abonné             |
| `error`          | Erreur serveur                     |

---

## 📤 Rendu

À la fin de l'exercice, tu dois avoir :

1. ✅ Un projet fonctionnel (`npm run dev` marche)
2. ✅ L'Exercice 0 complété (outillage + documentation)
3. ✅ 3 exercices de code complétés
4. ✅ Le dossier `ai-journal/` avec tes logs bruts

---

## ✅ Critères d'évaluation

### Exercice 0 : Outillage (40%)

> **Pourquoi 40% ?** Chez Wyylde, on travaille en équipe avec l'IA. Un bon outillage réduit le temps d'onboarding, garantit une qualité de code consistante, et permet à l'IA de générer du code contextualisé. **Un dev qui sait outiller un projet multiplie la productivité de toute l'équipe.**

- **Pertinence** des fichiers créés
- **Qualité** de la documentation (claire, complète, réutilisable)
- **Justification** des choix (pourquoi ça ?)
- **Méthode** de création (comment tu as procédé)

### Exercices 1-3 : Code (60%)

- **Qualité des prompts** (précis, contextualisés)
- **Efficacité** (rapidité à obtenir un résultat)
- **Itération** (capacité à raffiner si nécessaire)
- **Compréhension** (tu sais ce que le code fait)

**Exemple :** Un prompt efficace contextualise: *"Dans le composant SubscriptionStatus, ajoute un compteur de jours avant expiration en utilisant le champ expiresAt de l'objet subscription"* vs *"Ajoute un compteur"*

---

**Bonne chance ! 🍀**
