import styles from './login-page.module.scss';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LoginPage!</h1>
    </div>
  );
}

export default LoginPage;
