# STRIKE

For my game, I would like to create a single player story game. It should be a 2D side scroller with a variety of enemies. You should be able to have a wide range of attacks and movement options. You should be able to upgrade your character as you go along. It should have boss fights and puzzles.

## Player

The player should have a variety of attacks and movement options. Some type of light to heavy option for standing, crouching, and jumping is necessary. Additional attacks should be included in the upgrades. The player should be able to walk forwards and backwards. The player should also be able to sprint and dash backwards. There should be a jump and crouch. During the crouch you cannot move forwards or backwards. If the player was sprinting while attempting to crouch, they should get a slide instead. The player should be able to jump straight up, jump forwards, and jump backwards. The player should be able to dash forwards and backwards out of a jump. All attacks should include some start up frames, active frames, and recovery frames. Attacks should be cancelable in this order Light > Heavy > Special. Being cancelable means to be able to attack again during the recovery frames of an animation. Every attack should put the enemy in some number of frames of block or stun depending on if the enemy got hit or not. Some moves can be canceled into jumps. The player can block. Special moves should depend on some type of meter.

## Upgrades

The players should be able to upgrade themselves in some capacity. There should be three main upgrade categories: Max Health, Special Meter, and Attack Damage. Each upgrade category should have a max number of upgrades. Special moves should also be an upgrade. These should have a max number of upgrades as well that should improve their attributes. There should be upgrade categories for movement as well. To upgrade your character, players will obtain “experience” by killing enemies and collecting “tokens”.

## Enemies

Each type of enemy should have their own attack. These attacks should also put the player in some number of frames of block or stun depending on if the player got hit or not. The enemies should be controlled with some type of AI algorithm. The algorithm should be different for each type of enemy. Some enemies may have ranged attacks and should be able to attack from any distance. Some may only have close attacks and should approach the player first . Boss enemies should have a health bar present. Other types of enemies do not need a health bar.

## Gameplay

The levels are 2D tiles maps with many enemies and “tokens” throughout. The main objective is for our player to reach the end of the level. It is not mandatory to defeat every enemy or collect every token unless specifically told to. For example, a part of the level may need a key to unlock a door and the player should have to kill a certain enemy to get that key. There are four types of levels I would like to make. The basic level should just have enemies and perform like a basic platformer. The puzzle level should have the player decipher some code or do some action within the map to move forward. The speed level should require the player to get to the end within a certain amount of time. The boss level should require the player to defeat the boss to continue. The levels should be separated into “worlds” meaning they should have a tile map theme between them. A world should end with a boss level always. Travel from level to level should be continuous, meaning they should not be able to move backwards into a previous level. When the player dies, they should be restarted at the beginning of the level.

## Deliverable

For the first iteration of the game, I would like to have one of each type of level. There should be three different types of enemies and one boss enemy. The player should be able to perform all basic actions and purchase at least two special moves. There should be a working menu system.

## Stretch Goals

Depending on how quickly I can get through to the deliverable will determine which of the stretch goals I will do. Adding another world, adding more enemy types, and adding more upgrade categories should be the main gameplay stretch goals. We should add a block meter that will contain the amount of time that the player can block consecutively for. Adding the ability to save progress and adding sound should be the main non gameplay stretch goals.

## Development Roadmap

The states should be Logo (for my created logo), Title Screen (for the title and start and instructions button), Play (for playing the game), Pause (for pausing the game and going through the menu), and End (for when the game is finished).

Create project -> Create each state -> Finish the logo state -> Finish the end state -> Finish the title screen -> Create the play state -> Add a basic tile map for testing -> Implement tile map reading -> Implement tile map rendering -> Add the player into the play state -> Add gravity physics -> Add floor collisions -> Add player idle animations (if any) -> Creating the pause effect -> Add the walking movement of player -> Add player walking animations -> Add the jumping movement of player -> Add player jumping animations -> Add the running movement of player -> Add player running animations -> Add wall collisions -> Add ceiling collisions -> Add basic enemy -> Add basic enemy collisions with player -> Add player standing light attack -> Add standing light attack frame data -> Add standing light attack collisions -> Add enemy stun -> Add attack knock back -> Add basic enemy AI -> Add basic enemy attack -> Add basic attack frame data -> Add basic attack collisions -> Add player stun -> Add player block stun -> Rinse and repeat for other enemy types and player attacks. More will be added to this as the project progresses along. I wish to have a fully functional player and one enemy done by 11/27.
