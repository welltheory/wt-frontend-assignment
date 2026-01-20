export const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div>
      <h2 data-testid="page-header-title">{title}</h2>
      {subtitle && <p data-testid="page-header-subtitle">{subtitle}</p>}
    </div>
  );
};
