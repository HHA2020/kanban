export default function ChartPanel({ title, note, isEmpty, emptyMessage, children }) {
  return (
    <section className="panel">
      <div className="panel__head">
        <h2 className="panel__title">{title}</h2>
        {note && <p className="panel__note">{note}</p>}
      </div>
      <div className="panel__body">
        {isEmpty ? <p className="panel__empty">{emptyMessage}</p> : children}
      </div>
    </section>
  );
}
