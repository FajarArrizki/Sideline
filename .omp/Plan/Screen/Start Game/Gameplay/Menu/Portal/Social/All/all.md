# All

> **Context:** This screen uses **Gameplay global Type 1** defined in [global.md](../../../../global.md) with the Portal sub-navigation rail. It displays an unfiltered social feed across all accounts (Twitter/X-style). The same layout applies to **My team**; only the data filter and the set of visible account types differ.

## Layout Type

**Type 1 — Sub-Navigation Rail.** Portal sub-nav (Home, My team, My career, Social) remains above.

## Content: Social Feed

A vertical scrolling feed of posts from six account types. Each post is a card with two visual modes.

### Account Types

| Type | Avatar | Content | Feed |
|---|---|---|---|
| **Football Pundit** | Pundit photo | Match analysis, opinion, transfer rumors | All, My team |
| **Competition** | League badge | Official league announcements, results | All, My team |
| **Club** | Club badge | Official club news, signings, match previews | All, My team |
| **News** | Media logo | Sports journalism (Sky Sports, ESPN, etc.) | All, My team |
| **Player** | Player face | Personal updates, match reactions, career news | All, My team |
| **Coaching Staff** | Staff photo | Tactical insights, training updates, club philosophy | All, My team |

- **Football Pundit**: individual commentators. All feeds.
- **Competition**: official league/cup accounts. All feeds.
- **Club**: official club accounts. All feeds.
- **News**: sports media outlets. All feeds.
- **Player**: individual players. All feeds.
- **Coaching Staff**: coaches, assistants, medical staff. All feeds.

Additional account types can be added to the config without changing the UI.

### Post Card Structure

```
┌──────────────────────────────────────────┐
│ [Avatar]  Account Name                    │
│           @handle · 2h ago                │
│                                           │
│ Body text of the post. Can span           │
│ multiple lines with full content.         │
│                                           │
│ ┌───────────────────────────────────────┐ │
│ │                                       │ │
│ │           Photo (optional)            │ │
│ │           border-radius 0             │ │
│ │                                       │ │
│ └───────────────────────────────────────┘ │
│                                           │
│ 💬 32         ❤ 245         👎 12        │
└──────────────────────────────────────────┘
```

### Card Elements

| Element | Description |
|---|---|
| **Avatar** | Account avatar per type: pundit photo, competition badge, club badge, or news logo. |
| **Account Name** | Bold, heading-small token. |
| **Handle + Time** | `@handle · 2h ago` in caption token. |
| **Body** | Full post text, no truncation. |
| **Photo** | Optional, full-width, border-radius 0. |
| **Action Bar** | Three interactions side-by-side. |

### Action Bar

| Action | Icon | Behavior |
|---|---|---|
| **Reply** | 💬 + count | Taps post, opens the Balasan bar at the bottom. Count shows total replies. |
| **Like** | ❤ + count | Tap to toggle like. Mutually exclusive with Dislike. Count updates live. |
| **Dislike** | 👎 + count | Tap to toggle dislike. Mutually exclusive with Like. Count updates live. |

Like and Dislike are mutually exclusive: tapping one clears the other. The manager can toggle either on/off. All three counts are live from the backend.

### Empty State

- **All**: "No posts yet."
- **My team**: "No posts from your team yet."

## Reply Flow

Tapping a post (or tapping 💬) opens the reply bar at the bottom.

```
┌──────────────────────────────────────────┐
│  [      Balasan                      ▾  ]│
└──────────────────────────────────────────┘
```

- Full-width button with label **Balasan** and trailing arrow icon.
- Tapping it opens a dropdown of reply templates.
- Same config pattern as the Accept dropdown in [contract detail.md](../../My career/My contract/Contract offer/contract detail.md).

### Reply Templates

3 expression groups, each with configurable reply templates:

```
┌──────────────────────────────────────────┐
│  Senang                            ▴     │
│  ────────────────────────────────────    │
│  Great performance today!                │
│  What a win! Well deserved.              │
│  Fantastic result, keep it up!           │
│                                          │
│  Netral                                   │
│  ────────────────────────────────────    │
│  Good effort from both sides.            │
│  Fair result in the end.                 │
│  Looking forward to the next match.      │
│                                          │
│  Marah                                    │
│  ────────────────────────────────────    │
│  Disappointing performance.              │
│  The referee was awful today.            │
│  Need to improve for next game.          │
└──────────────────────────────────────────┘
```

### Template Config

```text
replyTemplateConfig {
  groups: TemplateGroup[]
}

TemplateGroup {
  id: string              // e.g., "happy", "neutral", "angry"
  title: string           // e.g., "Senang", "Netral", "Marah"
  templates: string[]     // list of reply text options
}
```

Config is shared across screens. Changing it updates both All and My team.

## Data Requirements

```text
SocialPost {
  id: string
  author: {
    type: 'pundit' | 'competition' | 'club' | 'news' | 'player' | 'coaching_staff'
    name: string
    handle: string
    avatar: ImageSource
  }
  body: string
  photo?: ImageSource
  timestamp: string       // ISO datetime
  stats: {
    replies: number
    likes: number
    dislikes: number
    userLiked: boolean
    userDisliked: boolean
  }
}
```

## Reusable Components

- Shell: `GameplayScreen` Type 1 from [global.md](../../../../global.md)
- Reply templates: same config pattern as [contract detail.md](../../My career/My contract/Contract offer/contract detail.md)
- Menu index: [index.md](../../../index.md)

## Acceptance Criteria

- Feed scrolls vertically with Twitter/X-style posts mixing 6 account types.
- Action bar shows Reply (💬), Like (❤), Dislike (👎) with live counts.
- Like and Dislike are mutually exclusive; the manager can toggle.
- Tapping a post or Reply opens the **Balasan** button bar.
- Tapping **Balasan** opens a dropdown with Senang / Netral / Marah templates.
- Selecting a template posts the reply (backend behavior pending).
- All shows everything; My team scopes to the user's team.
- All templates are configurable via `replyTemplateConfig`.
