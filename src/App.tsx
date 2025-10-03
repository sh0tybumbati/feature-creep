import React, { useState, useEffect } from 'react';
import { Shuffle, Coins, Gamepad2, Zap, Eye, X, Moon, Sun, Package, Trash2, Check, RefreshCw } from 'lucide-react';

const FeatureCreep = () => {
  const [power, setPower] = useState(0); // Power points
  const [gold, setGold] = useState(0); // Gold for buying booster packs

  // Creep Cards (formerly restrictions)
  const [drawnCreepCards, setDrawnCreepCards] = useState([]);
  const [creepDeck, setCreepDeck] = useState([]);
  const [creepDiscard, setCreepDiscard] = useState([]);

  // Feature Cards (shop-style)
  const [featureDeck, setFeatureDeck] = useState([]);
  const [purchasedFeatures, setPurchasedFeatures] = useState([]);
  const [shopSlots, setShopSlots] = useState(3);
  const [shopFeatures, setShopFeatures] = useState([]);

  const [boosterPacks, setBoosterPacks] = useState(1); // Unopened booster packs
  const [darkMode, setDarkMode] = useState(false);
  const [viewingCreepDeck, setViewingCreepDeck] = useState(false);
  const [viewingCreepDiscard, setViewingCreepDiscard] = useState(false);
  const [viewingFeatureDeck, setViewingFeatureDeck] = useState(false);
  const [revealingPack, setRevealingPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState({ creep: [], feature: [] });

  // Creep cards with varying power values based on difficulty/restrictiveness
  const creepCards = [
    // Theme/Topic Restrictions (5-10 gold)
    { id: 1, text: "Your game must be about cats", gold: 5, type: "theme" },
    { id: 2, text: "Set in a post-apocalyptic bakery", gold: 10, type: "theme" },
    { id: 3, text: "Must feature time travel", gold: 10, type: "theme" },
    { id: 4, text: "Everything happens underwater", gold: 5, type: "theme" },
    { id: 5, text: "Your protagonist is a sentient plant", gold: 10, type: "theme" },
    { id: 6, text: "Set entirely in an elevator", gold: 15, type: "theme" },
    { id: 7, text: "Must involve cooking disasters", gold: 5, type: "theme" },
    { id: 8, text: "Takes place in a library after hours", gold: 5, type: "theme" },

    // Art Style Restrictions (10-15 gold)
    { id: 9, text: "Everything must be drawn with circles only", gold: 15, type: "art" },
    { id: 10, text: "ASCII art style only", gold: 15, type: "art" },
    { id: 11, text: "Black and white with one accent color", gold: 10, type: "art" },
    { id: 12, text: "MS Paint aesthetic required", gold: 10, type: "art" },
    { id: 13, text: "Stick figure art style", gold: 10, type: "art" },
    { id: 14, text: "Everything looks like it's made of LEGO", gold: 15, type: "art" },
    { id: 15, text: "Pixel art with max 4 colors", gold: 10, type: "art" },

    // Character Restrictions (5-15 gold)
    { id: 16, text: "Protagonist must be afraid of their own shadow", gold: 10, type: "character" },
    { id: 17, text: "Main character can only speak in rhymes", gold: 15, type: "character" },
    { id: 18, text: "Hero is actually the villain's pet", gold: 10, type: "character" },
    { id: 19, text: "Protagonist has hiccups throughout entire game", gold: 5, type: "character" },
    { id: 20, text: "Main character is invisible (to themselves too)", gold: 15, type: "character" },
    { id: 21, text: "Hero moves only by sneezing", gold: 10, type: "character" },

    // Gameplay Restrictions (15-20 gold)
    { id: 22, text: "Player can only turn left", gold: 20, type: "gameplay" },
    { id: 23, text: "Game must be played with eyes closed", gold: 20, type: "gameplay" },
    { id: 24, text: "No UI elements allowed", gold: 20, type: "gameplay" },
    { id: 25, text: "Everything happens in reverse", gold: 15, type: "gameplay" },
    { id: 26, text: "Player input has a 2-second delay", gold: 15, type: "gameplay" },
    { id: 27, text: "Game must be completable in under 30 seconds", gold: 15, type: "gameplay" },
    { id: 28, text: "Gravity changes every 10 seconds", gold: 15, type: "gameplay" },

    // Audio Restrictions (5-15 gold)
    { id: 29, text: "All sounds must be made with your mouth", gold: 10, type: "audio" },
    { id: 30, text: "Only kazoo music allowed", gold: 10, type: "audio" },
    { id: 31, text: "Sound effects must be inappropriate for actions", gold: 5, type: "audio" },
    { id: 32, text: "All audio must be whispered", gold: 10, type: "audio" },
    { id: 33, text: "Only use sounds from a kitchen", gold: 5, type: "audio" },

    // Story Restrictions (10-15 gold)
    { id: 34, text: "Entire story told through error messages", gold: 15, type: "story" },
    { id: 35, text: "Plot must involve a sandwich conspiracy", gold: 10, type: "story" },
    { id: 36, text: "Story happens entirely during loading screens", gold: 15, type: "story" },
    { id: 37, text: "Narrative told only through item descriptions", gold: 15, type: "story" },
    { id: 38, text: "All dialogue must be questions", gold: 10, type: "story" },

    // Technical Restrictions (15-25 gold)
    { id: 39, text: "Game must fit in a 64x64 pixel window", gold: 25, type: "technical" },
    { id: 40, text: "Only use geometric shapes", gold: 15, type: "technical" },
    { id: 41, text: "No textures, only solid colors", gold: 15, type: "technical" },
    { id: 42, text: "Must run at exactly 10 FPS", gold: 20, type: "technical" },
    { id: 43, text: "Game controls change every level", gold: 20, type: "technical" },

    // Meta Restrictions (15-25 gold)
    { id: 44, text: "Game must break the fourth wall constantly", gold: 15, type: "meta" },
    { id: 45, text: "Player character is aware they're in a game", gold: 15, type: "meta" },
    { id: 46, text: "Game must pretend to crash (but doesn't)", gold: 20, type: "meta" },
    { id: 47, text: "UI elements have their own personality", gold: 20, type: "meta" },
    { id: 48, text: "Game apologizes for everything", gold: 10, type: "meta" },
    { id: 49, text: "Must simulate dial-up internet loading", gold: 10, type: "meta" },
    { id: 50, text: "Game exists only in your browser's console", gold: 25, type: "meta" },

    // More Reasonable Theme Restrictions (3-8 gold)
    { id: 51, text: "Must include a day/night cycle", gold: 5, type: "theme" },
    { id: 52, text: "Set in a single room", gold: 5, type: "theme" },
    { id: 53, text: "Include a weather system", gold: 5, type: "theme" },
    { id: 54, text: "Must have a seasonal theme", gold: 3, type: "theme" },
    { id: 55, text: "Set in space", gold: 5, type: "theme" },
    { id: 56, text: "Takes place in one continuous shot", gold: 8, type: "theme" },
    { id: 57, text: "Must include a companion character", gold: 3, type: "theme" },
    { id: 58, text: "Set during a festival or celebration", gold: 3, type: "theme" },

    // Reasonable Art Restrictions (3-8 gold)
    { id: 59, text: "Limited to 8-bit style graphics", gold: 5, type: "art" },
    { id: 60, text: "Monochrome color palette", gold: 5, type: "art" },
    { id: 61, text: "No character animations (static sprites)", gold: 8, type: "art" },
    { id: 62, text: "Minimalist art style", gold: 5, type: "art" },
    { id: 63, text: "Low poly 3D graphics only", gold: 8, type: "art" },
    { id: 64, text: "Silhouette-based visuals", gold: 5, type: "art" },

    // Reasonable Gameplay Restrictions (5-10 gold)
    { id: 65, text: "Player has limited resources", gold: 3, type: "gameplay" },
    { id: 66, text: "Must include a time limit", gold: 5, type: "gameplay" },
    { id: 67, text: "No jumping allowed", gold: 5, type: "gameplay" },
    { id: 68, text: "One-hit death system", gold: 8, type: "gameplay" },
    { id: 69, text: "Player moves automatically", gold: 8, type: "gameplay" },
    { id: 70, text: "Limited to 3 buttons/keys", gold: 5, type: "gameplay" },
    { id: 71, text: "Include a stealth mechanic", gold: 5, type: "gameplay" },
    { id: 72, text: "Physics-based movement only", gold: 8, type: "gameplay" },
    { id: 73, text: "Must have permadeath", gold: 5, type: "gameplay" },
    { id: 74, text: "Top-down perspective only", gold: 3, type: "gameplay" },
    { id: 75, text: "Side-scrolling only", gold: 3, type: "gameplay" },

    // Reasonable Character Restrictions (3-8 gold)
    { id: 76, text: "Protagonist cannot attack directly", gold: 5, type: "character" },
    { id: 77, text: "Main character is very slow", gold: 5, type: "character" },
    { id: 78, text: "Hero has limited vision range", gold: 5, type: "character" },
    { id: 79, text: "Protagonist is very small", gold: 3, type: "character" },
    { id: 80, text: "Character can only move in cardinal directions", gold: 3, type: "character" },

    // Reasonable Technical Restrictions (5-10 gold)
    { id: 81, text: "Maximum of 5 different sounds", gold: 5, type: "technical" },
    { id: 82, text: "Game must be under 10MB total", gold: 8, type: "technical" },
    { id: 83, text: "Limited to 16x16 tile grid", gold: 8, type: "technical" },
    { id: 84, text: "No diagonal movement", gold: 3, type: "technical" },
    { id: 85, text: "Fixed camera position", gold: 5, type: "technical" },

    // Reasonable Story Restrictions (3-8 gold)
    { id: 86, text: "No dialogue (environmental storytelling only)", gold: 8, type: "story" },
    { id: 87, text: "Story must have a twist ending", gold: 5, type: "story" },
    { id: 88, text: "Told through flashbacks", gold: 5, type: "story" },
    { id: 89, text: "Non-linear narrative", gold: 8, type: "story" },
    { id: 90, text: "Must have multiple endings", gold: 5, type: "story" },

    // Reasonable Audio Restrictions (3-8 gold)
    { id: 91, text: "Maximum of 3 music tracks", gold: 5, type: "audio" },
    { id: 92, text: "Chiptune music only", gold: 5, type: "audio" },
    { id: 93, text: "No music (sound effects only)", gold: 3, type: "audio" },
    { id: 94, text: "Ambient sounds only", gold: 5, type: "audio" },
    { id: 95, text: "All audio must be synthesized", gold: 8, type: "audio" },

    // More Theme Restrictions (3-10 gold)
    { id: 96, text: "Must take place in a single day", gold: 5, type: "theme" },
    { id: 97, text: "Set in a dream world", gold: 8, type: "theme" },
    { id: 98, text: "Everything is made of paper", gold: 8, type: "theme" },
    { id: 99, text: "Set in ancient ruins", gold: 5, type: "theme" },
    { id: 100, text: "Must include a mystery to solve", gold: 5, type: "theme" },
    { id: 101, text: "Based on a fairy tale", gold: 5, type: "theme" },
    { id: 102, text: "Set in a single building", gold: 5, type: "theme" },
    { id: 103, text: "Must feature robots", gold: 3, type: "theme" },
    { id: 104, text: "Set in the wilderness", gold: 3, type: "theme" },
    { id: 105, text: "Everything is tiny/miniature", gold: 8, type: "theme" },

    // More Art Restrictions (5-10 gold)
    { id: 106, text: "Only use primary colors", gold: 5, type: "art" },
    { id: 107, text: "Hand-drawn style only", gold: 8, type: "art" },
    { id: 108, text: "Neon aesthetic", gold: 5, type: "art" },
    { id: 109, text: "Retro 90s style", gold: 5, type: "art" },
    { id: 110, text: "Everything must glow", gold: 8, type: "art" },
    { id: 111, text: "Watercolor art style", gold: 10, type: "art" },
    { id: 112, text: "Comic book style", gold: 8, type: "art" },
    { id: 113, text: "Limited to 2 colors", gold: 8, type: "art" },
    { id: 114, text: "Isometric perspective only", gold: 5, type: "art" },

    // More Gameplay Restrictions (3-10 gold)
    { id: 115, text: "No tutorial allowed", gold: 5, type: "gameplay" },
    { id: 116, text: "Must be playable with one hand", gold: 8, type: "gameplay" },
    { id: 117, text: "Real-time only (no pausing)", gold: 5, type: "gameplay" },
    { id: 118, text: "Turn-based gameplay only", gold: 5, type: "gameplay" },
    { id: 119, text: "No health bar visible", gold: 5, type: "gameplay" },
    { id: 120, text: "Randomized elements required", gold: 5, type: "gameplay" },
    { id: 121, text: "No checkpoints", gold: 8, type: "gameplay" },
    { id: 122, text: "Must have a score system", gold: 3, type: "gameplay" },
    { id: 123, text: "Infinite gameplay (no ending)", gold: 8, type: "gameplay" },
    { id: 124, text: "Must include a boss fight", gold: 5, type: "gameplay" },
    { id: 125, text: "Speedrun-focused design", gold: 8, type: "gameplay" },

    // More Character Restrictions (3-10 gold)
    { id: 126, text: "No human characters", gold: 5, type: "character" },
    { id: 127, text: "Silent protagonist", gold: 3, type: "character" },
    { id: 128, text: "Protagonist is an animal", gold: 3, type: "character" },
    { id: 129, text: "Multiple playable characters", gold: 8, type: "character" },
    { id: 130, text: "Character changes form/shape", gold: 8, type: "character" },
    { id: 131, text: "Protagonist is very large", gold: 5, type: "character" },
    { id: 132, text: "Character has limited memory", gold: 10, type: "character" },

    // More Technical Restrictions (5-10 gold)
    { id: 133, text: "Maximum 32x32 sprites", gold: 10, type: "technical" },
    { id: 134, text: "Single screen (no scrolling)", gold: 8, type: "technical" },
    { id: 135, text: "Must load in under 3 seconds", gold: 5, type: "technical" },
    { id: 136, text: "Limited to 100 game objects", gold: 8, type: "technical" },
    { id: 137, text: "No third-party assets", gold: 10, type: "technical" },
    { id: 138, text: "Must support keyboard only", gold: 3, type: "technical" },
    { id: 139, text: "Must work offline", gold: 3, type: "technical" },

    // More Story Restrictions (5-10 gold)
    { id: 140, text: "Story told in reverse", gold: 10, type: "story" },
    { id: 141, text: "Unreliable narrator", gold: 8, type: "story" },
    { id: 142, text: "No words (visual only)", gold: 10, type: "story" },
    { id: 143, text: "Story must be happy/uplifting", gold: 3, type: "story" },
    { id: 144, text: "Story must be dark/serious", gold: 3, type: "story" },
    { id: 145, text: "Based on real events", gold: 8, type: "story" },
    { id: 146, text: "Moral choice system", gold: 8, type: "story" },

    // More Audio Restrictions (3-8 gold)
    { id: 147, text: "One-instrument soundtrack", gold: 8, type: "audio" },
    { id: 148, text: "Looping track only", gold: 5, type: "audio" },
    { id: 149, text: "Diegetic sound only", gold: 8, type: "audio" },
    { id: 150, text: "Percussion instruments only", gold: 8, type: "audio" }
  ];

  // Feature cards - converted from old allFeatures array
  const featureCards = [
    // Basic Movement
    { id: 'walk', name: 'Walking', gold: 3, category: 'Movement', icon: '🚶' },
    { id: 'run', name: 'Running', gold: 5, category: 'Movement', icon: '🏃' },
    { id: 'jump', name: 'Jumping', gold: 8, category: 'Movement', icon: '⬆️' },
    { id: 'fly', name: 'Flying', gold: 12, category: 'Movement', icon: '🦅' },
    { id: 'teleport', name: 'Teleportation', gold: 15, category: 'Movement', icon: '✨' },
    { id: 'crawl', name: 'Crawling', gold: 5, category: 'Movement', icon: '🐛' },
    { id: 'swim', name: 'Swimming', gold: 8, category: 'Movement', icon: '🏊' },
    { id: 'climb', name: 'Wall Climbing', gold: 12, category: 'Movement', icon: '🧗' },

    // Visual Elements
    { id: 'sprite', name: 'Character Sprite', gold: 5, category: 'Visual', icon: '👤' },
    { id: 'animation', name: 'Animations', gold: 10, category: 'Visual', icon: '🎭' },
    { id: 'particles', name: 'Particle Effects', gold: 12, category: 'Visual', icon: '💫' },
    { id: 'lighting', name: 'Dynamic Lighting', gold: 15, category: 'Visual', icon: '💡' },
    { id: 'shadows', name: 'Shadows', gold: 8, category: 'Visual', icon: '🌓' },
    { id: 'weather', name: 'Weather Effects', gold: 15, category: 'Visual', icon: '🌦️' },
    { id: 'bloom', name: 'Screen Effects', gold: 12, category: 'Visual', icon: '✨' },
    { id: 'trails', name: 'Motion Trails', gold: 8, category: 'Visual', icon: '💨' },

    // Audio
    { id: 'sfx', name: 'Sound Effects', gold: 10, category: 'Audio', icon: '🔊' },
    { id: 'music', name: 'Background Music', gold: 10, category: 'Audio', icon: '🎵' },
    { id: 'voice', name: 'Voice Acting', gold: 25, category: 'Audio', icon: '🎤' },
    { id: 'ambient', name: 'Ambient Sounds', gold: 8, category: 'Audio', icon: '🌊' },
    { id: 'dynamic', name: 'Dynamic Music', gold: 20, category: 'Audio', icon: '🎼' },

    // Gameplay
    { id: 'combat', name: 'Combat System', gold: 15, category: 'Gameplay', icon: '⚔️' },
    { id: 'inventory', name: 'Inventory System', gold: 10, category: 'Gameplay', icon: '🎒' },
    { id: 'dialogue', name: 'Dialogue System', gold: 15, category: 'Gameplay', icon: '💬' },
    { id: 'save', name: 'Save System', gold: 15, category: 'Gameplay', icon: '💾' },
    { id: 'levels', name: 'Multiple Levels', gold: 20, category: 'Gameplay', icon: '🏗️' },
    { id: 'ai', name: 'AI Enemies', gold: 20, category: 'Gameplay', icon: '🤖' },
    { id: 'crafting', name: 'Crafting System', gold: 20, category: 'Gameplay', icon: '🔨' },
    { id: 'puzzles', name: 'Puzzle Mechanics', gold: 15, category: 'Gameplay', icon: '🧩' },
    { id: 'collectibles', name: 'Collectible Items', gold: 10, category: 'Gameplay', icon: '💎' },
    { id: 'stealth', name: 'Stealth Mechanics', gold: 20, category: 'Gameplay', icon: '👤' },

    // UI Elements
    { id: 'hud', name: 'HUD Display', gold: 5, category: 'Interface', icon: '📊' },
    { id: 'menu', name: 'Menu System', gold: 8, category: 'Interface', icon: '📋' },
    { id: 'pause', name: 'Pause Function', gold: 5, category: 'Interface', icon: '⏸️' },
    { id: 'settings', name: 'Settings Menu', gold: 8, category: 'Interface', icon: '⚙️' },
    { id: 'minimap', name: 'Mini Map', gold: 12, category: 'Interface', icon: '🗺️' },
    { id: 'tooltips', name: 'Tooltips', gold: 8, category: 'Interface', icon: '💭' },
    { id: 'notifications', name: 'Notifications', gold: 8, category: 'Interface', icon: '🔔' },

    // Advanced Features
    { id: 'physics', name: 'Physics Engine', gold: 30, category: 'Advanced', icon: '🌍' },
    { id: 'multiplayer', name: 'Multiplayer', gold: 40, category: 'Advanced', icon: '👥' },
    { id: 'procedural', name: 'Procedural Generation', gold: 30, category: 'Advanced', icon: '🎲' },
    { id: 'achievements', name: 'Achievement System', gold: 15, category: 'Advanced', icon: '🏆' },
    { id: 'leaderboards', name: 'Leaderboards', gold: 20, category: 'Advanced', icon: '📈' },
    { id: 'modding', name: 'Modding Support', gold: 40, category: 'Advanced', icon: '🔧' },
    { id: 'analytics', name: 'Player Analytics', gold: 18, category: 'Advanced', icon: '📊' },
    { id: 'cutscenes', name: 'Cutscene System', gold: 20, category: 'Advanced', icon: '🎬' },
    { id: 'replay', name: 'Replay System', gold: 15, category: 'Advanced', icon: '⏮️' },
    { id: 'localization', name: 'Multi-Language Support', gold: 20, category: 'Advanced', icon: '🌐' },

    // Combat & Action
    { id: 'weapons', name: 'Weapon System', gold: 12, category: 'Combat', icon: '⚔️' },
    { id: 'combo', name: 'Combo System', gold: 18, category: 'Combat', icon: '💥' },
    { id: 'blocking', name: 'Block/Parry System', gold: 12, category: 'Combat', icon: '🛡️' },
    { id: 'ranged', name: 'Ranged Combat', gold: 12, category: 'Combat', icon: '🏹' },
    { id: 'magic', name: 'Magic System', gold: 20, category: 'Combat', icon: '✨' },

    // World Building
    { id: 'npcs', name: 'NPC System', gold: 15, category: 'World', icon: '👤' },
    { id: 'shops', name: 'In-Game Shops', gold: 10, category: 'World', icon: '🏪' },
    { id: 'quests', name: 'Quest System', gold: 20, category: 'World', icon: '📜' },
    { id: 'factions', name: 'Faction System', gold: 18, category: 'World', icon: '⚔️' },
    { id: 'economy', name: 'Economy System', gold: 15, category: 'World', icon: '💰' },

    // Player Progression
    { id: 'xp', name: 'Experience System', gold: 10, category: 'Progression', icon: '⭐' },
    { id: 'skills', name: 'Skill Tree', gold: 20, category: 'Progression', icon: '🌳' },
    { id: 'upgrades', name: 'Upgrade System', gold: 12, category: 'Progression', icon: '⬆️' },
    { id: 'unlockables', name: 'Unlockable Content', gold: 10, category: 'Progression', icon: '🔓' },
    { id: 'perks', name: 'Perk System', gold: 12, category: 'Progression', icon: '💎' },

    // Environmental
    { id: 'destructible', name: 'Destructible Environment', gold: 20, category: 'Environment', icon: '💥' },
    { id: 'interactive', name: 'Interactive Objects', gold: 8, category: 'Environment', icon: '🎮' },
    { id: 'hazards', name: 'Environmental Hazards', gold: 10, category: 'Environment', icon: '⚠️' },
    { id: 'daynightcycle', name: 'Day/Night Cycle', gold: 15, category: 'Environment', icon: '🌗' },
    { id: 'weathersys', name: 'Dynamic Weather', gold: 15, category: 'Environment', icon: '🌦️' },
    { id: 'seasons', name: 'Seasonal Changes', gold: 18, category: 'Environment', icon: '🍂' },

    // More Movement
    { id: 'dash', name: 'Dash Ability', gold: 10, category: 'Movement', icon: '💨' },
    { id: 'slide', name: 'Slide Mechanic', gold: 10, category: 'Movement', icon: '🛝' },
    { id: 'doublejump', name: 'Double Jump', gold: 10, category: 'Movement', icon: '⬆️' },
    { id: 'grapple', name: 'Grappling Hook', gold: 15, category: 'Movement', icon: '🪝' },
    { id: 'wallrun', name: 'Wall Running', gold: 15, category: 'Movement', icon: '🧱' },
    { id: 'glide', name: 'Gliding', gold: 10, category: 'Movement', icon: '🪂' },

    // More Visual Effects
    { id: 'reflections', name: 'Reflections', gold: 18, category: 'Visual', icon: '🪞' },
    { id: 'camerashake', name: 'Camera Shake', gold: 5, category: 'Visual', icon: '📷' },
    { id: 'postprocessing', name: 'Post-Processing', gold: 20, category: 'Visual', icon: '🎨' },
    { id: 'fog', name: 'Fog Effects', gold: 8, category: 'Visual', icon: '🌫️' },
    { id: 'screentransitions', name: 'Screen Transitions', gold: 10, category: 'Visual', icon: '🎞️' },

    // More Audio
    { id: 'spatialaudio', name: '3D Spatial Audio', gold: 20, category: 'Audio', icon: '🎧' },
    { id: 'reverb', name: 'Reverb System', gold: 12, category: 'Audio', icon: '🔊' },
    { id: 'footsteps', name: 'Footstep Sounds', gold: 8, category: 'Audio', icon: '👟' },

    // More Gameplay
    { id: 'checkpoints', name: 'Checkpoint System', gold: 10, category: 'Gameplay', icon: '🚩' },
    { id: 'hints', name: 'Hint System', gold: 8, category: 'Gameplay', icon: '💡' },
    { id: 'difficulty', name: 'Difficulty Modes', gold: 15, category: 'Gameplay', icon: '⚙️' },
    { id: 'coop', name: 'Co-op Mode', gold: 30, category: 'Gameplay', icon: '🤝' },
    { id: 'pvp', name: 'PvP Mode', gold: 30, category: 'Gameplay', icon: '⚔️' },
    { id: 'minigames', name: 'Mini-Games', gold: 20, category: 'Gameplay', icon: '🎮' },
    { id: 'secrets', name: 'Secret Areas', gold: 12, category: 'Gameplay', icon: '🗝️' },

    // More Interface
    { id: 'subtitles', name: 'Subtitles', gold: 10, category: 'Interface', icon: '📝' },
    { id: 'accessibility', name: 'Accessibility Options', gold: 18, category: 'Interface', icon: '♿' },
    { id: 'keybinding', name: 'Custom Keybinds', gold: 10, category: 'Interface', icon: '⌨️' },
    { id: 'tutorial', name: 'Tutorial System', gold: 12, category: 'Interface', icon: '📖' },
    { id: 'compass', name: 'Compass/Waypoint', gold: 10, category: 'Interface', icon: '🧭' },
    { id: 'healthbar', name: 'Health Bar', gold: 5, category: 'Interface', icon: '❤️' },

    // More World Features
    { id: 'vehicles', name: 'Vehicles', gold: 22, category: 'World', icon: '🚗' },
    { id: 'pets', name: 'Pet System', gold: 15, category: 'World', icon: '🐕' },
    { id: 'housing', name: 'Player Housing', gold: 20, category: 'World', icon: '🏠' },
    { id: 'fasttravel', name: 'Fast Travel', gold: 10, category: 'World', icon: '🗺️' },
    { id: 'randomevents', name: 'Random Events', gold: 15, category: 'World', icon: '🎲' },

    // More Advanced Features
    { id: 'photomode', name: 'Photo Mode', gold: 15, category: 'Advanced', icon: '📸' },
    { id: 'spectator', name: 'Spectator Mode', gold: 10, category: 'Advanced', icon: '👁️' },
    { id: 'customization', name: 'Character Customization', gold: 20, category: 'Advanced', icon: '👤' },
    { id: 'clouds', name: 'Cloud Save', gold: 12, category: 'Advanced', icon: '☁️' },
    { id: 'statistics', name: 'Statistics Tracking', gold: 10, category: 'Advanced', icon: '📊' },

    // More Combat Features
    { id: 'dodge', name: 'Dodge System', gold: 10, category: 'Combat', icon: '🤸' },
    { id: 'critical', name: 'Critical Hits', gold: 10, category: 'Combat', icon: '💢' },
    { id: 'statuseffects', name: 'Status Effects', gold: 15, category: 'Combat', icon: '🧪' },
    { id: 'finishers', name: 'Finishing Moves', gold: 12, category: 'Combat', icon: '💀' },

    // Special Shop Expansion Card
    { id: 'addslot', name: 'Add Shop Slot', gold: 15, category: 'Shop', icon: '➕', isSpecial: true },
  ];

  // Initialize shop on first load
  useEffect(() => {
    if (shopFeatures.length === 0 && featureDeck.length > 0) {
      fillShopSlots();
    }
  }, [featureDeck]);

  const fillShopSlots = () => {
    const availableCards = featureDeck.filter(card =>
      !shopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id)
    );

    const slotsToFill = shopSlots - shopFeatures.length;
    const newCards = [];

    for (let i = 0; i < slotsToFill && availableCards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards.splice(randomIndex, 1)[0];
      newCards.push(card);
    }

    setShopFeatures([...shopFeatures, ...newCards]);
  };

  const openBoosterPack = () => {
    if (boosterPacks <= 0) return;

    // Get 8 random creep cards
    const shuffledCreep = [...creepCards].sort(() => Math.random() - 0.5);
    const newCreepCards = shuffledCreep.slice(0, 8);

    // Get 4 random feature cards
    const shuffledFeature = [...featureCards].sort(() => Math.random() - 0.5);
    const newFeatureCards = shuffledFeature.slice(0, 4);

    // Check all owned creep cards
    const allOwnedCreepCards = [...creepDeck, ...creepDiscard, ...drawnCreepCards];
    // Check all owned feature cards (excluding special cards like addslot)
    const allOwnedFeatureCards = [...featureDeck, ...purchasedFeatures];

    let powerGained = 0;
    const creepCardsToAdd = [];
    const creepCardsWithNewFlag = [];

    // Process creep cards
    newCreepCards.forEach(card => {
      const isDuplicate = allOwnedCreepCards.some(owned => owned.id === card.id);

      if (isDuplicate) {
        powerGained += card.gold;
        creepCardsWithNewFlag.push({ ...card, isNew: false, isDuplicate: true });
      } else {
        creepCardsToAdd.push(card);
        creepCardsWithNewFlag.push({ ...card, isNew: true, isDuplicate: false });
      }
    });

    const featureCardsToAdd = [];
    const featureCardsWithNewFlag = [];

    // Process feature cards
    newFeatureCards.forEach(card => {
      // Special cards (like addslot) are never considered duplicates
      const isDuplicate = !card.isSpecial && allOwnedFeatureCards.some(owned => owned.id === card.id);

      if (isDuplicate) {
        powerGained += card.gold;
        featureCardsWithNewFlag.push({ ...card, isNew: false, isDuplicate: true });
      } else {
        featureCardsToAdd.push(card);
        featureCardsWithNewFlag.push({ ...card, isNew: true, isDuplicate: false });
      }
    });

    // Show reveal modal
    setRevealedCards({ creep: creepCardsWithNewFlag, feature: featureCardsWithNewFlag });
    setRevealingPack(true);

    // Add only new cards to decks and give power for duplicates
    setCreepDeck([...creepDeck, ...creepCardsToAdd]);
    setFeatureDeck([...featureDeck, ...featureCardsToAdd]);
    setPower(power + powerGained);
    setBoosterPacks(boosterPacks - 1);
  };

  const buyBoosterPack = () => {
    const packCost = 30;
    if (gold >= packCost) {
      setGold(gold - packCost);
      setBoosterPacks(boosterPacks + 1);
    }
  };

  const drawCreepCard = () => {
    if (creepDeck.length === 0) {
      if (creepDiscard.length === 0) return;
      const shuffledDiscard = [...creepDiscard].sort(() => Math.random() - 0.5);
      setCreepDeck(shuffledDiscard);
      setCreepDiscard([]);
      return;
    }

    const randomIndex = Math.floor(Math.random() * creepDeck.length);
    const drawnCard = creepDeck[randomIndex];

    const newDeck = creepDeck.filter((_, index) => index !== randomIndex);
    setCreepDeck(newDeck);
    setDrawnCreepCards([...drawnCreepCards, drawnCard]);
    setPower(power + drawnCard.gold);
  };

  const purchaseFeature = (feature) => {
    if (power < feature.gold) return;

    setPower(power - feature.gold);

    // Add feature with implemented: false (needs to be marked as complete to get gold)
    if (feature.id === 'addslot') {
      setShopSlots(shopSlots + 1);
      setPurchasedFeatures([...purchasedFeatures, { ...feature, implemented: true }]);
    } else {
      setPurchasedFeatures([...purchasedFeatures, { ...feature, implemented: false }]);
    }

    // Remove from shop and draw a new card to replace it
    const newShopFeatures = shopFeatures.filter(f => f.id !== feature.id);
    setShopFeatures(newShopFeatures);

    // Draw a new card to fill the slot
    const availableCards = featureDeck.filter(card =>
      !newShopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id) &&
      card.id !== feature.id
    );

    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const newCard = availableCards[randomIndex];
      setShopFeatures([...newShopFeatures, newCard]);
    }
  };

  const toggleImplemented = (featureId) => {
    const feature = purchasedFeatures.find(f => f.id === featureId);
    if (!feature) return;

    const newImplemented = !feature.implemented;
    const updatedFeatures = purchasedFeatures.map(f =>
      f.id === featureId ? { ...f, implemented: newImplemented } : f
    );
    setPurchasedFeatures(updatedFeatures);

    // Add or subtract gold based on implementation status
    if (newImplemented && feature.gold) {
      setGold(gold + feature.gold);
    } else if (!newImplemented && feature.gold) {
      setGold(gold - feature.gold);
    }
  };

  const deleteCreepCard = (cardId) => {
    const cardToDelete = drawnCreepCards.find(c => c.id === cardId);
    if (!cardToDelete || power < cardToDelete.gold) return;

    const newDrawnCards = drawnCreepCards.filter(c => c.id !== cardId);
    setDrawnCreepCards(newDrawnCards);
    setCreepDiscard([...creepDiscard, cardToDelete]);
    setPower(power - cardToDelete.gold);
  };

  const reshuffleCreepDeck = () => {
    if (creepDeck.length > 0 || creepDiscard.length === 0) return;

    const shuffledDiscard = [...creepDiscard].sort(() => Math.random() - 0.5);
    setCreepDeck(shuffledDiscard);
    setCreepDiscard([]);
  };

  const drawFeatureCardToShop = () => {
    if (shopFeatures.length >= shopSlots) return;

    const availableCards = featureDeck.filter(card =>
      !shopFeatures.find(s => s.id === card.id) &&
      !purchasedFeatures.find(p => p.id === card.id)
    );

    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const newCard = availableCards[randomIndex];
      setShopFeatures([...shopFeatures, newCard]);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      theme: 'bg-purple-100 text-purple-800',
      art: 'bg-blue-100 text-blue-800',
      character: 'bg-green-100 text-green-800',
      gameplay: 'bg-red-100 text-red-800',
      audio: 'bg-yellow-100 text-yellow-800',
      story: 'bg-indigo-100 text-indigo-800',
      technical: 'bg-gray-100 text-gray-800',
      meta: 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Movement: 'bg-blue-100 text-blue-800',
      Visual: 'bg-purple-100 text-purple-800',
      Audio: 'bg-yellow-100 text-yellow-800',
      Gameplay: 'bg-red-100 text-red-800',
      Interface: 'bg-green-100 text-green-800',
      Advanced: 'bg-indigo-100 text-indigo-800',
      Combat: 'bg-orange-100 text-orange-800',
      World: 'bg-teal-100 text-teal-800',
      Progression: 'bg-pink-100 text-pink-800',
      Environment: 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getSortedCreepDeck = () => {
    return [...creepDeck].sort((a, b) => {
      if (a.type !== b.type) return a.type.localeCompare(b.type);
      return a.text.localeCompare(b.text);
    });
  };

  const getSortedFeatureDeck = () => {
    return [...featureDeck].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
  };

  useEffect(() => {
    fillShopSlots();
  }, [shopSlots]);

  return (
    <div className={`max-w-7xl mx-auto p-6 min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      <div className="text-center mb-8 relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute right-0 top-0 p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-lg`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <h1 className={`text-4xl font-bold mb-2 flex items-center justify-center gap-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Gamepad2 className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
          Feature Creep
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Draw creep cards for power, buy features for gold, build your game!</p>
      </div>

      {/* Currency Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`flex items-center justify-center gap-2 text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            <Zap className="w-7 h-7" />
            {power} Power
          </div>
          <p className={`text-center text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From creep cards</p>
        </div>
        <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`flex items-center justify-center gap-2 text-xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            <Coins className="w-7 h-7" />
            {gold} Gold
          </div>
          <p className={`text-center text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From feature cards</p>
        </div>
      </div>

      {/* Booster Packs Section */}
      <div className={`rounded-xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Package className={darkMode ? 'text-green-400' : 'text-green-600'} />
          Booster Packs
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="text-sm">Unopened Packs</p>
            <p className="text-3xl font-bold">{boosterPacks}</p>
          </div>
          <button
            onClick={openBoosterPack}
            disabled={boosterPacks <= 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            Open Booster Pack (8 creep + 4 feature)
          </button>
          <button
            onClick={buyBoosterPack}
            disabled={gold < 30}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Coins className="w-4 h-4" />
            Buy Pack (30 Gold)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Creep Cards Section */}
        <div className="space-y-6">
          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Shuffle className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
              Creep Cards
            </h2>

            <div className="text-center mb-4">
              <div className={`grid grid-cols-2 gap-2 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-center">
                  <p className="text-sm">Deck</p>
                  <p className="text-2xl font-bold">{creepDeck.length}</p>
                  <button
                    onClick={() => setViewingCreepDeck(true)}
                    disabled={creepDeck.length === 0}
                    className={`text-xs mt-1 px-2 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Eye className="w-3 h-3 inline mr-1" />
                    View
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm">Discard</p>
                  <p className="text-2xl font-bold">{creepDiscard.length}</p>
                  <button
                    onClick={() => setViewingCreepDiscard(true)}
                    disabled={creepDiscard.length === 0}
                    className={`text-xs mt-1 px-2 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Eye className="w-3 h-3 inline mr-1" />
                    View
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={drawCreepCard}
                  disabled={creepDeck.length <= 0}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
                >
                  <Shuffle className="w-5 h-5" />
                  Draw Creep Card
                </button>
                <button
                  onClick={reshuffleCreepDeck}
                  disabled={creepDeck.length > 0 || creepDiscard.length === 0}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reshuffle Discard into Deck
                </button>
              </div>
            </div>

            {/* Drawn Creep Cards */}
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 max-h-96 overflow-y-auto p-1">
              {drawnCreepCards.map((card, index) => (
                <div key={card.id} className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-24 h-36 flex flex-col">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 left-0.5 bg-gray-700 text-white text-xs font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center z-10 text-[10px]">
                    {index + 1}
                  </div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-purple-300 z-10">
                    <Zap className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <button
                    onClick={() => deleteCreepCard(card.id)}
                    disabled={power < card.gold}
                    className="absolute bottom-0.5 right-0.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-0.5 rounded-full z-10 transition-colors"
                    title={power < card.gold ? `Need ${card.gold} power to delete` : `Delete card (costs ${card.gold} power)`}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>

                  <div className="flex justify-center mt-3">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeColor(card.type)} shadow-sm`}>
                      {card.type}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-1.5 mt-0.5">
                    <p className="text-gray-800 font-medium text-[10px] leading-tight text-center">{card.text}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}

              {drawnCreepCards.length === 0 && (
                <div className={`col-span-full text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="text-6xl mb-4">🎴</div>
                  <p className="text-lg font-medium">No creep cards drawn yet</p>
                  <p className="text-sm">Draw your first creep card to get power!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Shop Section */}
        <div className="space-y-6">
          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Shuffle className={darkMode ? 'text-green-400' : 'text-green-600'} />
              Feature Shop ({shopSlots} slots)
            </h2>

            <div className="mb-4 flex justify-center gap-2">
              <button
                onClick={() => setViewingFeatureDeck(true)}
                disabled={featureDeck.length === 0}
                className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Eye className="w-3 h-3 inline mr-1" />
                View Deck ({featureDeck.length} cards)
              </button>
              <button
                onClick={drawFeatureCardToShop}
                disabled={shopFeatures.length >= shopSlots || featureDeck.filter(card =>
                  !shopFeatures.find(s => s.id === card.id) &&
                  !purchasedFeatures.find(p => p.id === card.id)
                ).length === 0}
                className={`text-sm px-3 py-1 rounded transition-colors ${darkMode ? 'bg-green-700 hover:bg-green-600 text-gray-300' : 'bg-green-200 hover:bg-green-300 text-green-700'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
              >
                <Shuffle className="w-3 h-3" />
                Fill Empty Slot
              </button>
            </div>

            {/* Shop Slots */}
            <div className="grid gap-3">
              {shopFeatures.map(feature => {
                const canAfford = power >= feature.gold;
                const isPurchased = purchasedFeatures.find(p => p.id === feature.id);

                return (
                  <div key={feature.id} className={`border-2 rounded-lg p-4 transition-all ${
                    feature.id === 'addslot'
                      ? (darkMode ? 'border-orange-500 bg-orange-900/30' : 'border-orange-300 bg-orange-50')
                      : canAfford
                        ? (darkMode ? 'bg-gray-700 border-gray-600 hover:border-green-400 hover:shadow-md' : 'bg-white border-gray-200 hover:border-green-400 hover:shadow-md')
                        : (darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200')
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{feature.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.category}</div>
                          {feature.id === 'addslot' && (
                            <div className={`text-xs font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Shop Expansion!</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold flex items-center gap-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                          {feature.gold} <Zap className="w-4 h-4" />
                        </span>
                        <button
                          onClick={() => purchaseFeature(feature)}
                          disabled={!canAfford}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-medium transition-colors"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Empty slots */}
              {Array.from({ length: Math.max(0, shopSlots - shopFeatures.length) }, (_, i) => (
                <div key={`empty-${i}`} className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-center ${darkMode ? 'border-gray-600 bg-gray-800/50 text-gray-500' : 'border-gray-300 bg-gray-50 text-gray-400'}`}>
                  <span className="text-sm">Empty Slot</span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchased Features */}
          {purchasedFeatures.length > 0 && (
            <div className={`rounded-xl shadow-lg p-4 ${darkMode ? 'bg-green-900/30 border-2 border-green-700' : 'bg-green-50 border-2 border-green-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                Purchased Features ({purchasedFeatures.length})
              </h3>
              <div className="grid gap-2">
                {purchasedFeatures.map(feature => (
                  <div key={feature.id} className={`px-3 py-2 rounded text-sm font-medium flex items-center justify-between ${
                    feature.implemented
                      ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800')
                      : (darkMode ? 'bg-green-800 text-green-300' : 'bg-green-200 text-green-800')
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>{feature.icon}</span>
                      <span>{feature.name}</span>
                      {feature.id !== 'addslot' && feature.gold > 0 && (
                        <span className={`text-xs ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          (+{feature.gold}💰)
                        </span>
                      )}
                    </div>
                    {feature.id !== 'addslot' && (
                      <button
                        onClick={() => toggleImplemented(feature.id)}
                        className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                          feature.implemented
                            ? (darkMode ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white')
                            : (darkMode ? 'bg-green-700 hover:bg-green-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white')
                        }`}
                      >
                        {feature.implemented ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Creep Deck Modal */}
      {viewingCreepDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingCreepDeck(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Creep Deck ({creepDeck.length} cards)
              </h2>
              <button
                onClick={() => setViewingCreepDeck(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {getSortedCreepDeck().map((card, index) => (
                <div key={`deck-${card.id}-${index}`} className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-24 h-36 flex flex-col">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-purple-300 z-10">
                    <Zap className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <div className="flex justify-center mt-3">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeColor(card.type)} shadow-sm`}>
                      {card.type}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-1.5 mt-0.5">
                    <p className="text-gray-800 font-medium text-[10px] leading-tight text-center">{card.text}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View Creep Discard Modal */}
      {viewingCreepDiscard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingCreepDiscard(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Creep Discard Pile ({creepDiscard.length} cards)
              </h2>
              <button
                onClick={() => setViewingCreepDiscard(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {creepDiscard.map((card, index) => (
                <div key={`discard-${card.id}-${index}`} className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-24 h-36 flex flex-col opacity-75">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-purple-300 z-10">
                    <Zap className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <div className="flex justify-center mt-3">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeColor(card.type)} shadow-sm`}>
                      {card.type}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-1.5 mt-0.5">
                    <p className="text-gray-800 font-medium text-[10px] leading-tight text-center">{card.text}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View Feature Deck Modal */}
      {viewingFeatureDeck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setViewingFeatureDeck(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Feature Deck ({featureDeck.length} cards)
              </h2>
              <button
                onClick={() => setViewingFeatureDeck(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {getSortedFeatureDeck().map((card, index) => (
                <div key={`deck-${card.id}-${index}`} className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-24 h-36 flex flex-col">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-yellow-300 z-10">
                    <Coins className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <div className="flex justify-center items-center mt-2">
                    <span className="text-xl">{card.icon}</span>
                  </div>

                  <div className="flex justify-center mt-1">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getCategoryColor(card.category)} shadow-sm`}>
                      {card.category}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-1.5 mt-0.5">
                    <p className="text-gray-800 font-medium text-[10px] leading-tight text-center">{card.name}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* Booster Pack Reveal Modal */}
      {revealingPack && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setRevealingPack(false)}>
          <div className={`rounded-xl shadow-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🎉 Booster Pack Opened!
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 font-bold">Yellow</span> = New card! | <span className="text-red-500 font-bold">Red</span> = Duplicate (instant power/gold!)
                </p>
              </div>
              <button
                onClick={() => setRevealingPack(false)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Creep Cards (8)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mb-6">
              {revealedCards.creep.map((card, index) => (
                <div key={`revealed-creep-${card.id}-${index}`} className={`relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-28 h-40 flex flex-col ${
                  card.isNew ? 'border-yellow-400 ring-4 ring-yellow-400/50' :
                  card.isDuplicate ? 'border-red-400 ring-4 ring-red-400/50 opacity-75' :
                  'border-gray-200'
                }`}>
                  {card.isNew && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-yellow-300">
                      NEW!
                    </div>
                  )}
                  {card.isDuplicate && (
                    <div className="absolute -top-2 -right-2 bg-red-400 text-red-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-red-300">
                      DUP +{card.gold}⚡
                    </div>
                  )}

                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-purple-300 z-10">
                    <Zap className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <div className="flex justify-center mt-4">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeColor(card.type)} shadow-sm`}>
                      {card.type}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-2 mt-1">
                    <p className="text-gray-800 font-medium text-[11px] leading-tight text-center">{card.text}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Feature Cards (4)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
              {revealedCards.feature.map((card, index) => (
                <div key={`revealed-feature-${card.id}-${index}`} className={`relative bg-gradient-to-br from-white to-gray-50 rounded-lg border-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 w-28 h-40 flex flex-col ${
                  card.isNew ? 'border-yellow-400 ring-4 ring-yellow-400/50' :
                  card.isDuplicate ? 'border-red-400 ring-4 ring-red-400/50 opacity-75' :
                  'border-gray-200'
                }`}>
                  {card.isNew && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-yellow-300">
                      NEW!
                    </div>
                  )}
                  {card.isDuplicate && (
                    <div className="absolute -top-2 -right-2 bg-red-400 text-red-900 px-2 py-0.5 rounded-full font-bold text-[10px] shadow-md z-20 border-2 border-red-300">
                      DUP +{card.gold}💰
                    </div>
                  )}

                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-t-2 border-gray-300 rounded-tl"></div>
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-t-2 border-gray-300 rounded-tr"></div>
                  <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l-2 border-b-2 border-gray-300 rounded-bl"></div>
                  <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r-2 border-b-2 border-gray-300 rounded-br"></div>

                  <div className="absolute top-0.5 right-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-1 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-0.5 shadow-md border border-yellow-300 z-10">
                    <Coins className="w-2 h-2" />
                    {card.gold}
                  </div>

                  <div className="flex justify-center items-center mt-3">
                    <span className="text-2xl">{card.icon}</span>
                  </div>

                  <div className="flex justify-center mt-1">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getCategoryColor(card.category)} shadow-sm`}>
                      {card.category}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-2 mt-1">
                    <p className="text-gray-800 font-medium text-[11px] leading-tight text-center">{card.name}</p>
                  </div>

                  <div className="flex justify-center mb-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setRevealingPack(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCreep;
