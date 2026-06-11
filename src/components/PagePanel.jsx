function PagePanel({ title, titleId, className, children }) {
  return (
    <section className={className} aria-labelledby={titleId}>
      <h1 id={titleId}>{title}</h1>
      {children}
    </section>
  );
}

export default PagePanel;
