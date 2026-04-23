export const supportedLanguages = ["en", "es", "fr", "ja", "ko"] as const;
export type Language = (typeof supportedLanguages)[number];

export const languageStorageKey = "app_language";

export type I18nDictionary = {
  languageName: string;
  gateTitle: string;
  languageLabel: string;
  gateAdultNotice: string;
  changeLanguageButton: string;
  adultEnterButton: string;
  exitButton: string;
  introTitle: string;
  introDescription: string;
  introNotice: string;
  ageLabel: string;
  nicknameLabel: string;
  agePlaceholder: string;
  nicknamePlaceholder: string;
  startTestButton: string;
  ageError: string;
  nicknameError: string;
  noProfileMessage: string;
  goToStartPage: string;
  testTitle: string;
  pageText: string;
  answerAllError: string;
  prevPageButton: string;
  nextPageButton: string;
  resultButton: string;
  rankHint: string;
  multiHint: string;
  selectAgePlaceholder: string;
  resultTitle: string;
  resultSubtitle: string;
  noResultMessage: string;
  totalScore: string;
  pointUnit: string;
  saveImageButton: string;
  shareResultButton: string;
  shareLinkCopied: string;
  retryTestButton: string;
  shareTitle: string;
  shareText: string;
  rankUnit: string;
};

