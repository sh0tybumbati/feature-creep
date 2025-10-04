// Creep Cards Data
export const creepCards = [
  // Theme/Topic Restrictions (5-10 gold)
  { id: 1, text: "Your game must be about cats", cost: 5, category: "theme", rarity: "common", icon: "🐱" },
  { id: 2, text: "Set in a post-apocalyptic bakery", cost: 10, category: "theme", rarity: "uncommon", icon: "🥖" },
  { id: 3, text: "Must feature time travel", cost: 10, category: "theme", rarity: "epic", icon: "⏰" },
  { id: 4, text: "Everything happens underwater", cost: 5, category: "theme", rarity: "common", icon: "🌊" },
  { id: 5, text: "Your protagonist is a sentient plant", cost: 10, category: "theme", rarity: "uncommon", icon: "🌱" },
  { id: 6, text: "Set entirely in an elevator", cost: 15, category: "theme", rarity: "legendary", icon: "🛗" },
  { id: 7, text: "Must involve cooking disasters", cost: 5, category: "theme", rarity: "common", icon: "🔥" },
  { id: 8, text: "Takes place in a library after hours", cost: 5, category: "theme", rarity: "common", icon: "📚" },

  // Art Style Restrictions (10-15 gold)
  { id: 9, text: "Everything must be drawn with circles only", cost: 15, category: "art", rarity: "epic", icon: "⭕" },
  { id: 10, text: "ASCII art style only", cost: 15, category: "art", rarity: "rare", icon: "💻" },
  { id: 11, text: "Black and white with one accent color", cost: 10, category: "art", rarity: "uncommon", icon: "⚫" },
  { id: 12, text: "MS Paint aesthetic required", cost: 10, category: "art", rarity: "common", icon: "🖌️" },
  { id: 13, text: "Stick figure art style", cost: 10, category: "art", rarity: "common", icon: "🏃‍♂️" },
  { id: 14, text: "Everything looks like it's made of LEGO", cost: 15, category: "art", rarity: "rare", icon: "🧱" },
  { id: 15, text: "Pixel art with max 4 colors", cost: 10, category: "art", rarity: "uncommon", icon: "🎨" },

  // Character Restrictions (5-15 gold)
  { id: 16, text: "Protagonist must be afraid of their own shadow", cost: 10, category: "character", rarity: "uncommon", icon: "🫥" },
  { id: 17, text: "Main character can only speak in rhymes", cost: 15, category: "character", rarity: "epic", icon: "🎭" },
  { id: 18, text: "Hero is actually the villain's pet", cost: 10, category: "character", rarity: "uncommon", icon: "🐕" },
  { id: 19, text: "Protagonist has hiccups throughout entire game", cost: 5, category: "character", rarity: "common", icon: "😵" },
  { id: 20, text: "Main character is invisible (to themselves too)", cost: 15, category: "character", rarity: "legendary", icon: "👻" },
  { id: 21, text: "Hero moves only by sneezing", cost: 10, category: "character", rarity: "uncommon", icon: "🤧" },

  // Gameplay Restrictions (15-20 gold)
  { id: 22, text: "Player can only turn left", cost: 20, category: "gameplay", rarity: "legendary", icon: "↪️" },
  { id: 23, text: "Game must be played with eyes closed", cost: 20, category: "gameplay", rarity: "legendary", icon: "🙈" },
  { id: 24, text: "No UI elements allowed", cost: 20, category: "gameplay", rarity: "epic", icon: "🚫" },
  { id: 25, text: "Everything happens in reverse", cost: 15, category: "gameplay", rarity: "epic", icon: "⏪" },
  { id: 26, text: "Player input has a 2-second delay", cost: 15, category: "gameplay", rarity: "rare", icon: "⏳" },
  { id: 27, text: "Game must be completable in under 30 seconds", cost: 15, category: "gameplay", rarity: "rare", icon: "⏱️" },
  { id: 28, text: "Gravity changes every 10 seconds", cost: 15, category: "gameplay", rarity: "rare", icon: "🌍" },

  // Audio Restrictions (5-15 gold)
  { id: 29, text: "All sounds must be made with your mouth", cost: 10, category: "audio", rarity: "uncommon", icon: "👄" },
  { id: 30, text: "Only kazoo music allowed", cost: 10, category: "audio", rarity: "uncommon", icon: "🎺" },
  { id: 31, text: "Sound effects must be inappropriate for actions", cost: 5, category: "audio", rarity: "common", icon: "🔇" },
  { id: 32, text: "All audio must be whispered", cost: 10, category: "audio", rarity: "uncommon", icon: "🤫" },
  { id: 33, text: "Only use sounds from a kitchen", cost: 5, category: "audio", rarity: "common", icon: "🍳" },

  // Story Restrictions (10-15 gold)
  { id: 34, text: "Entire story told through error messages", cost: 15, category: "story", rarity: "epic", icon: "⚠️" },
  { id: 35, text: "Plot must involve a sandwich conspiracy", cost: 10, category: "story", rarity: "uncommon", icon: "🥪" },
  { id: 36, text: "Story happens entirely during loading screens", cost: 15, category: "story", rarity: "epic", icon: "⏳" },
  { id: 37, text: "Narrative told only through item descriptions", cost: 15, category: "story", rarity: "rare", icon: "🏷️" },
  { id: 38, text: "All dialogue must be questions", cost: 10, category: "story", rarity: "uncommon", icon: "❓" },

  // Technical Restrictions (15-25 gold)
  { id: 39, text: "Game must fit in a 64x64 pixel window", cost: 25, category: "technical", rarity: "legendary", icon: "📱" },
  { id: 40, text: "Only use geometric shapes", cost: 15, category: "technical", rarity: "rare", icon: "🔺" },
  { id: 41, text: "No textures, only solid colors", cost: 15, category: "technical", rarity: "rare", icon: "🟦" },
  { id: 42, text: "Must run at exactly 10 FPS", cost: 20, category: "technical", rarity: "epic", icon: "🐌" },
  { id: 43, text: "Game controls change every level", cost: 20, category: "technical", rarity: "epic", icon: "🎮" },

  // Meta Restrictions (15-25 gold)
  { id: 44, text: "Game must break the fourth wall constantly", cost: 15, category: "meta", rarity: "rare", icon: "🧱" },
  { id: 45, text: "Player character is aware they're in a game", cost: 15, category: "meta", rarity: "rare", icon: "💭" },
  { id: 46, text: "Game must pretend to crash (but doesn't)", cost: 20, category: "meta", rarity: "epic", icon: "💥" },
  { id: 47, text: "UI elements have their own personality", cost: 20, category: "meta", rarity: "epic", icon: "😄" },
  { id: 48, text: "Game apologizes for everything", cost: 10, category: "meta", rarity: "uncommon", icon: "🙏" },
  { id: 49, text: "Must simulate dial-up internet loading", cost: 10, category: "meta", rarity: "uncommon", icon: "📞" },
  { id: 50, text: "Game exists only in your browser's console", cost: 25, category: "meta", rarity: "legendary", icon: "🖥️" },

  // More Reasonable Theme Restrictions (3-8 gold)
  { id: 51, text: "Must include a day/night cycle", cost: 5, category: "theme", rarity: "uncommon", icon: "🌗" },
  { id: 52, text: "Set in a single room", cost: 5, category: "theme", rarity: "common", icon: "🏠" },
  { id: 53, text: "Include a weather system", cost: 5, category: "theme", rarity: "uncommon", icon: "🌦️" },
  { id: 54, text: "Must have a seasonal theme", cost: 3, category: "theme", rarity: "common", icon: "🍂" },
  { id: 55, text: "Set in space", cost: 5, category: "theme", rarity: "common", icon: "🚀" },
  { id: 56, text: "Takes place in one continuous shot", cost: 8, category: "theme", rarity: "uncommon", icon: "🎬" },
  { id: 57, text: "Must include a companion character", cost: 3, category: "theme", rarity: "common", icon: "👥" },
  { id: 58, text: "Set during a festival or celebration", cost: 3, category: "theme", rarity: "common", icon: "🎊" },

  // Reasonable Art Restrictions (3-8 gold)
  { id: 59, text: "Limited to 8-bit style graphics", cost: 5, category: "art", rarity: "common", icon: "🕹️" },
  { id: 60, text: "Monochrome color palette", cost: 5, category: "art", rarity: "uncommon", icon: "⚪" },
  { id: 61, text: "No character animations (static sprites)", cost: 8, category: "art", rarity: "uncommon", icon: "🖼️" },
  { id: 62, text: "Minimalist art style", cost: 5, category: "art", rarity: "common", icon: "⬜" },
  { id: 63, text: "Low poly 3D graphics only", cost: 8, category: "art", rarity: "uncommon", icon: "🔷" },
  { id: 64, text: "Silhouette-based visuals", cost: 5, category: "art", rarity: "common", icon: "🌚" },

  // Reasonable Gameplay Restrictions (5-10 gold)
  { id: 65, text: "Player has limited resources", cost: 3, category: "gameplay", rarity: "common", icon: "⛽" },
  { id: 66, text: "Must include a time limit", cost: 5, category: "gameplay", rarity: "common", icon: "⏰" },
  { id: 67, text: "No jumping allowed", cost: 5, category: "gameplay", rarity: "common", icon: "⬇️" },
  { id: 68, text: "One-hit death system", cost: 8, category: "gameplay", rarity: "uncommon", icon: "💀" },
  { id: 69, text: "Player moves automatically", cost: 8, category: "gameplay", rarity: "uncommon", icon: "🔄" },
  { id: 70, text: "Limited to 3 buttons/keys", cost: 5, category: "gameplay", rarity: "common", icon: "⌨️" },
  { id: 71, text: "Include a stealth mechanic", cost: 5, category: "gameplay", rarity: "uncommon", icon: "🥷" },
  { id: 72, text: "Physics-based movement only", cost: 8, category: "gameplay", rarity: "uncommon", icon: "🎳" },
  { id: 73, text: "Must have permadeath", cost: 5, category: "gameplay", rarity: "common", icon: "⚰️" },
  { id: 74, text: "Top-down perspective only", cost: 3, category: "gameplay", rarity: "common", icon: "⬇️" },
  { id: 75, text: "Side-scrolling only", cost: 3, category: "gameplay", rarity: "common", icon: "➡️" },

  // Reasonable Character Restrictions (3-8 gold)
  { id: 76, text: "Protagonist cannot attack directly", cost: 5, category: "character", rarity: "uncommon", icon: "🕊️" },
  { id: 77, text: "Main character is very slow", cost: 5, category: "character", rarity: "common", icon: "🐢" },
  { id: 78, text: "Hero has limited vision range", cost: 5, category: "character", rarity: "uncommon", icon: "👁️" },
  { id: 79, text: "Protagonist is very small", cost: 3, category: "character", rarity: "common", icon: "🐜" },
  { id: 80, text: "Character can only move in cardinal directions", cost: 3, category: "character", rarity: "common", icon: "✚" },

  // Reasonable Technical Restrictions (5-10 gold)
  { id: 81, text: "Maximum of 5 different sounds", cost: 5, category: "technical", rarity: "common", icon: "🔉" },
  { id: 82, text: "Game must be under 10MB total", cost: 8, category: "technical", rarity: "uncommon", icon: "💾" },
  { id: 83, text: "Limited to 16x16 tile grid", cost: 8, category: "technical", rarity: "uncommon", icon: "⬛" },
  { id: 84, text: "No diagonal movement", cost: 3, category: "technical", rarity: "common", icon: "🔄" },
  { id: 85, text: "Fixed camera position", cost: 5, category: "technical", rarity: "common", icon: "📷" },

  // Reasonable Story Restrictions (3-8 gold)
  { id: 86, text: "No dialogue (environmental storytelling only)", cost: 8, category: "story", rarity: "rare", icon: "🌲" },
  { id: 87, text: "Story must have a twist ending", cost: 5, category: "story", rarity: "uncommon", icon: "🌪️" },
  { id: 88, text: "Told through flashbacks", cost: 5, category: "story", rarity: "common", icon: "📸" },
  { id: 89, text: "Non-linear narrative", cost: 8, category: "story", rarity: "rare", icon: "🕸️" },
  { id: 90, text: "Must have multiple endings", cost: 5, category: "story", rarity: "uncommon", icon: "🚪" },

  // Reasonable Audio Restrictions (3-8 gold)
  { id: 91, text: "Maximum of 3 music tracks", cost: 5, category: "audio", rarity: "common", icon: "🎵" },
  { id: 92, text: "Chiptune music only", cost: 5, category: "audio", rarity: "common", icon: "🎮" },
  { id: 93, text: "No music (sound effects only)", cost: 3, category: "audio", rarity: "common", icon: "🔊" },
  { id: 94, text: "Ambient sounds only", cost: 5, category: "audio", rarity: "uncommon", icon: "🌬️" },
  { id: 95, text: "All audio must be synthesized", cost: 8, category: "audio", rarity: "uncommon", icon: "🎛️" },

  // More Theme Restrictions (3-10 gold)
  { id: 96, text: "Must take place in a single day", cost: 5, category: "theme", rarity: "common", icon: "🌞" },
  { id: 97, text: "Set in a dream world", cost: 8, category: "theme", rarity: "rare", icon: "💤" },
  { id: 98, text: "Everything is made of paper", cost: 8, category: "theme", rarity: "rare", icon: "📄" },
  { id: 99, text: "Set in ancient ruins", cost: 5, category: "theme", rarity: "common", icon: "🏛️" },
  { id: 100, text: "Must include a mystery to solve", cost: 5, category: "theme", rarity: "uncommon", icon: "🔍" },
  { id: 101, text: "Based on a fairy tale", cost: 5, category: "theme", rarity: "common", icon: "🧚" },
  { id: 102, text: "Set in a single building", cost: 5, category: "theme", rarity: "common", icon: "🏢" },
  { id: 103, text: "Must feature robots", cost: 3, category: "theme", rarity: "common", icon: "🤖" },
  { id: 104, text: "Set in the wilderness", cost: 3, category: "theme", rarity: "common", icon: "🌲" },
  { id: 105, text: "Everything is tiny/miniature", cost: 8, category: "theme", rarity: "rare", icon: "🔬" },

  // More Art Restrictions (5-10 gold)
  { id: 106, text: "Only use primary colors", cost: 5, category: "art", rarity: "common", icon: "🔴" },
  { id: 107, text: "Hand-drawn style only", cost: 8, category: "art", rarity: "rare", icon: "✏️" },
  { id: 108, text: "Neon aesthetic", cost: 5, category: "art", rarity: "common", icon: "🌈" },
  { id: 109, text: "Retro 90s style", cost: 5, category: "art", rarity: "common", icon: "📼" },
  { id: 110, text: "Everything must glow", cost: 8, category: "art", rarity: "rare", icon: "✨" },
  { id: 111, text: "Watercolor art style", cost: 10, category: "art", rarity: "epic", icon: "🎨" },
  { id: 112, text: "Comic book style", cost: 8, category: "art", rarity: "rare", icon: "💥" },
  { id: 113, text: "Limited to 2 colors", cost: 8, category: "art", rarity: "rare", icon: "⚫" },
  { id: 114, text: "Isometric perspective only", cost: 5, category: "art", rarity: "uncommon", icon: "🔷" },

  // More Gameplay Restrictions (3-10 gold)
  { id: 115, text: "No tutorial allowed", cost: 5, category: "gameplay", rarity: "uncommon", icon: "🚫" },
  { id: 116, text: "Must be playable with one hand", cost: 8, category: "gameplay", rarity: "rare", icon: "✋" },
  { id: 117, text: "Real-time only (no pausing)", cost: 5, category: "gameplay", rarity: "uncommon", icon: "▶️" },
  { id: 118, text: "Turn-based gameplay only", cost: 5, category: "gameplay", rarity: "common", icon: "♟️" },
  { id: 119, text: "No health bar visible", cost: 5, category: "gameplay", rarity: "uncommon", icon: "❤️‍🩹" },
  { id: 120, text: "Randomized elements required", cost: 5, category: "gameplay", rarity: "common", icon: "🎲" },
  { id: 121, text: "No checkpoints", cost: 8, category: "gameplay", rarity: "rare", icon: "🏁" },
  { id: 122, text: "Must have a score system", cost: 3, category: "gameplay", rarity: "common", icon: "📊" },
  { id: 123, text: "Infinite gameplay (no ending)", cost: 8, category: "gameplay", rarity: "rare", icon: "♾️" },
  { id: 124, text: "Must include a boss fight", cost: 5, category: "gameplay", rarity: "uncommon", icon: "👹" },
  { id: 125, text: "Speedrun-focused design", cost: 8, category: "gameplay", rarity: "rare", icon: "🏃‍♂️" },

  // More Character Restrictions (3-10 gold)
  { id: 126, text: "No human characters", cost: 5, category: "character", rarity: "uncommon", icon: "🚫" },
  { id: 127, text: "Silent protagonist", cost: 3, category: "character", rarity: "common", icon: "🤐" },
  { id: 128, text: "Protagonist is an animal", cost: 3, category: "character", rarity: "common", icon: "🐾" },
  { id: 129, text: "Multiple playable characters", cost: 8, category: "character", rarity: "rare", icon: "👫" },
  { id: 130, text: "Character changes form/shape", cost: 8, category: "character", rarity: "rare", icon: "🔄" },
  { id: 131, text: "Protagonist is very large", cost: 5, category: "character", rarity: "common", icon: "🦣" },
  { id: 132, text: "Character has limited memory", cost: 10, category: "character", rarity: "epic", icon: "🧠" },

  // More Technical Restrictions (5-10 gold)
  { id: 133, text: "Maximum 32x32 sprites", cost: 10, category: "technical", rarity: "epic", icon: "🎯" },
  { id: 134, text: "Single screen (no scrolling)", cost: 8, category: "technical", rarity: "uncommon", icon: "📺" },
  { id: 135, text: "Must load in under 3 seconds", cost: 5, category: "technical", rarity: "common", icon: "⚡" },
  { id: 136, text: "Limited to 100 game objects", cost: 8, category: "technical", rarity: "uncommon", icon: "🔢" },
  { id: 137, text: "No third-party assets", cost: 10, category: "technical", rarity: "epic", icon: "🏠" },
  { id: 138, text: "Must support keyboard only", cost: 3, category: "technical", rarity: "common", icon: "⌨️" },
  { id: 139, text: "Must work offline", cost: 3, category: "technical", rarity: "common", icon: "📴" },

  // More Story Restrictions (5-10 gold)
  { id: 140, text: "Story told in reverse", cost: 10, category: "story", rarity: "epic", icon: "⏪" },
  { id: 141, text: "Unreliable narrator", cost: 8, category: "story", rarity: "rare", icon: "🤥" },
  { id: 142, text: "No words (visual only)", cost: 10, category: "story", rarity: "epic", icon: "👁️" },
  { id: 143, text: "Story must be happy/uplifting", cost: 3, category: "story", rarity: "common", icon: "😊" },
  { id: 144, text: "Story must be dark/serious", cost: 3, category: "story", rarity: "common", icon: "😔" },
  { id: 145, text: "Based on real events", cost: 8, category: "story", rarity: "rare", icon: "📰" },
  { id: 146, text: "Moral choice system", cost: 8, category: "story", rarity: "rare", icon: "⚖️" },

  // More Audio Restrictions (3-8 gold)
  { id: 147, text: "One-instrument soundtrack", cost: 8, category: "audio", rarity: "uncommon", icon: "🎹" },
  { id: 148, text: "Looping track only", cost: 5, category: "audio", rarity: "common", icon: "🔁" },
  { id: 149, text: "Diegetic sound only", cost: 8, category: "audio", rarity: "uncommon", icon: "📻" },
  { id: 150, text: "Percussion instruments only", cost: 8, category: "audio", rarity: "uncommon", icon: "🥁" }
];

