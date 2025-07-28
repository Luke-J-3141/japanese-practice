function CharacterPractice () {
    const hiraganaCharacters = {
        //  a            i           u            e            o
        'あ': { romaji: 'a', meaning: '' },   'い': { romaji: 'i', meaning: '' },   'う': { romaji: 'u', meaning: '' },   'え': { romaji: 'e', meaning: '' },   'お': { romaji: 'o', meaning: '' },
        //  k-series
        'か': { romaji: 'ka', meaning: '' },  'き': { romaji: 'ki', meaning: '' },  'く': { romaji: 'ku', meaning: '' },  'け': { romaji: 'ke', meaning: '' },  'こ': { romaji: 'ko', meaning: '' },
        'が': { romaji: 'ga', meaning: '' },  'ぎ': { romaji: 'gi', meaning: '' },  'ぐ': { romaji: 'gu', meaning: '' },  'げ': { romaji: 'ge', meaning: '' },  'ご': { romaji: 'go', meaning: '' },
        //  s-series
        'さ': { romaji: 'sa', meaning: '' },  'し': { romaji: 'shi', meaning: '' }, 'す': { romaji: 'su', meaning: '' },  'せ': { romaji: 'se', meaning: '' },  'そ': { romaji: 'so', meaning: '' },
        'ざ': { romaji: 'za', meaning: '' },  'じ': { romaji: 'ji', meaning: '' },  'ず': { romaji: 'zu', meaning: '' },  'ぜ': { romaji: 'ze', meaning: '' },  'ぞ': { romaji: 'zo', meaning: '' },
        //  t-series
        'た': { romaji: 'ta', meaning: '' },  'ち': { romaji: 'chi', meaning: '' }, 'つ': { romaji: 'tsu', meaning: '' }, 'て': { romaji: 'te', meaning: '' },  'と': { romaji: 'to', meaning: '' },
        'だ': { romaji: 'da', meaning: '' },  'ぢ': { romaji: 'ji', meaning: '' },  'づ': { romaji: 'zu', meaning: '' },  'で': { romaji: 'de', meaning: '' },  'ど': { romaji: 'do', meaning: '' },
        //  n-series
        'な': { romaji: 'na', meaning: '' },  'に': { romaji: 'ni', meaning: '' },  'ぬ': { romaji: 'nu', meaning: '' },  'ね': { romaji: 'ne', meaning: '' },  'の': { romaji: 'no', meaning: '' },
        //  h-series
        'は': { romaji: 'ha', meaning: '' },  'ひ': { romaji: 'hi', meaning: '' },  'ふ': { romaji: 'fu', meaning: '' },  'へ': { romaji: 'he', meaning: '' },  'ほ': { romaji: 'ho', meaning: '' },
        'ば': { romaji: 'ba', meaning: '' },  'び': { romaji: 'bi', meaning: '' },  'ぶ': { romaji: 'bu', meaning: '' },  'べ': { romaji: 'be', meaning: '' },  'ぼ': { romaji: 'bo', meaning: '' },
        'ぱ': { romaji: 'pa', meaning: '' },  'ぴ': { romaji: 'pi', meaning: '' },  'ぷ': { romaji: 'pu', meaning: '' },  'ぺ': { romaji: 'pe', meaning: '' },  'ぽ': { romaji: 'po', meaning: '' },
        //  m-series
        'ま': { romaji: 'ma', meaning: '' },  'み': { romaji: 'mi', meaning: '' },  'む': { romaji: 'mu', meaning: '' },  'め': { romaji: 'me', meaning: '' },  'も': { romaji: 'mo', meaning: '' },
        //  y-series
        'や': { romaji: 'ya', meaning: '' },                                         'ゆ': { romaji: 'yu', meaning: '' },                                         'よ': { romaji: 'yo', meaning: '' },
        //  r-series
        'ら': { romaji: 'ra', meaning: '' },  'り': { romaji: 'ri', meaning: '' },  'る': { romaji: 'ru', meaning: '' },  'れ': { romaji: 're', meaning: '' },  'ろ': { romaji: 'ro', meaning: '' },
        'わ': { romaji: 'wa', meaning: '' },                                                                                                                   'を': { romaji: 'wo', meaning: '' },
        'ん': { romaji: 'n', meaning: '' },

        // Yoon (contracted sounds)
        'きゃ': { romaji: 'kya', meaning: '' },          'きゅ': { romaji: 'kyu', meaning: '' },             'きょ': { romaji: 'kyo', meaning: '' },
        'しゃ': { romaji: 'sha', meaning: '' },          'しゅ': { romaji: 'shu', meaning: '' },             'しょ': { romaji: 'sho', meaning: '' },
        'ちゃ': { romaji: 'cha', meaning: '' },          'ちゅ': { romaji: 'chu', meaning: '' },             'ちょ': { romaji: 'cho', meaning: '' },
        'にゃ': { romaji: 'nya', meaning: '' },          'にゅ': { romaji: 'nyu', meaning: '' },             'にょ': { romaji: 'nyo', meaning: '' },
        'ひゃ': { romaji: 'hya', meaning: '' },          'ひゅ': { romaji: 'hyu', meaning: '' },             'ひょ': { romaji: 'hyo', meaning: '' },
        'みゃ': { romaji: 'mya', meaning: '' },          'みゅ': { romaji: 'myu', meaning: '' },             'みょ': { romaji: 'myo', meaning: '' },
        'りゃ': { romaji: 'rya', meaning: '' },          'りゅ': { romaji: 'ryu', meaning: '' },             'りょ': { romaji: 'ryo', meaning: '' },
        'ぎゃ': { romaji: 'gya', meaning: '' },          'ぎゅ': { romaji: 'gyu', meaning: '' },             'ぎょ': { romaji: 'gyo', meaning: '' },
        'じゃ': { romaji: 'ja', meaning: '' },           'じゅ': { romaji: 'ju', meaning: '' },              'じょ': { romaji: 'jo', meaning: '' },
        'びゃ': { romaji: 'bya', meaning: '' },          'びゅ': { romaji: 'byu', meaning: '' },             'びょ': { romaji: 'byo', meaning: '' },
        'ぴゃ': { romaji: 'pya', meaning: '' },          'ぴゅ': { romaji: 'pyu', meaning: '' },             'ぴょ': { romaji: 'pyo', meaning: '' }
    };

    const katakanaCharacters = {
        //  a            i           u            e            o
        'ア': { romaji: 'a', meaning: '' },   'イ': { romaji: 'i', meaning: '' },   'ウ': { romaji: 'u', meaning: '' },   'エ': { romaji: 'e', meaning: '' },   'オ': { romaji: 'o', meaning: '' },
        //  k-series
        'カ': { romaji: 'ka', meaning: '' },  'キ': { romaji: 'ki', meaning: '' },  'ク': { romaji: 'ku', meaning: '' },  'ケ': { romaji: 'ke', meaning: '' },  'コ': { romaji: 'ko', meaning: '' },
        'ガ': { romaji: 'ga', meaning: '' },  'ギ': { romaji: 'gi', meaning: '' },  'グ': { romaji: 'gu', meaning: '' },  'ゲ': { romaji: 'ge', meaning: '' },  'ゴ': { romaji: 'go', meaning: '' },
        //  s-series
        'サ': { romaji: 'sa', meaning: '' },  'シ': { romaji: 'shi', meaning: '' }, 'ス': { romaji: 'su', meaning: '' },  'セ': { romaji: 'se', meaning: '' },  'ソ': { romaji: 'so', meaning: '' },
        'ザ': { romaji: 'za', meaning: '' },  'ジ': { romaji: 'ji', meaning: '' },  'ズ': { romaji: 'zu', meaning: '' },  'ゼ': { romaji: 'ze', meaning: '' },  'ゾ': { romaji: 'zo', meaning: '' },
        //  t-series
        'タ': { romaji: 'ta', meaning: '' },  'チ': { romaji: 'chi', meaning: '' }, 'ツ': { romaji: 'tsu', meaning: '' }, 'テ': { romaji: 'te', meaning: '' },  'ト': { romaji: 'to', meaning: '' },
        'ダ': { romaji: 'da', meaning: '' },  'ヂ': { romaji: 'ji', meaning: '' },  'ヅ': { romaji: 'zu', meaning: '' },  'デ': { romaji: 'de', meaning: '' },  'ド': { romaji: 'do', meaning: '' },
        //  n-series
        'ナ': { romaji: 'na', meaning: '' },  'ニ': { romaji: 'ni', meaning: '' },  'ヌ': { romaji: 'nu', meaning: '' },  'ネ': { romaji: 'ne', meaning: '' },  'ノ': { romaji: 'no', meaning: '' },
        //  h-series
        'ハ': { romaji: 'ha', meaning: '' },  'ヒ': { romaji: 'hi', meaning: '' },  'フ': { romaji: 'fu', meaning: '' },  'ヘ': { romaji: 'he', meaning: '' },  'ホ': { romaji: 'ho', meaning: '' },
        'バ': { romaji: 'ba', meaning: '' },  'ビ': { romaji: 'bi', meaning: '' },  'ブ': { romaji: 'bu', meaning: '' },  'ベ': { romaji: 'be', meaning: '' },  'ボ': { romaji: 'bo', meaning: '' },
        'パ': { romaji: 'pa', meaning: '' },  'ピ': { romaji: 'pi', meaning: '' },  'プ': { romaji: 'pu', meaning: '' },  'ペ': { romaji: 'pe', meaning: '' },  'ポ': { romaji: 'po', meaning: '' },
        //  m-series
        'マ': { romaji: 'ma', meaning: '' },  'ミ': { romaji: 'mi', meaning: '' },  'ム': { romaji: 'mu', meaning: '' },  'メ': { romaji: 'me', meaning: '' },  'モ': { romaji: 'mo', meaning: '' },
        //  y-series
        'ヤ': { romaji: 'ya', meaning: '' },                                         'ユ': { romaji: 'yu', meaning: '' },                                         'ヨ': { romaji: 'yo', meaning: '' },
        //  r-series
        'ラ': { romaji: 'ra', meaning: '' },  'リ': { romaji: 'ri', meaning: '' },  'ル': { romaji: 'ru', meaning: '' },  'レ': { romaji: 're', meaning: '' },  'ロ': { romaji: 'ro', meaning: '' },
        'ワ': { romaji: 'wa', meaning: '' },  'ヰ': { romaji: 'wi', meaning: '' },  'ヱ': { romaji: 'we', meaning: '' },  'ヲ': { romaji: 'wo', meaning: '' },
        'ン': { romaji: 'n', meaning: '' },

        // Yoon (contracted sounds)
        'キャ': { romaji: 'kya', meaning: '' },          'キュ': { romaji: 'kyu', meaning: '' },             'キョ': { romaji: 'kyo', meaning: '' },
        'シャ': { romaji: 'sha', meaning: '' },          'シュ': { romaji: 'shu', meaning: '' },             'ショ': { romaji: 'sho', meaning: '' },
        'チャ': { romaji: 'cha', meaning: '' },          'チュ': { romaji: 'chu', meaning: '' },             'チョ': { romaji: 'cho', meaning: '' },
        'ニャ': { romaji: 'nya', meaning: '' },          'ニュ': { romaji: 'nyu', meaning: '' },             'ニョ': { romaji: 'nyo', meaning: '' },
        'ヒャ': { romaji: 'hya', meaning: '' },          'ヒュ': { romaji: 'hyu', meaning: '' },             'ヒョ': { romaji: 'hyo', meaning: '' },
        'ミャ': { romaji: 'mya', meaning: '' },          'ミュ': { romaji: 'myu', meaning: '' },             'ミョ': { romaji: 'myo', meaning: '' },
        'リャ': { romaji: 'rya', meaning: '' },          'リュ': { romaji: 'ryu', meaning: '' },             'リョ': { romaji: 'ryo', meaning: '' },
        'ギャ': { romaji: 'gya', meaning: '' },          'ギュ': { romaji: 'gyu', meaning: '' },             'ギョ': { romaji: 'gyo', meaning: '' },
        'ジャ': { romaji: 'ja', meaning: '' },           'ジュ': { romaji: 'ju', meaning: '' },              'ジョ': { romaji: 'jo', meaning: '' },
        'ビャ': { romaji: 'bya', meaning: '' },          'ビュ': { romaji: 'byu', meaning: '' },             'ビョ': { romaji: 'byo', meaning: '' },
        'ピャ': { romaji: 'pya', meaning: '' },          'ピュ': { romaji: 'pyu', meaning: '' },             'ピョ': { romaji: 'pyo', meaning: '' },
        
        // Extended katakana for foreign words
        'ヴ': { romaji: 'vu', meaning: '' },
        'ティ': { romaji: 'ti', meaning: '' },           'ディ': { romaji: 'di', meaning: '' },              'トゥ': { romaji: 'tu', meaning: '' },
        'ドゥ': { romaji: 'du', meaning: '' },           'ファ': { romaji: 'fa', meaning: '' },              'フィ': { romaji: 'fi', meaning: '' },
        'フェ': { romaji: 'fe', meaning: '' },           'フォ': { romaji: 'fo', meaning: '' },              'ウィ': { romaji: 'wi', meaning: '' },
        'ウェ': { romaji: 'we', meaning: '' },           'ウォ': { romaji: 'wo', meaning: '' },              'ツァ': { romaji: 'tsa', meaning: '' },
        'ツィ': { romaji: 'tsi', meaning: '' },          'ツェ': { romaji: 'tse', meaning: '' },             'ツォ': { romaji: 'tso', meaning: '' },
        'チェ': { romaji: 'che', meaning: '' },          'シェ': { romaji: 'she', meaning: '' },             'ジェ': { romaji: 'je', meaning: '' },
        'イェ': { romaji: 'ye', meaning: '' }
    };

    

}