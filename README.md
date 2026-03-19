# Wyylde Technical Test

Exercice technique pour les candidats frontend, basé sur le projet Wyylde.

## 🎯 Objectif

Cet exercice évalue vos compétences en **vibe coding** : la capacité à utiliser efficacement des outils d'IA pour développer.

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
│  EXERCICE 3 : Gestion erreurs               │
│  Gérer les cas limites et erreurs           │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Setup

### Prérequis

- Node.js 22+
- npm ou yarn
- Un compte sur un outil d'IA (Claude, ChatGPT, Cursor, etc.)

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

**Ce que tu peux créer :**

- `.cursorrules` ou `CLAUDE.md` - Instructions globales pour l'IA
- `docs/onboarding.md` - Guide pour un nouveau dev
- `docs/code-overview.md` - Vue d'ensemble du code (types, hooks, composants)
- `docs/prompts-examples.md` - Exemples de prompts qui marchent sur ce projet
- Autre chose que tu juges pertinent

**Format des logs :** Pour chaque exercice, crée un fichier `.md` dans `ai-journal/exercice-X/` contenant tes prompts et une brève note sur le résultat obtenu. Pas besoin de tout copier-coller, juste les interactions clés.

**Important :** Ne SAUTE pas cette étape. Elle est cruciale pour la suite.

**📁 Fournir :** Vos logs dans `ai-journal/exercice-0/`

---

### Exercice 1 : Statut abonnement

En utilisant ton outillage de l'Exercice 0, améliorer le composant `SubscriptionStatus` :

1. Ajouter une animation lors du changement de statut rebill
2. Ajouter un compteur de jours restants avant expiration
3. Afficher un badge différent selon le provider (Stripe vs Paybox)
4. Améliorer le message quand le rebill a échoué

**📁 Fournir :** Vos logs dans `ai-journal/exercice-1/`

---

### Exercice 2 : Modal changement d'offre

Créer un modal de changement d'offre :

1. Modal qui s'ouvre au clic sur "Choisir" une offre
2. Récapitulatif de l'offre sélectionnée
3. Sélection de la carte de paiement
4. Bouton "Confirmer" qui appelle l'API
5. Feedback de succès/erreur

**📁 Fournir :** Vos logs dans `ai-journal/exercice-2/`

---

### Exercice 3 : Gestion des erreurs

Robustifier l'application :

1. Message approprié si l'API ne répond pas
2. Cas où l'utilisateur n'a pas de carte enregistrée
3. Validation avant changement d'offre
4. Toaster de succès/erreur après une action

**📁 Fournir :** Vos logs dans `ai-journal/exercice-3/`

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
4. ✅ Le dossier `ai-journal/` avec vos logs bruts

---

## ✅ Critères d'évaluation

### Exercice 0 : Outillage (40%)

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
