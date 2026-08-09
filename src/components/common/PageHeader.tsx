type Props = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>

      {actions}
    </div>
  );
}
