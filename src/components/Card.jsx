function Card({ title, children, footer }) {
  return (
    <section className="card">
      {title && <h3>{title}</h3>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </section>
  );
}

export default Card;