// Feature Cards Data  
export const featureCards = [
  // Basic Movement
  { id: 'walk', text: 'Walking', cost: 3, category: 'Movement', icon: '🚶', rarity: 'common' },
  { id: 'run', text: 'Running', cost: 5, category: 'Movement', icon: '🏃', rarity: 'common' },
  { id: 'jump', text: 'Jumping', cost: 8, category: 'Movement', icon: '⬆️', rarity: 'common' },
  { id: 'fly', text: 'Flying', cost: 12, category: 'Movement', icon: '🦅', rarity: 'rare' },
  { id: 'teleport', text: 'Teleportation', cost: 15, category: 'Movement', icon: '✨', rarity: 'epic' },
  { id: 'crawl', text: 'Crawling', cost: 5, category: 'Movement', icon: '🐛', rarity: 'common' },
  { id: 'swim', text: 'Swimming', cost: 8, category: 'Movement', icon: '🏊', rarity: 'common' },
  { id: 'climb', text: 'Wall Climbing', cost: 12, category: 'Movement', icon: '🧗', rarity: 'rare' },

  // Visual Elements
  { id: 'sprite', text: 'Character Sprite', cost: 5, category: 'Visual', icon: '👤', rarity: 'common' },
  { id: 'animation', text: 'Animations', cost: 10, category: 'Visual', icon: '🎭', rarity: 'uncommon' },
  { id: 'particles', text: 'Particle Effects', cost: 12, category: 'Visual', icon: '💫', rarity: 'uncommon' },
  { id: 'lighting', text: 'Dynamic Lighting', cost: 15, category: 'Visual', icon: '💡', rarity: 'rare' },
  { id: 'shadows', text: 'Shadows', cost: 8, category: 'Visual', icon: '🌓', rarity: 'uncommon' },
  { id: 'weather', text: 'Weather Effects', cost: 15, category: 'Visual', icon: '🌦️', rarity: 'epic' },
  { id: 'bloom', text: 'Screen Effects', cost: 12, category: 'Visual', icon: '✨', rarity: 'uncommon' },
  { id: 'trails', text: 'Motion Trails', cost: 8, category: 'Visual', icon: '💨', rarity: 'uncommon' },

  // Audio
  { id: 'sfx', text: 'Sound Effects', cost: 10, category: 'Audio', icon: '🔊', rarity: 'common' },
  { id: 'music', text: 'Background Music', cost: 10, category: 'Audio', icon: '🎵', rarity: 'common' },
  { id: 'voice', text: 'Voice Acting', cost: 25, category: 'Audio', icon: '🎤', rarity: 'legendary' },
  { id: 'ambient', text: 'Ambient Sounds', cost: 8, category: 'Audio', icon: '🌊', rarity: 'common' },
  { id: 'dynamic', text: 'Dynamic Music', cost: 20, category: 'Audio', icon: '🎼', rarity: 'epic' },

  // Gameplay
  { id: 'combat', text: 'Combat System', cost: 15, category: 'Gameplay', icon: '⚔️', rarity: 'uncommon' },
  { id: 'inventory', text: 'Inventory System', cost: 10, category: 'Gameplay', icon: '🎒', rarity: 'uncommon' },
  { id: 'dialogue', text: 'Dialogue System', cost: 15, category: 'Gameplay', icon: '💬', rarity: 'uncommon' },
  { id: 'save', text: 'Save System', cost: 15, category: 'Gameplay', icon: '💾', rarity: 'uncommon' },
  { id: 'levels', text: 'Multiple Levels', cost: 20, category: 'Gameplay', icon: '🏗️', rarity: 'rare' },
  { id: 'ai', text: 'AI Enemies', cost: 20, category: 'Gameplay', icon: '🤖', rarity: 'epic' },
  { id: 'crafting', text: 'Crafting System', cost: 20, category: 'Gameplay', icon: '🔨', rarity: 'epic' },
  { id: 'puzzles', text: 'Puzzle Mechanics', cost: 15, category: 'Gameplay', icon: '🧩', rarity: 'uncommon' },
  { id: 'collectibles', text: 'Collectible Items', cost: 10, category: 'Gameplay', icon: '💎', rarity: 'common' },
  { id: 'stealth', text: 'Stealth Mechanics', cost: 20, category: 'Gameplay', icon: '👤', rarity: 'epic' },

  // UI Elements
  { id: 'hud', text: 'HUD Display', cost: 5, category: 'Interface', icon: '📊', rarity: 'common' },
  { id: 'menu', text: 'Menu System', cost: 8, category: 'Interface', icon: '📋', rarity: 'uncommon' },
  { id: 'pause', text: 'Pause Function', cost: 5, category: 'Interface', icon: '⏸️', rarity: 'common' },
  { id: 'settings', text: 'Settings Menu', cost: 8, category: 'Interface', icon: '⚙️', rarity: 'uncommon' },
  { id: 'minimap', text: 'Mini Map', cost: 12, category: 'Interface', icon: '🗺️', rarity: 'rare' },
  { id: 'tooltips', text: 'Tooltips', cost: 8, category: 'Interface', icon: '💭', rarity: 'common' },
  { id: 'notifications', text: 'Notifications', cost: 8, category: 'Interface', icon: '🔔', rarity: 'common' },

  // Advanced Features
  { id: 'physics', text: 'Physics Engine', cost: 30, category: 'Advanced', icon: '🌍', rarity: 'epic' },
  { id: 'multiplayer', text: 'Multiplayer', cost: 40, category: 'Advanced', icon: '👥', rarity: 'legendary' },
  { id: 'procedural', text: 'Procedural Generation', cost: 30, category: 'Advanced', icon: '🎲', rarity: 'epic' },
  { id: 'achievements', text: 'Achievement System', cost: 15, category: 'Advanced', icon: '🏆', rarity: 'rare' },
  { id: 'leaderboards', text: 'Leaderboards', cost: 20, category: 'Advanced', icon: '📈', rarity: 'rare' },
  { id: 'modding', text: 'Modding Support', cost: 40, category: 'Advanced', icon: '🔧', rarity: 'legendary' },
  { id: 'analytics', text: 'Player Analytics', cost: 18, category: 'Advanced', icon: '📊', rarity: 'rare' },
  { id: 'cutscenes', text: 'Cutscene System', cost: 20, category: 'Advanced', icon: '🎬', rarity: 'epic' },
  { id: 'replay', text: 'Replay System', cost: 15, category: 'Advanced', icon: '⏮️', rarity: 'rare' },
  { id: 'localization', text: 'Multi-Language Support', cost: 20, category: 'Advanced', icon: '🌐', rarity: 'epic' },

  // Combat & Action
  { id: 'weapons', text: 'Weapon System', cost: 12, category: 'Combat', icon: '⚔️', rarity: 'uncommon' },
  { id: 'combo', text: 'Combo System', cost: 18, category: 'Combat', icon: '💥', rarity: 'rare' },
  { id: 'blocking', text: 'Block/Parry System', cost: 12, category: 'Combat', icon: '🛡️', rarity: 'uncommon' },
  { id: 'ranged', text: 'Ranged Combat', cost: 12, category: 'Combat', icon: '🏹', rarity: 'uncommon' },
  { id: 'magic', text: 'Magic System', cost: 20, category: 'Combat', icon: '✨', rarity: 'epic' },

  // World Building
  { id: 'npcs', text: 'NPC System', cost: 15, category: 'World', icon: '👤', rarity: 'uncommon' },
  { id: 'shops', text: 'In-Game Shops', cost: 10, category: 'World', icon: '🏪', rarity: 'uncommon' },
  { id: 'quests', text: 'Quest System', cost: 20, category: 'World', icon: '📜', rarity: 'epic' },
  { id: 'factions', text: 'Faction System', cost: 18, category: 'World', icon: '⚔️', rarity: 'rare' },
  { id: 'economy', text: 'Economy System', cost: 15, category: 'World', icon: '💰', rarity: 'rare' },

  // Player Progression
  { id: 'xp', text: 'Experience System', cost: 10, category: 'Progression', icon: '⭐', rarity: 'uncommon' },
  { id: 'skills', text: 'Skill Tree', cost: 20, category: 'Progression', icon: '🌳', rarity: 'epic' },
  { id: 'upgrades', text: 'Upgrade System', cost: 12, category: 'Progression', icon: '⬆️', rarity: 'uncommon' },
  { id: 'unlockables', text: 'Unlockable Content', cost: 10, category: 'Progression', icon: '🔓', rarity: 'common' },
  { id: 'perks', text: 'Perk System', cost: 12, category: 'Progression', icon: '💎', rarity: 'uncommon' },

  // Environmental
  { id: 'destructible', text: 'Destructible Environment', cost: 20, category: 'Environment', icon: '💥', rarity: 'epic' },
  { id: 'interactive', text: 'Interactive Objects', cost: 8, category: 'Environment', icon: '🎮', rarity: 'common' },
  { id: 'hazards', text: 'Environmental Hazards', cost: 10, category: 'Environment', icon: '⚠️', rarity: 'common' },
  { id: 'daynightcycle', text: 'Day/Night Cycle', cost: 15, category: 'Environment', icon: '🌗', rarity: 'rare' },
  { id: 'weathersys', text: 'Dynamic Weather', cost: 15, category: 'Environment', icon: '🌦️', rarity: 'rare' },
  { id: 'seasons', text: 'Seasonal Changes', cost: 18, category: 'Environment', icon: '🍂', rarity: 'rare' },

  // More Movement
  { id: 'dash', text: 'Dash Ability', cost: 10, category: 'Movement', icon: '💨', rarity: 'common' },
  { id: 'slide', text: 'Slide Mechanic', cost: 10, category: 'Movement', icon: '🛝', rarity: 'common' },
  { id: 'doublejump', text: 'Double Jump', cost: 10, category: 'Movement', icon: '⬆️', rarity: 'common' },
  { id: 'grapple', text: 'Grappling Hook', cost: 15, category: 'Movement', icon: '🪝', rarity: 'rare' },
  { id: 'wallrun', text: 'Wall Running', cost: 15, category: 'Movement', icon: '🧱', rarity: 'rare' },
  { id: 'glide', text: 'Gliding', cost: 10, category: 'Movement', icon: '🪂', rarity: 'common' },

  // More Visual Effects
  { id: 'reflections', text: 'Reflections', cost: 18, category: 'Visual', icon: '🪞', rarity: 'rare' },
  { id: 'camerashake', text: 'Camera Shake', cost: 5, category: 'Visual', icon: '📷', rarity: 'common' },
  { id: 'postprocessing', text: 'Post-Processing', cost: 20, category: 'Visual', icon: '🎨', rarity: 'epic' },
  { id: 'fog', text: 'Fog Effects', cost: 8, category: 'Visual', icon: '🌫️', rarity: 'common' },
  { id: 'screentransitions', text: 'Screen Transitions', cost: 10, category: 'Visual', icon: '🎞️', rarity: 'common' },

  // More Audio
  { id: 'spatialaudio', text: '3D Spatial Audio', cost: 20, category: 'Audio', icon: '🎧', rarity: 'epic' },
  { id: 'reverb', text: 'Reverb System', cost: 12, category: 'Audio', icon: '🔊', rarity: 'rare' },
  { id: 'footsteps', text: 'Footstep Sounds', cost: 8, category: 'Audio', icon: '👟', rarity: 'common' },

  // More Gameplay
  { id: 'checkpoints', text: 'Checkpoint System', cost: 10, category: 'Gameplay', icon: '🚩', rarity: 'common' },
  { id: 'hints', text: 'Hint System', cost: 8, category: 'Gameplay', icon: '💡', rarity: 'common' },
  { id: 'difficulty', text: 'Difficulty Modes', cost: 15, category: 'Gameplay', icon: '⚙️', rarity: 'rare' },
  { id: 'coop', text: 'Co-op Mode', cost: 30, category: 'Gameplay', icon: '🤝', rarity: 'epic' },
  { id: 'pvp', text: 'PvP Mode', cost: 30, category: 'Gameplay', icon: '⚔️', rarity: 'epic' },
  { id: 'minigames', text: 'Mini-Games', cost: 20, category: 'Gameplay', icon: '🎮', rarity: 'rare' },
  { id: 'secrets', text: 'Secret Areas', cost: 12, category: 'Gameplay', icon: '🗝️', rarity: 'rare' },

  // More Interface
  { id: 'subtitles', text: 'Subtitles', cost: 10, category: 'Interface', icon: '📝', rarity: 'common' },
  { id: 'accessibility', text: 'Accessibility Options', cost: 18, category: 'Interface', icon: '♿', rarity: 'rare' },
  { id: 'keybinding', text: 'Custom Keybinds', cost: 10, category: 'Interface', icon: '⌨️', rarity: 'common' },
  { id: 'tutorial', text: 'Tutorial System', cost: 12, category: 'Interface', icon: '📖', rarity: 'rare' },
  { id: 'compass', text: 'Compass/Waypoint', cost: 10, category: 'Interface', icon: '🧭', rarity: 'common' },
  { id: 'healthbar', text: 'Health Bar', cost: 5, category: 'Interface', icon: '❤️', rarity: 'common' },

  // More World Features
  { id: 'vehicles', text: 'Vehicles', cost: 22, category: 'World', icon: '🚗', rarity: 'epic' },
  { id: 'pets', text: 'Pet System', cost: 15, category: 'World', icon: '🐕', rarity: 'rare' },
  { id: 'housing', text: 'Player Housing', cost: 20, category: 'World', icon: '🏠', rarity: 'epic' },
  { id: 'fasttravel', text: 'Fast Travel', cost: 10, category: 'World', icon: '🗺️', rarity: 'common' },
  { id: 'randomevents', text: 'Random Events', cost: 15, category: 'World', icon: '🎲', rarity: 'rare' },

  // More Advanced Features
  { id: 'photomode', text: 'Photo Mode', cost: 15, category: 'Advanced', icon: '📸', rarity: 'rare' },
  { id: 'spectator', text: 'Spectator Mode', cost: 10, category: 'Advanced', icon: '👁️', rarity: 'common' },
  { id: 'customization', text: 'Character Customization', cost: 20, category: 'Advanced', icon: '👤', rarity: 'rare' },
  { id: 'clouds', text: 'Cloud Save', cost: 12, category: 'Advanced', icon: '☁️', rarity: 'rare' },
  { id: 'statistics', text: 'Statistics Tracking', cost: 10, category: 'Advanced', icon: '📊', rarity: 'common' },

  // More Combat Features
  { id: 'dodge', text: 'Dodge System', cost: 10, category: 'Combat', icon: '🤸', rarity: 'common' },
  { id: 'critical', text: 'Critical Hits', cost: 10, category: 'Combat', icon: '💢', rarity: 'common' },
  { id: 'statuseffects', text: 'Status Effects', cost: 15, category: 'Combat', icon: '🧪', rarity: 'rare' },
  { id: 'finishers', text: 'Finishing Moves', cost: 12, category: 'Combat', icon: '💀', rarity: 'rare' },

  // Special Shop Expansion Card
  { id: 'addslot', text: 'Add Shop Slot', cost: 15, category: 'Shop', icon: '➕', isSpecial: true, rarity: 'rare' },
];