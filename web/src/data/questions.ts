import type { Language } from "@/lib/i18n";
import {
  optionTextTranslations,
  questionTextTranslations,
} from "@/data/translations/questionText";

export type Option = {
  id: string;
  text: string;
  score: number;
};

export type Question = {
  id: string;
  page: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  options: Option[];
  inputType?: "buttons" | "select" | "multi" | "rank";
  dependsOnQuestionId?: string;
};

const yesNoOptions: Option[] = [
  { id: "a", text: "예", score: 4 },
  { id: "b", text: "아니오", score: 0 },
];

const threeOptions: Option[] = [
  { id: "a", text: "예", score: 4 },
  { id: "b", text: "보통이다", score: 2 },
  { id: "c", text: "아니오", score: 0 },
];

const fiveOptions: Option[] = [
  { id: "a", text: "경험 없음", score: 0 },
  { id: "b", text: "별로다", score: 1 },
  { id: "c", text: "보통이다", score: 2 },
  { id: "d", text: "좋다", score: 3 },
  { id: "e", text: "아주 좋다", score: 4 },
];

const firstSexAgeOptions: Option[] = Array.from({ length: 17 }, (_, i) => {
  const age = 14 + i;
  return {
    id: `age-${age}`,
    text: age === 14 ? "14세 이하" : age === 30 ? "30세 이상" : `${age}세`,
    score: 30 - age,
  };
});

const partnerCountOptions: Option[] = Array.from({ length: 11 }, (_, i) => {
  const partnerCountScoreMap = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 22];
  return {
    id: i < 10 ? `pair-${i}` : "pair-10-plus",
    text: i === 0 ? "0명(경험없음)" : i < 10 ? `${i}명` : "10명 이상",
    score: partnerCountScoreMap[i],
  };
});

const weeklyFrequencyOptions: Option[] = [
  { id: "d1", text: "1일", score: 0 },
  { id: "d2", text: "2일", score: 2 },
  { id: "d3", text: "3일", score: 4 },
  { id: "d4", text: "4일", score: 6 },
  { id: "d5", text: "5일", score: 8 },
  { id: "d6", text: "6일", score: 10 },
  { id: "d7", text: "7일", score: 12 },
];

const lifetimePartnerOptions: Option[] = Array.from({ length: 20 }, (_, i) => {
  const count = i + 1;
  return {
    id: count < 20 ? `count-${count}` : "count-20-plus",
    text: count < 20 ? `${count}명` : "20명 이상",
    score: count - 1,
  };
});

const exposurePlaceOptions: Option[] = [
  { id: "stairs", text: "건물 계단", score: 1 },
  { id: "rooftop", text: "건물 옥상", score: 1 },
  { id: "highway-rest", text: "고속도로 휴게소", score: 1 },
  { id: "park", text: "공원", score: 1 },
  { id: "church", text: "교회", score: 1 },
  { id: "theater", text: "극장", score: 1 },
  { id: "theme-park", text: "놀이공원", score: 1 },
  { id: "playground", text: "놀이터", score: 1 },
  { id: "library-bookstore", text: "도서관/서점", score: 1 },
  { id: "room-cafe", text: "룸카페", score: 1 },
  { id: "comic-cafe", text: "만화카페", score: 1 },
  { id: "bus", text: "버스", score: 1 },
  { id: "hallway", text: "복도", score: 1 },
  { id: "airplane", text: "비행기", score: 1 },
  { id: "bookstore", text: "서점", score: 1 },
  { id: "mall", text: "쇼핑몰/백화점", score: 1 },
  { id: "pool", text: "수영장", score: 1 },
  { id: "elevator", text: "엘리베이터", score: 1 },
  { id: "train", text: "열차", score: 1 },
  { id: "yacht", text: "요트", score: 1 },
  { id: "restaurant", text: "음식점", score: 1 },
  { id: "parking-lot", text: "주차장", score: 1 },
  { id: "subway", text: "지하철", score: 1 },
  { id: "sauna", text: "찜질방", score: 1 },
  { id: "cafe", text: "카페", score: 1 },
  { id: "camping", text: "캠핑장", score: 1 },
  { id: "cable-car", text: "케이블카", score: 1 },
  { id: "club", text: "클럽", score: 1 },
  { id: "festival", text: "페스티벌", score: 1 },
  { id: "fitting-room", text: "피팅룸", score: 1 },
  { id: "school-academy", text: "학교/학원", score: 1 },
  { id: "beach", text: "해변가", score: 1 },
  { id: "bathroom", text: "화장실", score: 1 },
  { id: "office", text: "회사", score: 1 },
  { id: "pc-room", text: "PC방", score: 1 },
];

