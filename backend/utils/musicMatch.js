export default function matchMusic(labels, mood) {
  if (labels.includes('bike')) return { title: 'Full Speed – Desi Vibe', link: 'https://youtu.be/abcd1234' };
  if (labels.includes('birthday')) return { title: 'Happy Birthday Song', link: 'https://youtu.be/xyz5678' };
  if (labels.includes('temple')) return { title: 'Shiv Tandav Stotram', link: 'https://youtu.be/E2uVhtmZ8WU' };
  if (mood === 'sad') return { title: 'Soft Sad LoFi', link: 'https://youtu.be/SadLofi123' };
  return { title: 'Chill Vibes', link: 'https://youtu.be/LoFi123abc' };
}
