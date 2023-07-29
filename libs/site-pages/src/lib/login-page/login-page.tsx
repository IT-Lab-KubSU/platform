import styles from './login-page.module.scss';
import {LoginForm} from "./components/LoginForm";

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className="block bg-amber-100 p-5">
      <h1 className="text-4xl mb-2">Войти</h1>
      <LoginForm/>
    </div>
  );
}

export default LoginPage;
