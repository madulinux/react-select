# @madulinux/react-select

[![npm version](https://img.shields.io/npm/v/@madulinux/react-select.svg)](https://www.npmjs.com/package/@madulinux/react-select)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Reusable Select2/AsyncSelect React component with search, async options, and cascade support. Cocok untuk kebutuhan dropdown dinamis, pencarian, dan integrasi filter DataTable.

---

## ✨ Fitur Utama
- Async fetch & pencarian (searchable)
- Mendukung cascade (dropdown bertingkat)
- Custom render option
- Multi/single select
- Tombol clear/reset
- Integrasi mudah dengan DataTable/filter
- Dukungan TypeScript

---

## 🚀 Instalasi
```bash
npm install @madulinux/react-select
```

---

## 🔥 Penggunaan Sederhana
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
  placeholder="Pilih sesuatu"
/>
```

---

## 🧩 API & Props
| Prop                     | Tipe                                        | Deskripsi                                      |
|--------------------------|---------------------------------------------|------------------------------------------------|
| value                    | object/array/null                           | Nilai terpilih (single/multi)                  |
| onChange                 | function                                    | Handler saat pilihan berubah                   |
| fetchOptions             | function ({search}) => Promise<{data,hasMore}> | Async fetch data options                       |
| placeholder              | string                                      | Placeholder input                              |
| label                    | string                                      | Label input                                    |
| disabled                 | boolean                                     | Menonaktifkan input                            |
| renderOption             | function (item) => ReactNode                 | Custom tampilan item                           |
| isMulti                  | boolean                                     | Aktifkan multi select                          |
| className                | string                                      | Styling root container                         |
| inputClassName           | string                                      | Styling input box                              |
| dropdownClassName        | string                                      | Styling dropdown menu                          |
| optionClassName          | string                                      | Styling setiap item option                     |
| selectedOptionClassName  | string                                      | Styling item option yang terpilih              |
| loadingClassName         | string                                      | Styling loading text                           |
| noDataClassName          | string                                      | Styling teks "tidak ada data"                  |

---

## 🌏 Contoh Cascade Wilayah
```tsx
import { useState } from 'react';
import Select2 from '@madulinux/react-select';

const [provinsi, setProvinsi] = useState(null);
const [kabupaten, setKabupaten] = useState(null);
const [kecamatan, setKecamatan] = useState(null);
const [desa, setDesa] = useState(null);

<Select2
  label="Provinsi"
  value={provinsi}
  onChange={val => { setProvinsi(val); setKabupaten(null); setKecamatan(null); setDesa(null); }}
  fetchOptions={async ({ search }) => {
    const res = await fetch(`/api/wilayah?level=1&search=${search}`);
    const data = await res.json();
    return { data: data.items, hasMore: false };
  }}
  placeholder="Pilih Provinsi"
/>
<Select2
  label="Kabupaten/Kota"
  value={kabupaten}
  onChange={val => { setKabupaten(val); setKecamatan(null); setDesa(null); }}
  fetchOptions={async ({ search }) => {
    if (!provinsi) return { data: [], hasMore: false };
    const res = await fetch(`/api/wilayah?parent_id=${provinsi.id}&search=${search}`);
    const data = await res.json();
    return { data: data.items, hasMore: false };
  }}
  placeholder="Pilih Kabupaten/Kota"
  disabled={!provinsi}
/>
```

---

## 🎨 Custom Option Render
```tsx
<Select2
  ...
  renderOption={item => (
    <div>
      <span>{item.label}</span>
      <span style={{ color: '#888', marginLeft: 8 }}>Kode: {item.kode}</span>
    </div>
  )}
/>
```

---

## 🎨 Custom Styling
Anda bisa mengatur tampilan Select2 sesuai kebutuhan dengan prop styling berikut:

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

- Anda dapat menggunakan Tailwind, CSS module, atau global CSS sesuai kebutuhan project Anda.
- Jika ingin style berbeda untuk dark mode, cukup tambahkan className sesuai framework CSS Anda.

---

## 🛠️ Troubleshooting & Catatan Integrasi
- Jika data tidak muncul, pastikan API Anda mengembalikan `{ items: [{ id, label }], hasMore: false }`.
- Untuk styling, gunakan className atau custom style sesuai kebutuhan.
- Jika menggunakan Tailwind, pastikan sudah setup di project Anda.
- Untuk multi select, aktifkan prop `isMulti`.
- Reset child select jika parent berubah pada cascade.

---

## 🤝 Kontribusi
Pull request, saran, dan issue sangat diterima! Silakan fork repo dan buat PR.

## 👤 Author
**madulinux**  
[GitHub](https://github.com/madulinux)  
[npmjs](https://www.npmjs.com/~madulinux)

## Lisensi
MIT

---
