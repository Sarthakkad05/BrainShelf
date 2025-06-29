
interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const SidebarItem = ({ text, icon, onClick }: SidebarItemProps) => {
  return (
    <div className="flex items-center text-gray-500 dark:text-white py-2 cursor-pointer hover:bg-gray-300  dark:hover:bg-gray-100/10 max-w-48 pl-4 duration-500 rounded" onClick={onClick}>
      <div className="mr-2">{icon}</div>
      {text}
    </div>
  );
};
