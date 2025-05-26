const StatoBadge = ({ stato }) => {
  const color = stato === 'risolto'
    ? 'success'
    : stato === 'in lavorazione'
    ? 'warning'
    : 'secondary';

  return <span className={`badge bg-${color}`}>{stato}</span>;
};

export default StatoBadge;