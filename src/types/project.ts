// 프로젝트 카테고리 상수
export const PROJECT_CATEGORIES = {
  ALL: "ALL",
  TEAM_PROJECT: "TEAM_PROJECT",
  BACKEND: "BACKEND",
  FRONTEND: "FRONTEND",
  UI_UX: "UI_UX",
  FULL_STACK: "FULL_STACK",
} as const;

// 카테고리 타입 (상수에서 추출)
export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[keyof typeof PROJECT_CATEGORIES];

// 카테고리 라벨 (한국어)
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  [PROJECT_CATEGORIES.ALL]: "전체",
  [PROJECT_CATEGORIES.TEAM_PROJECT]: "팀 프로젝트",
  [PROJECT_CATEGORIES.BACKEND]: "백엔드",
  [PROJECT_CATEGORIES.FRONTEND]: "프론트엔드",
  [PROJECT_CATEGORIES.UI_UX]: "UI/UX",
  [PROJECT_CATEGORIES.FULL_STACK]: "풀스택",
} as const;

// 프로젝트 상태
export const PROJECT_STATUS = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  PLANNED: "PLANNED",
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

// 기술 스택 카테고리
export const TECH_CATEGORIES = {
  FRONTEND: "FRONTEND",
  BACKEND: "BACKEND",
  DATABASE: "DATABASE",
  DEVOPS: "DEVOPS",
  TOOLS: "TOOLS",
} as const;

export type TechCategory =
  (typeof TECH_CATEGORIES)[keyof typeof TECH_CATEGORIES];

// 기술 스택 정보
export interface TechStack {
  name: string;
  category: TechCategory;
  icon?: string;
  version?: string;
}

// 프로젝트 멤버 정보
export interface ProjectMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  email?: string;
  avatar?: string;
}

// 프로젝트 기간
export interface ProjectPeriod {
  start: string; // YYYY-MM-DD 형식
  end?: string; // 진행 중인 프로젝트의 경우 undefined
  duration?: string; // "3개월", "6주" 등
}

// 프로젝트 링크
export interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
  figma?: string;
  notion?: string;
  youtube?: string;
}

// 프로젝트 미디어
export interface ProjectMedia {
  thumbnail: string;
  images?: string[];
  video?: string;
  gif?: string;
}

// 프로젝트 기능
export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

// 메인 프로젝트 인터페이스
export interface ProjectItem {
  // 기본 정보
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;

  // 팀 정보
  members: ProjectMember[];
  isTeamProject: boolean;

  // 기간 및 링크
  period: ProjectPeriod;
  links: ProjectLinks;

  // 기술 스택
  techStack: TechStack[];

  // 미디어
  media: ProjectMedia;

  // 아키텍처
  architecture?: string;

  // 상세 정보
  features: ProjectFeature[];

  // 메타데이터
  createdAt: string;
  updatedAt: string;
  tags?: string[];

  // SEO 및 접근성
  altText?: string;
  keywords?: string[];

  // 팀 프로젝트에서 내 리더십 발휘 내용
  leadership?: string;
  // 팀 프로젝트에서 내 프로젝트 기여도 (예: 40%)
  contribution?: string;
  // 팀 프로젝트에서 내가 맡은 작업 상세 설명 (여러 줄 가능)
  myTasks?: string[];
}

// 프로젝트 필터 옵션
export interface ProjectFilter {
  category?: ProjectCategory;
  status?: ProjectStatus;
  techStack?: string[];
  isTeamProject?: boolean;
  searchTerm?: string;
}

// 프로젝트 정렬 옵션
export type ProjectSortOption =
  | "latest"
  | "oldest"
  | "name"
  | "category"
  | "status";

// 프로젝트 목록 응답 타입
export interface ProjectListResponse {
  projects: ProjectItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// 프로젝트 상세 정보 (확장된 버전)
export interface ProjectDetail extends ProjectItem {
  // 추가 상세 정보
  problemStatement?: string;
  solution?: string;
  impact?: string;

