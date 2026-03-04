export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface SkillCategory {
  key: string;
  skills: Skill[];
}

/** About page — skill bars with proficiency levels */
export const skills: SkillCategory[] = [
  {
    key: "mobile",
    skills: [
      { name: "React Native", level: 90 },
      { name: "Expo", level: 85 },
      { name: "Flutter", level: 70 },
      { name: "Android Native", level: 65 },
      { name: "iOS (Swift)", level: 55 },
    ],
  },
  {
    key: "languages",
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Dart", level: 70 },
      { name: "Java", level: 60 },
      { name: "Kotlin", level: 60 },
      { name: "Swift", level: 50 },
      { name: "Groovy", level: 50 },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Firebase", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "NestJS", level: 70 },
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 70 },
    ],
  },
];

/** Homepage — icon badge grid grouped by classification */
export interface StackItem {
  name: string;
  icon: string; // react-icons/si component name
  library?: string;
}

export interface StackGroup {
  key: string;
  items: StackItem[];
}

export const techStack: StackGroup[] = [
  {
    key: "languages",
    items: [
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "Dart", icon: "SiDart" },
      { name: "Swift", icon: "SiSwift" },
      { name: "Kotlin", icon: "SiKotlin" },
      { name: "Java", icon: "LiaJava", library: "Lia" },
      { name: "Objective-C", icon: "SiApple" },
      { name: "Groovy", icon: "SiApachegroovy" },
    ],
  },
  {
    key: "framework",
    items: [
      { name: "React Native", icon: "SiReact" },
      { name: "Expo", icon: "SiExpo" },
      { name: "Flutter", icon: "SiFlutter" },
      { name: "Jetpack Compose", icon: "SiJetpackcompose" },
      { name: "SwiftUI", icon: "SiSwift" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express", icon: "SiExpress" },
      { name: "NestJS", icon: "SiNestjs" },
      { name: "Spring", icon: "SiSpring" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "Redis", icon: "SiRedis" },
      { name: "Sequelize", icon: "SiSequelize" },
    ],
  },
  {
    key: "codeEditor",
    items: [
      { name: "VS Code", icon: "VscVscode" },
      { name: "Android Studio", icon: "SiAndroidstudio" },
      { name: "Xcode", icon: "SiXcode" },
      { name: "IntelliJ IDEA", icon: "SiIntellijidea" },
    ],
  },
  {
    key: "misc",
    items: [
      { name: "Git", icon: "SiGit" },
      { name: "GitLab", icon: "SiGitlab" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "Bitbucket", icon: "SiBitbucket" },
      { name: "Jira", icon: "SiJira" },
      { name: "Fastlane", icon: "SiFastlane" },
      { name: "Confluence", icon: "SiConfluence" },
      { name: "Notion", icon: "SiNotion" },
      { name: "Heroku", icon: "SiHeroku" },
      { name: "Digital Ocean", icon: "SiDigitalocean" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Adobe XD", icon: "SiAdobexd" },
      { name: "Sentry", icon: "SiSentry" },
      { name: "Redux", icon: "SiRedux" },
      { name: "Docker", icon: "SiDocker" },
      { name: "Babel", icon: "SiBabel" },
      { name: "Yarn", icon: "SiYarn" },
      { name: "PNPM", icon: "SiPnpm" },
      { name: "Bun", icon: "SiBun" },
      { name: "ESLint", icon: "SiEslint" },
      { name: "Clickup", icon: "SiClickup" },
      { name: "Trello", icon: "SiTrello" },
      { name: "Linear", icon: "SiLinear" },
      { name: "TensorFlow", icon: "SiTensorflow" },
    ],
  },
];
