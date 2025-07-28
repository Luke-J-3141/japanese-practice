// Sample vocabulary data
const vocabularyData = [
{
    id: "water_001",
    english: "water",
    hiragana: "みず",
    katakana: "ミズ",
    kanji: "水",
    romaji: "mizu",
    commonWriting: "水",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "daily-life", "drinks", "essential"],
    relatedWords: ["drink", "tea"]
},
{
    id: "drink_001",
    english: "to drink",
    hiragana: "のむ",
    katakana: "ノム",
    kanji: "飲む",
    romaji: "nomu",
    commonWriting: "飲む",
    wordType: "godan-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "daily-life", "verbs", "essential"],
    relatedWords: ["water", "tea", "eat"]
},
{
    id: "big_001",
    english: "big",
    hiragana: "おおきい",
    katakana: "オオキイ",
    kanji: "大きい",
    romaji: "ookii",
    commonWriting: "大きい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0011",
    tags: ["basic", "adjectives", "size"],
    relatedWords: ["small", "size"]
},
{
    id: "small_001",
    english: "small",
    hiragana: "ちいさい",
    katakana: "チイサイ",
    kanji: "小さい",
    romaji: "chiisai",
    commonWriting: "小さい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0011",
    tags: ["basic", "adjectives", "size"],
    relatedWords: ["big", "size"]
},
{
    id: "eat_001",
    english: "to eat",
    hiragana: "たべる",
    katakana: "タベル",
    kanji: "食べる",
    romaji: "taberu",
    commonWriting: "食べる",
    wordType: "ichidan-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "daily-life", "verbs", "essential"],
    relatedWords: ["drink", "food", "rice"]
},
{
    id: "rice_001",
    english: "rice/meal",
    hiragana: "ごはん",
    katakana: "ゴハン",
    kanji: "御飯",
    romaji: "gohan",
    commonWriting: "ごはん",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "food", "daily-life", "essential"],
    relatedWords: ["eat", "food", "lunch"]
},
{
    id: "tea_001",
    english: "tea",
    hiragana: "おちゃ",
    katakana: "オチャ",
    kanji: "お茶",
    romaji: "ocha",
    commonWriting: "お茶",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "drinks", "daily-life"],
    relatedWords: ["drink", "water", "hot"]
},
{
    id: "hot_001",
    english: "hot",
    hiragana: "あつい",
    katakana: "アツイ",
    kanji: "熱い",
    romaji: "atsui",
    commonWriting: "熱い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "adjectives", "temperature"],
    relatedWords: ["cold", "temperature", "tea"]
},
{
    id: "cold_001",
    english: "cold",
    hiragana: "さむい",
    katakana: "サムイ",
    kanji: "寒い",
    romaji: "samui",
    commonWriting: "寒い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "adjectives", "temperature", "weather"],
    relatedWords: ["hot", "temperature", "winter"]
},
{
    id: "good_001",
    english: "good",
    hiragana: "いい",
    katakana: "イイ",
    kanji: "良い",
    romaji: "ii",
    commonWriting: "いい",
    wordType: "i-adjective",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "adjectives", "essential", "emotions"],
    relatedWords: ["bad", "nice", "okay"]
},
{
    id: "bad_001",
    english: "bad",
    hiragana: "わるい",
    katakana: "ワルイ",
    kanji: "悪い",
    romaji: "warui",
    commonWriting: "悪い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "adjectives", "emotions"],
    relatedWords: ["good", "terrible"]
},
{
    id: "person_001",
    english: "person",
    hiragana: "ひと",
    katakana: "ヒト",
    kanji: "人",
    romaji: "hito",
    commonWriting: "人",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "people", "essential"],
    relatedWords: ["man", "woman", "people"]
},
{
    id: "man_001",
    english: "man",
    hiragana: "おとこ",
    katakana: "オトコ",
    kanji: "男",
    romaji: "otoko",
    commonWriting: "男",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "people", "gender"],
    relatedWords: ["woman", "person", "boy"]
},
{
    id: "woman_001",
    english: "woman",
    hiragana: "おんな",
    katakana: "オンナ",
    kanji: "女",
    romaji: "onna",
    commonWriting: "女",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "people", "gender"],
    relatedWords: ["man", "person", "girl"]
},
{
    id: "child_001",
    english: "child",
    hiragana: "こども",
    katakana: "コドモ",
    kanji: "子供",
    romaji: "kodomo",
    commonWriting: "子供",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "people", "family"],
    relatedWords: ["boy", "girl", "family"]
},
{
    id: "mother_001",
    english: "mother",
    hiragana: "おかあさん",
    katakana: "オカアサン",
    kanji: "お母さん",
    romaji: "okaasan",
    commonWriting: "お母さん",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "family", "people"],
    relatedWords: ["father", "parent", "family"]
},
{
    id: "father_001",
    english: "father",
    hiragana: "おとうさん",
    katakana: "オトウサン",
    kanji: "お父さん",
    romaji: "otousan",
    commonWriting: "お父さん",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "family", "people"],
    relatedWords: ["mother", "parent", "family"]
},
{
    id: "house_001",
    english: "house/home",
    hiragana: "いえ",
    katakana: "イエ",
    kanji: "家",
    romaji: "ie",
    commonWriting: "家",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "places", "daily-life", "essential"],
    relatedWords: ["home", "family", "room"]
},
{
    id: "school_001",
    english: "school",
    hiragana: "がっこう",
    katakana: "ガッコウ",
    kanji: "学校",
    romaji: "gakkou",
    commonWriting: "学校",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "places", "education", "essential"],
    relatedWords: ["student", "teacher", "study"]
},
{
    id: "student_001",
    english: "student",
    hiragana: "がくせい",
    katakana: "ガクセイ",
    kanji: "学生",
    romaji: "gakusei",
    commonWriting: "学生",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "people", "education"],
    relatedWords: ["school", "teacher", "study"]
},
{
    id: "teacher_001",
    english: "teacher",
    hiragana: "せんせい",
    katakana: "センセイ",
    kanji: "先生",
    romaji: "sensei",
    commonWriting: "先生",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "people", "education", "occupations"],
    relatedWords: ["student", "school", "teach"]
},
{
    id: "book_001",
    english: "book",
    hiragana: "ほん",
    katakana: "ホン",
    kanji: "本",
    romaji: "hon",
    commonWriting: "本",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "objects", "education", "reading"],
    relatedWords: ["read", "study", "magazine"]
},
{
    id: "read_001",
    english: "to read",
    hiragana: "よむ",
    katakana: "ヨム",
    kanji: "読む",
    romaji: "yomu",
    commonWriting: "読む",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "education", "daily-life"],
    relatedWords: ["book", "study", "write"]
},
{
    id: "write_001",
    english: "to write",
    hiragana: "かく",
    katakana: "カク",
    kanji: "書く",
    romaji: "kaku",
    commonWriting: "書く",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "education", "daily-life"],
    relatedWords: ["read", "letter", "pen"]
},
{
    id: "time_001",
    english: "time",
    hiragana: "じかん",
    katakana: "ジカン",
    kanji: "時間",
    romaji: "jikan",
    commonWriting: "時間",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "time", "essential"],
    relatedWords: ["hour", "minute", "clock"]
},
{
    id: "today_001",
    english: "today",
    hiragana: "きょう",
    katakana: "キョウ",
    kanji: "今日",
    romaji: "kyou",
    commonWriting: "今日",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "time", "essential", "daily-life"],
    relatedWords: ["yesterday", "tomorrow", "day"]
},
{
    id: "yesterday_001",
    english: "yesterday",
    hiragana: "きのう",
    katakana: "キノウ",
    kanji: "昨日",
    romaji: "kinou",
    commonWriting: "昨日",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "time", "daily-life"],
    relatedWords: ["today", "tomorrow", "day"]
},
{
    id: "tomorrow_001",
    english: "tomorrow",
    hiragana: "あした",
    katakana: "アシタ",
    kanji: "明日",
    romaji: "ashita",
    commonWriting: "明日",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "time", "daily-life"],
    relatedWords: ["today", "yesterday", "day"]
},
{
    id: "morning_001",
    english: "morning",
    hiragana: "あさ",
    katakana: "アサ",
    kanji: "朝",
    romaji: "asa",
    commonWriting: "朝",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "time", "daily-life"],
    relatedWords: ["evening", "night", "day"]
},
{
    id: "night_001",
    english: "night",
    hiragana: "よる",
    katakana: "ヨル",
    kanji: "夜",
    romaji: "yoru",
    commonWriting: "夜",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "time", "daily-life"],
    relatedWords: ["morning", "evening", "day"]
},
{
    id: "go_001",
    english: "to go",
    hiragana: "いく",
    katakana: "イク",
    kanji: "行く",
    romaji: "iku",
    commonWriting: "行く",
    wordType: "godan-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "movement", "essential"],
    relatedWords: ["come", "return", "walk"]
},
{
    id: "come_001",
    english: "to come",
    hiragana: "くる",
    katakana: "クル",
    kanji: "来る",
    romaji: "kuru",
    commonWriting: "来る",
    wordType: "irregular-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "movement", "essential"],
    relatedWords: ["go", "return", "arrive"]
},
{
    id: "return_001",
    english: "to return",
    hiragana: "かえる",
    katakana: "カエル",
    kanji: "帰る",
    romaji: "kaeru",
    commonWriting: "帰る",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "verbs", "movement"],
    relatedWords: ["go", "come", "home"]
},
{
    id: "see_001",
    english: "to see/watch",
    hiragana: "みる",
    katakana: "ミル",
    kanji: "見る",
    romaji: "miru",
    commonWriting: "見る",
    wordType: "ichidan-verb",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "senses", "essential"],
    relatedWords: ["look", "watch", "movie"]
},
{
    id: "hear_001",
    english: "to hear/listen",
    hiragana: "きく",
    katakana: "キク",
    kanji: "聞く",
    romaji: "kiku",
    commonWriting: "聞く",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "senses"],
    relatedWords: ["listen", "music", "sound"]
},
{
    id: "speak_001",
    english: "to speak/talk",
    hiragana: "はなす",
    katakana: "ハナス",
    kanji: "話す",
    romaji: "hanasu",
    commonWriting: "話す",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "verbs", "communication"],
    relatedWords: ["talk", "say", "language"]
},
{
    id: "money_001",
    english: "money",
    hiragana: "おかね",
    katakana: "オカネ",
    kanji: "お金",
    romaji: "okane",
    commonWriting: "お金",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "objects", "daily-life"],
    relatedWords: ["buy", "expensive", "cheap"]
},
{
    id: "buy_001",
    english: "to buy",
    hiragana: "かう",
    katakana: "カウ",
    kanji: "買う",
    romaji: "kau",
    commonWriting: "買う",
    wordType: "godan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "verbs", "shopping", "daily-life"],
    relatedWords: ["money", "shop", "sell"]
},
{
    id: "car_001",
    english: "car",
    hiragana: "くるま",
    katakana: "クルマ",
    kanji: "車",
    romaji: "kuruma",
    commonWriting: "車",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["basic", "transportation", "objects"],
    relatedWords: ["drive", "bus", "train"]
},
{
    id: "train_001",
    english: "train",
    hiragana: "でんしゃ",
    katakana: "デンシャ",
    kanji: "電車",
    romaji: "densha",
    commonWriting: "電車",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "transportation", "daily-life"],
    relatedWords: ["car", "bus", "station"]
},
{
    id: "station_001",
    english: "station",
    hiragana: "えき",
    katakana: "エキ",
    kanji: "駅",
    romaji: "eki",
    commonWriting: "駅",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["basic", "places", "transportation"],
    relatedWords: ["train", "bus", "platform"]
},
{
    id: "hospital_001",
    english: "hospital",
    hiragana: "びょういん",
    katakana: "ビョウイン",
    kanji: "病院",
    romaji: "byouin",
    commonWriting: "病院",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "places", "medical"],
    relatedWords: ["doctor", "sick", "medicine"]
},
{
    id: "restaurant_001",
    english: "restaurant",
    hiragana: "レストラン",
    katakana: "レストラン",
    kanji: "",
    romaji: "resutoran",
    commonWriting: "レストラン",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["basic", "places", "food", "daily-life"],
    relatedWords: ["eat", "food", "dinner"]
},
{
    id: "friend_001",
    english: "friend",
    hiragana: "ともだち",
    katakana: "トモダチ",
    kanji: "友達",
    romaji: "tomodachi",
    commonWriting: "友達",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["basic", "people", "relationships"],
    relatedWords: ["person", "talk", "meet"]
},
{
    id: "dog_001",
    english: "dog",
    hiragana: "いぬ",
    katakana: "イヌ",
    kanji: "犬",
    romaji: "inu",
    commonWriting: "犬",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["animals", "pets", "basic"],
    relatedWords: ["cat", "animal", "pet"]
},
{
    id: "cat_001",
    english: "cat",
    hiragana: "ねこ",
    katakana: "ネコ",
    kanji: "猫",
    romaji: "neko",
    commonWriting: "猫",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["animals", "pets", "basic"],
    relatedWords: ["dog", "animal", "pet"]
},
{
    id: "fish_001",
    english: "fish",
    hiragana: "さかな",
    katakana: "サカナ",
    kanji: "魚",
    romaji: "sakana",
    commonWriting: "魚",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["animals", "food", "basic"],
    relatedWords: ["eat", "sea", "swim"]
},
{
    id: "bird_001",
    english: "bird",
    hiragana: "とり",
    katakana: "トリ",
    kanji: "鳥",
    romaji: "tori",
    commonWriting: "鳥",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["animals", "nature", "basic"],
    relatedWords: ["fly", "sky", "sing"]
},
{
    id: "flower_001",
    english: "flower",
    hiragana: "はな",
    katakana: "ハナ",
    kanji: "花",
    romaji: "hana",
    commonWriting: "花",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["nature", "plants", "beauty"],
    relatedWords: ["tree", "garden", "spring"]
},
{
    id: "tree_001",
    english: "tree",
    hiragana: "き",
    katakana: "キ",
    kanji: "木",
    romaji: "ki",
    commonWriting: "木",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["nature", "plants", "basic"],
    relatedWords: ["flower", "forest", "leaf"]
},
{
    id: "mountain_001",
    english: "mountain",
    hiragana: "やま",
    katakana: "ヤマ",
    kanji: "山",
    romaji: "yama",
    commonWriting: "山",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["nature", "geography", "places"],
    relatedWords: ["high", "climb", "forest"]
},
{
    id: "sea_001",
    english: "sea/ocean",
    hiragana: "うみ",
    katakana: "ウミ",
    kanji: "海",
    romaji: "umi",
    commonWriting: "海",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["nature", "geography", "water"],
    relatedWords: ["fish", "swim", "blue"]
},
{
    id: "rain_001",
    english: "rain",
    hiragana: "あめ",
    katakana: "アメ",
    kanji: "雨",
    romaji: "ame",
    commonWriting: "雨",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["weather", "nature", "basic"],
    relatedWords: ["water", "cloud", "umbrella"]
},
{
    id: "snow_001",
    english: "snow",
    hiragana: "ゆき",
    katakana: "ユキ",
    kanji: "雪",
    romaji: "yuki",
    commonWriting: "雪",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["weather", "nature", "winter"],
    relatedWords: ["cold", "white", "winter"]
},
{
    id: "wind_001",
    english: "wind",
    hiragana: "かぜ",
    katakana: "カゼ",
    kanji: "風",
    romaji: "kaze",
    commonWriting: "風",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["weather", "nature", "basic"],
    relatedWords: ["air", "blow", "strong"]
},
{
    id: "fire_001",
    english: "fire",
    hiragana: "ひ",
    katakana: "ヒ",
    kanji: "火",
    romaji: "hi",
    commonWriting: "火",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["elements", "basic", "danger"],
    relatedWords: ["hot", "light", "burn"]
},
{
    id: "color_001",
    english: "color",
    hiragana: "いろ",
    katakana: "イロ",
    kanji: "色",
    romaji: "iro",
    commonWriting: "色",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["attributes", "art", "basic"],
    relatedWords: ["red", "blue", "beautiful"]
},
{
    id: "red_001",
    english: "red",
    hiragana: "あかい",
    katakana: "アカイ",
    kanji: "赤い",
    romaji: "akai",
    commonWriting: "赤い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["colors", "adjectives", "basic"],
    relatedWords: ["color", "fire", "blood"]
},
{
    id: "blue_001",
    english: "blue",
    hiragana: "あおい",
    katakana: "アオイ",
    kanji: "青い",
    romaji: "aoi",
    commonWriting: "青い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["colors", "adjectives", "basic"],
    relatedWords: ["color", "sky", "sea"]
},
{
    id: "white_001",
    english: "white",
    hiragana: "しろい",
    katakana: "シロイ",
    kanji: "白い",
    romaji: "shiroi",
    commonWriting: "白い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["colors", "adjectives", "basic"],
    relatedWords: ["color", "snow", "clean"]
},
{
    id: "black_001",
    english: "black",
    hiragana: "くろい",
    katakana: "クロイ",
    kanji: "黒い",
    romaji: "kuroi",
    commonWriting: "黒い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["colors", "adjectives", "basic"],
    relatedWords: ["color", "dark", "night"]
},
{
    id: "new_001",
    english: "new",
    hiragana: "あたらしい",
    katakana: "アタラシイ",
    kanji: "新しい",
    romaji: "atarashii",
    commonWriting: "新しい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["adjectives", "basic", "time"],
    relatedWords: ["old", "modern", "fresh"]
},
{
    id: "old_001",
    english: "old",
    hiragana: "ふるい",
    katakana: "フルイ",
    kanji: "古い",
    romaji: "furui",
    commonWriting: "古い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "basic", "time"],
    relatedWords: ["new", "ancient", "past"]
},
{
    id: "fast_001",
    english: "fast",
    hiragana: "はやい",
    katakana: "ハヤイ",
    kanji: "速い",
    romaji: "hayai",
    commonWriting: "速い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "speed", "basic"],
    relatedWords: ["slow", "quick", "run"]
},
{
    id: "slow_001",
    english: "slow",
    hiragana: "おそい",
    katakana: "オソイ",
    kanji: "遅い",
    romaji: "osoi",
    commonWriting: "遅い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "speed", "basic"],
    relatedWords: ["fast", "late", "careful"]
},
{
    id: "strong_001",
    english: "strong",
    hiragana: "つよい",
    katakana: "ツヨイ",
    kanji: "強い",
    romaji: "tsuyoi",
    commonWriting: "強い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "power", "basic"],
    relatedWords: ["weak", "powerful", "muscle"]
},
{
    id: "weak_001",
    english: "weak",
    hiragana: "よわい",
    katakana: "ヨワイ",
    kanji: "弱い",
    romaji: "yowai",
    commonWriting: "弱い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "power", "basic"],
    relatedWords: ["strong", "fragile", "gentle"]
},
{
    id: "high_001",
    english: "high/tall",
    hiragana: "たかい",
    katakana: "タカイ",
    kanji: "高い",
    romaji: "takai",
    commonWriting: "高い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "height", "basic"],
    relatedWords: ["low", "expensive", "mountain"]
},
{
    id: "low_001",
    english: "low",
    hiragana: "ひくい",
    katakana: "ヒクイ",
    kanji: "低い",
    romaji: "hikui",
    commonWriting: "低い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "height", "basic"],
    relatedWords: ["high", "short", "ground"]
},
{
    id: "long_001",
    english: "long",
    hiragana: "ながい",
    katakana: "ナガイ",
    kanji: "長い",
    romaji: "nagai",
    commonWriting: "長い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "length", "basic"],
    relatedWords: ["short", "distance", "time"]
},
{
    id: "short_001",
    english: "short",
    hiragana: "みじかい",
    katakana: "ミジカイ",
    kanji: "短い",
    romaji: "mijikai",
    commonWriting: "短い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["adjectives", "length", "basic"],
    relatedWords: ["long", "brief", "small"]
},
{
    id: "heavy_001",
    english: "heavy",
    hiragana: "おもい",
    katakana: "オモイ",
    kanji: "重い",
    romaji: "omoi",
    commonWriting: "重い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "weight", "basic"],
    relatedWords: ["light", "difficult", "burden"]
},
{
    id: "light_001",
    english: "light (weight)",
    hiragana: "かるい",
    katakana: "カルイ",
    kanji: "軽い",
    romaji: "karui",
    commonWriting: "軽い",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "weight", "basic"],
    relatedWords: ["heavy", "easy", "feather"]
},
{
    id: "expensive_001",
    english: "expensive",
    hiragana: "たかい",
    katakana: "タカイ",
    kanji: "高い",
    romaji: "takai",
    commonWriting: "高い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "price", "shopping"],
    relatedWords: ["cheap", "money", "buy"]
},
{
    id: "cheap_001",
    english: "cheap",
    hiragana: "やすい",
    katakana: "ヤスイ",
    kanji: "安い",
    romaji: "yasui",
    commonWriting: "安い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["adjectives", "price", "shopping"],
    relatedWords: ["expensive", "money", "buy"]
},
{
    id: "busy_001",
    english: "busy",
    hiragana: "いそがしい",
    katakana: "イソガシイ",
    kanji: "忙しい",
    romaji: "isogashii",
    commonWriting: "忙しい",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["adjectives", "time", "work"],
    relatedWords: ["free", "work", "hurry"]
},
{
    id: "free_001",
    english: "free (time)",
    hiragana: "ひま",
    katakana: "ヒマ",
    kanji: "暇",
    romaji: "hima",
    commonWriting: "暇",
    wordType: "na-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["adjectives", "time", "leisure"],
    relatedWords: ["busy", "time", "relax"]
},
{
    id: "difficult_001",
    english: "difficult",
    hiragana: "むずかしい",
    katakana: "ムズカシイ",
    kanji: "難しい",
    romaji: "muzukashii",
    commonWriting: "難しい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["adjectives", "challenge", "study"],
    relatedWords: ["easy", "hard", "problem"]
},
{
    id: "easy_001",
    english: "easy",
    hiragana: "やさしい",
    katakana: "ヤサシイ",
    kanji: "易しい",
    romaji: "yasashii",
    commonWriting: "やさしい",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["adjectives", "challenge", "study"],
    relatedWords: ["difficult", "simple", "kind"]
},
{
    id: "interesting_001",
    english: "interesting",
    hiragana: "おもしろい",
    katakana: "オモシロイ",
    kanji: "面白い",
    romaji: "omoshiroi",
    commonWriting: "面白い",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["adjectives", "emotions", "entertainment"],
    relatedWords: ["boring", "fun", "enjoy"]
},
{
    id: "boring_001",
    english: "boring",
    hiragana: "つまらない",
    katakana: "ツマラナイ",
    kanji: "詰まらない",
    romaji: "tsumaranai",
    commonWriting: "つまらない",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01111",
    tags: ["adjectives", "emotions", "entertainment"],
    relatedWords: ["interesting", "dull", "tired"]
},
{
    id: "happy_001",
    english: "happy",
    hiragana: "うれしい",
    katakana: "ウレシイ",
    kanji: "嬉しい",
    romaji: "ureshii",
    commonWriting: "嬉しい",
    wordType: "i-adjective",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["adjectives", "emotions", "feelings"],
    relatedWords: ["sad", "joy", "smile"]
},
{
    id: "sad_001",
    english: "sad",
    hiragana: "かなしい",
    katakana: "カナシイ",
    kanji: "悲しい",
    romaji: "kanashii",
    commonWriting: "悲しい",
    wordType: "i-adjective",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["adjectives", "emotions", "feelings"],
    relatedWords: ["happy", "cry", "sorrow"]
},
{
    id: "room_001",
    english: "room",
    hiragana: "へや",
    katakana: "ヘヤ",
    kanji: "部屋",
    romaji: "heya",
    commonWriting: "部屋",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["places", "house", "basic"],
    relatedWords: ["house", "door", "window"]
},
{
    id: "door_001",
    english: "door",
    hiragana: "ドア",
    katakana: "ドア",
    kanji: "",
    romaji: "doa",
    commonWriting: "ドア",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["objects", "house", "basic"],
    relatedWords: ["room", "open", "close"]
},
{
    id: "window_001",
    english: "window",
    hiragana: "まど",
    katakana: "マド",
    kanji: "窓",
    romaji: "mado",
    commonWriting: "窓",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["objects", "house", "basic"],
    relatedWords: ["room", "glass", "view"]
},
{
    id: "chair_001",
    english: "chair",
    hiragana: "いす",
    katakana: "イス",
    kanji: "椅子",
    romaji: "isu",
    commonWriting: "いす",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["objects", "furniture", "basic"],
    relatedWords: ["table", "sit", "room"]
},
{
    id: "table_001",
    english: "table",
    hiragana: "テーブル",
    katakana: "テーブル",
    kanji: "",
    romaji: "teeburu",
    commonWriting: "テーブル",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["objects", "furniture", "basic"],
    relatedWords: ["chair", "eat", "desk"]
},
{
    id: "bed_001",
    english: "bed",
    hiragana: "ベッド",
    katakana: "ベッド",
    kanji: "",
    romaji: "beddo",
    commonWriting: "ベッド",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["objects", "furniture", "sleep"],
    relatedWords: ["sleep", "room", "night"]
},
{
    id: "sleep_001",
    english: "to sleep",
    hiragana: "ねる",
    katakana: "ネル",
    kanji: "寝る",
    romaji: "neru",
    commonWriting: "寝る",
    wordType: "ichidan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "01",
    tags: ["verbs", "daily-life", "basic"],
    relatedWords: ["bed", "night", "tired"]
},
{
    id: "wake_up_001",
    english: "to wake up",
    hiragana: "おきる",
    katakana: "オキル",
    kanji: "起きる",
    romaji: "okiru",
    commonWriting: "起きる",
    wordType: "ichidan-verb",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["verbs", "daily-life", "basic"],
    relatedWords: ["sleep", "morning", "early"]
},
{
    id: "work_001",
    english: "work/job",
    hiragana: "しごと",
    katakana: "シゴト",
    kanji: "仕事",
    romaji: "shigoto",
    commonWriting: "仕事",
    wordType: "noun",
    frequency: 5,
    jlptLevel: "N5",
    pronunciation: "011",
    tags: ["work", "daily-life", "basic"],
    relatedWords: ["busy", "money", "company"]
},
{
    id: "company_001",
    english: "company",
    hiragana: "かいしゃ",
    katakana: "カイシャ",
    kanji: "会社",
    romaji: "kaisha",
    commonWriting: "会社",
    wordType: "noun",
    frequency: 4,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["work", "business", "places"],
    relatedWords: ["work", "office", "employee"]
},
{
    id: "office_001",
    english: "office",
    hiragana: "オフィス",
    katakana: "オフィス",
    kanji: "",
    romaji: "ofisu",
    commonWriting: "オフィス",
    wordType: "noun",
    frequency: 3,
    jlptLevel: "N5",
    pronunciation: "0111",
    tags: ["work", "places", "business"],
    relatedWords: ["company", "work", "desk"]
}
];

