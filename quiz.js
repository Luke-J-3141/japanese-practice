// Quiz Component
function Quiz({ words }) {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [quizFromLanguage, setQuizFromLanguage] = useState('english');
    const [quizToLanguage, setQuizToLanguage] = useState('kanji');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedWordType, setSelectedWordType] = useState('all');
    const [includeConjugations, setIncludeConjugations] = useState(true);
    const [autoPlaySound, setAutoPlaySound] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Available language options
    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'kanji', label: 'Kanji' },
        { value: 'hiragana', label: 'Hiragana' },
        { value: 'katakana', label: 'Katakana' },
        { value: 'romaji', label: 'Romaji' }
    ];

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
        
        // Add basic translation questions if both languages exist for the word
        if (word[quizFromLanguage] && word[quizToLanguage]) {
            possibleQuestions.push({ 
                question: word[quizFromLanguage], 
                answer: word[quizToLanguage], 
                type: 'basic' 
            });
        }
        
        // Add conjugation questions if applicable and enabled
        if (includeConjugations && conjugations && (quizFromLanguage === 'english' || quizToLanguage === 'english')) {
            if (word.wordType === 'godan-verb' || word.wordType === 'ichidan-verb') {
                if (quizFromLanguage === 'english') {
                    // English to Japanese conjugations
                    possibleQuestions.push(
                        { question: `${word.english} (polite present)`, answer: conjugations.polite.present, type: 'conjugation' },
                        { question: `${word.english} (polite past)`, answer: conjugations.polite.past, type: 'conjugation' },
                        { question: `${word.english} (negative)`, answer: conjugations.casual.negative, type: 'conjugation' },
                        { question: `${word.english} (te-form)`, answer: conjugations.teForm, type: 'conjugation' }
                    );
                    if (conjugations.potential) {
                        possibleQuestions.push({ question: `${word.english} (can/potential)`, answer: conjugations.potential, type: 'conjugation' });
                    }
                } else if (quizToLanguage === 'english') {
                    // Japanese to English conjugations (reverse)
                    possibleQuestions.push(
                        { question: `${conjugations.polite.present} (meaning)`, answer: `${word.english} (polite present)`, type: 'conjugation' },
                        { question: `${conjugations.polite.past} (meaning)`, answer: `${word.english} (polite past)`, type: 'conjugation' },
                        { question: `${conjugations.casual.negative} (meaning)`, answer: `${word.english} (negative)`, type: 'conjugation' },
                        { question: `${conjugations.teForm} (meaning)`, answer: `${word.english} (te-form)`, type: 'conjugation' }
                    );
                    if (conjugations.potential) {
                        possibleQuestions.push({ question: `${conjugations.potential} (meaning)`, answer: `${word.english} (can/potential)`, type: 'conjugation' });
                    }
                }
            }
            
            if (word.wordType === 'i-adjective') {
                if (quizFromLanguage === 'english') {
                    possibleQuestions.push(
                        { question: `${word.english} (past)`, answer: conjugations.past, type: 'conjugation' },
                        { question: `${word.english} (negative)`, answer: conjugations.negative, type: 'conjugation' },
                        { question: `${word.english} (adverb form)`, answer: conjugations.adverb, type: 'conjugation' }
                    );
                } else if (quizToLanguage === 'english') {
                    possibleQuestions.push(
                        { question: `${conjugations.past} (meaning)`, answer: `${word.english} (past)`, type: 'conjugation' },
                        { question: `${conjugations.negative} (meaning)`, answer: `${word.english} (negative)`, type: 'conjugation' },
                        { question: `${conjugations.adverb} (meaning)`, answer: `${word.english} (adverb form)`, type: 'conjugation' }
                    );
                }
            }
            
            if (word.wordType === 'na-adjective') {
                if (quizFromLanguage === 'english') {
                    possibleQuestions.push(
                        { question: `${word.english} (past)`, answer: conjugations.past, type: 'conjugation' },
                        { question: `${word.english} (negative)`, answer: conjugations.negative, type: 'conjugation' },
                        { question: `${word.english} (adverb form)`, answer: conjugations.adverb, type: 'conjugation' }
                    );
                } else if (quizToLanguage === 'english') {
                    possibleQuestions.push(
                        { question: `${conjugations.past} (meaning)`, answer: `${word.english} (past)`, type: 'conjugation' },
                        { question: `${conjugations.negative} (meaning)`, answer: `${word.english} (negative)`, type: 'conjugation' },
                        { question: `${conjugations.adverb} (meaning)`, answer: `${word.english} (adverb form)`, type: 'conjugation' }
                    );
                }
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
        const isJapaneseQuestion = quizFromLanguage !== 'english';

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
    }, [quizFromLanguage, quizToLanguage, selectedTags, selectedDifficulty, selectedWordType, includeConjugations]);

    // Auto-play sound when a new question is generated (if auto-play is enabled)
    useEffect(() => {
        if (autoPlaySound && currentQuestion) {
            setTimeout(() => playSound(), 100);
        }
    }, [currentQuestion, autoPlaySound]);

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
                            onClick={() => setAutoPlaySound(!autoPlaySound)}
                            className={`px-3 py-2 rounded-md transition-colors text-sm ${
                                autoPlaySound 
                                    ? 'bg-green-600 text-white hover:bg-green-700' 
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            }`}
                        >
                            Auto-play: {autoPlaySound ? 'ON' : 'OFF'}
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
                        
                        {/* Quiz Mode - From and To dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-200">From</label>
                                <select
                                    value={quizFromLanguage}
                                    onChange={(e) => setQuizFromLanguage(e.target.value)}
                                    className="w-full p-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                                >
                                    {languageOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-200">To</label>
                                <select
                                    value={quizToLanguage}
                                    onChange={(e) => setQuizToLanguage(e.target.value)}
                                    className="w-full p-2 border border-gray-600 rounded-md text-sm bg-gray-800 text-white"
                                >
                                    {languageOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Conjugations Filter */}
                        <div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={includeConjugations}
                                    onChange={(e) => setIncludeConjugations(e.target.checked)}
                                    className="rounded bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-200 text-sm">Include conjugations (verbs & adjectives)</span>
                            </label>
                            <p className="text-xs text-gray-400 mt-1 ml-6">
                                When enabled, includes conjugated forms like past tense, negative, te-form, etc.
                            </p>
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