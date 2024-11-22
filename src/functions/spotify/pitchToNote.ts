export const pitchToNote = (pitch: number) => {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  if (pitch < 0) {
    return "No Key";
  }
  const note = notes[Math.round(pitch) % 12];
  return note;
};
