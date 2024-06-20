# Menggunakan base image resmi Node.js versi LTS
FROM node:16

# Mengatur working directory di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin semua file ke dalam working directory di dalam container
COPY . .

# Mengekspos port yang akan digunakan aplikasi
EXPOSE 4000

# Menjalankan aplikasi
CMD [ "npm", "start" ]