// Conjugation functions
function conjugateGodanVerb(verb) {
    const stem = verb.slice(0, -1);
    const ending = verb.slice(-1);
    
    const conjugationMap = {
        'う': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お', te: 'っ' },
        'く': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', te: 'い' },
        'ぐ': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', te: 'い' },
        'す': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', te: 'し' },
        'つ': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', te: 'っ' },
        'ぬ': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', te: 'ん' },
        'ぶ': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', te: 'ん' },
        'む': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', te: 'ん' },
        'る': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', te: 'っ' }
    };

    const forms = conjugationMap[ending];
    if (!forms) return null;

    return {
        dictionary: verb,
        polite: {
        present: stem + forms.i + 'ます',
        past: stem + forms.i + 'ました',
        negative: stem + forms.i + 'ません',
        pastNegative: stem + forms.i + 'ませんでした'
        },
        casual: {
        present: verb,
        past: stem + forms.te + 'た',
        negative: stem + forms.a + 'ない',
        pastNegative: stem + forms.a + 'なかった'
        },
        teForm: stem + forms.te + 'て',
        potential: stem + forms.e + 'る',
        passive: stem + forms.a + 'れる',
        causative: stem + forms.a + 'せる',
        imperative: stem + forms.e,
        volitional: stem + forms.o + 'う'
    };
}

