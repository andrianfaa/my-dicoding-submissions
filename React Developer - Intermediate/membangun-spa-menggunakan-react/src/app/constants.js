export const NOTE_TITLE_PATTERN = /^[a-zA-Z0-9 ]+$/;
export const NOTE_BODY_PATTERN = /^[a-zA-Z0-9#*_\-[\]():/. \n]+$/;

export const DEFAULT_SETTING = {
  theme: "light",
  saveNotesLocally: false,
};
export const DEFAULT_NOTES = [
  {
    id: "25346927-493a-4dc3-8e99-be164945e042",
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "de36cb14-e237-4e35-951b-646d6fed549c",
    title: "Functional component",
    body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "83a4800b-5830-432d-9cd9-c7088f64c069",
    title: "Modularization",
    body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "5f6c5969-3953-4232-b4f9-650c1369ab3d",
    title: "Lifecycle",
    body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "cd1eed6c-1b6f-45ce-928f-3d4c7cfbcc9a",
    title: "ESM",
    body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
  {
    id: "9b9adc4e-5402-4f4f-b73e-58918cf596a4",
    title: "Module Bundler",
    body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
    archived: false,
    createdAt: "2022-04-14T04:27:34.572Z",
  },
];
