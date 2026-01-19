
export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureSpace {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface EventType {
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  url: string;
  category: 'empty' | 'setup' | 'aerial' | 'sunset';
  alt: string;
}
