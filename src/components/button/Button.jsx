import css from './Button.module.css';

export default function Button({ handleLoadMore }) {
  return (
    <button
      type="button"
      className={css.buttonLoadmore}
      onClick={handleLoadMore}
    >
      Load more
    </button>
  );
}