  // 개발 과정
  developmentProcess?: {
    planning: string;
    design: string;
    development: string;
    testing: string;
    deployment: string;
  };

  // 성과 지표
  metrics?: {
    performance?: string;
    userSatisfaction?: string;
    technicalDebt?: string;
  };

  // 향후 계획
  futurePlans?: string[];
}

// 유틸리티 타입들
export type ProjectWithoutId = Omit<ProjectItem, "id">;
export type ProjectSummary = Pick<
  ProjectItem,
  "id" | "title" | "category" | "media" | "period" | "techStack"
>;
export type ProjectCard = Pick<
  ProjectItem,
  | "id"
  | "title"
  | "description"
  | "category"
  | "media"
  | "period"
  | "techStack"
  | "members"
>;

// 프로젝트 유틸리티 함수들
export const ProjectUtils = {
  // 카테고리별 프로젝트 필터링
  filterByCategory: (
    projects: ProjectItem[],
    category: ProjectCategory
  ): ProjectItem[] => {
    if (category === PROJECT_CATEGORIES.ALL) return projects;
    return projects.filter((project) => project.category === category);
  },

  // 기술 스택별 프로젝트 필터링
  filterByTechStack: (
    projects: ProjectItem[],
    techName: string
  ): ProjectItem[] => {
    return projects.filter((project) =>
      project.techStack.some((tech) =>
        tech.name.toLowerCase().includes(techName.toLowerCase())
      )
    );
  },

  // 팀 프로젝트 필터링
  filterTeamProjects: (projects: ProjectItem[]): ProjectItem[] => {
    return projects.filter((project) => project.isTeamProject);
  },

  // 개인 프로젝트 필터링
  filterPersonalProjects: (projects: ProjectItem[]): ProjectItem[] => {
    return projects.filter((project) => !project.isTeamProject);
  },

  // 프로젝트 정렬
  sortProjects: (
    projects: ProjectItem[],
    sortBy: ProjectSortOption
  ): ProjectItem[] => {
    const sorted = [...projects];

    switch (sortBy) {
      case "latest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "category":
        return sorted.sort((a, b) => a.category.localeCompare(b.category));
      case "status":
        return sorted.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sorted;
    }
  },

  // 프로젝트 검색
  searchProjects: (
    projects: ProjectItem[],
    searchTerm: string
  ): ProjectItem[] => {
    const term = searchTerm.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.techStack.some((tech) =>
          tech.name.toLowerCase().includes(term)
        ) ||
        project.members.some((member) =>
          member.name.toLowerCase().includes(term)
        )
    );
  },

  // 프로젝트 기간 계산
  calculateDuration: (period: ProjectPeriod): string => {
    const start = new Date(period.start);
    const end = period.end ? new Date(period.end) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays}일`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months}개월`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years}년`;
    }
  },

  // 기술 스택 카테고리별 그룹화
  groupTechStackByCategory: (
    techStack: TechStack[]
  ): Record<TechCategory, TechStack[]> => {
    return techStack.reduce((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    }, {} as Record<TechCategory, TechStack[]>);
  },

  // 프로젝트 상태에 따른 색상 반환
  getStatusColor: (status: ProjectStatus): string => {
    switch (status) {
      case PROJECT_STATUS.COMPLETED:
        return "text-green-600 bg-green-100";
      case PROJECT_STATUS.IN_PROGRESS:
        return "text-blue-600 bg-blue-100";
      case PROJECT_STATUS.PLANNED:
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  },

  // 카테고리별 아이콘 반환
  getCategoryIcon: (category: ProjectCategory): string => {
    switch (category) {
      case PROJECT_CATEGORIES.FRONTEND:
        return "🎨";
      case PROJECT_CATEGORIES.BACKEND:
        return "⚙️";
      case PROJECT_CATEGORIES.FULL_STACK:
        return "🔄";
      case PROJECT_CATEGORIES.UI_UX:
        return "🎯";
      case PROJECT_CATEGORIES.TEAM_PROJECT:
        return "👥";
      default:
        return "📁";
    }
  },
};
