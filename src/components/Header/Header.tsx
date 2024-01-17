import styles from './Header.module.scss'

type props = {
  className?: string
}

export default function Header({ className }: props) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div>Список транзакций</div>
    </header>
  )
}
