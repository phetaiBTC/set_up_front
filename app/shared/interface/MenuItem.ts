export interface MenuItem {
  label?: string;
  icon?: string;
  to?: string;
  url?: string;
  target?: string;
  items?: MenuItem[];
  class?: string;
  separator?: boolean;
  disabled?: boolean;
  command?: (args: { originalEvent: Event; item: MenuItem }) => void;
  visible?: boolean;
}
