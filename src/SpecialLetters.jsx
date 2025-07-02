import React, { useState } from "react";

const CASES = [
  {
    id: 1,
    title: "a קצר (a)",
    key: "short-a",
    description: "צליל תנועה קצר ⟨a⟩ (cat).",
    words: [
      { en: "cat", he: "קַאט" },
      { en: "hat", he: "הַאט" },
      { en: "bag", he: "בַּאג" },
      { en: "map", he: "מַאפ" },
      { en: "apple", he: "אַפֶּל" },
    ],
  },
  {
    id: 2,
    title: "e קצר (e)",
    key: "short-e",
    description: "צליל תנועה קצר ⟨e⟩ (bed).",
    words: [
      { en: "bed", he: "בֶּד" },
      { en: "pen", he: "פֶּן" },
      { en: "men", he: "מֶן" },
      { en: "red", he: "רֶד" },
      { en: "ten", he: "טֶן" },
    ],
  },
  {
    id: 3,
    title: "i קצר (i)",
    key: "short-i",
    description: "צליל תנועה קצר ⟨i⟩ (fish).",
    words: [
      { en: "fish", he: "פִיש" },
      { en: "pig", he: "פִּיג" },
      { en: "ship", he: "שִׁיפּ" },
      { en: "big", he: "בִּיג" },
      { en: "win", he: "וִין" },
    ],
  },
  {
    id: 4,
    title: "o קצר (o)",
    key: "short-o",
    description: "צליל תנועה קצר ⟨o⟩ (dog).",
    words: [
      { en: "dog", he: "דוֹג" },
      { en: "pot", he: "פּוֹט" },
      { en: "hot", he: "הוֹט" },
      { en: "box", he: "בּוֹקס" },
      { en: "sock", he: "סוֹק" },
    ],
  },
  {
    id: 5,
    title: "u קצר (u)",
    key: "short-u",
    description: "צליל תנועה קצר ⟨u⟩ (sun).",
    words: [
      { en: "sun", he: "סַאן" },
      { en: "cup", he: "קַאפ" },
      { en: "bus", he: "בַּאס" },
      { en: "mud", he: "מַאד" },
      { en: "run", he: "רַאן" },
    ],
  },
  {
    id: 6,
    title: "ch = צ׳",
    key: "ch",
    description: "אותיות ch נהגות כמו צ׳.",
    words: [
      { en: "chair", he: "צֶ׳ר" },
      { en: "chicken", he: "צ׳ִיקֶן" },
      { en: "cheese", he: "צ׳ִיז" },
      { en: "cherry", he: "צֶ׳רִי" },
      { en: "chat", he: "צ׳ַאַט" },
    ],
  },
  {
    id: 7,
    title: "sh = שׁ ",
    key: "sh",
    description: "אותיות sh יוצרות צליל שׁ.",
    words: [
      { en: "ship", he: "שִׁיפּ" },
      { en: "shoe", he: "שׂוּ" },
      { en: "sheep", he: "שִׁיפּ" },
      { en: "shark", he: "שַׁארְק" },
      { en: "shop", he: "שׁוֹפּ" },
    ],
  },
  {
    id: 8,
    title: "th (ת׳)",
    key: "th",
    description: "th אטום (voiceless) נהגה ת׳.",
    words: [
      { en: "thin", he: "ת׳ִין" },
      { en: "thumb", he: "ת׳ַאמב" },
      { en: "thick", he: "ת׳ִיק" },
      { en: "thank", he: "ת׳ֵאנְק" },
      { en: "thirst", he: "ת׳ֵרְסט" },
    ],
  },
  {
    id: 9,
    title: "ph= פ",
    key: "ph",
    description: "ph נשמעים כמו פ.",
    words: [
      { en: "phone", he: "פוֹן" },
      { en: "photo", he: "פוֹטוֹ" },
      { en: "dolphin", he: "דוֹלְפִין" },
      { en: "elephant", he: "אֶלֶפַנְט" },
      { en: "alphabet", he: "אַלְפָבֶט" },
    ],
  },
  {
    id: 10,
    title: "wh = וו",
    key: "wh",
    description: " בתחילת מילה נשמע כמו ווw.",
    words: [
      { en: "whale", he: "וֵייל" },
      { en: "wheel", he: "וִיל" },
      { en: "white", he: "וַייט" },
      { en: "whisper", he: "וִיסְפֶר" },
      { en: "wheat", he: "וִיט" },
    ],
  },
  {
    id: 11,
    title: "ck = ק אחרי תנועה קצרה",
    key: "ck",
    description: "השילוב ck לאחר תנועה קצרה נשמע כ-ק.",
    words: [
      { en: "duck", he: "דַאק" },
      { en: "clock", he: "קְלוֹק" },
      { en: "rock", he: "רוֹק" },
      { en: "pack", he: "פַּאק" },
      { en: "sock", he: "סוֹק" },
    ],
  },
  {
    id: 12,
    title: "c רכה = ס",
    key: "soft-c",
    description: "c לפני e/i/y נהגית ס.",
    words: [
      { en: "city", he: "סִיטי" },
      { en: "cent", he: "סֶנְט" },
      { en: "ice", he: "אַייס" },
      { en: "face", he: "פֵיס" },
      { en: "bicycle", he: "בַּיְסִיקְל" },
    ],
  },
  {
    id: 13,
    title: "c קשה = ק",
    key: "hard-c",
    description: "c לפני אות אחרת נשמעת ק.",
    words: [
      { en: "cat", he: "קַאט" },
      { en: "corn", he: "קוֹרְן" },
      { en: "cup", he: "קַאפ" },
      { en: "cap", he: "קַאפ" },
      { en: "cold", he: "קוֹלד" },
    ],
  },
  {
    id: 14,
    title: "g רכה = ג׳",
    key: "soft-g",
    description: "g לפני e/i/y נשמעת ג׳.",
    words: [
      { en: "giant", he: "ג׳ַיַאנְט" },
      { en: "giraffe", he: "ג׳ִירַאף" },
      { en: "gem", he: "ג׳ֶם" },
      { en: "gentle", he: "ג׳ֶנְטְל" },
      { en: "magic", he: "מַג׳ִיק" },
    ],
  },
  {
    id: 15,
    title: "g קשה = ג",
    key: "hard-g",
    description: "g קשה נשמעת ג.",
    words: [
      { en: "goat", he: "גוֹאט" },
      { en: "game", he: "גֵיים" },
      { en: "garden", he: "גַארְדֶן" },
      { en: "gum", he: "גַאם" },
      { en: "gold", he: "גוֹלד" },
    ],
  },
  {
    id: 16,
    title: "Magic-e a_e",
    key: "magic-a",
    description: "אות ‎e‎ סופית מאריכה את a (a_e).",
    words: [
      { en: "cake", he: "קֵייק" },
      { en: "make", he: "מֵייק" },
      { en: "name", he: "נֵיים" },
      { en: "same", he: "סֵיים" },
      { en: "gate", he: "גֵייט" },
    ],
  },
  {
    id: 17,
    title: "Magic-e e_e",
    key: "magic-e",
    description: "אות ‎e‎ סופית מאריכה את e (e_e).",
    words: [
      { en: "theme", he: "ת׳ִים" },
      { en: "scene", he: "סִין" },
      { en: "these", he: "דִיז" },
      { en: "gene", he: "ג׳ִין" },
      { en: "here", he: "הִיר" },
    ],
  },
  {
    id: 18,
    title: "Magic-e i_e",
    key: "magic-i",
    description: "i becomes /aɪ/ עם e סופית (i_e).",
    words: [
      { en: "bike", he: "בַּייק" },
      { en: "kite", he: "קַייט" },
      { en: "ride", he: "רַייד" },
      { en: "line", he: "לַיין" },
      { en: "five", he: "פַייב" },
    ],
  },
  {
    id: 19,
    title: "Magic-e o_e",
    key: "magic-o",
    description: "o becomes /oʊ/ עם e סופית (o_e).",
    words: [
      { en: "note", he: "נוֹט" },
      { en: "home", he: "הוֹם" },
      { en: "rope", he: "רוֹפּ" },
      { en: "nose", he: "נוֹז" },
      { en: "stone", he: "סְטוֹן" },
    ],
  },
  {
    id: 20,
    title: "Magic-e u_e",
    key: "magic-u",
    description: "u becomes /juː/ או /uː/ עם e סופית (u_e).",
    words: [
      { en: "cube", he: "קְיוּבּ" },
      { en: "mute", he: "מיוט" },
      { en: "tune", he: "טיּוּן" },
      { en: "duke", he: "דיּוּק" },
      { en: "flute", he: "פְלוּט" },
    ],
  },
];

