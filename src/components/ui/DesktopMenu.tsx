import Link from 'next/link';
import { socialsItems } from '../../config';
import { MenuItemType } from '../../types/commonTypes';
import Socials from '../Socials';
import ThemeSwitcher from '../ThemeSwitcher';
import {
  DesktopMenuContainer,
  MenuItem,
  MenuItemsContainer,
} from './styled/DesktopMenu.styled';

type Props = {
  menuItems: MenuItemType[];
  socialsItems: typeof socialsItems;
};

const DesktopMenu = ({ menuItems }: Props) => (
  <DesktopMenuContainer>
    <MenuItemsContainer>
      {menuItems.map((menuItem) => {
        return (
          <MenuItem key={menuItem.label}>
            <Link href={menuItem.href}>{menuItem.label}</Link>
          </MenuItem>
        );
      })}
    </MenuItemsContainer>
    <Socials />

    <div style={{ marginLeft: ' 24px' }}>
      <ThemeSwitcher />
    </div>
  </DesktopMenuContainer>
);

export default DesktopMenu;
