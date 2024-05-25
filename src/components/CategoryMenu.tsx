import CategoryMenuItem from './CategoryMenuItem';

export default function CategoryMenu(props: any) {
  return (
    <div className='flex flex-col text-sm text-gray-400 dark:text-gray-500'>
      {props.post?.section.map((FirstLevelMenu: any) => {
        return (
          <CategoryMenuItem
            key={FirstLevelMenu.id}
            {...FirstLevelMenu}
          ></CategoryMenuItem>
        );
      })}
    </div>
  );
}