// מיפוי למטה-דאטה: אייקון ותרגום לעברית
const WORD_META = {
  cat: { icon: "🐱", trans: "חתול" },
  hat: { icon: "🎩", trans: "כובע" },
  bag: { icon: "🛍️", trans: "תיק" },
  map: { icon: "🗺️", trans: "מפה" },
  apple: { icon: "🍎", trans: "תפוח" },
  bed: { icon: "🛏️", trans: "מיטה" },
  pen: { icon: "🖊️", trans: "עט" },
  men: { icon: "👨‍👨‍👦", trans: "גברים" },
  red: { icon: "🟥", trans: "אדום" },
  ten: { icon: "🔟", trans: "עשר" },
  fish: { icon: "🐟", trans: "דג" },
  pig: { icon: "🐷", trans: "חזיר" },
  ship: { icon: "🚢", trans: "ספינה" },
  big: { icon: "⬆️", trans: "גדול" },
  win: { icon: "🏆", trans: "ניצחון" },
  dog: { icon: "🐶", trans: "כלב" },
  pot: { icon: "🍲", trans: "סיר" },
  hot: { icon: "🔥", trans: "חם" },
  box: { icon: "📦", trans: "קופסה" },
  sock: { icon: "🧦", trans: "גרב" },
  sun: { icon: "☀️", trans: "שמש" },
  cup: { icon: "☕️", trans: "כוס" },
  bus: { icon: "🚌", trans: "אוטובוס" },
  mud: { icon: "🪨", trans: "בוץ" },
  run: { icon: "🏃", trans: "ריצה" },
  chair: { icon: "💺", trans: "כיסא" },
  chicken: { icon: "🐔", trans: "תרנגולת" },
  cheese: { icon: "🧀", trans: "גבינה" },
  cherry: { icon: "🍒", trans: "דובדבן" },
  chat: { icon: "💬", trans: "שיחה" },
  shoe: { icon: "👟", trans: "נעל" },
  sheep: { icon: "🐑", trans: "כבשה" },
  shark: { icon: "🦈", trans: "כריש" },
  shop: { icon: "🏪", trans: "חנות" },
  thin: { icon: "↔️", trans: "דק" },
  thumb: { icon: "👍", trans: "אגודל" },
  thick: { icon: "📚", trans: "עבה" },
  thank: { icon: "🙏", trans: "תודה" },
  thirst: { icon: "💧", trans: "צמא" },
  phone: { icon: "📱", trans: "טלפון" },
  photo: { icon: "📷", trans: "תמונה" },
  dolphin: { icon: "🐬", trans: "דולפין" },
  elephant: { icon: "🐘", trans: "פיל" },
  alphabet: { icon: "🔤", trans: "אלפבית" },
  whale: { icon: "🐳", trans: "לווייתן" },
  wheel: { icon: "🛞", trans: "גלגל" },
  white: { icon: "⚪️", trans: "לבן" },
  whisper: { icon: "🤫", trans: "לחישה" },
  wheat: { icon: "🌾", trans: "חיטה" },
  duck: { icon: "🦆", trans: "ברווז" },
  clock: { icon: "⏰", trans: "שעון" },
  rock: { icon: "🪨", trans: "סלע" },
  pack: { icon: "📦", trans: "חבילה" },
  city: { icon: "🏙️", trans: "עיר" },
  cent: { icon: "💰", trans: "סנט" },
  ice: { icon: "🧊", trans: "קרח" },
  face: { icon: "🙂", trans: "פנים" },
  bicycle: { icon: "🚲", trans: "אופניים" },
  corn: { icon: "🌽", trans: "תירס" },
  cap: { icon: "🧢", trans: "כובע מצחייה" },
  cold: { icon: "🥶", trans: "קר" },
  giant: { icon: "🧍", trans: "ענק" },
  giraffe: { icon: "🦒", trans: "ג'ירף" },
  gem: { icon: "💎", trans: "אבן חן" },
  gentle: { icon: "🤲", trans: "עדין" },
  magic: { icon: "🎩", trans: "קסם" },
  goat: { icon: "🐐", trans: "עז" },
  game: { icon: "🎮", trans: "משחק" },
  garden: { icon: "🌳", trans: "גינה" },
  gum: { icon: "🍬", trans: "מסטיק" },
  gold: { icon: "🪙", trans: "זהב" },
  cake: { icon: "🍰", trans: "עוגה" },
  make: { icon: "🔨", trans: "לעשות" },
  name: { icon: "🪪", trans: "שם" },
  same: { icon: "🔁", trans: "אותו" },
  gate: { icon: "🚪", trans: "שער" },
  theme: { icon: "🎭", trans: "נושא" },
  scene: { icon: "🎬", trans: "סצנה" },
  these: { icon: "👉", trans: "אלה" },
  gene: { icon: "🧬", trans: "גן" },
  here: { icon: "📍", trans: "כאן" },
  bike: { icon: "🚲", trans: "אופניים" },
  kite: { icon: "🪁", trans: "עפיפון" },
  ride: { icon: "🐎", trans: "רכיבה" },
  line: { icon: "📏", trans: "קו" },
  five: { icon: "5️⃣", trans: "חמש" },
  note: { icon: "📝", trans: "פתק" },
  home: { icon: "🏠", trans: "בית" },
  rope: { icon: "🪢", trans: "חבל" },
  nose: { icon: "👃", trans: "אף" },
  stone: { icon: "🪨", trans: "אבן" },
  cube: { icon: "🧊", trans: "קובייה" },
  mute: { icon: "🤫", trans: "השתקה" },
  tune: { icon: "🎶", trans: "מנגינה" },
  duke: { icon: "🤴", trans: "דוכס" },
  flute: { icon: "🪈", trans: "חליל" },
};

