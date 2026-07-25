// Pool for attribute names - Trespasser rulebook p.11
type AttributeName = 'Might' | 'Agility' | 'Intellect' | 'Spirit';

// Pool for skill names - Trespasser rulebook p.17
type Skill = 'Acrobatics' | 'Alchemy' | 'Athletics' | 'Crafting' | 'Folklore' | 'Letters' | 'Magic' | 'Nature' | 'Perception' | 'Speech' | 'Stealth' | 'Tinkering';

// A test is a combination of an attribute, a skill, and a difficulty level (usually 10-20)
interface Test {
  attributeName: AttributeName;
  skill: Skill;
  difficulty: number;
}

// A trigger is the group test that must be passed to avoid the trap effects if the explore check fails to detect it
// an optional description can be provided to clarify the trigger conditions
interface Trigger { type: 'trigger'; test: Test; description?: string }

// A disarm is a special test added to a trap to augment the standard disarm action,
// or to add descriptive flavor to the trap
interface Disarm  { type: 'disarm';  test?: Test; description?: string }

// An effect outlines the consequences of a trap being triggered
interface Effect  { type: 'effect';  description: string }

// A note is a general note about a feature.
// It can also be used to make plain text versions of other sub-details, 
// such as triggers or disarms for flexibility in the editor
interface Note    { type: 'note';    name?: string; description: string }

// A check is an additional test that can be added to a feature
interface Check   { type: 'check';   test: Test; description?: string }

type GenericSubDetail = Note | Check; // addable to any feature

// Base interface for all features, which are the main components of a room
interface FeatureBase {
  id: string;
  detailName: string;
  subDetails: GenericSubDetail[];
}

interface EncounterFeature extends FeatureBase {
  type: 'encounter';
  tokens: { count: number; name: string }[]; // tokens are creatures/npcs
  description: string;
}

interface RoomTrapFeature extends FeatureBase {
  type: 'roomTrap'; 
  hidden: number; // How many successes in a group explore check are required to detect the trap (1-5)
  description: string;
  disarm?: Disarm;
  trigger?: Trigger; // optional at type level, required for valid form submission
  effect?: Effect;
}

interface DetailFeature extends FeatureBase {
  type: 'detail';
  description: string;
  trapped: boolean; // toggles whether the detail is a detail trap
  disarm?: Disarm;  // }
  trigger?: Trigger;// } - become available in form when trapped is true
  effect?: Effect;  // }
}

type Feature = EncounterFeature | RoomTrapFeature | DetailFeature;

interface Room {
  roomId: number;
  title: string;
  description: string;
  isDark: boolean;
  features: Feature[];
}