export const questionsByPage: Record<Question["page"], Question[]> = {
  1: [
    { id: "p1-q1", page: 1, text: "나는 섹스를 해봤다", options: yesNoOptions },
    { id: "p1-q2", page: 1, text: "나는 피어싱을 했다", options: yesNoOptions },
    { id: "p1-q3", page: 1, text: "나는 담배를 핀다", options: yesNoOptions },
    { id: "p1-q4", page: 1, text: "나는 술을 좋아한다", options: yesNoOptions },
    {
      id: "p1-q5",
      page: 1,
      text: "나에게는 문신이 있다",
      options: yesNoOptions,
    },
    {
      id: "p1-q6",
      page: 1,
      text: "코스튬이나 도구를 사용해 본 적이 있다",
      options: yesNoOptions,
    },
    {
      id: "p1-q7",
      page: 1,
      text: "일부러 속옷 노출을 즐긴 적이 있다(브라, 팬티)",
      options: yesNoOptions,
    },
    {
      id: "p1-q8",
      page: 1,
      text: "속이 비치는 옷을 입고 노출을 즐긴 적이 있다(시스루)",
      options: yesNoOptions,
    },
  ],
  2: [
    { id: "p2-q1", page: 2, text: "나는 선섹후사다", options: yesNoOptions },
    {
      id: "p2-q2",
      page: 2,
      text: "나는 바람을 핀 적이 있다",
      options: yesNoOptions,
    },
    {
      id: "p2-q3",
      page: 2,
      text: "나는 돈을 벌기 위해 섹스를 해본 적이 있다",
      options: yesNoOptions,
    },
    {
      id: "p2-q4",
      page: 2,
      text: "야한 상상을 많이 한다",
      options: threeOptions,
    },
    {
      id: "p2-q5",
      page: 2,
      text: "나는 섹스를 좋아한다",
      options: threeOptions,
    },
    {
      id: "p2-q6",
      page: 2,
      text: "나는 내가 걸레라고 생각한다",
      options: threeOptions,
    },
    {
      id: "p2-q7",
      page: 2,
      text: "나는 내가 변태라고 생각한다",
      options: threeOptions,
    },
    {
      id: "p2-q8",
      page: 2,
      text: "내 파트너가 다른 사람과 관계하는 것을 보거나 상상하면 흥분된다",
      options: threeOptions,
    },
  ],
  3: [
    {
      id: "p3-q1",
      page: 3,
      text: "노출이 심한 옷을 입고 다른 사람들의 시선을 즐기곤 한다",
      options: fiveOptions,
    },
    {
      id: "p3-q2",
      page: 3,
      text: "노브라로 외출하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p3-q3",
      page: 3,
      text: "노팬티로 외출하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p3-q4",
      page: 3,
      text: "공공장소에서 몰래 옷을 벗는 것을 즐긴다",
      options: fiveOptions,
    },
    {
      id: "p3-q5",
      page: 3,
      text: "딜도로 자위하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p3-q6",
      page: 3,
      text: "우머나이저로 자위하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p3-q7",
      page: 3,
      text: "원격 토이를 착용한채로 돌아다닌 것을 즐긴다",
      options: fiveOptions,
    },
    {
      id: "p3-q8",
      page: 3,
      text: "집에서 다른 사람이 있는데 몰래 자위하는 것을 즐긴다",
      options: fiveOptions,
    },
  ],
  4: [
    {
      id: "p4-q1",
      page: 4,
      text: "원나잇 섹스를 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p4-q2",
      page: 4,
      text: "야외에서 섹스를 하는걸 좋아한다",
      options: fiveOptions,
    },
    { id: "p4-q3", page: 4, text: "카섹스를 좋아한다", options: fiveOptions },
    {
      id: "p4-q4",
      page: 4,
      text: "애널 섹스를 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p4-q5",
      page: 4,
      text: "파트너와 사진이나 영상 촬영을 즐긴다",
      options: fiveOptions,
    },
    {
      id: "p4-q6",
      page: 4,
      text: "섹스를 하며 다른 사람과 통화하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p4-q7",
      page: 4,
      text: "쓰리섬이나 스와핑을 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p4-q8",
      page: 4,
      text: "섹스 중에 욕이나 상스러운 표현을 즐긴다",
      options: fiveOptions,
    },
  ],
  5: [
    {
      id: "p5-q1",
      page: 5,
      text: "입으로 자지를 빨아주는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q2",
      page: 5,
      text: "아헤가오 표정을 하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q3",
      page: 5,
      text: "얼굴 위로 정액을 받는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q4",
      page: 5,
      text: "보지 안에 정액을 받는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q5",
      page: 5,
      text: "섹스 중 목을 조르거나 목 졸림을 당하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q6",
      page: 5,
      text: "구역질이 날 정도로 목구멍 깊이 삽입 당하는걸 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q7",
      page: 5,
      text: "정액을 먹는 것을 좋아한다",
      options: fiveOptions,
    },
    {
      id: "p5-q8",
      page: 5,
      text: "성적인 행위를 하며 때리거나 맞는걸 좋아한다",
      options: fiveOptions,
    },
  ],
  6: [
    {
      id: "p6-q1",
      page: 6,
      text: "처음으로 섹스를 한 나이는?",
      options: firstSexAgeOptions,
      inputType: "select",
    },
    {
      id: "p6-q2",
      page: 6,
      text: "나는 동시에 2명 이상의 파트너와 섹스를 해본 적이 있다",
      options: partnerCountOptions,
      inputType: "select",
    },
    {
      id: "p6-q3",
      page: 6,
      text: "파트너가 있을 때 일주일 평균 관계 횟수는?",
      options: weeklyFrequencyOptions,
      inputType: "select",
    },
    {
      id: "p6-q4",
      page: 6,
      text: "나는 여태까지 ( )명의 사람과 섹스를 해봤다",
      options: lifetimePartnerOptions,
      inputType: "select",
    },
    {
      id: "p6-q5",
      page: 6,
      text: "노출이나 섹스를 해본 장소를 모두 고르시오",
      options: exposurePlaceOptions,
      inputType: "multi",
    },
    {
      id: "p6-q6",
      page: 6,
      text: "가장 흥분됐던 1~5위를 고르시오(45번에서 선택한 것만 제시)",
      options: [],
      inputType: "rank",
      dependsOnQuestionId: "p6-q5",
    },
  ],
};

