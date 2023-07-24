import styles from './site-layouts.module.scss';

/* eslint-disable-next-line */
export interface SiteLayoutsProps {}

export function SiteLayouts(props: SiteLayoutsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SiteLayouts!</h1>
    </div>
  );
}

export default SiteLayouts;
