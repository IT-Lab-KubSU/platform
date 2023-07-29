import styles from './registration-page.module.scss';

/* eslint-disable-next-line */
export interface RegistrationPageProps {}

export function RegistrationPage(props: RegistrationPageProps) {
  return (
    <div className={styles['container']}>
      <h1 className="text-4xl">Welcome to RegistrationPage!</h1>
      <form action="">
        <input type="text"/>
        <input type="text" className="m-1 text-2xl"/>
        <button>Войти</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
