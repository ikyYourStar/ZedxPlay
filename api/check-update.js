import axios from 'axios';

export default async function handler(req, res) {
  // 1. Cek API Anime kamu
  const response = await axios.get('https://api.sansekai.my.id/api/anime/latest');
  const latestAnime = response.data[0];

  // 2. LOGIKA: Bandingkan ID (Disini kamu butuh simpan lastId di database)
  // Misal kita anggap sudah ada logic pengecekan ID...

  // 3. Kirim ke OneSignal
  await axios.post('https://onesignal.com/api/v1/notifications', {
    app_id: "1fbb48c3-cf0a-4efd-bd9a-64720da35725",
    included_segments: ["AllUsers"],
    headings: { en: latestAnime.judul },
    contents: { en: `Update: ${latestAnime.lastch}` },
    big_picture: latestAnime.cover
  }, {
    headers: { Authorization: "Basic jqrnwvwmfukc52clx6zb73nd7" }
  });

  return res.status(200).send('Notif Terkirim!');
}