function conjugateIAdjective(adjective) {
    const stem = adjective.slice(0, -1);
    return {
        present: adjective,
        past: stem + 'かった',
        negative: stem + 'くない',
        pastNegative: stem + 'くなかった',
        adverb: stem + 'く',
        teForm: stem + 'くて',
        conditional: stem + 'ければ',
        polite: {
        present: adjective + 'です',
        past: stem + 'かったです',
        negative: stem + 'くないです',
        pastNegative: stem + 'くなかったです'
        }
    };
}

function conjugateNaAdjective(adjective) {
    return {
        present: adjective,
        presentBe: adjective + 'だ',
        past: adjective + 'だった',
        negative: adjective + 'じゃない',
        pastNegative: adjective + 'じゃなかった',
        adverb: adjective + 'に',
        teForm: adjective + 'で',
        conditional: adjective + 'なら',
        polite: {
        present: adjective + 'です',
        past: adjective + 'でした',
        negative: adjective + 'じゃないです',
        pastNegative: adjective + 'じゃなかったです'
        }
    };
}

function getConjugations(word) {
    if (!word || !word.commonWriting || !word.wordType) {
        return null;
    }
    
    switch(word.wordType) {
        case 'godan-verb':
        return conjugateGodanVerb(word.commonWriting);
        case 'i-adjective':
        return conjugateIAdjective(word.commonWriting);
        case 'na-adjective':
        return conjugateNaAdjective(word.commonWriting);
        default:
        return null;
    }
}

