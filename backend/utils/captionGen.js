export default function generateCaption(labels) {
  if (labels.includes('bike')) return "Born to ride. 🏍️🔥";
  if (labels.includes('temple')) return "Peace in every prayer 🙏";
  if (labels.includes('birthday')) return "Cheers to another year! 🎂🎉";
  if (labels.includes('friends')) return "Memories made with real ones 👯‍♂️";
  return `Just a vibe. ${labels.slice(0, 2).join(', ')} ✨`;
}
