# @madulinux/react-select


[![npm version](https://img.shields.io/npm/v/@madulinux/react-select.svg)](https://www.npmjs.com/package/@madulinux/react-select)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Reusable Select2/AsyncSelect React component with search, async options, cascade support, and full custom styling. Perfect for dynamic dropdowns, region selection, and DataTable filtering.

---
#### [Dokumentasi Indonesia](ID.md)
---

## ✨ Features
- Async fetch & search (searchable)
- Cascade/multi-level dropdown support
- Custom option rendering
- Multi/single select
- Clear/reset button
- Easy integration with DataTable/filter
- TypeScript support
- Full styling control via className props

---

## 🚀 Installation
```bash
npm install @madulinux/react-select
```

---

## 🔥 Basic Usage
```tsx
import Select2 from '@madulinux/react-select';

const [selected, setSelected] = useState(null);

<Select2
  value={selected}
  onChange={setSelected}
  fetchOptions={async ({ search }) => {
    const res = await fetch('/api/options?search=' + search);
    const data = await res.json();
    return { data: data.items, hasMore: false };
  }}
  placeholder="Select something"
/>
```

---

## 🧩 API & Props
| Prop                     | Type                                         | Description                                    |
|--------------------------|----------------------------------------------|------------------------------------------------|
| value                    | object/array/null                            | Selected value (single/multi)                  |
| onChange                 | function                                     | Change handler                                 |
| fetchOptions             | function ({search}) => Promise<{data,hasMore}>| Async fetch for options                        |
| placeholder              | string                                       | Input placeholder                              |
| label                    | string                                       | Input label                                    |
| disabled                 | boolean                                      | Disable input                                  |
| renderOption             | function (item) => ReactNode                  | Custom option rendering                        |
| isMulti                  | boolean                                      | Enable multi select                            |
| className                | string                                       | Styling root container                         |
| inputClassName           | string                                       | Styling input box                              |
| dropdownClassName        | string                                       | Styling dropdown menu                          |
| optionClassName          | string                                       | Styling each option item                       |
| selectedOptionClassName  | string                                       | Styling selected option item                   |
| loadingClassName         | string                                       | Styling loading text                           |
| noDataClassName          | string                                       | Styling "no data" text                         |

---

## 🎨 Custom Styling
You can fully customize the appearance using className props:

```tsx
<Select2
  value={selected}
  onChange={setSelected}
  fetchOptions={fetchOptions}
  className="mb-4"
  inputClassName="border-gray-300 rounded focus:border-blue-500"
  dropdownClassName="shadow-lg border bg-white"
  optionClassName="px-4 py-2 hover:bg-blue-50 cursor-pointer"
  selectedOptionClassName="bg-blue-100 font-bold"
  loadingClassName="text-blue-500"
  noDataClassName="text-gray-400 italic"
/>
```

- Use Tailwind, CSS modules, or global CSS as needed.
- For dark mode, just add the appropriate className.

---

## 🛠️ Troubleshooting & Integration Notes
- Ensure your API returns `{ items: [{ id, label }], hasMore: false }`.
- Use className or custom styles for appearance.
- Enable multi select with `isMulti` prop.
- Reset child select when parent changes in cascade.

---

## 🤝 Contribution
Pull requests, suggestions, and issues are welcome! Fork the repo and submit a PR.

## 👤 Author
**madulinux**  
[GitHub](https://github.com/madulinux)  
[npmjs](https://www.npmjs.com/~madulinux)

## License
MIT
