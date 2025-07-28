// Quiz Component
function Quiz({ words }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [quizMode, setQuizMode] = useState('english-to-kanji');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedWordType, setSelectedWordType] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Get all unique tags, difficulties, and word types
    const allTags = [...new Set(words.flatMap(word => word.tags || []))].sort();
    const allDifficulties = [...new Set(words.map(word => word.jlptLevel))].sort();
    const allWordTypes = [...new Set(words.map(word => word.wordType))].sort();

    // Filter words based on selected criteria
    const getFilteredWords = () => {
        return words.filter(word => {
        const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => word.tags?.includes(tag));
        const difficultyMatch = selectedDifficulty === 'all' || word.jlptLevel === selectedDifficulty;
        const wordTypeMatch = selectedWordType === 'all' || word.wordType === selectedWordType;
        return tagMatch && difficultyMatch && wordTypeMatch;
        });
    };

    const generateQuestion = () => {
        const filteredWords = getFilteredWords();
        if (filteredWords.length === 0) {
            setCurrentQuestion(null);
            return;
            }

            const word = filteredWords[Math.floor(Math.random() * filteredWords.length)];
            const conjugations = getConjugations(word);
            
            // Build possible questions based on quiz mode and word type
            const possibleQuestions = [];
            
            // Add basic translation questions for all combinations
            const modes = {
            'english-to-kanji': { from: 'english', to: 'kanji' },
            'english-to-hiragana': { from: 'english', to: 'hiragana' },
            'english-to-katakana': { from: 'english', to: 'katakana' },
            'english-to-romaji': { from: 'english', to: 'romaji' },
            'kanji-to-english': { from: 'kanji', to: 'english' },
            'kanji-to-hiragana': { from: 'kanji', to: 'hiragana' },
            'kanji-to-katakana': { from: 'kanji', to: 'katakana' },
            'kanji-to-romaji': { from: 'kanji', to: 'romaji' },
            'hiragana-to-english': { from: 'hiragana', to: 'english' },
            'hiragana-to-kanji': { from: 'hiragana', to: 'kanji' },
            'hiragana-to-katakana': { from: 'hiragana', to: 'katakana' },
            'hiragana-to-romaji': { from: 'hiragana', to: 'romaji' },
            'katakana-to-english': { from: 'katakana', to: 'english' },
            'katakana-to-kanji': { from: 'katakana', to: 'kanji' },
            'katakana-to-hiragana': { from: 'katakana', to: 'hiragana' },
            'katakana-to-romaji': { from: 'katakana', to: 'romaji' },
            'romaji-to-english': { from: 'romaji', to: 'english' },
            'romaji-to-kanji': { from: 'romaji', to: 'kanji' },
            'romaji-to-hiragana': { from: 'romaji', to: 'hiragana' },
            'romaji-to-katakana': { from: 'romaji', to: 'katakana' }
            };

            const mode = modes[quizMode];
            if (mode && word[mode.from] && word[mode.to]) {
            possibleQuestions.push({ 
                question: word[mode.from], 
                answer: word[mode.to], 
                type: 'basic' 
            });
        }
        
        // Add conjugation questions if applicable (only for modes that make sense)
        if (conjugations && (quizMode.startsWith('english-to') || quizMode.endsWith('-to-english'))) {
            if (word.wordType === 'godan-verb' || word.wordType === 'ichidan-verb') {
                possibleQuestions.push(
                { question: `${word.english} (polite present)`, answer: conjugations.polite.present, type: 'conjugation' },
                { question: `${word.english} (polite past)`, answer: conjugations.polite.past, type: 'conjugation' },
                { question: `${word.english} (negative)`, answer: conjugations.casual.negative, type: 'conjugation' },
                { question: `${word.english} (te-form)`, answer: conjugations.teForm, type: 'conjugation' }
                );
                if (conjugations.potential) {
                    possibleQuestions.push({ question: `${word.english} (can/potential)`, answer: conjugations.potential, type: 'conjugation' });
                    }
            }
            
            if (word.wordType === 'i-adjective') {
                possibleQuestions.push(
                { question: `${word.english} (past)`, answer: conjugations.past, type: 'conjugation' },
                { question: `${word.english} (negative)`, answer: conjugations.negative, type: 'conjugation' },
                { question: `${word.english} (adverb form)`, answer: conjugations.adverb, type: 'conjugation' }
                );
            }
            
            if (word.wordType === 'na-adjective') {
                possibleQuestions.push(
                { question: `${word.english} (past)`, answer: conjugations.past, type: 'conjugation' },
                { question: `${word.english} (negative)`, answer: conjugations.negative, type: 'conjugation' },
                { question: `${word.english} (adverb form)`, answer: conjugations.adverb, type: 'conjugation' }
                );
            }
        }
        
        // Randomly select one of the possible questions
        if (possibleQuestions.length > 0) {
            const selectedQuestion = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)];
            setCurrentQuestion({ ...selectedQuestion, word });
        } else {
            setCurrentQuestion(null);
        }
        
        setUserAnswer('');
        setFeedback('');
    };

    const handleTagToggle = (tag) => {
        setSelectedTags(prev => 
        prev.includes(tag) 
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
        );
    };

    const checkAnswer = () => {
        const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
        setQuestionsAnswered(prev => prev + 1);
        
        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('Correct! 🎉');
            setTimeout(() => nextQuestion(), 2000);
        } else {
            setFeedback(`Incorrect. The answer was: ${currentQuestion.answer}`);
            setTimeout(() => nextQuestion(), 3000);
        }
    };

    const nextQuestion = () => {
        generateQuestion();
        playSound();
    };

    const resetQuiz = () => {
        setScore(0);
        setQuestionsAnswered(0);
        setFeedback('');
        generateQuestion();
    };

    const playSound = () => {
        if (!currentQuestion) return;
        
        const utterance = new SpeechSynthesisUtterance();

        // Check if the question is in Japanese (kanji, hiragana, katakana, or romaji)
        const isJapaneseQuestion = quizMode.startsWith('kanji-to') || 
                                  quizMode.startsWith('hiragana-to') || 
                                  quizMode.startsWith('katakana-to') || 
                                  quizMode.startsWith('romaji-to');

        if (isJapaneseQuestion) {
            utterance.text = currentQuestion.question;
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8; // Slower for better clarity
            utterance.pitch = 1.0;
            
            // Try to select a specific Japanese voice
            const voices = speechSynthesis.getVoices();
            const japaneseVoice = voices.find(voice => 
                voice.lang.includes('ja') && voice.name.includes('Google')
            );
            if (japaneseVoice) utterance.voice = japaneseVoice;
            
        } else {
            utterance.text = currentQuestion.question;
            utterance.lang = 'en-US';
            utterance.rate = 1.3;
            utterance.pitch = 1.0;
            
            // Select a natural-sounding English voice
            const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => 
                voice.lang.includes('en-US') && 
                (voice.name.includes('Google') || voice.name.includes('Microsoft'))
            );
            if (englishVoice) utterance.voice = englishVoice;
        }
        
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        generateQuestion();
    }, [quizMode, selectedTags, selectedDifficulty, selectedWordType]);

    const filteredWordCount = getFilteredWords().length;

    return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">Quiz</h2>
        
        <div className="space-y-4">
            {/* Header with Score and Filters Toggle */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="text-sm text-gray-300">
                Score: {score}/{questionsAnswered}
                {questionsAnswered > 0 && (
                <span className="ml-2">
                    ({Math.round((score / questionsAnswered) * 100)}%)
                </span>
                )}
                <span className="ml-3 text-gray-400">
                Words available: {filteredWordCount}
                </span>
            </div>
            
            <div className="flex gap-2">
                <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <button
                onClick={resetQuiz}
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                Reset Score
                </button>
                <button
                onClick={playSound}
                className="px-3 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                Play Sound
                </button>
            </div>
            </div>

            {/* Filters Section */}
            {showFilters && (
            <div className="bg-gray-700 p-4 rounded-lg space-y-4">
                <h3 className="text-white font-semibold">Quiz Filters</h3>
                
                {/* Quiz Mode */}
                <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Quiz Mode</label>
                <select
                    value={quizMode}
                    onChange={(e) => setQuizMode(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                >
                    <optgroup label="English ↔ Japanese">
                    <option value="english-to-kanji">English → Kanji</option>
                    <option value="english-to-hiragana">English → Hiragana</option>
                    <option value="english-to-katakana">English → Katakana</option>
                    <option value="english-to-romaji">English → Romaji</option>
                    <option value="kanji-to-english">Kanji → English</option>
                    <option value="hiragana-to-english">Hiragana → English</option>
                    <option value="katakana-to-english">Katakana → English</option>
                    <option value="romaji-to-english">Romaji → English</option>
                    </optgroup>
                    <optgroup label="Japanese ↔ Japanese">
                    <option value="kanji-to-hiragana">Kanji → Hiragana</option>
                    <option value="kanji-to-katakana">Kanji → Katakana</option>
                    <option value="kanji-to-romaji">Kanji → Romaji</option>
                    <option value="hiragana-to-kanji">Hiragana → Kanji</option>
                    <option value="hiragana-to-katakana">Hiragana → Katakana</option>
                    <option value="hiragana-to-romaji">Hiragana → Romaji</option>
                    <option value="katakana-to-kanji">Katakana → Kanji</option>
                    <option value="katakana-to-hiragana">Katakana → Hiragana</option>
                    <option value="katakana-to-romaji">Katakana → Romaji</option>
                    <option value="romaji-to-kanji">Romaji → Kanji</option>
                    <option value="romaji-to-hiragana">Romaji → Hiragana</option>
                    <option value="romaji-to-katakana">Romaji → Katakana</option>
                    </optgroup>
                </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">JLPT Level</label>
                <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                >
                    <option value="all">All Levels</option>
                    {allDifficulties.map(level => (
                    <option key={level} value={level}>{level}</option>
                    ))}
                </select>
                </div>

                {/* Word Type Filter */}
                <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Word Type</label>
                <select
                    value={selectedWordType}
                    onChange={(e) => setSelectedWordType(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                >
                    <option value="all">All Types</option>
                    {allWordTypes.map(type => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </option>
                    ))}
                </select>
                </div>

                {/* Tags Filter */}
                <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Tags ({selectedTags.length} selected)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                    {allTags.map(tag => (
                    <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-300 text-sm">{tag}</span>
                    </label>
                    ))}
                </div>
                {selectedTags.length > 0 && (
                    <button
                    onClick={() => setSelectedTags([])}
                    className="mt-2 text-xs text-gray-400 hover:text-gray-200"
                    >
                    Clear all tags
                    </button>
                )}
                </div>
            </div>
            )}

            {/* Quiz Question */}
            {currentQuestion ? (
            <>
                <div className="text-center p-8 bg-gray-700 rounded-md">
                <div className="text-3xl font-bold mb-2 text-white">{currentQuestion.question}</div>
                <div className="text-sm text-gray-400">
                    {currentQuestion.word.wordType} • {currentQuestion.word.jlptLevel}
                    {currentQuestion.type === 'conjugation' && (
                    <span className="ml-2 px-2 py-1 bg-purple-800 text-purple-200 rounded-full text-xs">
                        Conjugation
                    </span>
                    )}
                </div>
                </div>

                <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-md text-center text-lg bg-gray-700 text-white placeholder-gray-400"
                placeholder="Your answer"
                onKeyPress={(e) => e.key === 'Enter' && !feedback && checkAnswer()}
                />

                {!feedback ? (
                <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-600 transition-colors text-base font-medium"
                >
                    Check Answer
                </button>
                ) : (
                <div className="space-y-3">
                    <div className={`p-3 rounded-md text-center ${
                    feedback.includes('Correct') ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'
                    }`}>
                    {feedback}
                    </div>
                    <button
                    onClick={nextQuestion}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors text-base font-medium"
                    >
                    Next Question
                    </button>
                </div>
                )}
            </>
            ) : (
            <div className="text-center p-8 bg-gray-700 rounded-md">
                <div className="text-gray-400">No questions available with current filters.</div>
                <div className="text-sm text-gray-500 mt-2">Try adjusting your filters or adding more vocabulary.</div>
            </div>
            )}
        </div>
        </div>
    );
}
