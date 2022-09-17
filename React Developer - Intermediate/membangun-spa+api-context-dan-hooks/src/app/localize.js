export const localize = {
  // Indonesia
  id: {
    appName: "CatatanQu.",
    logoutText: "Keluar",
    pages: {
      errorPage: {
        text: "Halaman yang kamu cari tidak ditemukan",
        buttonText: "Kembali ke Home",
      },
      login: {
        buttonText: "Masuk",
        loginText: "Masuk untuk menggunakan aplikasi",
        register: {
          text: "Belum punya akun?",
          linkText: "Daftar disini",
        },
        formInputs: [
          {
            type: "email",
            name: "email",
            label: "Alamat Email",
            title: "Masukkan alamat email",
          },
          {
            type: "password",
            name: "password",
            label: "Kata sandi",
            title: "Kata sandi harus berisi minial 8 huruf, 1 huruf besar, 1 nomor dan 1 karakter khusus (opsional, contoh: @#$%&)",
          },
        ],
      },
      register: {
        buttonText: "Daftar",
        registerText: "Isi form untuk mendaftarkan akun",
        loginText: {
          text: "Sudah punya akun?",
          linkText: "Masuk disini",
        },
        formInputs: [
          {
            type: "text",
            name: "name",
            label: "Nama",
            title: "Masukkan nama kamu",
          },
          {
            type: "email",
            name: "email",
            label: "Alamat Email",
            title: "Masukkan alamat email",
          },
          {
            type: "password",
            name: "password",
            label: "Kata sandi",
            title: "Kata sandi harus berisi minial 8 huruf, 1 huruf besar, 1 nomor dan 1 karakter khusus (opsional, contoh: @#$%&)",
          },
          {
            type: "password",
            name: "confirm-password",
            label: "Konfirmasi sandi",
            title: "Konfirmasi kata sandi harus sama dengan Kata Sandi",
          },
        ],
      },
      activeNotes: {
        headlineText: "Catatan Aktif",
        noActiveNotesText: "tidak ada catatan aktif di sini, tambahkan beberapa catatan!",
        noNotesText: "Catatan tidak ditemukan",
        searchPlaceholder: "Cari catatan...",
      },
      archiveNotes: {
        headlineText: "Arsip Catatan",
        noArchivedNotesText: "Sepertinya tidak ada catatan yang diarsipkan di sini, arsipkan beberapa catatan!",
        noNotesText: "Catatan yang Diarsipkan tidak ditemukan",
        searchPlaceholder: "Cari catatan...",
      },
      noteDetails: {
        modalDelete: {
          title: "Apakah kamu yakin?",
          text: "Apakah kamu yakin ingin menghapus catatan ini?",
          buttons: {
            delete: "Hapus",
            cancel: "Batal",
          },
        },
      },
    },
  },

  // English
  en: {
    appName: "CatatanQu.",
    logoutText: "Logout",
    pages: {
      errorPage: {
        text: "The Pages you're looking for is not found",
        buttonText: "Back to Home",
      },
      login: {
        buttonText: "Login",
        loginText: "Login to use the App",
        register: {
          text: "Don't have an account?",
          linkText: "Register here",
        },
        formInputs: [
          {
            type: "email",
            name: "email",
            label: "Email Address",
            title: "Enter an Email Address",
          },
          {
            type: "password",
            name: "password",
            label: "Password",
            title: "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character (optional, ex: @#$%&)",
          },
        ],
      },
      register: {
        buttonText: "Register",
        registerText: "Fill the form to register an account",
        loginText: {
          text: "Already have an account?",
          linkText: "Login here",
        },
        formInputs: [
          {
            type: "text",
            name: "name",
            label: "Name",
            title: "Enter your name",
          },
          {
            type: "email",
            name: "email",
            label: "Email Address",
            title: "Enter your Email Address",
          },
          {
            type: "password",
            name: "password",
            label: "Password",
            title: "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character (optional, ex: @#$%&)",
          },
          {
            type: "password",
            name: "confirm-password",
            label: "Confirm Password",
            title: "Confirm password must be the same as Password",
          },
        ],
      },
      activeNotes: {
        headlineText: "Active Notes",
        noActiveNotesText: "no active notes here, add some notes!",
        noNotesText: "Notes not found",
        searchPlaceholder: "Search notes...",
      },
      archiveNotes: {
        headlineText: "Archived Notes",
        noArchivedNotesText: "Looks like there's no archived notes here, archive some note!",
        noNotesText: "Archived Notes not found",
        searchPlaceholder: "Search notes...",
      },
      noteDetails: {
        modalDelete: {
          title: "Are you sure?",
          text: "Are you sure you want to delete this note?",
          buttons: {
            delete: "Delete",
            cancel: "Cancel",
          },
        },
      },
    },
  },
};