// Conjugation Tool Component
function ConjugationTool({ words }) {
    const [selectedWord, setSelectedWord] = useState('');
    const [conjugations, setConjugations] = useState(null);

    const handleWordChange = (wordId) => {
        const word = words.find(w => w.id === wordId);
        setSelectedWord(wordId);
        setConjugations(getConjugations(word));
    };

    const conjugatableWords = words.filter(word => 
        ['godan-verb', 'ichidan-verb', 'i-adjective', 'na-adjective'].includes(word.wordType)
    );

    return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">Conjugation Tool</h2>
        
        <div className="space-y-6">
            <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Select Word</label>
            <select
                value={selectedWord}
                onChange={(e) => handleWordChange(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            >
                <option value="">Choose a word...</option>
                {conjugatableWords.map(word => (
                <option key={word.id} value={word.id}>
                    {word.commonWriting} ({word.english}) - {word.wordType}
                </option>
                ))}
            </select>
            </div>

            {conjugations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conjugations.polite && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Polite Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.polite.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.polite.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.polite.negative}</div>
                    <div><strong className="text-gray-200">Past Negative:</strong> {conjugations.polite.pastNegative}</div>
                    </div>
                </div>
                )}

                {conjugations.casual && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Casual Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    <div><strong className="text-gray-200">Present:</strong> {conjugations.casual.present}</div>
                    <div><strong className="text-gray-200">Past:</strong> {conjugations.casual.past}</div>
                    <div><strong className="text-gray-200">Negative:</strong> {conjugations.casual.negative}</div>
                    <div><strong className="text-gray-200">Past Negative:</strong> {conjugations.casual.pastNegative}</div>
                    </div>
                </div>
                )}

                {(conjugations.teForm || conjugations.potential) && (
                <div>
                    <h3 className="font-semibold mb-3 text-white">Other Forms</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                    {conjugations.teForm && <div><strong className="text-gray-200">Te-form:</strong> {conjugations.teForm}</div>}
                    {conjugations.potential && <div><strong className="text-gray-200">Potential:</strong> {conjugations.potential}</div>}
                    {conjugations.passive && <div><strong className="text-gray-200">Passive:</strong> {conjugations.passive}</div>}
                    {conjugations.causative && <div><strong className="text-gray-200">Causative:</strong> {conjugations.causative}</div>}
                    {conjugations.adverb && <div><strong className="text-gray-200">Adverb:</strong> {conjugations.adverb}</div>}
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
        </div>
    );
}
