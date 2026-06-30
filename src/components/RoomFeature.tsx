import type { Feature } from '../types/RoomData';

interface RoomFeatureProps {
  feature: Feature;
  index: number;
}

export function RoomFeature({ feature, index }: RoomFeatureProps) {
  // Generate the letter manually - temporary solution to bold styling problem
  const letter = String.fromCharCode(65 + index);

  // Determine display label for the type
  // Returns the label string if applicable, or empty string for standard features
  let typeLabel = "";
  
  if (feature.category === 'trap') {
    typeLabel = feature.subcategory === 'room' ? "Room Trap" : "Detail Trap";
  } else if (feature.category === 'encounter') {
    typeLabel = "Encounter";
  } else if (feature.category === 'sign') {
    typeLabel = "Sign";
  }

  // Construct the text
  // Part 1: The Type Label (if any) + Space
  const labelPart = typeLabel ? <span className="feature-type">{typeLabel}: </span> : null;

  // Part 2: The Name (Always present)
  const namePart = <span className="feature-name">{feature.name}.</span>;

  // Part 3: Hidden Value (Only for traps, if > 0)
  const hiddenPart = (feature.category === 'trap' && feature.hidden > 0) ? (
    <span className="feature-hidden"> Hidden {feature.hidden}.</span>
  ) : null;

  // Part 4: The Details (Main body text comes last)
  const detailsPart = feature.details ? (
    <span className="feature-details"> {feature.details}</span>
  ) : null;

  return (
    <li className="feature-item">
      <span className="feature-marker">{letter}. </span>
      <div className="feature-content">
        {labelPart}
        {namePart}
        {hiddenPart}
        {detailsPart}
      </div>
    </li>
  );
}