export const dictionaries: Record<Language, I18nDictionary> = {
  ko: {
    languageName: "한국어",
    gateTitle: "언어 선택 및 성인 확인",
    languageLabel: "언어",
    gateAdultNotice: "이 서비스는 성인만 이용할 수 있습니다.",
    changeLanguageButton: "언어 변경",
    adultEnterButton: "성인입니다 (입장)",
    exitButton: "나가기",
    introTitle: "심리테스트 시작",
    introDescription: "기본 정보를 입력해 주세요.",
    introNotice:
      "- 이 서비스는 개인정보를 수집하지 않습니다. 당신의 답변은 결과 도출을 위해서만 활용되며 별도 서버에 저장되거나 개인을 식별하는 용도로 사용되지 않습니다.\n- 이 서비스는 성인만을 대상으로 하며 성적인 표현이나 노골적인 묘사가 포함될 수 있습니다. 미성년자의 이용을 엄격히 금하며 이용자는 본인의 판단하에 서비스를 이용해주시기 바랍니다.\n- 이 서비스는 오락적 목적으로만 제공됩니다. 성인 사용자의 자기결정권을 존중하며 제작자는 이용과정에서 발생하는 정서적 불편함에 대해 책임을 지지 않습니다.",
    ageLabel: "나이",
    nicknameLabel: "별명",
    agePlaceholder: "예: 25",
    nicknamePlaceholder: "결과 카드에 표시됩니다",
    startTestButton: "테스트 시작하기",
    ageError: "나이는 19~99 사이의 숫자로 입력해 주세요.",
    nicknameError: "별명을 입력해 주세요.",
    noProfileMessage: "기본정보가 없습니다. 처음부터 시작해 주세요.",
    goToStartPage: "시작 페이지로 이동",
    testTitle: "심리테스트 진행",
    pageText: "페이지",
    answerAllError: "현재 페이지의 문항을 모두 선택해 주세요.",
    prevPageButton: "이전 페이지",
    nextPageButton: "다음 페이지",
    resultButton: "결과 보기",
    rankHint: "최대 5개까지 선택 가능, 선택 순서가 순위입니다.",
    multiHint: "복수 선택 가능",
    selectAgePlaceholder: "14세~30세를 선택해 주세요",
    resultTitle: "테스트 결과",
    resultSubtitle: "{nickname} 님의 성향 레벨입니다.",
    noResultMessage: "결과 정보가 없습니다. 테스트를 먼저 진행해 주세요.",
    totalScore: "총점",
    pointUnit: "점",
    saveImageButton: "이미지 저장",
    shareResultButton: "결과 공유",
    shareLinkCopied: "공유 링크를 복사했습니다.",
    retryTestButton: "다시 테스트하기",
    shareTitle: "심리테스트 결과",
    shareText: "{nickname}님의 결과는 {level} ({title})",
    rankUnit: "위",
  },
  en: {
    languageName: "English",
    gateTitle: "Language and Adult Confirmation",
    languageLabel: "Language",
    gateAdultNotice: "This service is for adults only.",
    changeLanguageButton: "Change language",
    adultEnterButton: "I am an adult (Enter)",
    exitButton: "Exit",
    introTitle: "Start the Test",
    introDescription: "Please enter your basic information.",
    introNotice:
      "- This service does not collect personal information. Your answers are used only to generate your result and are not stored on a separate server or used to identify you.\n- This service is intended for adults and may include sexual language or explicit descriptions. Minors are strictly prohibited from using this service. Please use it at your own discretion.\n- This service is provided for entertainment purposes only. We respect the self-determination of adult users, and the creator is not responsible for emotional discomfort experienced while using the service.",
    ageLabel: "Age",
    nicknameLabel: "Nickname",
    agePlaceholder: "e.g. 25",
    nicknamePlaceholder: "Shown on the result card",
    startTestButton: "Start Test",
    ageError: "Please enter an age between 19 and 99.",
    nicknameError: "Please enter a nickname.",
    noProfileMessage: "No profile found. Please start from the beginning.",
    goToStartPage: "Go to start page",
    testTitle: "Test in Progress",
    pageText: "Page",
    answerAllError: "Please answer all questions on this page.",
    prevPageButton: "Previous",
    nextPageButton: "Next",
    resultButton: "View Result",
    rankHint: "You can select up to 5. Selection order becomes ranking.",
    multiHint: "Multiple selections allowed",
    selectAgePlaceholder: "Select an age between 14 and 30",
    resultTitle: "Test Result",
    resultSubtitle: "{nickname}'s level result.",
    noResultMessage: "No result data found. Please take the test first.",
    totalScore: "Total Score",
    pointUnit: "pts",
    saveImageButton: "Save Image",
    shareResultButton: "Share",
    shareLinkCopied: "Share link copied.",
    retryTestButton: "Try Again",
    shareTitle: "Psychology Test Result",
    shareText: "{nickname}'s result is {level} ({title})",
    rankUnit: "rank",
  },
  es: {
    languageName: "Español",
    gateTitle: "Selección de idioma y confirmación de mayoría de edad",
    languageLabel: "Idioma",
    gateAdultNotice: "Este servicio es solo para adultos.",
    changeLanguageButton: "Cambiar idioma",
    adultEnterButton: "Soy mayor de edad (Entrar)",
    exitButton: "Salir",
    introTitle: "Iniciar test",
    introDescription: "Introduce tu información básica.",
    introNotice:
      "- Este servicio no recopila información personal. Tus respuestas se usan únicamente para generar el resultado y no se almacenan en servidores externos ni se utilizan para identificarte.\n- Este servicio está dirigido solo a personas adultas y puede incluir lenguaje sexual o descripciones explícitas. El uso por parte de menores está estrictamente prohibido. Utilízalo bajo tu propio criterio.\n- Este servicio se ofrece únicamente con fines de entretenimiento. Respetamos la autodeterminación de las personas adultas y el creador no se hace responsable de posibles molestias emocionales durante el uso.",
    ageLabel: "Edad",
    nicknameLabel: "Apodo",
    agePlaceholder: "Ej: 25",
    nicknamePlaceholder: "Se mostrará en la tarjeta de resultado",
    startTestButton: "Iniciar test",
    ageError: "Introduce una edad entre 19 y 99.",
    nicknameError: "Introduce un apodo.",
    noProfileMessage: "No hay perfil. Comienza desde el inicio.",
    goToStartPage: "Ir al inicio",
    testTitle: "Test en progreso",
    pageText: "Página",
    answerAllError: "Responde todas las preguntas de esta página.",
    prevPageButton: "Anterior",
    nextPageButton: "Siguiente",
    resultButton: "Ver Resultado",
    rankHint: "Puedes elegir hasta 5. El orden elegido será el ranking.",
    multiHint: "Selección múltiple permitida",
    selectAgePlaceholder: "Selecciona una edad entre 14 y 30",
    resultTitle: "Resultado del test",
    resultSubtitle: "Nivel de {nickname}.",
    noResultMessage: "No hay datos de resultado. Realiza el test primero.",
    totalScore: "Puntuación Total",
    pointUnit: "pts",
    saveImageButton: "Guardar Imagen",
    shareResultButton: "Compartir",
    shareLinkCopied: "Enlace copiado.",
    retryTestButton: "Reintentar",
    shareTitle: "Resultado del Test Psicológico",
    shareText: "El resultado de {nickname} es {level} ({title})",
    rankUnit: "puesto",
  },
  fr: {
    languageName: "Français",
    gateTitle: "Langue et Confirmation Adulte",
    languageLabel: "Langue",
    gateAdultNotice: "Ce service est réservé aux adultes.",
    changeLanguageButton: "Changer la langue",
    adultEnterButton: "Je suis adulte (Entrer)",
    exitButton: "Quitter",
    introTitle: "Commencer le test",
    introDescription: "Veuillez saisir vos informations de base.",
    introNotice:
      "- Ce service ne collecte pas de données personnelles. Vos réponses sont utilisées uniquement pour générer le résultat et ne sont ni stockées sur un serveur séparé ni utilisées pour vous identifier.\n- Ce service est destiné aux adultes et peut contenir des expressions sexuelles ou des descriptions explicites. L'accès est strictement interdit aux mineurs. Veuillez l'utiliser sous votre propre responsabilité.\n- Ce service est fourni uniquement à des fins de divertissement. Nous respectons l'autodétermination des utilisateurs adultes, et le créateur ne peut être tenu responsable d'un éventuel inconfort émotionnel pendant l'utilisation.",
    ageLabel: "Âge",
    nicknameLabel: "Pseudo",
    agePlaceholder: "Ex: 25",
    nicknamePlaceholder: "Affiché sur la carte de résultat",
    startTestButton: "Commencer",
    ageError: "Veuillez entrer un âge entre 19 et 99.",
    nicknameError: "Veuillez entrer un pseudo.",
    noProfileMessage: "Aucun profil trouvé. Recommencez depuis le début.",
    goToStartPage: "Aller au début",
    testTitle: "Test en cours",
    pageText: "Page",
    answerAllError: "Veuillez répondre à toutes les questions de cette page.",
    prevPageButton: "Précédent",
    nextPageButton: "Suivant",
    resultButton: "Voir le Résultat",
    rankHint: "Vous pouvez choisir jusqu'à 5 éléments. L'ordre devient le classement.",
    multiHint: "Sélection multiple autorisée",
    selectAgePlaceholder: "Sélectionnez un âge entre 14 et 30",
    resultTitle: "Résultat du test",
    resultSubtitle: "Niveau de {nickname}.",
    noResultMessage: "Aucun résultat trouvé. Veuillez d'abord faire le test.",
    totalScore: "Score Total",
    pointUnit: "pts",
    saveImageButton: "Enregistrer l'image",
    shareResultButton: "Partager",
    shareLinkCopied: "Lien copié.",
    retryTestButton: "Recommencer",
    shareTitle: "Résultat du Test Psychologique",
    shareText: "Le résultat de {nickname} est {level} ({title})",
    rankUnit: "rang",
  },
  ja: {
    languageName: "日本語",
    gateTitle: "言語選択と成人確認",
    languageLabel: "言語",
    gateAdultNotice: "このサービスは成人のみ利用できます。",
    changeLanguageButton: "言語を変更",
    adultEnterButton: "成人です（入場）",
    exitButton: "終了",
    introTitle: "テスト開始",
    introDescription: "まず基本情報を入力してください。",
    introNotice:
      "- このサービスは個人情報を収集しません。回答は結果算出のためにのみ使用され、外部サーバーへの保存や個人特定の目的では利用されません。\n- このサービスは成人向けであり、性的な表現や露骨な描写を含む場合があります。未成年者の利用は固く禁止します。利用はご自身の判断で行ってください。\n- このサービスは娯楽目的でのみ提供されます。成人利用者の自己決定権を尊重しますが、利用中に生じる精神的な不快感について、制作者は責任を負いません。",
    ageLabel: "年齢",
    nicknameLabel: "ニックネーム",
    agePlaceholder: "例: 25",
    nicknamePlaceholder: "結果カードに表示されます",
    startTestButton: "テスト開始",
    ageError: "年齢は19〜99の数字で入力してください。",
    nicknameError: "ニックネームを入力してください。",
    noProfileMessage: "基本情報がありません。最初から開始してください。",
    goToStartPage: "開始ページへ",
    testTitle: "テスト進行中",
    pageText: "ページ",
    answerAllError: "このページの設問をすべて選択してください。",
    prevPageButton: "前へ",
    nextPageButton: "次へ",
    resultButton: "結果を見る",
    rankHint: "最大5個まで選択可能。選択順が順位になります。",
    multiHint: "複数選択可能",
    selectAgePlaceholder: "14〜30歳を選択してください",
    resultTitle: "テスト結果",
    resultSubtitle: "{nickname}さんのレベル結果です。",
    noResultMessage: "結果情報がありません。先にテストを実施してください。",
    totalScore: "総点",
    pointUnit: "点",
    saveImageButton: "画像を保存",
    shareResultButton: "結果を共有",
    shareLinkCopied: "共有リンクをコピーしました。",
    retryTestButton: "もう一度テスト",
    shareTitle: "心理テスト結果",
    shareText: "{nickname}さんの結果は {level} ({title}) です",
    rankUnit: "位",
  },
};
