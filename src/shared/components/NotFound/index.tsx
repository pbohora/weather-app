import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>The requested resource could not be found!</h1>
      <p className={styles.description}>Please check the URL and try again.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
