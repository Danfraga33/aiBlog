export const h1 = ({
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 id={id} {...props} className="mb-6 text-4xl font-bold">
    {children}
  </h1>
);

export const h2 = ({
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 id={id} {...props} className="mb-4 mt-8 text-3xl font-semibold">
    {children}
  </h2>
);

export const h3 = ({
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 id={id} {...props} className="mb-3 mt-6 text-2xl font-medium">
    {children}
  </h3>
);
