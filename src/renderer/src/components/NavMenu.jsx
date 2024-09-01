import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import ImportExportCard from '@/components/ImportExportCard'
import { Home, UserPlus, FileDown } from 'lucide-react'
import { motion } from 'framer-motion'

const iconVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.8 }
}

const NavMenu = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()} active={isActive('/')}>
              <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
                <Home className="mr-2 h-4 w-4" />
              </motion.div>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/add-student">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={isActive('/add-student')}
            >
              <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
                <UserPlus className="mr-2 h-4 w-4" />
              </motion.div>
              Add Student
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
              <FileDown className="mr-2 h-4 w-4" />
            </motion.div>
            Import/Export
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ImportExportCard />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
