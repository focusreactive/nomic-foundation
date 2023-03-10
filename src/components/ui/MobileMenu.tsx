import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { socialsItems } from '../../config';
import { MenuItemType } from '../../types/commonTypes';
import Socials from '../Socials';
import ThemeSwitcher from '../ThemeSwitcher';
import {
  MobileMenuContainer,
  MobileMenuFooter,
  MobileMenuItem,
  MobileMenuItemsList,
} from './styled/MobileMenu.styled';

type Props = {
  menuItems: MenuItemType[];
  socialsItems: typeof socialsItems;
  isOpen: boolean;
  closeMobileMenu: () => void;
};

const MobileMenu = ({ menuItems, isOpen, closeMobileMenu }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const listener = () => closeMobileMenu();

    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [closeMobileMenu]);

  return (
    <MobileMenuContainer
      isOpen={isOpen}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MobileMenuItemsList>
        {menuItems.map((menuItem) => {
          const isLinkActive = router.asPath.includes(menuItem.href);
          return (
            <Link
              href={menuItem.href}
              key={menuItem.label}
              onClick={closeMobileMenu}
            >
              <MobileMenuItem className={isLinkActive ? 'active' : ''}>
                {menuItem.label}
              </MobileMenuItem>
            </Link>
          );
        })}
      </MobileMenuItemsList>
      <MobileMenuFooter>
        <Socials />
        <ThemeSwitcher />
      </MobileMenuFooter>
    </MobileMenuContainer>
  );
};

export default MobileMenu;