export const pageOrder: Question["page"][] = [1, 2, 3, 4, 5, 6];

export const totalQuestionCount = pageOrder.reduce(
  (acc, page) => acc + questionsByPage[page].length,
  0,
);

export function getLocalizedQuestionText(
  text: string,
  language: Language,
): string {
  if (language === "ko") return text;
  return (
    questionTextTranslations[language][text] ??
    questionTextTranslations.en[text] ??
    text
  );
}

export function getLocalizedOptionText(
  text: string,
  language: Language,
): string {
  if (language === "ko") return text;

  if (text === "14세 이하") {
    if (language === "ja") return "14歳以下";
    if (language === "fr") return "14 ans ou moins";
    if (language === "es") return "14 años o menos";
    if (language === "en") return "14 or younger";
  }
  if (text === "30세 이상") {
    if (language === "ja") return "30歳以上";
    if (language === "fr") return "30 ans ou plus";
    if (language === "es") return "30 años o más";
    if (language === "en") return "30 or older";
  }
  if (text === "20명 이상") {
    if (language === "ja") return "20人以上";
    if (language === "fr") return "20 personnes ou plus";
    if (language === "es") return "20 personas o más";
    if (language === "en") return "20 or more";
  }
  if (text === "0명(경험없음)") {
    if (language === "ja") return "0人（経験なし）";
    if (language === "fr") return "0 personne (aucune expérience)";
    if (language === "es") return "0 personas (sin experiencia)";
    if (language === "en") return "0 (no experience)";
  }

  const ageMatch = text.match(/^(\d+)세$/);
  const dayMatch = text.match(/^(\d+)일$/);
  const peopleMatch = text.match(/^(\d+)명$/);

  if (ageMatch) {
    if (language === "ja") return `${ageMatch[1]}歳`;
    if (language === "fr") return `${ageMatch[1]} ans`;
    if (language === "es") return `${ageMatch[1]} años`;
    if (language === "en") return `${ageMatch[1]}`;
  }
  if (dayMatch) {
    if (language === "ja") return `${dayMatch[1]}日`;
    if (language === "fr") return `${dayMatch[1]} jour(s)`;
    if (language === "es") return `${dayMatch[1]} día(s)`;
    if (language === "en") return `${dayMatch[1]} day(s)`;
  }
  if (peopleMatch) {
    if (language === "ja") return `${peopleMatch[1]}人`;
    if (language === "fr") return `${peopleMatch[1]} personne(s)`;
    if (language === "es") return `${peopleMatch[1]} persona(s)`;
    if (language === "en") return `${peopleMatch[1]}`;
  }

  const placeTextEn: Record<string, string> = {
    "건물 계단": "Building stairs",
    "건물 옥상": "Rooftop",
    "고속도로 휴게소": "Highway rest area",
    공원: "Park",
    교회: "Church",
    극장: "Theater",
    놀이공원: "Amusement park",
    놀이터: "Playground",
    "도서관/서점": "Library/Bookstore",
    룸카페: "Room cafe",
    만화카페: "Comic cafe",
    버스: "Bus",
    복도: "Hallway",
    비행기: "Airplane",
    서점: "Bookstore",
    "쇼핑몰/백화점": "Mall/Department store",
    수영장: "Swimming pool",
    엘리베이터: "Elevator",
    열차: "Train",
    요트: "Yacht",
    음식점: "Restaurant",
    주차장: "Parking lot",
    지하철: "Subway",
    찜질방: "Sauna",
    카페: "Cafe",
    캠핑장: "Camping site",
    케이블카: "Cable car",
    클럽: "Club",
    페스티벌: "Festival",
    피팅룸: "Fitting room",
    "학교/학원": "School/Academy",
    해변가: "Beach",
    화장실: "Restroom",
    회사: "Office",
    PC방: "PC room",
  };
  const placeTextEs: Record<string, string> = {
    "건물 계단": "Escaleras del edificio",
    "건물 옥상": "Azotea",
    "고속도로 휴게소": "Área de descanso en autopista",
    공원: "Parque",
    교회: "Iglesia",
    극장: "Teatro",
    놀이공원: "Parque de atracciones",
    놀이터: "Zona de juegos",
    "도서관/서점": "Biblioteca/Librería",
    룸카페: "Café privado",
    만화카페: "Café de cómics",
    버스: "Autobús",
    복도: "Pasillo",
    비행기: "Avión",
    서점: "Librería",
    "쇼핑몰/백화점": "Centro comercial/Grandes almacenes",
    수영장: "Piscina",
    엘리베이터: "Ascensor",
    열차: "Tren",
    요트: "Yate",
    음식점: "Restaurante",
    주차장: "Aparcamiento",
    지하철: "Metro",
    찜질방: "Sauna",
    카페: "Cafetería",
    캠핑장: "Camping",
    케이블카: "Teleférico",
    클럽: "Club",
    페스티벌: "Festival",
    피팅룸: "Probador",
    "학교/학원": "Escuela/Academia",
    해변가: "Playa",
    화장실: "Baño",
    회사: "Oficina",
    PC방: "Cibercafé",
  };
  const placeTextFr: Record<string, string> = {
    "건물 계단": "Escaliers de bâtiment",
    "건물 옥상": "Toit-terrasse",
    "고속도로 휴게소": "Aire d'autoroute",
    공원: "Parc",
    교회: "Église",
    극장: "Théâtre",
    놀이공원: "Parc d'attractions",
    놀이터: "Aire de jeux",
    "도서관/서점": "Bibliothèque/Librairie",
    룸카페: "Café privé",
    만화카페: "Café manga",
    버스: "Bus",
    복도: "Couloir",
    비행기: "Avion",
    서점: "Librairie",
    "쇼핑몰/백화점": "Centre commercial/Grand magasin",
    수영장: "Piscine",
    엘리베이터: "Ascenseur",
    열차: "Train",
    요트: "Yacht",
    음식점: "Restaurant",
    주차장: "Parking",
    지하철: "Métro",
    찜질방: "Sauna",
    카페: "Café",
    캠핑장: "Camping",
    케이블카: "Téléphérique",
    클럽: "Club",
    페스티벌: "Festival",
    피팅룸: "Cabine d'essayage",
    "학교/학원": "École/Académie",
    해변가: "Plage",
    화장실: "Toilettes",
    회사: "Bureau",
    PC방: "Cybercafé",
  };
  const placeTextJa: Record<string, string> = {
    "건물 계단": "建物の階段",
    "건물 옥상": "建物の屋上",
    "고속도로 휴게소": "高速道路のサービスエリア",
    공원: "公園",
    교회: "教会",
    극장: "劇場",
    놀이공원: "遊園地",
    놀이터: "遊び場",
    "도서관/서점": "図書館/書店",
    룸카페: "ルームカフェ",
    만화카페: "漫画喫茶",
    버스: "バス",
    복도: "廊下",
    비행기: "飛行機",
    서점: "書店",
    "쇼핑몰/백화점": "ショッピングモール/百貨店",
    수영장: "プール",
    엘리베이터: "エレベーター",
    열차: "列車",
    요트: "ヨット",
    음식점: "飲食店",
    주차장: "駐車場",
    지하철: "地下鉄",
    찜질방: "サウナ",
    카페: "カフェ",
    캠핑장: "キャンプ場",
    케이블카: "ケーブルカー",
    클럽: "クラブ",
    페스티벌: "フェスティバル",
    피팅룸: "試着室",
    "학교/학원": "学校/塾",
    해변가: "海辺",
    화장실: "トイレ",
    회사: "会社",
    PC방: "PCカフェ",
  };

  const base =
    optionTextTranslations[language][text] ??
    (language !== "en" ? optionTextTranslations.en[text] : undefined) ??
    (language === "es"
      ? placeTextEs[text]
      : language === "fr"
        ? placeTextFr[text]
        : language === "ja"
          ? placeTextJa[text]
          : placeTextEn[text]) ??
    placeTextEn[text] ??
    text;
  return base;
}
