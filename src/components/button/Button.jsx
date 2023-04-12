export default function Button({ handleLoadMore }) {
  return (
    <button type="button" className="button-loadmore" onClick={handleLoadMore}>
      Load more
    </button>
  );
}
