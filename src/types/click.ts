export type SectionName = "intro" | "profile" | "project" | "contact";

export interface HeaderProps {
  onNavigate: (section: SectionName) => void;
}
