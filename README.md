# Feature Creep 🎮

A strategic deck-building game that satirizes video game development, where players manage resources and implement features while battling the real-world challenge of scope creep.

**[Play Now](https://sh0tybumbati.github.io/feature-creep/)** | **[View Source](https://github.com/Sh0tybumbati/feature-creep)**

---

## About the Game

Feature Creep is a meta card game built for a game jam that turns the software development process into an engaging gameplay experience. Draw "Creep Cards" to generate power, purchase features from a dynamic shop, and implement them to earn gold—all while managing the delicate balance between ambition and resources.

The game cleverly gamifies scope creep, the common software development challenge where feature requests spiral out of control, transforming it into a strategic deck-building mechanic.

## Gameplay

### Core Mechanics

- **Power Generation**: Draw Creep Cards each turn to generate power
- **Feature Shop**: Purchase features from a rotating shop using power
- **Implementation**: Implement purchased features to earn gold
- **Deck Building**: Open booster packs to expand your deck with rarer, more powerful cards
- **Rarity System**: Cards range from Common to Legendary, each with different power values
- **Multiplier Bonuses**: Chain implemented features to build powerful multipliers

### How to Play

1. **Draw Phase**: Draw Creep Cards to accumulate power
2. **Shop Phase**: Browse the dynamic feature shop and purchase items with your power
3. **Implement Phase**: Choose which features to implement for gold rewards
4. **Upgrade Phase**: Use gold to purchase booster packs and improve your deck
5. **Strategic Planning**: Balance short-term gains with long-term deck optimization

## Features

- 🎴 **Dynamic Deck Building** - Evolving card system with rarity-based progression
- 💰 **Resource Management** - Balance power and gold economies
- 🛒 **Rotating Shop** - Dynamic marketplace with changing feature availability
- ⭐ **Rarity System** - Common, Uncommon, Rare, Epic, and Legendary cards
- 🎯 **Strategic Depth** - Multiplier bonuses reward careful planning
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable play
- 📱 **Responsive Design** - Play on desktop or mobile devices

## Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Sh0tybumbati/feature-creep.git
cd feature-creep

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Game Development Philosophy

Feature Creep embraces the irony of building a game about building games. The meta-humor extends throughout:

- Cards represent actual software features
- Power represents development resources
- Gold represents business value
- The shop simulates stakeholder requests
- Scope creep becomes the central mechanic rather than a problem to avoid

## Project Structure

```
feature-creep/
├── src/
│   ├── App.tsx          # Main game logic and state management
│   ├── Card.jsx         # Card component with rarity rendering
│   └── main.tsx         # Application entry point
├── dist/                # Production build output
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Game Balance

The game features a carefully tuned economy:

- **Creep Cards** generate power based on rarity
- **Features** cost power to purchase
- **Implementation** converts features to gold
- **Booster Packs** cost gold and contain random cards
- **Multipliers** reward strategic feature implementation chains

## Contributing

This was a game jam project, but improvements are welcome! Feel free to:

- Report bugs or suggest features via GitHub Issues
- Submit pull requests with enhancements
- Share your high scores or strategies

## License

MIT License - feel free to fork, modify, and build upon this project!

## Acknowledgments

Built as a game jam project exploring the intersection of software development humor and strategic card game mechanics. Special thanks to the indie game dev community for inspiration.

---

**Tip**: Start with cheap features to build your economy, then gradually work toward expensive legendary cards for maximum multipliers!
