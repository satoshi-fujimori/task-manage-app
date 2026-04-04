This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Wiki

### shadcn使ってるプロジェクトを手動で持ってくる場合
#### 初期化コマンドで依存関係一括でをインストール

```bash
npx shadcn-ui@latest init
npx shadcn@latest init
```

設定の選択
```
√ A components.json file already exists. Would you like to overwrite it? ... yes
√ Would you like to re-install existing UI components? ... no
√ Select a component library » Radix
√ Which preset would you like to use? » Nova
```

#### コピペするファイルの考え方
■ どれを使うべきか（重要）

ベストなやり方

新規プロジェクトで shadcn/ui を init
v0 の依存を参考にして必要なものだけ npm install
もしくは、v0 の package.json をマージして npm install

⭕ 状況によって参考にする
✔ components.json→不要

👉 これは重要

shadcn/uiの設定
パス設定のヒントになる

👉 中身は参考にする（コピペじゃなく調整）

✔ next.config.mjs

👉 これも部分的に参考

特に👇

images設定
experimental設定

👉 必要な部分だけ移植

✔ tsconfig.json

👉 パス設定だけ参考

"paths": {
  "@/*": ["./*"]
}

👉 これないとimport死ぬ

⭕ ほぼ不要
next-env.d.ts → Nextが自動生成
.gitignore → 既存でOK

| v0 形式                                                         | 最新形式                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { Slot } from "radix-ui"`                             | `import { Slot } from "@radix-ui/react-slot"`                       |
| `import { Root, Trigger, Content } from "radix-ui/accordion"` | `import * as Accordion from "@radix-ui/react-accordion"`            |
| `import { Dialog } from "radix-ui/dialog"`                    | `import * as Dialog from "@radix-ui/react-dialog"`                  |
| `import { Popover } from "radix-ui/popover"`                  | `import * as Popover from "@radix-ui/react-popover"`                |
| `import { Tabs } from "radix-ui/tabs"`                        | `import * as Tabs from "@radix-ui/react-tabs"`                      |
| `import { Tooltip } from "radix-ui/tooltip"`                  | `import * as Tooltip from "@radix-ui/react-tooltip"`                |
| `import { Switch } from "radix-ui/switch"`                    | `import * as Switch from "@radix-ui/react-switch"`                  |
| `import { Checkbox } from "radix-ui/checkbox"`                | `import * as Checkbox from "@radix-ui/react-checkbox"`              |
| `import { RadioGroup } from "radix-ui/radio-group"`           | `import * as RadioGroup from "@radix-ui/react-radio-group"`         |
| `import { Select } from "radix-ui/select"`                    | `import * as Select from "@radix-ui/react-select"`                  |
| `import { Slider } from "radix-ui/slider"`                    | `import * as Slider from "@radix-ui/react-slider"`                  |
| `import { Toast } from "radix-ui/toast"`                      | `import * as Toast from "@radix-ui/react-toast"`                    |
| `import { Collapsible } from "radix-ui/collapsible"`          | `import * as Collapsible from "@radix-ui/react-collapsible"`        |
| `import { Menubar } from "radix-ui/menubar"`                  | `import * as Menubar from "@radix-ui/react-menubar"`                |
| `import { Label } from "radix-ui/label"`                      | `import * as Label from "@radix-ui/react-label"`                    |
| `import { Progress } from "radix-ui/progress"`                | `import * as Progress from "@radix-ui/react-progress"`              |
| `import { Separator } from "radix-ui/separator"`              | `import * as Separator from "@radix-ui/react-separator"`            |
| `import { AspectRatio } from "radix-ui/aspect-ratio"`         | `import * as AspectRatio from "@radix-ui/react-aspect-ratio"`       |
| `import { Avatar } from "radix-ui/avatar"`                    | `import * as Avatar from "@radix-ui/react-avatar"`                  |
| `import { DropdownMenu } from "radix-ui/dropdown-menu"`       | `import * as DropdownMenu from "@radix-ui/react-dropdown-menu"`     |
| `import { ContextMenu } from "radix-ui/context-menu"`         | `import * as ContextMenu from "@radix-ui/react-context-menu"`       |
| `import { NavigationMenu } from "radix-ui/navigation-menu"`   | `import * as NavigationMenu from "@radix-ui/react-navigation-menu"` |
| `import { HoverCard } from "radix-ui/hover-card"`             | `import * as HoverCard from "@radix-ui/react-hover-card"`           |
| `import { AlertDialog } from "radix-ui/alert-dialog"`         | `import * as AlertDialog from "@radix-ui/react-alert-dialog"`       |

