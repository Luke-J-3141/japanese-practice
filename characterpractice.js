function CharacterPractice () {
    const hiraganaCharacters = {
        //  a            i           u            e            o
        'あ': { romaji: 'a' },   'い': { romaji: 'i' },   'う': { romaji: 'u' },   'え': { romaji: 'e' },   'お': { romaji: 'o' },
        //  k-series
        'か': { romaji: 'ka' },  'き': { romaji: 'ki' },  'く': { romaji: 'ku' },  'け': { romaji: 'ke' },  'こ': { romaji: 'ko' },
        'が': { romaji: 'ga' },  'ぎ': { romaji: 'gi' },  'ぐ': { romaji: 'gu' },  'げ': { romaji: 'ge' },  'ご': { romaji: 'go' },
        //  s-series
        'さ': { romaji: 'sa' },  'し': { romaji: 'shi' }, 'す': { romaji: 'su' },  'せ': { romaji: 'se' },  'そ': { romaji: 'so' },
        'ざ': { romaji: 'za' },  'じ': { romaji: 'ji' },  'ず': { romaji: 'zu' },  'ぜ': { romaji: 'ze' },  'ぞ': { romaji: 'zo' },
        //  t-series
        'た': { romaji: 'ta' },  'ち': { romaji: 'chi' }, 'つ': { romaji: 'tsu' }, 'て': { romaji: 'te' },  'と': { romaji: 'to' },
        'だ': { romaji: 'da' },  'ぢ': { romaji: 'ji' },  'づ': { romaji: 'zu' },  'で': { romaji: 'de' },  'ど': { romaji: 'do' },
        //  n-series
        'な': { romaji: 'na' },  'に': { romaji: 'ni' },  'ぬ': { romaji: 'nu' },  'ね': { romaji: 'ne' },  'の': { romaji: 'no' },
        //  h-series
        'は': { romaji: 'ha' },  'ひ': { romaji: 'hi' },  'ふ': { romaji: 'fu' },  'へ': { romaji: 'he' },  'ほ': { romaji: 'ho' },
        'ば': { romaji: 'ba' },  'び': { romaji: 'bi' },  'ぶ': { romaji: 'bu' },  'べ': { romaji: 'be' },  'ぼ': { romaji: 'bo' },
        'ぱ': { romaji: 'pa' },  'ぴ': { romaji: 'pi' },  'ぷ': { romaji: 'pu' },  'ぺ': { romaji: 'pe' },  'ぽ': { romaji: 'po' },
        //  m-series
        'ま': { romaji: 'ma' },  'み': { romaji: 'mi' },  'む': { romaji: 'mu' },  'め': { romaji: 'me' },  'も': { romaji: 'mo' },
        //  y-series
        'や': { romaji: 'ya' },                           'ゆ': { romaji: 'yu' },                           'よ': { romaji: 'yo' },
        //  r-series
        'ら': { romaji: 'ra' },  'り': { romaji: 'ri' },  'る': { romaji: 'ru' },  'れ': { romaji: 're' },  'ろ': { romaji: 'ro' },
        'わ': { romaji: 'wa' },                                                                             'を': { romaji: 'wo' },
        'ん': { romaji: 'n' },

        // Yoon (contracted sounds)
        'きゃ': { romaji: 'kya' },          'きゅ': { romaji: 'kyu' },             'きょ': { romaji: 'kyo' },
        'しゃ': { romaji: 'sha' },          'しゅ': { romaji: 'shu' },             'しょ': { romaji: 'sho' },
        'ちゃ': { romaji: 'cha' },          'ちゅ': { romaji: 'chu' },             'ちょ': { romaji: 'cho' },
        'にゃ': { romaji: 'nya' },          'にゅ': { romaji: 'nyu' },             'にょ': { romaji: 'nyo' },
        'ひゃ': { romaji: 'hya' },          'ひゅ': { romaji: 'hyu' },             'ひょ': { romaji: 'hyo' },
        'みゃ': { romaji: 'mya' },          'みゅ': { romaji: 'myu' },             'みょ': { romaji: 'myo' },
        'りゃ': { romaji: 'rya' },          'りゅ': { romaji: 'ryu' },             'りょ': { romaji: 'ryo' },
        'ぎゃ': { romaji: 'gya' },          'ぎゅ': { romaji: 'gyu' },             'ぎょ': { romaji: 'gyo' },
        'じゃ': { romaji: 'ja' },           'じゅ': { romaji: 'ju' },              'じょ': { romaji: 'jo' },
        'びゃ': { romaji: 'bya' },          'びゅ': { romaji: 'byu' },             'びょ': { romaji: 'byo' },
        'ぴゃ': { romaji: 'pya' },          'ぴゅ': { romaji: 'pyu' },             'ぴょ': { romaji: 'pyo' }
    };

    const katakanaCharacters = {
        //  a            i           u            e            o
        'ア': { romaji: 'a' },   'イ': { romaji: 'i' },   'ウ': { romaji: 'u' },   'エ': { romaji: 'e' },   'オ': { romaji: 'o' },
        //  k-series
        'カ': { romaji: 'ka' },  'キ': { romaji: 'ki' },  'ク': { romaji: 'ku' },  'ケ': { romaji: 'ke' },  'コ': { romaji: 'ko' },
        'ガ': { romaji: 'ga' },  'ギ': { romaji: 'gi' },  'グ': { romaji: 'gu' },  'ゲ': { romaji: 'ge' },  'ゴ': { romaji: 'go' },
        //  s-series
        'サ': { romaji: 'sa' },  'シ': { romaji: 'shi' }, 'ス': { romaji: 'su' },  'セ': { romaji: 'se' },  'ソ': { romaji: 'so' },
        'ザ': { romaji: 'za' },  'ジ': { romaji: 'ji' },  'ズ': { romaji: 'zu' },  'ゼ': { romaji: 'ze' },  'ゾ': { romaji: 'zo' },
        //  t-series
        'タ': { romaji: 'ta' },  'チ': { romaji: 'chi' }, 'ツ': { romaji: 'tsu' }, 'テ': { romaji: 'te' },  'ト': { romaji: 'to' },
        'ダ': { romaji: 'da' },  'ヂ': { romaji: 'ji' },  'ヅ': { romaji: 'zu' },  'デ': { romaji: 'de' },  'ド': { romaji: 'do' },
        //  n-series
        'ナ': { romaji: 'na' },  'ニ': { romaji: 'ni' },  'ヌ': { romaji: 'nu' },  'ネ': { romaji: 'ne' },  'ノ': { romaji: 'no' },
        //  h-series
        'ハ': { romaji: 'ha' },  'ヒ': { romaji: 'hi' },  'フ': { romaji: 'fu' },  'ヘ': { romaji: 'he' },  'ホ': { romaji: 'ho' },
        'バ': { romaji: 'ba' },  'ビ': { romaji: 'bi' },  'ブ': { romaji: 'bu' },  'ベ': { romaji: 'be' },  'ボ': { romaji: 'bo' },
        'パ': { romaji: 'pa' },  'ピ': { romaji: 'pi' },  'プ': { romaji: 'pu' },  'ペ': { romaji: 'pe' },  'ポ': { romaji: 'po' },
        //  m-series
        'マ': { romaji: 'ma' },  'ミ': { romaji: 'mi' },  'ム': { romaji: 'mu' },  'メ': { romaji: 'me' },  'モ': { romaji: 'mo' },
        //  y-series
        'ヤ': { romaji: 'ya' },                           'ユ': { romaji: 'yu' },                           'ヨ': { romaji: 'yo' },
        //  r-series
        'ラ': { romaji: 'ra' },  'リ': { romaji: 'ri' },  'ル': { romaji: 'ru' },  'レ': { romaji: 're' },  'ロ': { romaji: 'ro' },
        'ワ': { romaji: 'wa' },  'ヰ': { romaji: 'wi' },  'ヱ': { romaji: 'we' },  'ヲ': { romaji: 'wo' },
        'ン': { romaji: 'n' },

        // Yoon (contracted sounds)
        'キャ': { romaji: 'kya' },          'キュ': { romaji: 'kyu' },             'キョ': { romaji: 'kyo' },
        'シャ': { romaji: 'sha' },          'シュ': { romaji: 'shu' },             'ショ': { romaji: 'sho' },
        'チャ': { romaji: 'cha' },          'チュ': { romaji: 'chu' },             'チョ': { romaji: 'cho' },
        'ニャ': { romaji: 'nya' },          'ニュ': { romaji: 'nyu' },             'ニョ': { romaji: 'nyo' },
        'ヒャ': { romaji: 'hya' },          'ヒュ': { romaji: 'hyu' },             'ヒョ': { romaji: 'hyo' },
        'ミャ': { romaji: 'mya' },          'ミュ': { romaji: 'myu' },             'ミョ': { romaji: 'myo' },
        'リャ': { romaji: 'rya' },          'リュ': { romaji: 'ryu' },             'リョ': { romaji: 'ryo' },
        'ギャ': { romaji: 'gya' },          'ギュ': { romaji: 'gyu' },             'ギョ': { romaji: 'gyo' },
        'ジャ': { romaji: 'ja' },           'ジュ': { romaji: 'ju' },              'ジョ': { romaji: 'jo' },
        'ビャ': { romaji: 'bya' },          'ビュ': { romaji: 'byu' },             'ビョ': { romaji: 'byo' },
        'ピャ': { romaji: 'pya' },          'ピュ': { romaji: 'pyu' },             'ピョ': { romaji: 'pyo' },
        
        // Extended katakana for foreign words
        'ヴ': { romaji: 'vu' },
        'ティ': { romaji: 'ti' },           'ディ': { romaji: 'di' },              'トゥ': { romaji: 'tu' },
        'ドゥ': { romaji: 'du' },           'ファ': { romaji: 'fa' },              'フィ': { romaji: 'fi' },
        'フェ': { romaji: 'fe' },           'フォ': { romaji: 'fo' },              'ウィ': { romaji: 'wi' },
        'ウェ': { romaji: 'we' },           'ウォ': { romaji: 'wo' },              'ツァ': { romaji: 'tsa' },
        'ツィ': { romaji: 'tsi' },          'ツェ': { romaji: 'tse' },             'ツォ': { romaji: 'tso' },
        'チェ': { romaji: 'che' },          'シェ': { romaji: 'she' },             'ジェ': { romaji: 'je' },
        'イェ': { romaji: 'ye' }
    };

}