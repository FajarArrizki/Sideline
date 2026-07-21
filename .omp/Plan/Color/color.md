# Color and Typography System Plan wireframe

> **Note:** Define reusable semantic color and typography tokens in this table before implementing them. Components must consume token names from the shared theme and must never use hard-coded color or font styling values.

| Category | Token | Value | Usage | State |
| --- | --- | --- | --- | --- |
| Application | `color.background.app` | `#131318` | Global background for the entire application | Base |
| Button | `color.button.primary.background` | `#FFFFFF` | Background for the primary action, such as **Continue** in a paired action row | Active |
| Button | `color.button.primary.border` | `#3F3F43` | Border for the primary action | Active |
| Button | `color.button.primary.text` | `#131318` | Text for the primary action | Active |
| Button | `color.button.secondary.background` | `#131318` | Background for the secondary action, such as **Back** in a paired action row | Default |
| Button | `color.button.secondary.border` | `#3F3F43` | Border for the secondary action; matches the primary border | Default |
| Button | `color.button.secondary.text` | `#FFFFFF` | Text for the secondary action; matches the primary background | Default |
| Input | `color.input.default.background` | `#131318` | Background for text inputs and dropdown-style selector fields; matches the default button surface | Default |
| Input | `color.input.default.border` | `#3F3F43` | Border for text inputs and dropdown-style selector fields | Default |
| Input | `color.input.default.text` | `#FFFFFF` | Entered text, selected values, and field icons | Default |
| Input | `color.input.default.placeholder` | `#FFFFFF` with `opacity.input.placeholder` | Placeholder text without introducing a new color | Default |
| Coaching Attribute | `color.attribute.segment.active` | `#FFFFFF` | Filled segment in the reusable 10-step coaching `AttributeBar` | Active |
| Coaching Attribute | `color.attribute.segment.inactive` | `#3F3F43` | Unfilled segment in the reusable 10-step coaching `AttributeBar` | Default |
| Typography | `font.family.primary` | `SF Pro Text` | Primary font family used through the shared typography system | Base |
| Typography | `font.weight.default` | `Regular` | Default text styling | Default |
| Typography | `font.weight.active` | `Bold` | Active or emphasized text styling | Active |
