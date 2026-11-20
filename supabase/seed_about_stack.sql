-- One-time import of education, certificates, skills and tech stack (from src/data/*.ts + messages/*.json).
-- Safe to re-run: rows are upserted by their natural keys.

begin;

insert into public.education (key, sort_order, institution, degree_title, period) values
  ('binus', 10, 'Binus International University', 'S.Kom', '2012 — 2019')
on conflict (key) do update set sort_order = excluded.sort_order, institution = excluded.institution, degree_title = excluded.degree_title, period = excluded.period;

insert into public.education_translations (education_key, locale, degree, field) values
  ('binus', 'en', 'Bachelor Degree', 'Computer Science'),
  ('binus', 'id', 'Sarjana', 'Ilmu Komputer'),
  ('binus', 'ja', '学士号', 'コンピュータサイエンス')
on conflict (education_key, locale) do update set degree = excluded.degree, field = excluded.field;

insert into public.certificates (sort_order, name, issuer, year) values
  (10, 'Meta React Native', 'Meta', '2025'),
  (20, 'iOS & Swift - The Complete iOS App Development Bootcamp', 'Udemy', '2025'),
  (30, 'The Complete Flutter Development Bootcamp with Dart', 'Udemy', '2023'),
  (40, 'Fullstack Dev & Mobile (React Native, ExpressJS)', 'Arkademy', '2020')
on conflict (name, issuer) do update set sort_order = excluded.sort_order, year = excluded.year;

insert into public.skill_categories (key, sort_order) values
  ('mobile', 10),
  ('languages', 20),
  ('backend', 30)
on conflict (key) do update set sort_order = excluded.sort_order;

insert into public.skill_category_translations (category_key, locale, label) values
  ('mobile', 'en', 'Mobile'),
  ('mobile', 'id', 'Mobile'),
  ('mobile', 'ja', 'モバイル'),
  ('languages', 'en', 'Languages'),
  ('languages', 'id', 'Bahasa Pemrograman'),
  ('languages', 'ja', 'プログラミング言語'),
  ('backend', 'en', 'Backend & Database'),
  ('backend', 'id', 'Backend & Database'),
  ('backend', 'ja', 'バックエンド & データベース')
on conflict (category_key, locale) do update set label = excluded.label;

insert into public.skills (category_key, sort_order, name, level) values
  ('mobile', 10, 'React Native', 90),
  ('mobile', 20, 'Expo', 85),
  ('mobile', 30, 'Flutter', 70),
  ('mobile', 40, 'Android Native', 65),
  ('mobile', 50, 'iOS (Swift)', 55),
  ('languages', 10, 'TypeScript', 90),
  ('languages', 20, 'JavaScript', 90),
  ('languages', 30, 'Dart', 70),
  ('languages', 40, 'Java', 60),
  ('languages', 50, 'Kotlin', 60),
  ('languages', 60, 'Swift', 50),
  ('languages', 70, 'Groovy', 50),
  ('backend', 10, 'Firebase', 90),
  ('backend', 20, 'Node.js', 80),
  ('backend', 30, 'Express', 75),
  ('backend', 40, 'NestJS', 70),
  ('backend', 50, 'MongoDB', 70),
  ('backend', 60, 'MySQL', 70)
on conflict (category_key, name) do update set sort_order = excluded.sort_order, level = excluded.level;

insert into public.stack_groups (key, sort_order) values
  ('languages', 10),
  ('framework', 20),
  ('backend', 30),
  ('codeEditor', 40),
  ('misc', 50)
on conflict (key) do update set sort_order = excluded.sort_order;

insert into public.stack_group_translations (group_key, locale, label) values
  ('languages', 'en', 'Languages'),
  ('languages', 'id', 'Bahasa Pemrograman'),
  ('languages', 'ja', 'プログラミング言語'),
  ('framework', 'en', 'Framework'),
  ('framework', 'id', 'Framework'),
  ('framework', 'ja', 'フレームワーク'),
  ('backend', 'en', 'Backend & Database'),
  ('backend', 'id', 'Backend & Database'),
  ('backend', 'ja', 'バックエンド & データベース'),
  ('codeEditor', 'en', 'Code Editor'),
  ('codeEditor', 'id', 'Code Editor'),
  ('codeEditor', 'ja', 'コードエディタ'),
  ('misc', 'en', 'Misc'),
  ('misc', 'id', 'Lainnya'),
  ('misc', 'ja', 'その他')
on conflict (group_key, locale) do update set label = excluded.label;

insert into public.stack_items (group_key, sort_order, name, icon, icon_size) values
  ('languages', 10, 'JavaScript', 'SiJavascript', null),
  ('languages', 20, 'TypeScript', 'SiTypescript', null),
  ('languages', 30, 'Dart', 'SiDart', null),
  ('languages', 40, 'Swift', 'SiSwift', null),
  ('languages', 50, 'Kotlin', 'SiKotlin', null),
  ('languages', 60, 'Java', 'LiaJava', 20),
  ('languages', 70, 'Objective-C', 'SiApple', null),
  ('languages', 80, 'Groovy', 'SiApachegroovy', null),
  ('framework', 10, 'React Native', 'SiReact', null),
  ('framework', 20, 'Expo', 'SiExpo', null),
  ('framework', 30, 'Flutter', 'SiFlutter', null),
  ('framework', 40, 'Jetpack Compose', 'SiJetpackcompose', null),
  ('framework', 50, 'SwiftUI', 'SiSwift', null),
  ('backend', 10, 'Node.js', 'SiNodedotjs', null),
  ('backend', 20, 'Express', 'SiExpress', null),
  ('backend', 30, 'NestJS', 'SiNestjs', null),
  ('backend', 40, 'Spring', 'SiSpring', null),
  ('backend', 50, 'Firebase', 'SiFirebase', null),
  ('backend', 60, 'MongoDB', 'SiMongodb', null),
  ('backend', 70, 'MySQL', 'SiMysql', null),
  ('backend', 80, 'Redis', 'SiRedis', null),
  ('backend', 90, 'Sequelize', 'SiSequelize', null),
  ('codeEditor', 10, 'VS Code', 'VscVscode', null),
  ('codeEditor', 20, 'Android Studio', 'SiAndroidstudio', null),
  ('codeEditor', 30, 'Xcode', 'SiXcode', null),
  ('codeEditor', 40, 'IntelliJ IDEA', 'SiIntellijidea', null),
  ('misc', 10, 'Git', 'SiGit', null),
  ('misc', 20, 'GitLab', 'SiGitlab', null),
  ('misc', 30, 'GitHub', 'SiGithub', null),
  ('misc', 40, 'Bitbucket', 'SiBitbucket', null),
  ('misc', 50, 'Jira', 'SiJira', null),
  ('misc', 60, 'Fastlane', 'SiFastlane', null),
  ('misc', 70, 'Confluence', 'SiConfluence', null),
  ('misc', 80, 'Notion', 'SiNotion', null),
  ('misc', 90, 'Heroku', 'SiHeroku', null),
  ('misc', 100, 'Digital Ocean', 'SiDigitalocean', null),
  ('misc', 110, 'Figma', 'SiFigma', null),
  ('misc', 120, 'Sentry', 'SiSentry', null),
  ('misc', 130, 'Redux', 'SiRedux', null),
  ('misc', 140, 'Docker', 'SiDocker', null),
  ('misc', 150, 'Babel', 'SiBabel', null),
  ('misc', 160, 'Yarn', 'SiYarn', null),
  ('misc', 170, 'PNPM', 'SiPnpm', null),
  ('misc', 180, 'Bun', 'SiBun', null),
  ('misc', 190, 'ESLint', 'SiEslint', null),
  ('misc', 200, 'Clickup', 'SiClickup', null),
  ('misc', 210, 'Trello', 'SiTrello', null),
  ('misc', 220, 'Linear', 'SiLinear', null),
  ('misc', 230, 'TensorFlow', 'SiTensorflow', null)
on conflict (group_key, name) do update set sort_order = excluded.sort_order, icon = excluded.icon, icon_size = excluded.icon_size;

commit;
