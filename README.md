📚 REST API TOKO BUKU

Tujuan Proyek
Proyek ini mengimplementasikan REST API lengkap untuk mengelola koleksi buku (`/books`) menggunakan Express.js. Semua persyaratan wajib telah diselesaikan, meliputi: CRUD Lengkap, Express Router, Middleware Kustom (Logging dan Validasi), dan Global Error Handling.

1. Pengujian Fungsionalitas Utama (CRUD)
Berikut adalah bukti pengujian untuk semua operasi CRUD yang berhasil.

1.1. GET /books (Read All)
Mengambil semua koleksi buku. (Status 200 OK).
![GET All Sukses](dokumentasi/CRUD/GET-ALL.jpg)

1.2. GET /books/:id (Read by ID)
Mengambil detail buku spesifik (`/books/1`) (Status 200 OK).
![GET by ID Sukses](dokumentasi/CRUD/GET-ID.jpg)

1.3. POST /books (Create)
Menambahkan buku baru ke koleksi (Status 201 Created).
![POST Create Sukses](ddokumentasi/CRUD/POST.jpg)

1.4. PUT /books/:id (Update)
Memperbarui detail buku yang sudah ada (Status 200 OK).
![PUT Update Sukses](dokumentasi/CRUD/PUT.jpg)

1.5. DELETE /books/:id (Delete)
Menghapus buku dari koleksi (`/books/6`) (Status 204 No Content).
![DELETE Sukses](dokumentasi/CRUD/DELETE.jpg)


2. Pengujian Error Handling dan Validasi
Bagian ini membuktikan middleware kustom berfungsi menangani kesalahan.

2.1. 400 Bad Request (Middleware Validasi)
Membuktikan middleware validasi (`validation.js`) menolak input tanpa `author` atau `title`.
![POST 400 Bad Request](dokumentasi/CRUD/POST-400.jpg)

2.2. 404 Not Found (Data Tidak Ada)
Membuktikan penanganan data yang tidak ditemukan (`/books/9`).
![GET 404 Not Found](dokumentasi/CRUD/GET-404.jpg)

2.3. 500 Internal Server Error
Membuktikan Global Error Handler (middleware 4 argumen) berfungsi saat server crash tak terduga.
![POST 500 Internal Server Error](dokumentasi/CRUD/POST-500.jpg)


3. Pengujian Middleware Kustom & Statis

3.1. File Statis (/images)
Membuktikan express.static berfungsi memuat gambar cover buku.
![GET File Statis](dokumentasi/CRUD/GET-IMAGE.jpg)

3.2. Middleware Logger
Membuktikan middleware logger mencatat setiap permintaan ke konsol server.
![Middleware Logger Output](dokumentasi/CRUD/MIDDLEWARE-CUSTOM.jpg)


4. Implementasi Autentikasi dan Otorisasi Role (JWT)

4.1. Proses Login dan Otentikasi
Login Admin (Mendapatkan Token)
![ADMIN LOGIN Sukses](dokumentasi/CRUD-ROLE/ADMIN-LOGIN.jpg)

Login Guest (Mendapatkan Token)
![GUEST LOGIN Sukses](dokumentasi/CRUD-ROLE/GUEST-LOGIN.jpg)

Akses Ditolak Tanpa Token (401 Unauthorized)
![GET Tanpa Token 401](dokumentasi/CRUD-ROLE/GET-NO-TOKEN.jpg)

4.2. Uji Hak Akses GUEST (Read Only)
Guest Mencoba GET /books (Sukses)
![GUEST GET Sukses](dokumentasi/CRUD-ROLE/GUESS-GET.jpg)

Guest Mencoba POST /books (Ditolak)
![GUEST POST Ditolak 403](dokumentasi/CRUD-ROLE/GUESS-POST.jpg)

Guest Mencoba PUT /books/:id (Ditolak)
![GUEST PUT Ditolak 403](dokumentasi/CRUD-ROLE/GUESS-PUT.jpg)

Guest Mencoba DELETE /books/:id (Ditolak)
![GUEST DELETE Ditolak 403](dokumentasi/CRUD-ROLE/GUESS-DELETE.jpg)

4.3. Uji Hak Akses ADMIN (Full CRUD)
Admin Mencoba GET /books (Sukses)
![ADMIN GET Sukses](dokumentasi/CRUD-ROLE/ADMIN-GET.jpg)

Admin Mencoba POST /books (Sukses)
![ADMIN POST Sukses 201](dokumentasi/CRUD-ROLE/ADMIN-POST.jpg)

Admin Mencoba PUT /books/:id (Sukses)
![ADMIN PUT Sukses 200](dokumentasi/CRUD-ROLE/ADMIN-PUT.jpg)

Admin Mencoba DELETE /books/:id (Sukses)
![ADMIN DELETE Sukses 204](dokumentasi/CRUD-ROLE/ADMIN-DELETE.jpg)