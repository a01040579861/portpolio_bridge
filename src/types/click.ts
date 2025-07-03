export type SectionName = "profile" | "project" | "point";

export interface HeaderProps {
  onNavigate: (section: SectionName) => void;
}
