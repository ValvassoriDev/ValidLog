interface THCustomProps {
  title: string;
}
export const THCustom = ({ title }: THCustomProps) => {
  return (
    <th className="py-3 px-4 text-left text-xl text-black-600 font-medium text-muted-foreground">
      {title}
    </th>
  );
};