function speak(text) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }
}

export default function SpecialLetters({ onBack }) {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const rule = CASES.find((c) => c.key === selected);
    return (
      <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32, position: "relative" }}>
        <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 20, left: 20 }}>חזרה</button>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>{rule.title}</h1>
        <p style={{ fontSize: 22, marginBottom: 24 }}>{rule.description}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {rule.words.map((w) => (
            <div key={w.en} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 34 }}>
                {(WORD_META[w.en.toLowerCase()]?.icon ?? "")} {w.en}
              </div>
              <div style={{ fontSize: 26 }}>{w.he}</div>
              {WORD_META[w.en.toLowerCase()]?.trans && (
                <div style={{ fontSize: 22 }}>{WORD_META[w.en.toLowerCase()].trans}</div>
              )}
              <button onClick={() => speak(w.en)} style={{ marginTop: 4, fontSize: 14 }}>🔊</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32 }}>
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20 }}>חזרה</button>
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>אותיות מיוחדות</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {CASES.map((c) => {
          const firstWord = c.words[0]?.en.toLowerCase();
          const icon = WORD_META[firstWord]?.icon ?? "";
          return (
            <button
              key={c.key}
              onClick={() => setSelected(c.key)}
              style={{
                width: 160,
                height: 100,
                borderRadius: 14,
                border: "2px solid #333",
                background: "#fafafa",
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 6,
                gap: 4,
              }}
            >
              <span style={{ fontSize: 28 }}>{icon}</span>
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 