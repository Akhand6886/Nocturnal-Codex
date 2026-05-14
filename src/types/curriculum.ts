
export interface TopicItem {
  title: string;
  slug?: string;
  description?: string;
  link?: string;
}

export interface TopicSection {
  section: string;
  description?: string;
  items: TopicItem[];
}

export interface TopicContent {
  title: string;
  description?: string;
  content: string;
}
