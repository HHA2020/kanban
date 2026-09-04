export default function SummaryCard({ label, value, tone = "neutral" }) {
  return (
    <div className={`summary-card summary-card--${tone}`}>
      <p className="summary-card__value">{value}</p>
      <p className="summary-card__label">{label}</p>
    </div>
  );
}
