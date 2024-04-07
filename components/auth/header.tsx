interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-6 items-center justify-center">
      <h1 className="text-3xl font-semibold">اعتبار سنجی</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
