import NavItem from "./NavItem";

const Nav = ({ navItems, setSection, section }) => {
  return (
    <nav>
      <ul>
        {navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={setSection}
            section={section}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
