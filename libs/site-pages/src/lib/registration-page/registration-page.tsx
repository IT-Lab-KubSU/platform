import styles from './registration-page.module.scss';

/* eslint-disable-next-line */
export interface RegistrationPageProps {}

export function RegistrationPage(props: RegistrationPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RegistrationPage!</h1>
    </div>
  );
}

export default RegistrationPage;
