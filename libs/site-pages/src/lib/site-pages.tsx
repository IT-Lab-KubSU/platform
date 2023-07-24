import styles from './site-pages.module.scss';

/* eslint-disable-next-line */
export interface SitePagesProps {}

export function SitePages(props: SitePagesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SitePages!</h1>
    </div>
  );
}

export default SitePages;
